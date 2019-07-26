import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
    refreshToken: "",
    user: "",
    umail: "",
    uauth: 0,
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
    },
    logout({ commit }) {
      commit("logout");
    }
  }
});
