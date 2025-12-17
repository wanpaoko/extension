chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "INJECTION_DETECTED") {
    chrome.action.setBadgeText({
      text: "!",
      tabId: sender.tab.id
    });
    chrome.action.setBadgeBackgroundColor({
      color: "#FF0000",
      tabId: sender.tab.id
    });
    // Store details to show in popup
    chrome.storage.local.set({
      [`status_${sender.tab.id}`]: {
        safe: false,
        patterns: message.patterns
      }
    });
  } else if (message.type === "SAFE") {
    chrome.action.setBadgeText({
      text: "",
      tabId: sender.tab.id
    });
    chrome.storage.local.set({
      [`status_${sender.tab.id}`]: {
        safe: true
      }
    });
  }
});
