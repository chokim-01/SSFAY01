import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import store from "@/store.js";
import "firebase/functions";
import "firebase/messaging";
import Server from "./Server.js";

const POSTS = "posts";

// Setup Firebase
const config = {
  projectId: "webmobile-b2664",
  authDomain: "webmobile-b2664.firebaseapp.com",
  apiKey: "AIzaSyBJiIiY05ag2PU6B792QtpVIJZ6rvi7XBE",
  databaseURL: "https://webmobile-b2664.firebaseio.com",
  storageBucket: "gs://webmobile-b2664.appspot.com",
  messagingSenderId: "564847046025"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

var _login = firebase.functions().httpsCallable("Login");
var _logout = firebase.functions().httpsCallable("Logout");

const state = {
  user: null
};

export default {
  state,
  postPost(title, body) {
    return firestore.collection(POSTS).add({
      title,
      body,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
  },
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        _login({
          text: "Google login"
        }).then(function() {});
        alert("Hi! ");
        return result;
      });
  },
  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        _login({
          text: "Facebook login"
        }).then(function() {});
        alert("Hi! ");
        return result;
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        _logout({
          text: store.state.accessToken
        }).then(function() {});
        store.state.accessToken = null;
        store.state.user = null;
        alert("bye");
      })
      .catch(function(error) {
        alert(error.massage);
      });
  },
  GetToken() {
    firebase
      .messaging()
      .getToken()
      .then(devicetoken => {
        var umail = store.state.umail;
        var uauth = store.state.uauth;
        var form = new FormData();
        form.append("umail", umail);
        form.append("uauth", uauth);
        form.append("devicetoken", devicetoken);

        Server(store.state.SERVER_URL).post("/api/add/devicetoken", form);
      });
  }
};
