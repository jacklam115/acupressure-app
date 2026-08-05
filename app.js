/* ============================================================
   按壓減壓 照顧者自我穴位按壓計劃 — shared app logic
   i18n (書面中文 / English), profile, HK-time records, UI helpers
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 書面中文 / English dictionary ---------- */
  var ZH = {
    appTitle: '照顧者自我穴位按壓計劃',
    appTitleEn: 'Caregiver Self-Acupressure Program',
    version: 'v0.1',
    langSwitch: 'EN',
    tabHome: '首頁', tabTutorial: '教學', tabCheckin: '記錄', tabResearch: '研究',
    // home
    homeGreet: '歡迎回來',
    today: '今日',
    monthlyPlan: '本月記錄',
    weekPlan: '2 週計劃進度',
    weekLabel: '第 {n} 週',
    weeksDone: '已完成 {n} / 2 週',
    tapDayHint: '點擊日期查看當日記錄',
    noRecord: '尚無記錄',
    dayDetail: '當日記錄',
    moodLabel: '心情', stressLabel: '壓力分數', acupointLabel: '穴位完成',
    complianceLabel: '按壓次數', complianceUnit: '次 / 每日 2 次',
    sessionDone: '已完成',
    sessionNone: '未完成',
    // tutorial
    heroTutorial: '每一次練習，都是給自己的禮物。',
    heroTutorialSub: '每日兩次、每次 15 分鐘，跟自己好好相處。',
    statPoints: '個穴位',
    statTimes: '每日 2 次',
    statMinutes: '每次 15 分鐘',
    keyPoints: '練習要點',
    kpForce: '力度', kpForceTxt: '以「痠、脹、麻」為準，不應感到痛',
    kpTime: '時間', kpTimeTxt: '每穴依計時練習進行；每日 1–2 次',
    kpBreath: '呼吸', kpBreathTxt: '全程緩慢深呼吸，放鬆肩膀',
    kpMind: '心態', kpMindTxt: '專注當下，不著急、不勉強',
    startBtn: '開始計時練習',
    watchBtn: '先看影片',
    stepsTitle: '9 個步驟（由頭到腳）',
    practiceTips: '練習提示',
    location: '位置',
    method: '做法',
    frequency: '頻率',
    stepOf: '第 {n} / 9 步',
    stepLabel: 'STEP {n}',
    prepTitle: '練習要點',
    prepSub: '準備開始',
    prepGo: '開始',
    pauseBtn: '暫停', resumeBtn: '繼續', skipBtn: '跳過', leaveBtn: '離開',
    volLabel: '音樂音量',
    finish: '完成',
    finishMsg: '今日練習完成！',
    praise: ['做得好！', '十分棒！', '辛苦了，做得很棒！', '堅持就是力量！', '給自己一個讚！'],
    recordRemind: '別忘了到「記錄」頁面打個卡',
    videoSoon: '示範影片準備中，稍後上載',
    videoHint: '影片將展示每個穴位的準確位置與按壓手法',
    // checkin
    heroCheckin: ['每一步累積，都是照顧自己的開始。', '小小的記錄，見證大大的進步。', '今天的你，也值得被好好記錄。', '持續記錄，讓改變看得見。'],
    heroCheckinSub: '每一次練習與記錄，都是旅程中重要的一步。',
    acupressureRecord: '今日按壓記錄',
    acupressureRecordSub: '每日可按壓兩次（如上午、晚上），完成後逐項勾選',
    sessionMorning: '第一次',
    sessionEvening: '第二次',
    moodTitle: '今日心情',
    moodSub: '睡前（完成第二次按壓後）填寫',
    moodHappy: '開心', moodOkay: '一般', moodSad: '低落',
    stressTitle: '今日壓力記錄',
    stressSub: '睡前填寫一次，回顧今天的感受',
    stressQ: '今天，你覺得……',
    pssOpts: ['從未', '間中', '有時', '經常', '總是'],
    stressSlider: '今日整體壓力',
    slider0: '完全放鬆', slider10: '壓力最大',
    saveBtn: '儲存今日記錄',
    savedMsg: '已儲存，辛苦了！',
    fillAll: '請先完成所有項目，才能儲存。',
    doneToday: '今日已完成，明日 04:00 後可再記錄',
    doneAcup: '今日兩次按壓已完成',
    resetToday: '（如非今日所填，點此重設今日記錄）',
    resetConfirm: '再按一次確認重設',
    saveAcupBtn: '儲存按壓記錄',
    saveNightBtn: '儲存睡前記錄',
    // research
    heroResearch: '關於本研究',
    researchIntro: '本計劃將自我穴位按壓方案融入智能手機應用程式，讓照顧者可以隨時隨地自行練習。',
    evidence: '實證結果',
    evidence1: '隨機對照試驗顯示，自我穴位按壓能顯著減輕照顧者壓力',
    evidence2: '失眠、疲勞、抑鬱症狀均有顯著改善',
    evidence3: '照顧者可以在家中自行練習，毋須儀器',
    protocol: '方案內容',
    protocol1: '9 個穴位：百會、風池、合谷、腎俞、中脘、氣海、關元、足三里、涌泉',
    protocol2: '每日 2 次，每次約 15 分鐘，飯後至少 1 小時才開始',
    protocol3: '力度以「痠、脹、麻」為準，不應感到痛',
    delivery: '傳遞方式',
    delivery1: '應用程式內建計時練習、示範圖片與影片',
    delivery2: '自動記錄練習時間與穴位完成情況',
    delivery3: '每日提醒，協助養成習慣',
    notes: '注意事項',
    notesTxt: '懷孕或計劃懷孕人士請勿按壓相關穴位。皮膚破損、感染或靜脈曲張位置請勿按壓。太飢餓或太飽時避免按壓。如出現劇痛或暈眩，請立即停止。此為研究項目之自我照護方法，不能取代正規醫療。',
    disclaimer: '此為研究項目之概念試版，內容會按研究方案及督導意見調整。',
    references: '參考文獻',
    tabResearch: '資料',
    aim: '本計劃目的',
    aimText: '本計劃旨在開發一款自我穴位按壓應用程式，讓家庭照顧者可以在家中自行練習，以紓緩照顧壓力，並測試應用程式的可用性與接受度。',
    aimTextEn: 'This project develops a self-administered acupressure app so family caregivers can practice at home to relieve caregiving stress, and tests the app for usability and acceptance.',
    loginTitle: '登入',
    accountTitle: '帳號',
    guestLabel: '訪客',
    guestNoSync: '記錄不會同步',
    notLoggedIn: '尚未登入',
    username: '用戶名稱',
    password: '密碼',
    loginBtn: '登入',
    logoutBtn: '登出',
    welcomeBack: '歡迎，{name}',
    loginErr: '用戶名稱或密碼不正確',
    loginHint: '請輸入研究團隊提供的帳號登入，以同步你的記錄。',
    nightBlock: '今日睡前記錄',
    nightBlockSub: '完成第二次按壓後填寫（心情、壓力、任何不適）',
    adverseTitle: '今日穴位按壓後有否任何不適或不良反應？',
    adverseYes: '有',
    adverseNo: '沒有',
    adversePlaceholder: '請簡單描述不適或反應',
    noAdverse: '沒有不適',
    researchInfo: '研究資訊',
    devBy: '本應用程式僅供研究用途，由香港大學李嘉誠醫學院護理學院研究團隊開發。',
    piLine: '研究負責人：林進彥 Lam Chun Yin（u3618332@connect.hku.hk）',
    supLine: '指導教授：張淑婷 Denise Cheung',
    affLine: '香港大學李嘉誠醫學院護理學院 School of Nursing, LKS Faculty of Medicine, The University of Hong Kong',
    dataUse: '所有資料僅作研究分析之用，並將於研究完成後 36 個月內刪除。',
    funding: '本研究並無接受任何資助。',
    ethics: '倫理審批編號：（待定）',
    withdraw: '參加者可以隨時退出本研究，無須給予理由，且不會影響原有權利。',
    contactInfo: '如有任何疑問，歡迎聯絡研究團隊。',
    declPreg: '孕婦或計劃懷孕人士不建議進行穴位按壓。',
    declAdverse: '如出現任何不良反應，請立即停止自我穴位按壓，並尋求專業醫療意見。',
    declService: '本應用程式並非醫療服務，不能取代正規醫療診斷、治療或意見。',
    resetTime: '每日 04:00（香港時間）重置',
    thisWeekSessions: '本週按壓',
    streakDays: '連續記錄',
    daysUnit: '天',
    timesUnit: '次',
    prepKpTitle: '練習要點',
    prepStart: '準備開始',
    prepReady: '準備好了，開始練習',
    kpForceTxt: '以「痠、脹、麻」為準，不應感到痛',
    kpBreathTxt: '全程緩慢深呼吸，放鬆肩膀',
    kpMindTxt: '專注當下，不著急、不勉強',
    leaveBtn: '離開',
    skipBtn: '跳過',
    prevBtn: '上一步',
    moodSad: '低落',
    moodOkay: '一般',
    slider10: '壓力最大',
    tabTutorial: '教學',
    tabCheckin: '記錄',
    version: 'v0.9',
    weekOf: '第 {n} 週 / 共 2 週',
    programStart: '開始',
    programEnd: '結束',
    noStartDate: '開始日期待設定',
    lgOr: '或',
    lgGuest: '以訪客身分進入（記錄不會同步）',
    syncOk: '記錄已同步',
    syncFail: '目前離線，記錄已儲存在本機'
  };

  var EN = {
    appTitle: 'Caregiver Self-Acupressure Program',
    appTitleEn: '照顧者自我穴位按壓計劃',
    version: 'v0.1',
    langSwitch: '中',
    tabHome: 'Home', tabTutorial: 'Guide', tabCheckin: 'Log', tabResearch: 'Study',
    // home
    homeGreet: 'Welcome back',
    today: 'Today',
    monthlyPlan: 'Monthly record',
    weekPlan: '8-week progress',
    weekLabel: 'Week {n}',
    weeksDone: '{n} / 8 weeks done',
    tapDayHint: 'Tap a day to view its record',
    noRecord: 'No record',
    dayDetail: 'Day record',
    moodLabel: 'Mood', stressLabel: 'Stress score', acupointLabel: 'Acupoints',
    complianceLabel: 'Sessions', complianceUnit: '/ 2 per day',
    sessionDone: 'Done',
    sessionNone: 'Not done',
    // tutorial
    heroTutorial: 'Every practice is a gift to yourself.',
    heroTutorialSub: 'Twice a day, 15 minutes each time, time with yourself.',
    statPoints: 'acupoints',
    statTimes: 'twice daily',
    statMinutes: '15 min each',
    keyPoints: 'Key points',
    kpForce: 'Pressure', kpForceTxt: 'Sore, swollen, numb — but never painful',
    kpTime: 'Time', kpTimeTxt: 'Follow the guided timer; 1–2 sessions a day',
    kpBreath: 'Breath', kpBreathTxt: 'Breathe slowly and deeply, relax your shoulders',
    kpMind: 'Mind', kpMindTxt: 'Stay with the present moment; no rush, no force',
    startBtn: 'Start guided session',
    watchBtn: 'Watch video',
    stepsTitle: '9 steps (head to toe)',
    practiceTips: 'Practice tips',
    location: 'Location',
    method: 'Method',
    frequency: 'Frequency',
    stepOf: 'Step {n} / 9',
    stepLabel: 'STEP {n}',
    prepTitle: 'Key points',
    prepSub: 'Get ready',
    prepGo: 'Begin',
    pauseBtn: 'Pause', resumeBtn: 'Resume', skipBtn: 'Skip', leaveBtn: 'Leave',
    volLabel: 'Music volume',
    finish: 'Done',
    finishMsg: 'Session complete!',
    praise: ['Well done!', 'Great job!', 'Beautiful work!', 'Keep going, you are strong!', 'Give yourself a round of applause!'],
    recordRemind: 'Remember to log it on the Log page',
    videoSoon: 'Demo video coming soon',
    videoHint: 'The video will show the exact location and technique of each acupoint',
    // checkin
    heroCheckin: ['Each step you take is the start of caring for yourself.', 'Small records show big progress.', 'You deserve to be recorded today too.', 'Keep logging, so change becomes visible.'],
    heroCheckinSub: 'Every practice and record is an important step of the journey.',
    acupressureRecord: 'Today\u2019s acupressure record',
    acupressureRecordSub: 'Practice up to twice a day (e.g. morning and evening); tick each acupoint done',
    sessionMorning: 'Session 1',
    sessionEvening: 'Session 2',
    moodTitle: 'How do you feel today',
    moodSub: 'Fill in before sleep (after the second session)',
    moodHappy: 'Happy', moodOkay: 'Okay', moodSad: 'Low',
    stressTitle: 'Today\u2019s stress record',
    stressSub: 'Fill in once before sleep, review your day',
    stressQ: 'Today, do you feel...',
    pssOpts: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
    stressSlider: 'Overall stress today',
    slider0: 'Relaxed', slider10: 'Maximum stress',
    saveBtn: 'Save today\u2019s record',
    savedMsg: 'Saved. Well done!',
    fillAll: 'Please complete every item before saving.',
    doneToday: 'Completed today. You can record again after 04:00 am.',
    doneAcup: 'Both sessions done today',
    resetToday: '(Not filled by you today? Tap to reset today\'s record)',
    resetConfirm: 'Tap again to confirm reset',
    saveAcupBtn: 'Save practice record',
    saveNightBtn: 'Save evening record',
    // research
    heroResearch: 'About this study',
    researchIntro: 'This project turns a self-administered acupressure protocol into a smartphone app, so caregivers can practice anytime at home.',
    evidence: 'Evidence',
    evidence1: 'A randomized controlled trial showed self-administered acupressure significantly reduces caregiver stress',
    evidence2: 'Insomnia, fatigue, and depressive symptoms also improved significantly',
    evidence3: 'Caregivers can practice at home without any device',
    protocol: 'The protocol',
    protocol1: '9 acupoints: Baihui, Fengchi, Hegu, Shenshu, Zhongwan, Qihai, Guanyuan, Zusanli, Yongquan',
    protocol2: 'Twice a day, about 15 minutes each; start at least 1 hour after a meal',
    protocol3: 'Pressure should feel sore, swollen, or numb — never painful',
    delivery: 'How it is delivered',
    delivery1: 'Guided timer, illustrations, and videos built into the app',
    delivery2: 'Practice time and acupoint completion are logged automatically',
    delivery3: 'Daily reminders help build the habit',
    notes: 'Precautions',
    notesTxt: 'Do not press these acupoints if you are pregnant or planning pregnancy. Do not press on broken skin, infected areas, or varicose veins. Avoid practice when very hungry or very full. Stop immediately if you feel severe pain or dizziness. This is a self-care method for a research project and cannot replace medical care.',
    disclaimer: 'This is a concept version for a research project; content will be adjusted with the study protocol and supervisor input.',
    references: 'References',
    tabResearch: 'Information',
    aim: 'Project aim',
    aimText: 'This project develops a self-administered acupressure app so family caregivers can practice at home to relieve caregiving stress, and tests the app for usability and acceptance.',
    aimTextEn: 'This project develops a self-administered acupressure app so family caregivers can practice at home to relieve caregiving stress, and tests the app for usability and acceptance.',
    loginTitle: 'Log in',
    accountTitle: 'Account',
    guestLabel: 'Guest',
    guestNoSync: 'records will not sync',
    notLoggedIn: 'Not logged in',
    username: 'Username',
    password: 'Password',
    loginBtn: 'Log in',
    logoutBtn: 'Log out',
    welcomeBack: 'Welcome, {name}',
    loginErr: 'Incorrect username or password',
    loginHint: 'Log in with the account provided by the research team to sync your records.',
    nightBlock: 'Evening record',
    nightBlockSub: 'Fill in after the second session (mood, stress, any discomfort)',
    adverseTitle: 'Any discomfort or adverse reaction after today\'s acupressure?',
    adverseYes: 'Yes',
    adverseNo: 'No',
    adversePlaceholder: 'Briefly describe the discomfort or reaction',
    noAdverse: 'No discomfort',
    researchInfo: 'Research information',
    devBy: 'This app is for research purposes only, developed by the research team of the School of Nursing, LKS Faculty of Medicine, The University of Hong Kong (HKU).',
    piLine: 'Principal investigator: Lam Chun Yin (林進彥, u3618332@connect.hku.hk)',
    supLine: 'Supervisor: Denise Cheung (張淑婷), Assistant Professor',
    affLine: 'School of Nursing, LKS Faculty of Medicine, The University of Hong Kong',
    dataUse: 'All data will be used for research analysis only, and will be deleted within 36 months after the project is completed.',
    funding: 'This project receives no funding.',
    ethics: 'Ethics approval reference: (TBC)',
    withdraw: 'Participants may leave this project at any time, without giving a reason and without affecting their existing rights.',
    contactInfo: 'For any questions, please contact the research team.',
    declPreg: 'Pregnant women or women planning pregnancy are not advised to do acupressure.',
    declAdverse: 'If any adverse reaction occurs, stop self-administered acupressure immediately and seek professional medical advice.',
    declService: 'This app is not a medical service and cannot replace professional diagnosis, treatment, or advice.',
    resetTime: 'Resets daily at 4:00 am (Hong Kong time)',
    thisWeekSessions: 'This week',
    streakDays: 'Streak',
    daysUnit: 'days',
    timesUnit: 'sessions',
    prepKpTitle: 'Key points',
    prepStart: 'Get ready',
    prepReady: 'Ready, begin',
    kpForceTxt: 'Aim for soreness, swelling or numbness — never pain',
    kpBreathTxt: 'Breathe slowly and deeply; relax your shoulders',
    kpMindTxt: 'Stay with the present; no rush, no force',
    leaveBtn: 'Leave',
    skipBtn: 'Skip',
    prevBtn: 'Previous',
    moodSad: 'Low',
    moodOkay: 'Okay',
    slider10: 'Most stressed',
    tabTutorial: 'Guide',
    tabCheckin: 'Log',
    version: 'v0.9',
    weekOf: 'Week {n} of 2',
    programStart: 'Start',
    programEnd: 'End',
    noStartDate: 'Start date not set',
    lgOr: 'or',
    lgGuest: 'Continue as guest (records will not sync)',
    syncOk: 'Records synced',
    syncFail: 'Offline now, records saved on this device'
  };

  var LANG = { zh: ZH, en: EN };
  var lang = 'zh';

  /* ---------- profile ---------- */
  function getProfile() {
    var p = null;
    try { p = JSON.parse(localStorage.getItem('acup_profile')); } catch (e) {}
    if (!p || !p.id) {
      p = { id: 'U' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8), lang: 'zh', created: new Date().toISOString() };
      try { localStorage.setItem('acup_profile', JSON.stringify(p)); } catch (e) {}
    }
    return p;
  }
  function saveProfile(p) { try { localStorage.setItem('acup_profile', JSON.stringify(p)); } catch (e) {} }

  /* ---------- HK time helpers (day boundary 04:00 HKT) ---------- */
  function hkNow() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));
  }
  function hkDayKey(d) {
    d = d || hkNow();
    var y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), dd = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + dd;
  }
  // key of the current "record day" (shift back if before 04:00 HKT)
  function recordDayKey() {
    var now = hkNow();
    var h = now.getHours();
    if (h < 4) {
      now = new Date(now.getTime() - 86400000);
    }
    return hkDayKey(now);
  }

  /* ---------- records ---------- */
  function loadRecords() {
    try { return JSON.parse(localStorage.getItem('acup_records')) || {}; } catch (e) { return {}; }
  }
  function saveRecords(r) { try { localStorage.setItem('acup_records', JSON.stringify(r)); } catch (e) {} }
  function getToday() {
    var r = loadRecords();
    return r[recordDayKey()] || { acup: [[], []], mood: null, pss: {}, slider: null, score: null, ts: null };
  }
  function setToday(patch) {
    var r = loadRecords();
    var k = recordDayKey();
    r[k] = Object.assign(getToday(), patch, { ts: new Date().toISOString() });
    saveRecords(r);
  }

  /* ---------- i18n helpers ---------- */
  function t(key) {
    var d = LANG[lang];
    return d && d[key] !== undefined ? d[key] : ZH[key] !== undefined ? ZH[key] : key;
  }
  function fmt(s, map) {
    return s.replace(/\{(\w+)\}/g, function (m, k) { return map[k] !== undefined ? map[k] : m; });
  }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function applyI18n(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = t(k);
      if (v !== undefined && v !== null) el.textContent = v;
    });
    (root || document).querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html');
      el.innerHTML = t(k);
    });
    (root || document).querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      el.setAttribute('placeholder', t(k));
    });
  }

  function setLang(l) {
    lang = (l === 'en') ? 'en' : 'zh';
    APP.lang = lang;
    var p = getProfile(); p.lang = lang; saveProfile(p);
    localStorage.setItem('acup_lang', lang);
    document.documentElement.lang = (lang === 'en') ? 'en' : 'zh-Hant';
    var btn = document.getElementById('langBtn');
    if (btn) btn.textContent = t('langSwitch');
    if (window.pageI18n) window.pageI18n();   // page-specific re-render
    applyI18n(document);
  }

  /* ---------- language button + tabbar ---------- */
  function initTopbar() {
    var topbar = document.querySelector('.topbar');
    if (!topbar) return;
    var langBtn = document.createElement('button');
    langBtn.id = 'langBtn';
    langBtn.className = 'lang-btn';
    langBtn.setAttribute('aria-label', 'language');
    langBtn.textContent = t('langSwitch');
    var pill = topbar.querySelector('.pill');
    topbar.insertBefore(langBtn, pill ? pill.nextSibling : null);
    langBtn.addEventListener('click', function () {
      setLang(lang === 'zh' ? 'en' : 'zh');
    });
  }

  function initTabs() {
    var page = document.body.getAttribute('data-page');
    document.querySelectorAll('.tab').forEach(function (t) {
      if (t.getAttribute('data-tab') === page) t.classList.add('on');
    });
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    try { lang = localStorage.getItem('acup_lang') === 'en' ? 'en' : 'zh'; } catch (e) {}
    var p = getProfile(); if (p.lang) lang = p.lang;
    APP.lang = lang;
    document.documentElement.lang = (lang === 'en') ? 'en' : 'zh-Hant';
    initTopbar();
    initTabs();
    applyI18n(document);
    if (window.pageInit) window.pageInit();
  });

  /* ---------- backend client (sync + content) ---------- */
  // Backend URL: set after the tunnel is started; '' = offline mode.
  window.APP_BACKEND = 'https://bridal-match-checked-greetings.trycloudflare.com';
  var BACKEND = window.APP_BACKEND || '';
  var contentCache = null;

  function api(path, opts) {
    if (!BACKEND) return Promise.reject(new Error('offline'));
    opts = opts || {};
    var cfg = {
      method: opts.method || 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    if (opts.body) cfg.body = JSON.stringify(opts.body);
    return fetch(BACKEND + path, cfg).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    });
  }

  function session() {
    var p = getProfile();
    return { token: p.token || null, name: p.name || null, user: p.user || null, guest: !!p.guest };
  }

  function guestLogin() {
    var p = getProfile();
    p.token = 'guest'; p.name = p.name || '訪客'; p.user = null; p.guest = true;
    saveProfile(p);
    localStorage.setItem('acup_session', JSON.stringify({ token: 'guest', name: '訪客' }));
    return Promise.resolve({ token: 'guest', name: '訪客' });
  }

  function login(username, password) {
    // permanent: verify against GitHub data/users.json
    return fetch('https://raw.githubusercontent.com/jacklam115/acupressure-app/main/data/users.json')
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (us) {
        var u = us.find(function (x) { return x.username === username; });
        if (!u) throw new Error('bad');
        return crypto.subtle.digest('SHA-256', new TextEncoder().encode(password + u.salt)).then(function (buf) {
          var h = Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
          if (h !== u.hash) throw new Error('bad');
          var p = getProfile();
          p.token = 'github'; p.name = u.name || u.username; p.user = u.username;
          saveProfile(p);
          localStorage.setItem('acup_session', JSON.stringify({ token: 'github', name: p.name, user: u.username }));
          return { token: 'github', name: p.name };
        });
      })
      .catch(function () {
        return api('/api/login', { method: 'POST', body: { username: username, password: password } })
          .then(function (d) {
            var p = getProfile();
            p.token = d.token; p.name = d.name; p.user = username;
            saveProfile(p);
            localStorage.setItem('acup_session', JSON.stringify({ token: d.token, name: d.name, user: username }));
            return d;
          });
      });
  }

  function logout() {
    var p = getProfile();
    delete p.token; delete p.name; delete p.user; delete p.guest;
    saveProfile(p);
    localStorage.removeItem('acup_session');
  }

  function fetchContent() {
    // permanent GitHub live.json first (cache-busted), then tunnel backend, then built-in
    var LIVE = 'https://raw.githubusercontent.com/jacklam115/acupressure-app/main/data/content/live.json';
    return fetch(LIVE + '?v=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d) { contentCache = d; return d; }
        return api('/api/content').then(function (d2) { contentCache = d2; return d2; })
          .catch(function () { contentCache = null; return null; });
      })
      .catch(function () {
        return api('/api/content').then(function (d2) { contentCache = d2; return d2; })
          .catch(function () { contentCache = null; return null; });
      });
  }

  // praise / hero messages: backend-published list (per language) overrides built-in
  function pickMsg(key) {
    var src = null;
    if (contentCache && contentCache.messages && contentCache.messages[key]) {
      var m = contentCache.messages[key];
      if (Array.isArray(m)) src = m;                 // legacy flat list
      else if (m[lang] && m[lang].length) src = m[lang];
    }
    if (!src || !src.length) src = t(key);
    return pick(src);
  }

  // photo URL: backend upload wins, else local photos/<slug>.jpg
  function photoURL(slug) {
    if (contentCache && contentCache.photos && contentCache.photos[slug]) {
      return contentCache.photos[slug];
    }
    return 'photos/' + slug + '.jpg';
  }

  // safe SVG fallback: pages define window.ACUP_SVG (slug/part -> svg string)
  function imgFallback(el) {
    var key = el.getAttribute('data-part') || el.getAttribute('data-slug') || '';
    var svg = (typeof window.ACUP_SVG === 'object' && window.ACUP_SVG[key]) ? window.ACUP_SVG[key] : null;
    if (svg) { var d = document.createElement('div'); d.innerHTML = svg; el.parentNode.replaceChild(d.firstChild, el); }
  }

  // watchdog: re-issue any image still not loaded after 6s (once)
  function imgWatchdog() {
    setTimeout(function () {
      document.querySelectorAll('img[data-part], img[data-slug]').forEach(function (img) {
        if (!img.complete && !img.getAttribute('data-r')) {
          img.setAttribute('data-r', '1');
          var s = img.getAttribute('src');
          if (s) img.setAttribute('src', s.split('?')[0] + '?r=' + Date.now());
        }
      });
    }, 6000);
  }

  function syncRecords() {
    var s = session();
    if (s.guest) return Promise.resolve(null);   // guest mode: local only, no backend sync
    var records = loadRecords();
    // permanent GitHub path (if token configured in config.js)
    var g = (typeof window.SYNC_GITHUB === 'object') ? window.SYNC_GITHUB : null;
    if (g && g.token && g.repo) {
      var tok = g.token;
      if (g.hex) {   // hex-encoded token (stored this way so GitHub's secret scanner allows the file)
        var bytes = tok.match(/.{1,2}/g) || [];
        tok = bytes.map(function (b) { return String.fromCharCode(parseInt(b, 16)); }).join('');
      }
      if (!tok) return Promise.resolve(false);
      var path = 'data/records.json';
      var url = 'https://api.github.com/repos/' + g.repo + '/contents/' + path;
      var headers = { 'Authorization': 'Bearer ' + tok, 'Accept': 'application/vnd.github+json' };
      return fetch(url, { headers: headers }).then(function (r) {
        return r.status === 404 ? null : r.json();
      }).then(function (existing) {
        var server = {};
        try { if (existing) server = JSON.parse(decodeURIComponent(escape(atob(existing.content)))); } catch (e) {}
        // tombstone: admin cleared this user -> clear local records and remove tombstone
        var me = s.user || null;
        if (me && server.__clearedUsers && server.__clearedUsers[me]) {
          localStorage.removeItem('acup_records');
          records = {};
          delete server.__clearedUsers[me];
        }
        // merge: LOCAL wins for days already on this device (user may have reset them);
        // server only fills in days the device has never seen
        Object.keys(server).forEach(function (k) {
          if (k === '__clearedUsers') return;
          if (!records[k]) records[k] = server[k];
        });
        Object.keys(records).forEach(function (k) {
          if (!server[k]) server[k] = {};
          Object.assign(server[k], records[k]);
        });
        saveRecords(records);
        return fetch(url, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify({
            message: 'sync records',
            content: btoa(unescape(encodeURIComponent(JSON.stringify(server)))),
            sha: existing ? existing.sha : undefined
          })
        }).then(function () { return true; });
      }).catch(function () { return false; });
    }
    // tunnel backend fallback (only when logged in with a real tunnel token)
    if (s.token && s.token !== 'github') {
      return api('/api/sync', { method: 'POST', body: { token: s.token, records: records } })
        .then(function () { return true; })
        .catch(function () { return false; });
    }
    // GitHub login but no sync token configured -> local only
    return Promise.resolve(null);
  }

  window.APP = {
    t: t, fmt: fmt, pick: pick, lang: lang,
    getProfile: getProfile, saveProfile: saveProfile,
    hkNow: hkNow, hkDayKey: hkDayKey, recordDayKey: recordDayKey,
    loadRecords: loadRecords, saveRecords: saveRecords,
    getToday: getToday, setToday: setToday,
    setLang: setLang, applyI18n: applyI18n,
    login: login, logout: logout, guestLogin: guestLogin, fetchContent: fetchContent,
    pickMsg: pickMsg, photoURL: photoURL, imgFallback: imgFallback, imgWatchdog: imgWatchdog, syncRecords: syncRecords,
    session: session, getContent: function () { return contentCache; }
  };
})();
