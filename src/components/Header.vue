<template>
  <div>
    <v-toolbar dense fixed flat>
      <!--Team Logo-->
      <v-toolbar-items>
        <v-btn id="blog_name" flat to="/" active-class="default-class">
          <span id="highlight-fontColor">
            10
          </span>
          TRIllION
        </v-btn>
      </v-toolbar-items>

      <!-- Appers after login -->
      <div class="hidden-sm-and-down" v-if="this.$store.state.accessToken">
        {{ this.$store.state.umail }}
      </div>

      <!-- Spacing Logo and Menus -->
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <!-- Bookmark Button -->
        <v-btn flat href="javascript:bookmarksite('home','/')" icon>
          <v-icon color="#c10000">fa-bookmark</v-icon>
        </v-btn>

        <!-- Menu -->
        <v-btn
          v-for="menu in menus"
          :key="menu.title"
          :to="menu.route"
          flat
          router
        >
          {{ menu.title }}
        </v-btn>
        <v-btn v-if="this.$store.state.uauth == 2" to="/Admin" flat router>
          Admin
        </v-btn>

        <!-- Login Logout Button-->
        <v-btn v-if="this.$store.state.accessToken" v-on:click="logout()" flat>
          logout
        </v-btn>
        <v-btn v-else @click="dialog_login = true" flat>login</v-btn>

        <!-- Translate Button -->
        <v-btn id="highlight-fontColor" @click="dialog = true" flat>
          Language
        </v-btn>

        <!-- Translate Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span>Change Language</span>
              <v-spacer></v-spacer>
              <v-menu bottom left>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon>more_vert</v-icon>
                  </v-btn>
                </template>
              </v-menu>
            </v-card-title>

            <!-- Select language -->
            <div id="google_translate_element"></div>

            <v-card-actions>
              <v-btn id="highlight-backColor" @click="dialog = false" flat>
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar-items>

      <!-- Sidebar Button on Mobile -->
      <v-btn class="hidden-md-and-up" @click.stop="drawer = !drawer" icon>
        <v-icon>fa-bars</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Sidebar -->
    <v-navigation-drawer v-model="drawer" fixed temporary right>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-content>
            <!-- Appers after Login -->
            <v-list-tile-title v-if="this.$store.state.accessToken">
              {{ this.$store.state.umail }}
            </v-list-tile-title>

            <v-list-tile-title v-else>로그인 해 주세요</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile>
          <v-btn href="javascript:bookmarksite('home','/')" icon flat>
            <v-icon id="bookmarkBtn">fa-bookmark</v-icon>
          </v-btn>
        </v-list-tile>

        <v-list-tile
          v-for="menu in menus"
          :key="menu.title"
          :to="menu.route"
          router
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- Translate Button -->
        <v-list-tile @click="dialog = true">
          <v-list-tile-title>Language</v-list-tile-title>
        </v-list-tile>

        <!-- Appers after Login -->
        <v-list-tile
          id="highlight-fontColor"
          v-if="this.$store.state.accessToken"
          v-on:click="logout()"
        >
          Logout
        </v-list-tile>
        <v-list-tile
          id="highlight-fontColor"
          v-else
          @click="dialog_login = true"
        >
          Login
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Login Dialog -->
    <v-dialog v-model="dialog_login" persistent max-width="600px">
      <v-card>
        <v-card-title class="headline mx-3" primary-title>
          Sign In
        </v-card-title>

        <!-- Email and Passwd Textfield -->
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Email"
                  v-model="email"
                  color="#00adb5"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field
                  label="Password"
                  v-model="password"
                  type="password"
                  color="#00adb5"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>

          <!-- Login and SignUp Button -->
          <v-flex xs12 md12 text-xs-center>
            <!-- Google Login Button -->
            <v-btn class="mx-3" v-on:click="loginWithGoogle" icon>
              <v-icon color="#df4a31" size="40">fa-google</v-icon>
            </v-btn>

            <!-- Facebook Button -->
            <v-btn class="mx-3" v-on:click="loginWithFacebook" icon>
              <v-icon color="#3b5998" size="40">fa-facebook</v-icon>
            </v-btn>
          </v-flex>

          <!-- SignUp button -->
          <v-flex my-3 xs12 md12 text-xs-center>
            <v-btn
              id="highlight-backColor"
              to="/signUp"
              @click="dialog_login = false"
              round
            >
              <v-icon class="mr-2" size="25">email</v-icon>
              <span>SignUp</span>
            </v-btn>
          </v-flex>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn id="highlight-fontColor" @click="dialog_login = false" flat>
            Close
          </v-btn>

          <v-btn
            id="highlight-fontColor"
            v-on:click="signIn"
            @click="dialog_login = false"
            flat
          >
            Sign In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
import Server from "@/services/Server.js";

export default {
  name: "Header",
  data: () => ({
    menus: [
      {
        title: "Portfolio",
        route: "/Portfolio"
      },
      {
        title: "Post",
        route: "/Post"
      }
    ],
    language: "KOR",
    email: "",
    password: "",
    dialog: false,
    dialog_login: false,
    drawer: null,
    firebaseLogin: false
  }),
  created() {
    FirebaseService.checkLogin();
  },
  methods: {
    menuItems() {
      return this.menu;
    },
    async loginWithGoogle() {
      this.dialog_login = false;
      this.firebaseLogin = true;

      await FirebaseService.loginWithGoogle().then(res => {
        this.$store.dispatch("login", {
          accessToken: res.credential.accessToken,
          refreshToken: res.user.refreshToken,
          umail: res.user.email,
          uauth: 0
        });
      });
    },
    async loginWithFacebook() {
      this.dialog_login = false;
      this.firebaseLogin = true;

      await FirebaseService.loginWithFacebook().then(res => {
        this.$store.dispatch("login", {
          accessToken: res.credential.accessToken,
          refreshToken: res.user.refreshToken,
          umail: res.user.email,
          uauth: 0
        });
      });
    },
    async signIn() {
      var form = new FormData();
      form.append("umail", this.email);
      form.append("upasswd", this.password);

      await Server(this.$store.state.SERVER_URL)
        .post("/api/login", form)
        .then(res => {
          if (res.data.success) {
            this.$store.dispatch("login", {
              accessToken: res.data.session.accessToken,
              refreshToken: res.data.session.refreshToken,
              umail: res.data.user.umail,
              uauth: res.data.user.uauth
            });
          } else {
            alert(res.data.msg);
          }
        });
    },
    async logout() {
      if (this.firebaseLogin == true) {
        await FirebaseService.logout();
      } else {
        await Server(this.$store.state.SERVER_URL)
          .post("/api/logout")
          .then(this.$store.dispatch("logout"));
      }
    }
  }
};
</script>

<style>
#blog_name {
  font-family: "Russo One", sans-serif;
  font-size: 20px;
}

.goog-te-banner-frame {
  visibility: hidden !important;
}

.goog-te-gadget {
  color: white;
}

.goog-te-combo {
  font-size: 1.7vw;
}

option {
  background-color: grey;
}

#google_translate_element {
  text-align: center;
}

#bookmarkBtn {
  color: #c10000;
}

#signUp {
  width: 40%;
  background-color: #00adb5;
}
</style>
