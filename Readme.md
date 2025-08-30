# Close & Forget Tab (Stealth Edition)

A lightweight Chrome/Firefox extension that lets you **close a tab and instantly forget it** — clearing 1 minute of history — as if it was never opened.

We named it **Utility Kit** by default to make the extension look **stealthy and generic**.

---

## ✨ Features

- **Close & Forget**: One click wipes a tab’s browsing data after closing.
- **Stealth Mode**: Shows up as **Utility Kit** in the extension list.
- **Custom Labeling**: Inside the popup, users can rename the extension title and buttons to fit their cover story.
- **Keyboard Shortcuts**: Assign a hotkey to instantly close & forget a tab.

---

## 📂 Project Structure

```

C:\Projects\stealth\_close
├── chrome\_edition
│   ├── background.js
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── icons/
│
├── firefox\_edition
│   ├── background.js
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── icons/
│
└── Readme.md
└── LICENSE
```

---

## 🚀 Setup & Installation

### 🔹 Chrome / Brave / Edge (Chromium browsers)

1. Open your browser and go to:

```

chrome://extensions

```

2. Enable **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the `chrome_edition` folder.
5. The extension will now appear as **Utility Kit**.

---

### 🔹 Firefox

1. Open Firefox and go to:

```

about\:debugging#/runtime/this-firefox

```

2. Click **Load Temporary Add-on**.
3. Select the `manifest.json` inside `firefox_edition`.
4. The extension will now appear as **Utility Kit**.

---

## ⌨️ Setting Up Shortcuts

### Chrome / Brave / Edge

1. Go to:

```

chrome://extensions/shortcuts

```

2. Find **Utility Kit**.
3. Under **Close & Forget**, click the box and press your desired shortcut (e.g. `Alt+Shift+W`).

---

### Firefox

1. Go to:

```

about:addons

```

2. Click the ⚙️ (gear) icon → **Manage Extension Shortcuts**.
3. Find **Utility Kit**.
4. Assign a shortcut (e.g. `Alt+Shift+W`) for **Close & Forget**.

---

## 🛠️ Usage

1. Open the extension popup.
2. (Optional) Set a **custom display name** inside the popup for stealth.
3. Use the button or hotkey to instantly **close & forget** the current tab.

---

## 📜 License

MIT License. Free to use and modify.




