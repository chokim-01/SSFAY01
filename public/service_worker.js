const SERVER_URL = "http://localhost";

var urlsToCache = [
  "/",
  "/app.js",
  "/manifest.json",
  "/css/common.css",
  "/img/icons/favicon.png",
  "/img/icons/favicon-16x16.png",
  "/img/icons/favicon-32x32.png",
  SERVER_URL + ":5000/api/get/portfolios",
  SERVER_URL + ":5000/api/get/posts",
  SERVER_URL + ":8080/fonts/fontawesome-webfont.af7ae505.woff2"
];

var CACHE = "cache-update-and-refresh";

self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches.open(CACHE).then(function(cache) {
      cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(evt) {
  if (evt.request.method == "POST") return;
  evt.respondWith(fromCache(evt.request));

  evt.waitUntil(update(evt.request).then(refresh));
});

function fromCache(request) {
  return caches.open(CACHE).then(function(cache) {
    return cache.match(request);
  });
}

function update(request) {
  return caches.open(CACHE).then(function(cache) {
    return fetch(request).then(function(response) {
      return cache.put(request, response.clone()).then(function() {
        return response;
      });
    });
  });
}

function refresh(response) {
  return self.clients.matchAll().then(function(clients) {
    clients.forEach(function(client) {
      var message = {
        type: "refresh",
        url: response.url,
        eTag: response.headers.get("ETag")
      };

      client.postMessage(JSON.stringify(message));
    });
  });
}
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = "Push Codelab";
  const options = {
    body: "Yay it works.",
    icon: "images/icon.png",
    badge: "images/badge.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  event.waitUntil(clients.openWindow("https://developers.google.com/web/"));
});
// PushManager
/* eslint-disable max-len */
