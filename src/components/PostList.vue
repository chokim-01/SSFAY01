<template>
  <v-layout row wrap mt-4>
    <!-- Moblie size -->
    <hooper id="post_small" :itemsToShow="1.25" :centerMode="true">
      <slide
        v-for="idx in posts.length > limits ? limits : posts.length"
        :key="idx.title"
      >
        <!-- Get Post information -->
        <Post
          :created_at="posts[idx - 1].created_at"
          :title="posts[idx - 1].title"
          :body="posts[idx - 1].body"
          :num="posts[idx - 1].num"
          :author="posts[idx - 1].author"
        ></Post>
      </slide>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>

    <!-- Web size -->
    <hooper id="post_large" :itemsToShow="4" :centerMode="true">
      <slide
        v-for="idx in posts.length > limits ? limits : posts.length"
        :key="idx.title"
      >
        <!-- Get Post information -->
        <Post
          :created_at="posts[idx - 1].created_at"
          :title="posts[idx - 1].title"
          :body="posts[idx - 1].body"
          :num="posts[idx - 1].num"
          :author="posts[idx - 1].author"
        ></Post>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>

    <!-- LoadMore and Wirte Post Button -->
    <v-flex v-if="loadMore" xs12 text-xs-center round my-5>
      <v-btn id="highlight-backColor" v-on:click="loadMorePosts" depressed>
        <v-icon class="mr-2" size="25">fa-plus</v-icon>
        <span>더 보기</span>
      </v-btn>

      <template v-if="chkAuth">
        <v-btn id="highlight-backColor" to="/postWrite" depressed>
          <v-icon class="mr-2">fa-edit</v-icon>
          <span>글쓰기</span>
        </v-btn>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import Server from "../services/Server.js";
import Post from "@/components/Post.vue";
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination
} from "hooper";
import "hooper/dist/hooper.css";

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
    Post,
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination
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
#post_small {
  display: none;
}

@media screen and (max-width: 600px) {
  #post_large {
    display: none;
  }

  #post_small {
    display: block;
  }
}
</style>
