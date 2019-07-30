var CACHE_NAME = "v6";
var urlsToCache = [
  "/",
  "/manifest.json",

  "/img/icons/favicon-16x16.png",
  "http://localhost:5000/api/get/portfolios",
  "http://localhost:5000/api/get/posts",
  "https://source.unsplash.com/random ",
  "http://localhost:5000/img/about_bg.32b6cf06.jpg",
  "http://localhost:5000/fonts/fontawesome-webfont.af7ae505.woff2"
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
self.addEventListener("fetch",event => {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  )
})

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
