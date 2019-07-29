<template>
  <v-card
    hover
    :to="{
      name: 'portfoliodetail',
      params: { portfolio: { num, title, body, created_at, img, author } }
    }"
  >
    <v-img :src="img" height="200px" />

    <v-card-title primary-title>
      <div class="portfolio-content">
        <div class="portfolio-title headline font-weight-light">
          {{ title }}
        </div>

        <span class="grey--text">{{ body }}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    created_at: { type: String },
    title: { type: String },
    body: { type: String },
    img: { type: String },
    num: { type: Number },
    author: { type: String }
  }
};
</script>
