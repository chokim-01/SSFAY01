const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.Login = functions.https.onCall((data, context) => {
  date = new Date();
  date.setTime(date.getTime() + 32400000);
  time = date.toString().replace("0000 (UTC", "0900 (KST");
  console.log(data.text + " : " + context.auth.token.email + " " + time);
});

exports.Logout = functions.https.onCall((data, context) => {
  date = new Date();
  date.setTime(date.getTime() + 32400000);
  time = date.toString().replace("0000 (UTC", "0900 (KST");
  console.log("Logout : " + data.text + " : " + " " + time);
});

exports.Signup = functions.https.onCall((data, context) => {
  date = new Date();
  date.setTime(date.getTime() + 32400000);
  time = date.toString().replace("0000 (UTC", "0900 (KST");
  console.log(data.text + " : " + context.auth.token.email + " " + time);
});
