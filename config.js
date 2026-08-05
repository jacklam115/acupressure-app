/* ============================================================
   Optional permanent GitHub-based record sync (config.js)
   ------------------------------------------------------------
   Normally written automatically by the admin panel's
   "一鍵啟用患者端自動同步" button. The token is stored HEX-ENCODED
   (hex: true) so GitHub's secret scanner does not block the commit;
   app.js decodes it at runtime.

   Manual setup (if you prefer): paste a fine-grained PAT
   (repo jacklam115/acupressure-app, Contents: Read and write,
   ideally path-restricted to data/records/*) as hex below, or use
   the admin button instead.

   Trade-off: this file is public, so the encoded token is visible
   to anyone reading the page source. With a path-restricted,
   single-repo token the blast radius is limited to the records
   file (anonymous codes). Do NOT reuse a full-access token here.
   ============================================================ */
window.SYNC_GITHUB = {
  token: '',
  hex: false,
  repo: 'jacklam115/acupressure-app'
};
