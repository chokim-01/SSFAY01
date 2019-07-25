<template>
  <div>
    <!-- Top image -->
    <ImgBanner>
      <div id="imgBanner" slot="text">
        <h1 id="bannerTxt">Admin</h1>
      </div>
    </ImgBanner>

    <!-- Content -->
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
              <v-card-title>
                <p>
                  Members
                </p>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  color="#00adb5"
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="users"
                class="elevation-1"
                :search="search"
                prev-icon="fa-caret-left"
                next-icon="fa-caret-right"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.umail }}</td>
                  <td>{{ props.item.upasswd }}</td>
                  <td v-if="props.item.uauth == 0">
                    <span id="u_guest">guest</span>
                  </td>
                  <td v-if="props.item.uauth == 1">
                    <span id="u_member">member</span>
                  </td>
                  <td v-if="props.item.uauth == 2">
                    <span id="u_admin">admin</span>
                  </td>
                </template>
              </v-data-table>
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
import Server from "../services/Server.js";
const SERVER_URL = "http://localhost:5000";

export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "Email", sortable: false, value: "uemail" },
        { text: "PassWord", sortable: false, value: "upasswd" },
        { text: "Grade", sortable: false, value: "uauth" }
      ],
      users: []
    };
  },
  components: {
    ImgBanner
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      await Server(SERVER_URL)
        .get("/api/users")
        .then(res => {
          this.users = res["data"];
        });
    }
  }
};
</script>
