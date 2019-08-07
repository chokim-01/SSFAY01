const SERVER_URL = "http://localhost";

var CACHE_NAME = "v1";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/css/common.css",
  "/img/icons/favicon.png",
  "/img/icons/favicon-16x16.png",
  "/img/icons/favicon-32x32.png",
  "/fonts/fontawesome-webfont.af7ae505.woff2",
  SERVER_URL + ":5000/api/get/portfolios",
  SERVER_URL + ":5000/api/get/posts"
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
self.addEventListener("fetch", event => {
  var request = event.request;
  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    caches.match(request).then(response => {
      response;

      return fetch(request).then(response => {
        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseToCache);
        });

        return response;
      });
    })
  );
});