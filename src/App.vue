<template>
  <div>
    <v-app dark>
      <Header> </Header>
      <v-content>
        <router-view />
      </v-content>

      <!-- Buttom to Top Button -->
      <back-to-top bottom="90px" right="20px">
        <button type="button" class="btn btn-info btn-to-top">
          <i class="fa fa-chevron-up"></i>
        </button>
      </back-to-top>

      <Footer v-if="this.$route.path != '/'"> </Footer>
    </v-app>
  </div>
</template>

<script>
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Server from "./services/Server.js";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  store,
  created: function() {
    Server(this.$store.state.SERVER_URL).get("/api/refresh");
  },
  data() {
    return {};
  }
};

// Alert Chrome Optimization
const { detect } = require("detect-browser");
const browser = detect();

switch (browser && browser.name) {
  case "chrome":
    break;

  default:
    alert("해당 사이트는 크롬에 최적화 되어있습니다.");
}

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://danbee.ai/js/plugins/frogue-embed/frogue-embed.min.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "frogue-embed");
</script>
