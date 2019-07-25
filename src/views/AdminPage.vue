<template>
  <div>
    <!-- Top image -->
    <ImgBanner>
      <div id="imgBanner" slot="text">
        <h1 id="bannerTxt">Admin</h1>
      </div>
    </ImgBanner>

    <v-container>
      <v-card flat>
        <v-tabs vertical>
          <v-tab>Member</v-tab>
          <v-tab>Portfolio</v-tab>
          <v-tab>Post</v-tab>
          <v-tab>Log</v-tab>

          <!-- member -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="users"
                  :items-per-page="5"
                  class="elevation-1"
                >
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Portfolio -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                포트폴리오
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- Post -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                포스트
              </v-card-text>
            </v-card>
          </v-tab-item>

          <!-- log -->
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                로그
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "User Email",
          align: "left",
          sortable: false,
          value: "email"
        },
        { text: "User Password", value: "password" },
        { text: "User Grade", value: "grade" },
        { text: "Change Grade", value: "chang" }
      ],
      testData: []
    };
  },
  components: {
    ImgBanner
  },
  mounted() {
    this.getPosts();
  },
  method: {
    async getPosts() {
      await axios.get("http://localhost:5000/api/admin");
    }
  }
};
</script>
