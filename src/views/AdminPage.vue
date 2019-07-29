<template>
  <div>
    <!-- Top image -->
    <ImgBanner>
      <div id="imgBanner" slot="text">
        <h1 id="bannerTxt">Admin</h1>
      </div>
    </ImgBanner>

    <!-- Member, Portfolio, Post, Log View Section -->
    <v-container>
      <v-card flat>
        <v-tabs vertical>
          <v-tab>Member</v-tab>
          <v-tab>Portfolio</v-tab>
          <v-tab>Post</v-tab>
          <v-tab>Log</v-tab>

          <!-- Member data -->
          <v-tab-item>
            <v-card flat>
              <!-- search-bar -->
              <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search_user"
                  append-icon="search"
                  color="#00adb5"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <!-- Member data table -->
              <v-data-table
                class="elevation-1"
                :headers="user_headers"
                :items="users"
                :search="search_user"
                prev-icon="fa-caret-left"
                next-icon="fa-caret-right"
                sort-icon="fa-caret-down"
              >
                <template v-slot:items="props">
                  <!-- Memeber mail and password -->
                  <td>{{ props.item.umail }}</td>
                  <td>{{ props.item.upasswd }}</td>

                  <!-- Member auth -->
                  <td>
                    <v-menu offset-y>
                      <template v-slot:activator="{ on }">
                        <div id="user_auth" v-on="on">
                          <template v-for="(grade, index) in grades">
                            <span
                              v-if="props.item.uauth == index"
                              v-bind:key="grade"
                            >
                              {{ grade }}
                            </span>
                          </template>
                        </div>
                      </template>

                      <!-- Change user auth -->
                      <v-list>
                        <v-list-tile
                          v-for="(grade, index) in grades"
                          :key="grade"
                        >
                          <v-list-tile-title>
                            <span @click="editUserAuth(props.item, index)">
                              {{ grade }}
                            </span>
                          </v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-menu>
                  </td>

                  <!-- Delete user button -->
                  <td>
                    <v-icon @click="deleteUser(props.item)">
                      fa-trash
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <!-- Portfolio data -->
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
                class="elevation-1"
                :headers="portfolio_headers"
                :items="portfolios"
                :search="search_portfolio"
                prev-icon="fa-caret-left"
                next-icon="fa-caret-right"
                sort-icon="fa-caret-down"
              >
                <template v-slot:items="props">
                  <!-- Portfolio number -->
                  <td>{{ props.item.num }}</td>

                  <!-- Portfolio title -->
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

                  <!-- Portfolio created time  -->
                  <td>{{ props.item.created_at }}</td>

                  <!--  Delete portfolio button -->
                  <td>
                    <v-icon @click="deletePortfolio(props.item)">
                      fa-trash
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <!-- Post data -->
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

              <!-- Post data table -->
              <v-data-table
                class="elevation-1"
                :headers="post_headers"
                :items="posts"
                :search="search_post"
                prev-icon="fa-caret-left"
                next-icon="fa-caret-right"
                sort-icon="fa-caret-down"
              >
                <template v-slot:items="props">
                  <!--  Post number -->
                  <td>{{ props.item.num }}</td>

                  <!-- Post title  -->
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

                  <!-- Post created time  -->
                  <td>{{ props.item.created_at }}</td>

                  <!-- Delete post button -->
                  <td>
                    <v-icon @click="deletePost(props.item)">
                      fa-trash
                    </v-icon>
                  </td>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <!-- Log -->
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
      grades: ["🧑Guest", "👪Member", "🤴Admin"]
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
    async getUsers() {
      await Server(this.$store.state.SERVER_URL)
        .get("/api/get/users")
        .then(res => {
          this.users = res.data;
        });
    },
    async getPortfolios() {
      await Server(this.$store.state.SERVER_URL)
        .get("/api/get/portfolios")
        .then(res => {
          this.portfolios = res.data;
        });
    },
    async getPosts() {
      await Server(this.$store.state.SERVER_URL)
        .get("/api/get/posts")
        .then(res => {
          this.posts = res.data;
        });
    },
    deleteUser(item) {
      var form = new FormData();
      form.append("umail", item.umail);

      const index = this.users.indexOf(item);
      if (
        confirm("해당 회원을 삭제하시겠습니까?") &&
        this.users.splice(index, 1)
      ) {
        Server(this.$store.state.SERVER_URL).post("/api/del/user", form);
      }
    },
    deletePortfolio(item) {
      var form = new FormData();
      form.append("num", item.num);

      const index = this.portfolios.indexOf(item);
      if (
        confirm("해당 포트폴리오를 삭제하시겠습니까?") &&
        this.portfolios.splice(index, 1)
      ) {
        Server(this.$store.state.SERVER_URL).post("/api/del/portfolio", form);
      }
    },
    deletePost(item) {
      var form = new FormData();
      form.append("num", item.num);

      const index = this.posts.indexOf(item);
      if (
        confirm("해당 포스트를 삭제하시겠습니까?") &&
        this.posts.splice(index, 1)
      ) {
        Server(this.$store.state.SERVER_URL).post("/api/del/post", form);
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
      Server(this.$store.state.SERVER_URL).post("/api/edit/user", form);
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
