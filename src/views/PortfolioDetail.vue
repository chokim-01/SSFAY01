<template>
  <div>
    <v-form>
      <v-container my-5>
        <v-layout row>
          <v-flex sm7>
            <p>Title</p>
            <v-text-field v-model="portfolio.title" solo readonly />
          </v-flex>
          <v-flex sm5>
            <p>Date</p>
            <v-text-field v-model="portfolio.date" solo readonly />
          </v-flex>
        </v-layout>

        <p>Context</p>
        <v-text-field v-model="portfolio.body" solo />

        <v-btn @click="updatePortfolio">수정</v-btn>
        <v-btn @click="deletePortfolio">삭제</v-btn>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import Fbs from "../services/FirebaseService.js";

export default {
  data() {
    return {
      portfolio: this.$route.params.portfolio
    };
  },
  methods: {
    updatePortfolio() {
      Fbs.updatePortfolio(this.portfolio.id, this.portfolio.body);
      this.$router.push("/");
    },
    deletePortfolio() {
      Fbs.deletePortfolio(this.portfolio.id);
      this.$router.push("/");
    }
  }
};
</script>
