<template>
  <v-card
    class="mx-auto"
    id="post_card"
    :to="{
      name: `postdetail`,
      params: { post: { num, title, body, created_at, author } }
    }"
    hover
  >
    <!-- Post title -->
    <v-card-title class="pb-1 mt-2" id="post_title">
      <h3 class="font-weight-light mt-3">{{ title }}</h3>
    </v-card-title>

    <!-- Post body, author, created time -->
    <v-card-text class="headline mb-4">
      <p class="mb-1 font-weight-light" id="post_contents">{{ body }}</p>
      <p class="mb-0 font-weight-light" id="post_author">{{ author }}</p>
      <div class="color-666 caption" id="post_date">{{ created_at }}</div>
    </v-card-text>
  </v-card>
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
#post_card {
  max-width: 300px;
  background-color: #222831;
}

#post_contents {
  height: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
}

#post_title,
#post_author,
#post_date {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

#post_author {
  font-size: 18px;
}

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

@media screen and (max-width: 600px) {
  #post_card {
    max-width: 200px;
  }

  #post_author {
    font-size: 13px;
  }
}
</style>
