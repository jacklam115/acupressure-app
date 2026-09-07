/* install-prompt.js — "Add to Home Screen" bottom banner + tutorial modal.
   Style & behaviour modelled on the KillBill HK parking app (killbillhk.com):
   - bottom install banner on mobile browsers (auto-appears after delay, auto-hides)
   - 教學 tutorial modal with per-OS numbered steps (iOS Safari / Android Chrome)
   - 安裝 button uses the native Android beforeinstallprompt when available
   - ✕ dismiss: cooldown 7 days, max 3 skips; progress bar auto-hide ~60 s
   Load AFTER app.js (uses APP.lang). */
(function () {
  var SKIP_KEY = 'acup_install_skip';
  var UNTIL_KEY = 'acup_install_until';
  var MAX_SKIP = 3;
  var COOLDOWN_MS = 7 * 24 * 3600 * 1000;
  var SHOW_DELAY = 15000;      // ms after load before banner appears
  var AUTO_HIDE_MS = 60000;    // banner auto-hide duration (progress bar)

  var UA = navigator.userAgent;
  var isIOS = /iPad|iPhone|iPod/.test(UA);
  var isMobile = /Android|iPad|iPhone|iPod|Mobile/.test(UA);
  var isAndroid = /Android/.test(UA);
  var standalone = window.matchMedia && matchMedia('(display-mode: standalone)').matches;
  var isChrome = /Chrome|CriOS/.test(UA);
  var deferredPrompt = null;

  function L(zh, en) { return (typeof APP !== 'undefined' && APP.lang === 'en') ? en : zh; }
  function $(s) { return document.querySelector(s); }

  function dismissed() {
    try {
      var until = parseInt(localStorage.getItem(UNTIL_KEY) || '0', 10);
      if (Date.now() < until) return true;
      if (parseInt(localStorage.getItem(SKIP_KEY) || '0', 10) >= MAX_SKIP) return true;
    } catch (e) {}
    return false;
  }
  function markDismissed() {
    try {
      localStorage.setItem(SKIP_KEY, String((parseInt(localStorage.getItem(SKIP_KEY) || '0', 10) || 0) + 1));
      localStorage.setItem(UNTIL_KEY, String(Date.now() + COOLDOWN_MS));
    } catch (e) {}
  }

  var css = 'acup-ip{position:fixed;left:0;right:0;bottom:0;z-index:9999;font-family:-apple-system,"PingFang TC","Segoe UI",sans-serif}'
    + 'acup-ip .ip-banner{background:#2A2A2E;color:#fff;padding:12px 16px;display:flex;align-items:center;gap:10px;box-shadow:0 -6px 20px rgba(0,0,0,.18);animation:ipUp .35s ease}'
    + 'acup-ip .ip-emoji{font-size:26px;line-height:1}'
    + 'acup-ip .ip-copy{flex:1;min-width:0}'
    + 'acup-ip .ip-t1{font-size:13.5px;font-weight:800}'
    + 'acup-ip .ip-t2{font-size:11px;color:#C9C9CF;margin-top:1px}'
    + 'acup-ip button{font:inherit}'
    + 'acup-ip .ip-go{background:#E8728A;color:#fff;border:none;border-radius:9px;padding:8px 13px;font-size:12.5px;font-weight:800;cursor:pointer;white-space:nowrap}'
    + 'acup-ip .ip-x{background:none;border:none;color:#C9C9CF;font-size:15px;cursor:pointer;padding:6px}'
    + 'acup-ip .ip-bar{height:3px;background:rgba(255,255,255,.18);overflow:hidden}'
    + 'acup-ip .ip-bar i{display:block;height:100%;background:#E8728A;width:100%;transition:width ' + AUTO_HIDE_MS + 'ms linear}'
    + '@keyframes ipUp{from{transform:translateY(100%)}to{transform:translateY(0)}}'
    + 'acup-ip .ip-mask{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:18px;z-index:10000}'
    + 'acup-ip .ip-box{background:#fff;border-radius:18px;padding:20px;max-width:340px;width:100%;animation:ipUp .3s ease;max-height:86vh;overflow:auto}'
    + 'acup-ip .ip-h{font-size:16px;font-weight:900;margin:0 0 4px;color:#2A2A2E}'
    + 'acup-ip .ip-sub{font-size:12.5px;color:#909096;margin:0 0 12px}'
    + 'acup-ip .ip-step{display:flex;gap:10px;align-items:flex-start;margin:9px 0}'
    + 'acup-ip .ip-num{width:24px;height:24px;border-radius:50%;background:#E8728A;color:#fff;font-weight:900;font-size:12.5px;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px}'
    + 'acup-ip .ip-step p{margin:0;font-size:13px;line-height:1.55;color:#2A2A2E}'
    + 'acup-ip .ip-step b{color:#C94F6B}'
    + 'acup-ip .ip-note{margin-top:12px;background:#F7F7F9;border-radius:10px;padding:10px 12px;font-size:11.5px;color:#6E6E76}'
    + 'acup-ip .ip-ben{margin-top:10px;font-size:12.5px;color:#2A2A2E;font-weight:700}'
    + 'acup-ip .ip-ok{width:100%;margin-top:14px;padding:12px;background:#E8728A;color:#fff;border:none;border-radius:12px;font-weight:900;font-size:14px;cursor:pointer}'
    + 'acup-ip .ip-x2{position:absolute;top:10px;right:12px;background:none;border:none;font-size:17px;color:#B9AEB2;cursor:pointer}';

  function inject() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
    var host = document.createElement('acup-ip');
    document.body.appendChild(host);
    return host;
  }

  function showBanner(host) {
    var iosT1 = L('像 App 一樣使用按壓減壓', 'Use Press & De-stress like an app');
    var iosT2 = L('加入主畫面，一鍵開啟，全螢幕使用', 'Add to Home Screen — opens full screen in one tap');
    var teach = L('教學', 'Guide');
    var installTxt = L('安裝', 'Install');
    var xLabel = L('暫時不安裝', 'Not now');
    host.innerHTML = '<div class="ip-banner">'
      + '<span class="ip-emoji">🚀</span>'
      + '<div class="ip-copy"><div class="ip-t1">' + iosT1 + '</div><div class="ip-t2">' + iosT2 + '</div></div>'
      + (isIOS ? '' : '<button class="ip-go" data-act="install">' + installTxt + '</button>')
      + '<button class="ip-go" data-act="teach">' + teach + '</button>'
      + '<button class="ip-x" data-act="x" aria-label="' + xLabel + '">✕</button></div>'
      + '<div class="ip-bar"><i></i></div>';

    host.querySelector('[data-act="teach"]').onclick = function () { showModal(host); };
    var iBtn = host.querySelector('[data-act="install"]');
    if (iBtn) iBtn.onclick = function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function () { deferredPrompt = null; hideBanner(host); });
      } else { showModal(host); }
    };
    host.querySelector('[data-act="x"]').onclick = function () { markDismissed(); hideBanner(host); };

    // auto-hide progress bar -> hide at AUTO_HIDE_MS
    requestAnimationFrame(function () {
      var bar = host.querySelector('.ip-bar i');
      if (bar) { bar.style.width = '0%'; }
    });
    setTimeout(function () { hideBanner(host); }, AUTO_HIDE_MS);
  }
  function hideBanner(host) {
    var b = host.querySelector('.ip-banner');
    if (b) { b.style.transition = 'opacity .3s'; b.style.opacity = '0'; }
    setTimeout(function () { host.innerHTML = ''; }, 350);
  }

  function showModal(host) {
    var t = L('加入主畫面', 'Add to Home Screen');
    var sub = L('一鍵開啟應用程式，體驗更快、更流暢（全螢幕）', 'Open the app in one tap — faster and smoother (full screen)');
    var ben = L('加入後你可以：', 'After installing, you can:');
    var ben1 = L('⚡ 一鍵開啟，像原生 App 一樣（無瀏覽器工具列）', '⚡ Open it like a native app (no browser toolbar)');
    var ok = L('知道了！', 'Got it!');
    var unsupported = L('請使用 Safari (iOS) 或 Chrome (Android) 安裝此應用程式。', 'Please install this app from Safari (iOS) or Chrome (Android).');

    var steps = '';
    if (isIOS) {
      steps = step(1, L('在 Safari 底部點擊', 'At the bottom of Safari, tap the') + ' <b>' + L('分享按鈕', 'Share button') + '</b> ' + L('（⬆️ 這個按鈕）', '(⬆️ this button)'))
        + step(2, L('向下滑動，找到', 'Scroll down and find') + ' <b>' + L('「加入主畫面」', '"Add to Home Screen"') + '</b>')
        + step(3, L('點擊右上角', 'Tap') + ' <b>' + L('「新增」', '"Add"') + '</b> ' + L('（右上角）', '(top right)'));
    } else if (isAndroid) {
      steps = step(1, L('在 Chrome 右上角點擊', 'At the top right of Chrome, tap the') + ' <b>' + L('選單', 'menu') + '</b> ' + L('（⋮ 這個按鈕）', '(⋮ this button)'))
        + step(2, L('選擇', 'Choose') + ' <b>' + L('「加到主畫面」或「安裝應用程式」', '"Add to Home screen" or "Install app"') + '</b>')
        + step(3, L('點擊', 'Tap') + ' <b>' + L('「安裝」', '"Install"') + '</b>');
    } else {
      steps = '<p style="font-size:13px;color:#5A5A60;">' + unsupported + '</p>';
    }

    var mask = document.createElement('div');
    mask.className = 'ip-mask';
    mask.innerHTML = '<div class="ip-box">'
      + '<button class="ip-x2" aria-label="' + L('關閉', 'Close') + '">✕</button>'
      + '<p class="ip-h">' + t + '</p>'
      + '<p class="ip-sub">' + sub + '</p>'
      + steps
      + '<div class="ip-note">' + L('提示：', 'Tip: ') + ben1 + '</div>'
      + '<div class="ip-ben">' + ben + '</div>'
      + '<button class="ip-ok">' + ok + '</button>'
      + '</div>';
    host.appendChild(mask);
    mask.querySelector('.ip-ok').onclick = function () { mask.remove(); };
    mask.querySelector('.ip-x2').onclick = function () { mask.remove(); };
  }
  function step(n, html) {
    return '<div class="ip-step"><span class="ip-num">' + n + '</span><p>' + html + '</p></div>';
  }

  function init() {
    if (!isMobile || standalone || dismissed()) return;
    var host = inject();

    if (isAndroid) {
      window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPrompt = e;
        setTimeout(function () { showBanner(host); }, SHOW_DELAY);
      });
      // Android without the event (e.g., unsupported browser) -> still offer guide
      setTimeout(function () {
        if (!deferredPrompt && !host.children.length) showBanner(host);
      }, SHOW_DELAY + 4000);
    } else if (isIOS) {
      setTimeout(function () { showBanner(host); }, SHOW_DELAY);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
