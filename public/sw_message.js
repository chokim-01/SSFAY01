"use strict";

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

self.addEventListener("push", function(event) {
  console.log("[Service Worker] Push Received.");
  console.log("[Service Worker] Push had this data: '${event.data.text()}'");

  const title = "TITLE";
  const options = {
    body: "CONTENT",
    icon: "images/icon.png",
    badge: "images/badge.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  console.log("[Service Worker] Notification click Received.");

  event.notification.close();

  event.waitUntil(
    //링크 뜨면 글번호로 가게 할거고...
    clients.openWindow("https://k3y6reak.pythonanywhere.com/")
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
