<template>
  <v-layout py-4 h-100>
    <v-flex row>
      <div class="post-content">
        <router-link
          :to="{
            name: 'postdetail',
            params: { post: { num, title, body, created_at, author } }
          }"
          ><h2 class="font-weight-light">{{ title }}</h2></router-link
        >
        <div class="color-666 caption">{{ created_at }}</div>
        <p class="mb-1 font-weight-light">{{ body }}</p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Post",
  props: {
    num: { type: Number },
    created_at: { type: String },
    title: { type: String },
    body: { type: String },
    author: { type: String }
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
a,
h2 {
  text-decoration: none;
  color: #00adb5;
}
</style>
