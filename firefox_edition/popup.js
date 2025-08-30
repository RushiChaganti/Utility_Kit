document.getElementById("openAddons").addEventListener("click", async () => {
  try {
    await browser.tabs.create({ url: "about:addons" });
  } catch (_) {
    // Fallback (very old builds): tell user what to do
    alert("Open about:addons → Extensions → ⚙ → Manage Extension Shortcuts");
  }
});
