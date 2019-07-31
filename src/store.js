import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    SERVER_URL: "http://localhost:5000/",
    IMGUR_URL: "https://api.imgur.com/3/",
    DISQUS_URL: "https://webmobile-team10.disqus.com",
    accessToken: localStorage.accessToken,
    refreshToken: localStorage.refreshToken,
    user: "",
    umail: localStorage.umail,
    uauth: localStorage.uauth,
    url: "https://source.unsplash.com/random",
    random_url: "https://source.unsplash.com/random"
  },
  mutations: {
    setUrl(state, _url) {
      state.url = _url;
    },
    login(state, userInfo) {
      state.accessToken = userInfo.accessToken;
      state.refreshToken = userInfo.refreshToken;
      state.umail = userInfo.umail;
      state.uauth = userInfo.uauth;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.umail = null;
      state.uauth = 0;
    }
  },
  actions: {
    login({ commit }, userInfo) {
      commit("login", userInfo);
      localStorage.accessToken = userInfo.accessToken;
      localStorage.refreshToken = userInfo.refreshToken;
      localStorage.umail = userInfo.umail;
      localStorage.uauth = userInfo.uauth;
    },
    logout({ commit }) {
      commit("logout");
      localStorage.accessToken = "";
      localStorage.refreshToken = "";
      localStorage.umail = "";
      localStorage.uauth = 0;
    }
  }
});
