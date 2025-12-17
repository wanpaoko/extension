document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  if (!tab) return;

  chrome.storage.local.get([`status_${tab.id}`], (result) => {
    const data = result[`status_${tab.id}`];
    const statusDiv = document.getElementById('status');
    const detailsDiv = document.getElementById('details');
    const list = document.getElementById('pattern-list');

    if (data && !data.safe) {
      statusDiv.textContent = "⚠️ Potential Injection Detected";
      statusDiv.className = "status warning";
      detailsDiv.style.display = "block";
      
      list.innerHTML = "";
      data.patterns.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        list.appendChild(li);
      });
    } else {
      statusDiv.textContent = "✅ No Threats Detected";
      statusDiv.className = "status safe";
      detailsDiv.style.display = "none";
    }
  });
});
