<template>
  <v-layout mt-5 wrap>
    <!-- Set portfolio count -->
    <v-flex
      v-for="idx in portfolios.length > limits ? limits : portfolios.length"
      :key="idx.title"
      xs12
      sm6
      md4
    >
      <!-- Get portfolio information -->
      <Portfolio
        class="ma-3"
        :date="portfolios[idx - 1].created_at.toString()"
        :title="portfolios[idx - 1].title"
        :body="portfolios[idx - 1].body"
        :imgSrc="portfolios[idx - 1].img"
        :id="portfolios[idx - 1].id"
      ></Portfolio>
    </v-flex>

    <!-- LoadMore and Wirte Portfolio Button -->
    <v-flex v-if="loadMore" xs12 text-xs-center round my-5>
      <v-btn depressed id="highlight-backColor" v-on:click="loadMorePortfolios">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>
        <span> 더 보기 </span>
      </v-btn>

      <v-btn depressed id="highlight-backColor" to="/portfolioWrite">
        <v-icon class="mr-2">fa-edit</v-icon>
        <span>글쓰기</span>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Server from "../services/Server.js";
import Portfolio from "@/components/Portfolio";
//import FirebaseService from "@/services/FirebaseService";
const SERVER_URL = "http://192.168.100.78:5000";

export default {
  name: "PortfoliosList",
  props: {
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      portfolios: [],
      limits: 3
    };
  },
  components: {
    Portfolio
  },
  mounted() {
    this.getPortfolios();
  },
  methods: {
    async getPortfolios() {
      await Server(SERVER_URL)
        .get("/api/portfolios")
        .then(res => {
          this.portfolios = res["data"];
        });
    },
    loadMorePortfolios() {
      this.loadMore = true;
      this.limits += 3;
    }
  }
};
</script>
