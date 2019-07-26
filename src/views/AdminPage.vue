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
              <!-- search-bar -->
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

              <!-- table -->
              <v-data-table
                :headers="user_headers"
                :items="users"
                class="elevation-1"
                :search="search_user"
                prev-icon="fa-caret-left"
                next-icon="fa-caret-right"
                sort-icon="fa-caret-down"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.umail }}</td>
                  <td>{{ props.item.upasswd }}</td>
                  <td>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <div id="user_auth" v-on="on">
                          <span v-if="props.item.uauth == 0">🐟guest</span>
                          <span v-if="props.item.uauth == 1">🐠member</span>
                          <span v-if="props.item.uauth == 2">🦈admin</span>
                        </div>
                      </template>
                      <v-list>
                        <v-list-tile
                          v-for="(item, index) in grades"
                          :key="index"
                        >
                          <v-list-tile-title>
                            <span
                              v-if="item == 0"
                              @click="editUserAuth(props.item, 0)"
                            >
                              🐟guest
                            </span>
                            <span
                              v-if="item == 1"
                              @click="editUserAuth(props.item, 1)"
                            >
                              🐠member
                            </span>
                            <span
                              v-if="item == 2"
                              @click="editUserAuth(props.item, 2)"
                            >
                              🦈admin
                            </span>
                          </v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </td>
                  <td>
                    <v-icon @click="deleteUser(props.item)">
                      fa-trash
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <!-- Portfolio -->
          <v-tab-item>
            <v-card flat>
              <!-- search-bar -->
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

              <!-- table -->
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
                    <v-icon @click="deletePortfolio(props.item)">
                      fa-trash
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <!-- Post -->
          <v-tab-item>
            <v-card flat>
              <!-- search-bar -->
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

              <!-- table -->
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
                        name: 'postdetail',
                        params: { post: props.item }
                      }"
                    >
                      {{ props.item.title }}
                    </router-link>
                  </td>
                  <td>{{ props.item.created_at }}</td>
                  <td>
                    <v-icon @click="deletePost(props.item)">
                      fa-trash
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
        { text: "Grade", value: "uauth" },
        { text: "Actions", sortable: false, value: "num" }
      ],
      users: [],
      portfolio_headers: [
        { text: "Num", value: "num" },
        { text: "Title", sortable: false, value: "title" },
        { text: "Date", value: "created_at" },
        { text: "Actions", sortable: false, value: "num" }
      ],
      portfolios: [],
      post_headers: [
        { text: "Num", value: "num" },
        { text: "Title", sortable: false, value: "title" },
        { text: "Date", value: "created_at" },
        { text: "Actions", sortable: false, value: "num" }
      ],
      posts: [],
      grades: [0, 1, 2]
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
    deleteUser(item) {
      var form = new FormData();
      form.append("umail", item.umail);
      const index = this.users.indexOf(item);
      if (
        confirm("Are you sure you want to delete this user?") &&
        this.users.splice(index, 1)
      ) {
        Server(SERVER_URL).post("/api/del/user", form);
      }
    },
    deletePortfolio(item) {
      var form = new FormData();
      form.append("num", item.num);
      const index = this.portfolios.indexOf(item);
      if (
        confirm("Are you sure you want to delete this portfolio?") &&
        this.portfolios.splice(index, 1)
      ) {
        Server(SERVER_URL).post("/api/del/portfolio", form);
      }
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
    },
    editUserAuth(item, auth) {
      var form = new FormData();
      form.append("umail", item.umail);
      form.append("uauth", auth);
      const index = this.users.indexOf(item);

      Object.assign(this.users[index], {
        umail: item.umail,
        upasswd: item.upasswd,
        uauth: auth
      });
      Server(SERVER_URL).post("/api/edit/user", form);
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
