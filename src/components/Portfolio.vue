<template>
  <v-card
    hover
    :to="{
      name: 'portfoliodetail',
<<<<<<< HEAD
      params: { portfolio: { num, title, body, created_at, img } }
=======
      params: { portfolio: { num, title, body, date, img } }
>>>>>>> 98442b120f8b7bfcceb0186e8abef1761cc8c420
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
    date: { type: String },
    title: { type: String },
    body: { type: String },
    img: { type: String },
    num: { type: Number }
  }
};
</script>
