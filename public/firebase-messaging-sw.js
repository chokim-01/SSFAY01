self.addEventListener("push", function(event) {
  const title = "Push Codelab";
  const options = {
    body: "Yay it works.",
    icon: "images/icon.png",
    badge: "images/badge.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  event.waitUntil(clients.openWindow("https://developers.google.com/web/"));
});
