/* ============================================================
   Optional permanent GitHub-based record sync (config.js)
   ------------------------------------------------------------
   By default the app syncs records to the temporary tunnel backend
   (see app.js BACKEND). For FULLY permanent sync (no tunnel), paste a
   fine-grained PAT here:

   1. GitHub → Settings → Developer settings → Fine-grained PAT
   2. Repository access: jacklam115/acupressure-app only
   3. Permissions: Contents → Read and write
   4. IMPORTANT: also restrict "Path" to: data/records/*  (edit the
      token afterwards → Repository access → Choose repositories →
      the repo → "Path" restriction → add "data/records/*")
   5. Paste the token below.

   Trade-off: this file is public in the repo, so the token is exposed
   to anyone who reads the page source. With a path-restricted,
   single-repo, write-only token the blast radius is limited to
   spam/mutation of the records file (all data is anonymous codes).
   Do NOT reuse a full-access token here. Records stay on the device
   regardless; this only adds a permanent copy for the researcher.
   ============================================================ */
window.SYNC_GITHUB = {
  token: '',
  repo: 'jacklam115/acupressure-app'
};
