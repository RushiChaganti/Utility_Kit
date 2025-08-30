// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "closeWithoutTrace",
    title: "Close Tab Without Trace",
    contexts: ["page", "action"]
  });
});

// Core close function
async function closeWithoutTrace(tab) {
  if (!tab || !tab.url) return;

  // 1. Delete from history
  try {
    await chrome.history.deleteUrl({ url: tab.url });
  } catch (e) {
    console.warn("history.deleteUrl not supported:", e);
  }

  // 2. Extra cleanup: clear last minute of history (failsafe)
  try {
    await chrome.browsingData.remove(
      { since: Date.now() - 60 * 1000 },
      { history: true }
    );
  } catch (e) {
    console.warn("browsingData.remove not supported:", e);
  }

  // 3. Close tab
  try {
    chrome.tabs.remove(tab.id);
  } catch (e) {
    console.warn("Failed to close tab:", e);
  }
}

// Context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "closeWithoutTrace") {
    closeWithoutTrace(tab);
  }
});

// Toolbar icon click
chrome.action.onClicked.addListener((tab) => {
  closeWithoutTrace(tab);
});

// Keyboard shortcut (Alt+Shift+W by default)
chrome.commands.onCommand.addListener((command) => {
  if (command === "close_and_forget") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) closeWithoutTrace(tabs[0]);
    });
  }
});
