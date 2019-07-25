import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
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
    login(state) {
      state.accessToken = "";
      state.umail = "";
      state.uauth = "";
    },
    logout(state) {
      state.accessToken = "";
      state.umail = "";
      state.uauth = 0;
    }
  },
  actions: {
    login({ commit }) {
      commit("login")
    }
  }
});
