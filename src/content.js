// Common Prompt Injection Patterns
const PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /forget\s+(all\s+)?previous\s+instructions/i,
  /ignore\s+system\s+prompt/i,
  /you\s+are\s+now\s+DAN/i,
  /do\s+anything\s+now/i,
  /start\s+with\s+the\s+following\s+python\s+code/i,
  /system\s+overridden/i
];

function scanPage() {
  const bodyText = document.body.innerText;
  let found = false;
  let detectedPatterns = [];

  PATTERNS.forEach((pattern) => {
    if (pattern.test(bodyText)) {
      found = true;
      detectedPatterns.push(pattern.toString());
    }
  });

  // Check if extension context is still valid
  if (!chrome.runtime?.id) {
    return;
  }

  try {
    if (found) {
      chrome.runtime.sendMessage({
        type: "INJECTION_DETECTED",
        patterns: detectedPatterns
      });
    } else {
      chrome.runtime.sendMessage({
        type: "SAFE"
      });
    }
  } catch (error) {
    // Extension context invalidated, stop observing
    if (error.message.includes('Extension context invalidated')) {
      observer.disconnect();
    }
  }
}

// Optional: Observe changes for dynamic content (SPA)
let observer;

// Only initialize if extension context is valid
if (chrome.runtime?.id) {
  // Initial scan
  scanPage();

  observer = new MutationObserver(() => {
    scanPage();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });
}
