var CACHE_NAME = "v11";
var urlsToCache = [
  "/",
  "./sw-10.js",
  "/js/chunk-vendors.7715912c.js",
  "manifest.json",
  "/css/common.css",
  "/img/icons/favicon-16x16.png",
  "http://localhost:5000/api/get/portfolios",
  "http://localhost:5000/api/get/posts"
];
// ServiceWorker install
self.addEventListener("install", function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    }).catch(function(err){
      console.log(err);
    })
  );
});
// ServiceWorker Fetch
self.addEventListener('fetch', (event) => {
  console.info('Event: Fetch');

  var request = event.request;

  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      //if request is not cached, add it to cache
      return fetch(request).then((response) => {
        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache).catch((err) => {
              console.warn(request.url + ': ' + err.message);
            });
          });

        return response;
      });
    })
  );
});

//Remove before installed ServiceWorker
self.addEventListener("activate", event => {
  console.log("Activate");
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log("Remove old cache" + key);
          return caches.delete(key);
        }
      }));
    })
  );
});
