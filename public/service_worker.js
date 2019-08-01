const SERVER_URL = "http://localhost";

var CACHE_NAME = "v1";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/app.js",
  "/css/common.css",
  "/img/icons/favicon.png",
  "/img/icons/favicon-16x16.png",
  "/img/icons/favicon-32x32.png",
  SERVER_URL + ":5000/api/get/portfolios",
  SERVER_URL + ":5000/api/get/posts",
  SERVER_URL + ":8080/fonts/fontawesome-webfont.af7ae505.woff2"
];

// ServiceWorker install
self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
// ServiceWorker Fetch
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

//Remove before version with ServiceWorker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// PushManager
/* eslint-disable max-len */

const applicationServerPublicKey =
  "BH8-hIchXKMI6AKSee8gD0hhPThRqaEhIEtMJwcTjEQhiOKdG-_2tTIO-6hOAK4kwg5M9Saedjxp4hVE-khhWxY";

/* eslint-enable max-len */

function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
/*
self.addEventListener("push", function(event) {
  console.log("[Service Worker] Push Received.");
  console.log("[Service Worker] Push had this data: ", event.data.text());

  const title = "TITLE";
  const options = {
    body: "CONTENT",
    icon: "images/icon.png",
    badge: "images/badge.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
*/
self.addEventListener("notificationclick", function(event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  event.waitUntil(
    clients.openWindow("https://k3y6reak.pythonanywhere.com/Portfolio")
  );
});


self.addEventListener("pushsubscriptionchange", function(event) {
  console.log('[Service Worker]: "pushsubscriptionchange" event fired.');
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(function(newSubscription) {
        // TODO: Send to application server
      console.log("[Service Worker] New subscription: ", newSubscription);
      })
  );
});
//1. 글 작성 / 댓글 작성 된 시점을 어떻게 알 것인지...
//2. 푸시알림 - 그냥보냄
//3. 로그인 한 녀석이 누구인지...
