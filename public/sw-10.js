const SERVER_URL = "http://localhost:5000";

var CACHE_NAME = "v1";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/css/common.css",
  "/img/icons/favicon.png",
  "/img/icons/favicon-16x16.png",
  "/img/icons/favicon-32x32.png",
  "/fonts/fontawesome-webfont.af7ae505.woff2",
  SERVER_URL + "/api/get/portfolios",
  SERVER_URL + "/api/get/posts"
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
  if (request.method == "POST") {
    return;
  }
  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    caches.match(request).then(response => {
      response;
      var before_response = response;

      return fetch(request)
        .then(response => {
          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(err => {
          err;

          return before_response;
        });
    })
  );
});
