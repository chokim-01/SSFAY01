<template>
  <div>
    <!-- Top image -->
    <ImgBanner>
      <div id="imgBanner" slot="text">
        <h1 id="bannerTxt">Post</h1>
      </div>
    </ImgBanner>

    <!-- Loadmore Button -->
    <v-container>
      <v-layout>
        <v-flex xs12>
          <PostList :limits="6" :load-more="true"></PostList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PostList from "../components/PostList";

export default {
  name: "PostPage",
  components: {
    ImgBanner,
    PostList
  }
};
</script>
