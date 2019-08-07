const SERVER_URL = "https://chokim159.pythonanywhere.com";

var CACHE_NAME = "v1";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/css/common.css",
  "/img/icons/favicon.png",
  "/img/icons/favicon-16x16.png",
  "/img/icons/favicon-32x32.png",
  SERVER_URL + "/api/get/portfolios",
  SERVER_URL + "/api/get/posts",
  SERVER_URL + "/fonts/fontawesome-webfont.af7ae505.woff2"
];

// ServiceWorker install
self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
  window.location.reload();
});
// ServiceWorker Fetch
self.addEventListener("fetch", event => {
  var request = event.request;
  console.log("fetch event");

  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then(response => {
      response;
      //if request is not cached, add it to cache
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
