/* Push relay: reads data/pushq/*.json requests, sends Web Push to stored
   subscriptions (data/pushsubs/<user>.json), logs to data/pushlog/, deletes
   the request file. Runs on GitHub Actions (see .github/workflows/push-relay.yml).
   Commits via API using GITHUB_TOKEN (does not re-trigger workflows). */
import webpush from 'web-push';
import { readFileSync } from 'node:fs';

const REPO = process.env.GITHUB_REPOSITORY;
const TOKEN = process.env.GITHUB_TOKEN;
const VAPID_PUBLIC = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;

const API = 'https://api.github.com/repos/' + REPO + '/contents/';
const H = { Authorization: 'Bearer ' + TOKEN, Accept: 'application/vnd.github+json' };

async function ghGet(path) {
  const r = await fetch(API + path, { headers: H });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error('GET ' + path + ' -> ' + r.status);
  return r.json();
}
async function ghPut(path, content, msg) {
  const existing = await ghGet(path);
  const r = await fetch(API + path, {
    method: 'PUT', headers: H,
    body: JSON.stringify({
      message: msg,
      content: Buffer.from(content).toString('base64'),
      sha: existing ? existing.sha : undefined
    })
  });
  if (!r.ok) throw new Error('PUT ' + path + ' -> ' + r.status);
}
async function ghDelete(path, msg) {
  const existing = await ghGet(path);
  if (!existing) return;
  const r = await fetch(API + path, {
    method: 'DELETE', headers: H,
    body: JSON.stringify({ message: msg, sha: existing.sha })
  });
  if (!r.ok) throw new Error('DELETE ' + path + ' -> ' + r.status);
}
function b64ToBuf(b64) {
  const raw = atob(b64);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

async function main() {
  if (!VAPID_PUBLIC || !VAPID_PRIVATE) {
    console.log('VAPID keys missing — add VAPID_PUBLIC_KEY & VAPID_PRIVATE_KEY repo secrets'); process.exit(0);
  }
  webpush.setVapidDetails('mailto:jacklam115@gmail.com', VAPID_PUBLIC, VAPID_PRIVATE);

  const qDir = await ghGet('data/pushq');
  if (!qDir || !Array.isArray(qDir)) { console.log('no push queue'); return; }
  const requests = qDir.filter((f) => f.name.endsWith('.json'));
  if (!requests.length) { console.log('queue empty'); return; }

  for (const f of requests) {
    const raw = await ghGet('data/pushq/' + f.name);
    if (!raw) continue;
    const req = JSON.parse(Buffer.from(raw.content, 'base64').toString('utf8'));
    const title = req.title || '';
    const body = req.body || '';
    const url = req.url || './index.html?v=14';
    const targets = req.targets === 'all' ? null : req.targets;

    const subDir = await ghGet('data/pushsubs');
    const subs = targets === null
      ? (subDir || []).filter((x) => x.name.endsWith('.json')).map((x) => x.name)
      : targets.map((u) => encodeURIComponent(u) + '.json');

    const result = {};
    for (const subName of subs) {
      const s = await ghGet('data/pushsubs/' + subName);
      if (!s) { result[subName] = 'no-subscription'; continue; }
      let sub;
      try { sub = JSON.parse(Buffer.from(s.content, 'base64').toString('utf8')); } catch (e) { continue; }
      try {
        await webpush.sendNotification({
          endpoint: sub.endpoint,
          keys: { p256dh: b64ToBuf(sub.keys.p256dh), auth: b64ToBuf(sub.keys.auth) }
        }, JSON.stringify({ title, body, url }));
        result[subName] = 'sent';
        console.log('sent ->', subName);
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          await ghDelete('data/pushsubs/' + subName, '[skip ci] drop dead push subscription');
          result[subName] = 'dropped-410';
        } else {
          result[subName] = 'error-' + (err.statusCode || '?');
        }
      }
      await new Promise((r) => setTimeout(r, 300)); // polite pacing
    }

    const logName = 'data/pushlog/' + f.name.replace(/\.json$/, '') + '.json';
    await ghPut(logName, JSON.stringify({ ...req, result, delivered: new Date().toISOString() }, null, 1),
      '[skip ci] push log ' + f.name);
    await ghDelete('data/pushq/' + f.name, '[skip ci] push request done ' + f.name);
    console.log('done', f.name, JSON.stringify(result));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
