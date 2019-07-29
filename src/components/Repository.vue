<template>
  <div class="py-3">
    <v-layout>
      <v-flex xs8>
        <!-- Gitlab Repository Name -->
        <h2 class="repository-title font-weight-light">
          <a v-bind:href="url + '/' + repos.path_with_namespace">
            {{ repos.path_with_namespace }}
          </a>
        </h2>

        <!-- Gitlab Repository Author -->
        <p class="subheading mb-1 grey--text text--darken-1 font-weight-light">
          {{ repos.namespace.name }}
        </p>
      </v-flex>
    </v-layout>

    <!-- A weeks ago commit counts -->
    <p>{{ commitsCnt }}</p>

    <v-sparkline
      id="commit_graph"
      :value="commitsCnt"
      :gradient="gradient"
      :smooth="10 || false"
      :padding="8"
      :line-width="2"
      :stroke-linecap="`round`"
      :gradient-direction="gradientDirection"
      :auto-draw="autoDraw"
      xs0
      md12
    ></v-sparkline>

    <!-- Recently Commit -->
    <p>Recently Commit</p>
    <div v-for="idx in users.length" :key="idx">
      <p>
        <span>{{ users[idx - 1] }}: {{ userCommits[idx - 1] }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import GitlabService from "@/services/GitlabService";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];

export default {
  name: "Repository",
  props: {
    repos: { type: null }
  },
  data: () => ({
    url: "https://lab.ssafy.com",
    gradient: gradients[5],
    gradientDirection: "top",
    gradients,
    commitsCnt: [],
    userCommits: [],
    users: ["박사홍", "양동권", "박근형"],
    autoDraw: false
  }),
  mounted() {
    this.drawStatGraph();
    this.usersCommits();
  },
  methods: {
    async drawStatGraph() {
      this.autoDraw = false;
      var now = new Date();
      var since = new Date();
      var until = new Date();

      for (var day = -7; day <= 2; day++) {
        since.setDate(now.getDate() + day);
        until.setDate(now.getDate() + day);
        since.setHours(-15, 0, 0, 0);
        until.setHours(+8, 59, 59, 999);

        var commits_7day = await GitlabService.getCommits(
          this.repos.id,
          since,
          until
        );

        this.commitsCnt.push(commits_7day.data.length);
      }
      this.autoDraw = true;
    },
    async usersCommits() {
      this.userCommits = await GitlabService.getUsersCommits(this.repos.id);
    }
  }
};
</script>

<style scoped>
a,
h2 {
  text-decoration: none;
  color: #00adb5;
}
</style>
