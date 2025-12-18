// Pattern descriptions in Chinese
const PATTERN_DESCRIPTIONS = {
  '/ignore\\s+(all\\s+)?previous\\s+instructions/i': '忽略先前指令',
  '/forget\\s+(all\\s+)?previous\\s+instructions/i': '遺忘先前指令',
  '/ignore\\s+system\\s+prompt/i': '忽略系統提示',
  '/you\\s+are\\s+now\\s+DAN/i': 'DAN 角色注入',
  '/do\\s+anything\\s+now/i': 'DAN 越獄攻擊',
  '/start\\s+with\\s+the\\s+following\\s+python\\s+code/i': 'Python 代碼注入',
  '/system\\s+overridden/i': '系統覆蓋攻擊'
};

document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab) return;

  chrome.storage.local.get([`status_${tab.id}`], (result) => {
    const data = result[`status_${tab.id}`];
    const statusDiv = document.getElementById('status');
    const detailsDiv = document.getElementById('details');
    const list = document.getElementById('pattern-list');

    if (data && !data.safe) {
      statusDiv.textContent = "⚠️ 偵測到潛在注入攻擊";
      statusDiv.className = "status warning";
      detailsDiv.style.display = "block";

      list.innerHTML = "";
      data.patterns.forEach(p => {
        const li = document.createElement('li');
        const description = PATTERN_DESCRIPTIONS[p] || p;
        li.textContent = description;
        list.appendChild(li);
      });
    } else {
      statusDiv.textContent = "✅ 未偵測到威脅";
      statusDiv.className = "status safe";
      detailsDiv.style.display = "none";
    }
  });
});
