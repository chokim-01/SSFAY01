<template>
  <div v-if="this.$route.path != `/Admin`">
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

      <Footer> </Footer>
    </v-app>
  </div>
  <div v-else>
    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script>
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  store,
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
</script>
