<template>
  <v-layout row wrap mw-700>
    <!-- Set Post count -->
    <v-flex
      id="posts"
      v-for="idx in posts.length > limits ? limits : posts.length"
      :class="'xs' + 12 / column"
      :key="idx.title"
      px-3
    >
      <!-- Get Post information -->
      <Post
        :created_at="posts[idx - 1].created_at"
        :title="posts[idx - 1].title"
        :body="posts[idx - 1].body"
        :num="posts[idx - 1].num"
      ></Post>
      <v-divider></v-divider>
    </v-flex>

    <!-- loadMore Button -->
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn depressed id="highlight-backColor" v-on:click="loadMorePosts">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>
        <span>더 보기</span>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Server from "../services/Server.js";
import Post from "@/components/Post";
const SERVER_URL = "http://localhost:5000";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 1 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      posts: [],
      limits: 4,
      postsTest: []
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      await Server(SERVER_URL)
        .get("/api/posts")
        .then(res => {
          this.posts = res["data"];
        });
    },
    loadMorePosts() {
      this.loadMore = true;
      this.limits += 3;
    }
  }
};
</script>

<style scoped>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
