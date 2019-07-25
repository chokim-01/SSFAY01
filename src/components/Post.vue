<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <div class="post-content">
        <h2 class="font-weight-light">{{ title }}</h2>
        <div class="color-666 caption">{{ formatedDate }}</div>
        <p class="mb-1 font-weight-light">{{ body }}</p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Post",
  props: {
    date: { type: String },
    title: { type: String },
    body: { type: String }
  },
  computed: {
    formatedDate() {
      return `${this.date}`;
    }
  }
};
</script>

<style scoped>
.color-666 {
  color: #666;
}

.h-100 {
  height: 100%;
}
</style>
