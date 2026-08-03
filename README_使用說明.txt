# 按壓減壓・月經穴位按壓計劃（Web App）

一個用嚟做「月經穴位按壓減壓研究計劃」嘅手機網頁 App prototype。
所有檔案都係靜態 HTML/CSS/JS，**唔使安裝任何嘢**，複製去邊度都行到。

---

## 📁 檔案結構

| 檔案 | 用途 |
|---|---|
| `index.html` | 首頁（計劃簡介）|
| `program.html` | 按壓計劃（protocol 跟住做）|
| `acupoints.html` | 穴位教學 |
| `quiz.html` | 小測驗（鞏固學習）|
| `research.html` | 研究資料 |
| `style.css` | 全部頁面嘅樣式 |
| `app.js` | 互動功能 |

---

## 🚀 3 個用法（由簡單到進階）

### 方法 1：自己電腦/手機睇（最簡單）
1. 解壓 ZIP
2. **雙擊 `index.html`** → 瀏覽器自動開到
3. 手機都想睇？將成個 folder 傳去手機（AirDrop/WhatsApp/藍牙），用任何檔案管理 app 開 `index.html` 就得

### 方法 2：上網俾人睇（免費，推薦）
- **Netlify Drop**（最簡單）：開 `https://app.netlify.com/drop` → 登入（可以用 Google/GitHub 帳號）→ **將成個 folder 直接拖入去** → 即刻有條永久網址（`xxx.netlify.app`）
- **GitHub Pages**：開 GitHub 帳號 → 開新 repo → 上傳檔案 → Settings → Pages → 揀 main branch → 有條 `xxx.github.io` 網址
- **Vercel**：開 `vercel.com` → 拖 folder 入去都得

### 方法 3：用 VM / 隧道（進階，要識 Linux）
如果你想將佢放喺雲端伺服器：
```bash
# 將檔案放去 /home/ubuntu/try1_site/
python3 -m http.server 8090 --directory /home/ubuntu/try1_site
# 再開 tunnel 俾人 access
ssh -R 80:localhost:8090 serveo.net
```

---

## ✏️ 點改內容

- 所有文字直接喺 HTML 檔案度改（用記事本/VS Code 開就得，揾到啲字改咗佢）
- 顏色/字型喺 `style.css` 改
- 改完儲存 → 重新開 `index.html` 就見到新版本

---

## 📌 提示

- 個 app 係 **research prototype**，正式研究使用前請同 supervisor 確認內容同流程
- 穴位按壓教學內容請確保同你哋已驗證嘅 protocol 一致（唔好自己加穴位）
