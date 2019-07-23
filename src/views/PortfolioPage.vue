<template>
  <div>
    <!-- Top image -->
    <ImgBanner>
      <div id="imgBanner" slot="text">
        <h1 id="bannerTxt">Portfolio</h1>
      </div>
    </ImgBanner>

    <!-- Loadmore Button -->
    <v-container>
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="6" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";

export default {
  name: "PortfolioPage",
  components: {
    ImgBanner,
    PortfolioList
  }
};
</script>
