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
        <v-text-field v-model="portfolio.body" solo readonly />

        <v-btn>수정</v-btn>
        <v-btn>삭제</v-btn>
      </v-container>
    </v-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      portfolio: this.$route.params.portfolio
    };
  }
};
</script>
