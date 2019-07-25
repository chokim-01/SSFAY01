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
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search_user"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  color="#00adb5"
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="user_headers"
                :items="users"
                class="elevation-1"
                :search="search_user"
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
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search_portfolio"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  color="#00adb5"
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="portfolio_headers"
                :items="portfolios"
                class="elevation-1"
                :search="search_portfolio"
                prev-icon="fa-caret-left"
                next-icon="fa-caret-right"
                sort-icon="fa-caret-down"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.num }}</td>
                  <td>{{ props.item.title }}</td>
                  <td>{{ props.item.created_at }}</td>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <!-- Post -->
          <v-tab-item>
            <v-card flat>
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search_post"
                  append-icon="search"
                  label="Search"
                  single-line
                  hide-details
                  color="#00adb5"
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="post_headers"
                :items="posts"
                class="elevation-1"
                :search="search_post"
                prev-icon="fa-caret-left"
                next-icon="fa-caret-right"
                sort-icon="fa-caret-down"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.num }}</td>
                  <td>
                    <router-link
                      :to="{
                        name: 'portfoliodetail',
                        params: { portfolio: props.item }
                      }"
                    >
                      {{ props.item.title }}
                    </router-link>
                  </td>
                  <td>{{ props.item.created_at }}</td>
                  <td>
                    <v-icon small @click="deletePost(props.item)">
                      delete
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
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
      search_user: "",
      search_portfolio: "",
      search_post: "",
      user_headers: [
        { text: "Email", sortable: false, value: "uemail" },
        { text: "PassWord", sortable: false, value: "upasswd" },
        { text: "Grade", sortable: false, value: "uauth" }
      ],
      users: [],
      portfolio_headers: [
        { text: "Num", value: "num" },
        { text: "Title", sortable: false, value: "title" },
        { text: "Date", value: "created_at" }
      ],
      portfolios: [],
      post_headers: [
        { text: "Num", value: "num" },
        { text: "Title", sortable: false, value: "title" },
        { text: "Date", value: "created_at" },
        { text: "Actions", sortable: false, value: "num" }
      ],
      posts: []
    };
  },
  components: {
    ImgBanner
  },
  mounted() {
    this.getUsers();
    this.getPortfolios();
    this.getPosts();
  },
  methods: {
    makeFormData() {
      var form = new FormData();
      form.append("num", this.portfolio.num);
      form.append("title", this.portfolio.title);
      form.append("body", this.portfolio.body);
      form.append("img", this.portfolio.img);
      form.append("created_at", this.portfolio.date);
      return form;
    },
    async getUsers() {
      await Server(SERVER_URL)
        .get("/api/users")
        .then(res => {
          this.users = res["data"];
        });
    },
    async getPortfolios() {
      await Server(SERVER_URL)
        .get("/api/portfolios")
        .then(res => {
          this.portfolios = res["data"];
        });
    },
    async getPosts() {
      await Server(SERVER_URL)
        .get("/api/posts")
        .then(res => {
          this.posts = res["data"];
        });
    },
    deletePost(item) {
      var form = new FormData();
      form.append("num", item.num);
      const index = this.posts.indexOf(item);
      if (
        confirm("Are you sure you want to delete this post?") &&
        this.posts.splice(index, 1)
      ) {
        Server(SERVER_URL).post("/api/del/post", form);
      }
    }
  }
};
</script>
