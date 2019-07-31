<template>
  <v-layout column>
    <hooper id="project_small" :itemsToShow="1" :centerMode="true">
      <Slide
        v-for="idx in repositories.length > limits
          ? limits
          : repositories.length"
        :key="idx"
      >
        <Repository :repos="repositories[idx - 1]" class="mx-4"></Repository>
      </Slide>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>

    <hooper id="project_large" :itemsToShow="1" :centerMode="true">
      <Slide
        v-for="idx in repositories.length > limits
          ? limits
          : repositories.length"
        :key="idx"
      >
        <Repository
          :repos="repositories[idx - 1]"
          class="px-5 mx-5"
        ></Repository>
      </Slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
      <hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
  </v-layout>
</template>

<script>
import Repository from "@/components/Repository";
import GitlabService from "@/services/GitlabService";
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination
} from "hooper";
import "hooper/dist/hooper.css";

export default {
  name: "RepositoryList",
  props: {
    limits: { type: Number, default: 5 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      repositories: []
    };
  },
  components: {
    Repository,
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination
  },
  mounted() {
    this.getGitlabRepos("k3y6reak");
  },
  methods: {
    async getGitlabRepos(userName) {
      const response = await GitlabService.getRepos(userName);

      if (response.status !== 200) {
        return;
      }

      this.repositories = response.data;
    }
  }
};
</script>

<style scoped>
#project_small {
  display: none;
}

@media screen and (max-width: 600px) {
  #project_large {
    display: none;
  }

  #project_small {
    display: block;
  }
}
</style>
