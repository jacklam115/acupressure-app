/* Service worker: web push notifications + offline-friendly shell.
   Scope: /acupressure-app/ (GitHub Pages). Registered from app.js. */
'use strict';

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (e) {
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch (err) { data = { title: e.data ? e.data.text() : '' }; }
  var title = data.title || '按壓減壓';
  var body = data.body || '';
  var opts = {
    body: body,
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    data: { url: data.url || './index.html?v=13' },
    vibrate: [120, 60, 120],
    tag: data.tag || 'acup-push'
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './index.html?v=13';
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf(self.location.origin) === 0) {
        return list[i].focus().then(function (c) { return c.navigate(url); }).catch(function () { return list[i].focus(); });
      }
    }
    return clients.openWindow(url);
  }));
});
