// Helper function to set icon color
function setIconColor(tabId, color) {
  chrome.action.setIcon({
    tabId: tabId,
    path: {
      "16": `icons/icon16_${color}.png`,
      "48": `icons/icon48_${color}.png`,
      "128": `icons/icon128_${color}.png`
    }
  }).catch(error => {
    // Ignore errors for invalid tabs (closed tabs, special pages, etc.)
    if (!error.message.includes('No tab with id')) {
      console.error('Failed to set icon:', error);
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 确保消息来自有效的标签页
  if (!sender.tab || !sender.tab.id) {
    return;
  }

  if (message.type === "INJECTION_DETECTED") {
    // 设置红色图标
    setIconColor(sender.tab.id, 'red');

    chrome.action.setBadgeText({
      text: "!",
      tabId: sender.tab.id
    }).catch(() => {});

    chrome.action.setBadgeBackgroundColor({
      color: "#D32F2F",
      tabId: sender.tab.id
    }).catch(() => {});

    // Store details to show in popup
    chrome.storage.local.set({
      [`status_${sender.tab.id}`]: {
        safe: false,
        patterns: message.patterns
      }
    });
  } else if (message.type === "SAFE") {
    // 设置绿色图标
    setIconColor(sender.tab.id, 'green');

    chrome.action.setBadgeText({
      text: "",
      tabId: sender.tab.id
    }).catch(() => {});

    chrome.storage.local.set({
      [`status_${sender.tab.id}`]: {
        safe: true
      }
    });
  }
});

// 当标签页更新时，重置为灰色图标
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 只在页面开始加载且不是特殊页面时设置灰色图标
  if (changeInfo.status === 'loading' && tab.url && !tab.url.startsWith('chrome://')) {
    setIconColor(tabId, 'gray');
  }
});
