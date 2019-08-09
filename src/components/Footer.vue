<template>
  <v-footer dark height="auto">
    <v-card class="grey lighten-3 flex" flat tile>
      <v-card-title id="footer-item">
        <!-- weather -->
        <div id="weather">
          <v-card light flat class="grey lighten-3">
            <v-layout>
              <v-flex xs6class="align-center">
                <img id="weather_icon_id" :src="weather_icon" />
              </v-flex>
              <v-flex xs6>
                <v-card-title primary-title text-xs-right>
                  <div class="text-xs-right">
                    <div class="headline">{{ temp }}°C</div>
                    <div>{{ city }}</div>
                    <div>{{ now_weather }}</div>
                  </div>
                </v-card-title>
              </v-flex>
            </v-layout>
          </v-card>
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
      ],
      latitude: "",
      longitude: "",
      now_weather: "",
      city: "",
      temp: "",
      weather_icon: ""
    };
  },
  computed() {
    this.showPosition();
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    async getLocation() {
      if (navigator.geolocation) {
        //위치 정보를 얻기
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
      }
    },
    showPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      var apiKey = "843e94f1b4901a3e5dbad93a0befb2e5";
      const apiURL = "http://api.openweathermap.org/data/2.5/weather";
      this.$http({
        method: "GET",
        url: apiURL,
        params: {
          appid: apiKey,
          lon: this.longitude,
          lat: this.latitude
        }
      }).then(res => {
        this.now_weather = res.data.weather[0].main;
        this.city = res.data.name;
        this.temp = res.data.main.temp - 273.15;
        this.weather_icon = require("../assets/img/weather/" +
          res.data.weather[0].icon +
          ".png");
      });
    }
  }
};
</script>

<style scoped>
#weather_icon_id {
  width: 100%;
}

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
