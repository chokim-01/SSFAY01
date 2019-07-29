var CACHE_NAME = 'v3';
var urlsToCache = [
  '/',
  '/manifest.json',
  '/app.js',
  '/css/common.css',
  '/img/icons/favicon-16x16.png',
  '/api/posts'

];
// ServiceWorker install
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }).catch(function(err){
        console.log(err);
      })
  );
});
self.addEventListener('fetch',event => {
  console.log('Fetch ' +event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  )
})


//Remove before installed ServiceWorker
self.addEventListener('activate', event => {
  console.log('Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log('Removing old cache' + key);
          return caches.delete(key);
        }
      }));
    })
  );
});
