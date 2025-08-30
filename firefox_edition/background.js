// Use the promise-based Firefox API
const b = typeof browser !== "undefined" ? browser : chrome;

// Create context menu on install and set a one-time nudge
b.runtime.onInstalled.addListener(async () => {
  try {
    b.menus.create({
      id: "closeWithoutTrace",
      title: "Close Tab Without Trace",
      contexts: ["page", "browser_action"]
    });
  } catch (_) {}
});

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function closeAndForgetActiveTab() {
  const [tab] = await b.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  const { id: tabId, windowId, url, title } = tab;

  // Close the tab first so it appears in Recently Closed
  try { await b.tabs.remove(tabId); } catch (_) {}

  // Try to remove from "Recently Closed"
  try {
    if (b.sessions?.getRecentlyClosed && b.sessions?.forgetClosedTab) {
      // Poll briefly until Firefox records the closed tab in the session list
      for (let i = 0; i < 10; i++) {
        const recents = await b.sessions.getRecentlyClosed({ maxResults: 25 });
        const hit = recents.find(s =>
          s.tab &&
          s.tab.windowId === windowId &&
          (s.tab.url === url || (title && s.tab.title === title))
        );
        if (hit?.tab?.sessionId) {
          await b.sessions.forgetClosedTab(windowId, hit.tab.sessionId);
          break;
        }
        await sleep(120);
      }
    }
  } catch (_) {}

  // Delete the exact URL from history
  try { if (url) await b.history.deleteUrl({ url }); } catch (_) {}

  // Failsafe: clear the last minute of history
  try {
    if (b.browsingData?.remove) {
      await b.browsingData.remove(
        { since: Date.now() - 60 * 1000 },
        { history: true }
      );
    }
  } catch (_) {}
}

// Context menu
b.menus.onClicked.addListener((info) => {
  if (info.menuItemId === "closeWithoutTrace") {
    closeAndForgetActiveTab();
  }
});

// Toolbar icon click (also works if user opens popup-less action)
if (b.browserAction?.onClicked) {
  b.browserAction.onClicked.addListener(closeAndForgetActiveTab);
}

// Keyboard shortcut
b.commands.onCommand.addListener(cmd => {
  if (cmd === "close_and_forget") {
    closeAndForgetActiveTab();
  }
});
