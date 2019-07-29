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
        :author="posts[idx - 1].author"
      ></Post>

      <v-divider></v-divider>
    </v-flex>

    <!-- LoadMore and Wirte Post Button -->
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn depressed id="highlight-backColor" v-on:click="loadMorePosts">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>
        <span>더 보기</span>
      </v-btn>

      <template v-if="chkAuth">
        <v-btn depressed id="highlight-backColor" to="/postWrite">
          <v-icon class="mr-2">fa-edit</v-icon>
          <span>글쓰기</span>
        </v-btn>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import Server from "../services/Server.js";
import Post from "@/components/Post";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 1 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      posts: [],
      limits: 6,
      postsTest: [],
      chkAuth: false
    };
  },
  components: {
    Post
  },
  created() {
    if (this.$store.state.uauth > 0) {
      this.chkAuth = true;
    }
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      await Server(this.$store.state.SERVER_URL)
        .get("/api/get/posts")
        .then(res => {
          this.posts = res.data;
        });
    },
    loadMorePosts() {
      this.loadMore = true;
      this.limits += 6;
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
