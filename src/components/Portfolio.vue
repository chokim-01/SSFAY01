<template>
  <v-card hover>
    <v-img :src="imgSrc" height="200px" />
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
    imgSrc: { type: String }
  }
};
</script>
