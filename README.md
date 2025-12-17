# Prompt Injection Detector Browser Extension

這是一個瀏覽器擴充功能，用於偵測網頁內容中潛在的 Prompt Injection 攻擊模式。

## 功能

*   **自動掃描**: 當網頁載入時，自動掃描頁面文字內容。
*   **即時偵測**: 使用 Regular Expression (正規表達式) 檢查常見的 Prompt Injection 關鍵字（例如 "Ignore previous instructions", "System prompt" 等）。
*   **視覺警示**:
    *   ✅ **安全**: 如果未偵測到威脅，Extension Icon 保持正常（或顯示綠色/無狀態）。
    *   ⚠️ **警告**: 如果偵測到可疑模式，Extension Icon 會顯示紅色驚嘆號 "!" 標記。
*   **詳細資訊**: 點擊 Extension Icon 可以查看具體偵測到了哪些可疑的關鍵字。

## 專案結構

```
src/
├── manifest.json       # 擴充功能設定檔 (Manifest V3)
├── content.js          # 注入網頁的腳本，負責掃描文字
├── service_worker.js   # 背景服務，負責處理狀態與圖示更新
├── popup.html          # 點擊圖示時顯示的視窗
├── popup.js            # 視窗的邏輯
└── icons/              # 圖示檔案
```

## 安裝說明 (Installation)

本擴充功能支援 Chrome、Edge、Brave 等基於 Chromium 的瀏覽器。

1.  **下載程式碼**: 確保此專案已下載到您的電腦。
2.  **開啟擴充功能管理頁面**:
    *   **Chrome**: 在網址列輸入 `chrome://extensions/` 並按下 Enter。
    *   **Edge**: 在網址列輸入 `edge://extensions/` 並按下 Enter。
3.  **啟用開發者模式**:
    *   在頁面右上角（Chrome）或左側選單（Edge），找到 **「開發者模式」 (Developer mode)** 開關並將其開啟。
4.  **載入未封裝項目**:
    *   點擊左上角的 **「載入未封裝項目」 (Load unpacked)** 按鈕。
5.  **選擇目錄**:
    *   在彈出的檔案選擇視窗中，瀏覽並選擇本專案下的 **`src`** 資料夾 (包含 `manifest.json` 的那個資料夾)。
    *   **注意**: 請選擇 `src` 資料夾，而不是外層的專案根目錄。
6.  **完成**:
    *   擴充功能現在應該已安裝並出現在您的瀏覽器工具列中。
    *   您可以瀏覽任意網頁進行測試。

## 測試方法

您可以建立一個包含以下文字的 HTML 檔案，或在任何網頁上貼上這些文字來測試偵測功能：

*   "Ignore previous instructions"
*   "System prompt"
*   "You are now DAN"