self.addEventListener("push", function(event) {
  console.log(event);
  const title = "글이 작성되었습니다.";
  const options = {
    body: "확인점.",
    icon: "./img/icons/favicon.png",
    badge: "images/badge.png"
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  event.waitUntil(clients.openWindow("https://chokim159.pythonanywhere.com/"));
});
