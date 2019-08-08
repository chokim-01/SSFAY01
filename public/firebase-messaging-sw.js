importScripts("https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js");

firebase.initializeApp({
  "messagingSenderId": "564847046025"
});

const messaging = firebase.messaging();
self.addEventListener("push", function(event) {
  const payload = event.data.json();
  const title = payload.notification.title;
  const options = {
    body: payload.notification.body,
    icon: "./img/icons/favicon.png",
    data: payload.notification.click_action
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  console.log(event.notification);
  event.notification.close();
  //event.waitUntil(clients.openWindow(event.notification.data));
  event.waitUntil(clients.openWindow("https://chokim159.pythonanywhere.com/"));
});
