import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
import store from "@/store.js";
import "firebase/functions";

const POSTS = "posts";

// Setup Firebase
const config = {
  projectId: "webmobile-b2664",
  authDomain: "webmobile-b2664.firebaseapp.com",
  apiKey: "AIzaSyBJiIiY05ag2PU6B792QtpVIJZ6rvi7XBE",
  databaseURL: "https://webmobile-b2664.firebaseio.com",
  storageBucket: "gs://webmobile-b2664.appspot.com"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

var _login = firebase.functions().httpsCallable("Login");
var _logout = firebase.functions().httpsCallable("Logout");
var _signup = firebase.functions().httpsCallable("Signup");

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
  signIn(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        function(user) {
          _login({
            text: "Email Login"
          }).then(function() {});
          alert("Hi! ");
          return user;
        },
        function(err) {
          alert("Failed : " + err.massage);
        }
      );
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
  checkLogin() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.state.user = user;
        store.state.accessToken = user.email;
      }
    });
  },
  signUp(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        function() {
          _signup({
            text: "Email SignUp"
          }).then(function() {});
          alert("welcome!");
          window.location.href = "/";
        },
        function(err) {
          alert("failed : " + err.message);
        }
      );
  }
};
