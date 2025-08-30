document.addEventListener("DOMContentLoaded", () => {
  if (typeof chrome !== "undefined" && chrome.runtime?.id) {
    // Assume Chromium-based (Chrome, Edge, Brave, etc.)
    document.getElementById("chromeInstructions").style.display = "block";
    document.getElementById("openChromeShortcuts").addEventListener("click", () => {
      chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
    });
  } else if (typeof browser !== "undefined") {
    // Assume Firefox
    document.getElementById("firefoxInstructions").style.display = "block";
    document.getElementById("openFirefoxShortcuts").addEventListener("click", () => {
      browser.tabs.create({ url: "about:addons" });
    });
  }
});
