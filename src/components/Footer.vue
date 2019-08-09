<template>
  <v-footer dark height="auto">
    <v-card class="grey lighten-3 flex" flat tile>
      <v-card-title id="footer-item" py0>
        <!-- weather -->
        <div id="weather">
          <div id="openweathermap-widget-24"></div>
        </div>

        <v-spacer />

        <!-- contact -->
        <div id="footer-contact">
          <v-btn
            class="mx-3"
            light
            v-for="contact in contacts"
            :key="contact.img"
            icon
            v-bind:href="contact.link"
          >
            <v-icon size="30px">{{ contact.img }}</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <!-- description -->
      <v-card-actions class="grey darken-4 justify-center">
        &copy;2019.07.01 ~ ing — <strong>Team10</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        {
          img: "fa-gitlab",
          link: "https://lab.ssafy.com/dongkwon"
        },
        {
          img: "fa-instagram",
          link: "https://www.instagram.com/kkkdddyd/"
        },
        {
          img: "fa-github",
          link: "https://github.com/ydk7819"
        },
        {
          img: "fa-google-plus",
          link: "mailto:ydk7819@gmail.com"
        }
      ]
    };
  }
};

window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
window.myWidgetParam.push({
  id: 24,
  cityid: "1841811",
  appid: "843e94f1b4901a3e5dbad93a0befb2e5",
  units: "metric",
  containerid: "openweathermap-widget-24"
});

(function() {
  var script = document.createElement("script");
  script.async = true;
  script.charset = "utf-8";
  script.src =
    "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(script, s);
})();
</script>

<style scoped>
#footer-contact {
  margin: 30px;
}

@media screen and (max-width: 600px) {
  #weather,
  #footer-icons {
    margin: auto;
  }

  .spacer {
    display: none;
  }

  #footer-item {
    text-align: center;
  }
}
</style>
