<template>
  <v-layout column px-4>
    <v-flex
      id="repositores"
      v-for="idx in repositories.length > limits ? limits : repositories.length"
      :key="idx"
    >
      <v-divider v-if="idx === 1"></v-divider>

      <Repository :repos="repositories[idx - 1]"></Repository>

      <v-divider></v-divider>
    </v-flex>
  </v-layout>
</template>

<script>
import Repository from "@/components/Repository";
import GitlabService from "@/services/GitlabService";

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
    Repository
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
