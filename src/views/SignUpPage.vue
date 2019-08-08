<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs12 text-xs-center>
      <v-layout pa-4 justify-center>
        <div class="sign-up">
          <v-card-title>
            <span class="headline my-4">User Profile</span>
          </v-card-title>

          <!-- Email and Password Text field -->
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="Email"
                v-model="email"
                color="#00adb5"
                required
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                color="#00adb5"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- signUp Button -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn id="highlight-backColor" v-on:click="signUp">signUp</v-btn>
          </v-card-actions>
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Server from "../services/Server.js";

export default {
  name: "signUpPage",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async signUp() {
      if (this.email != "" && this.password != "") {
        var userForm = new FormData();
        userForm.append("umail", this.email);
        userForm.append("upasswd", this.password);
        await Server(this.$store.state.SERVER_URL)
          .post("/api/add/user", userForm)
          .then(res => {
            alert(res.data.msg);
          });
      } else {
        alert("입력정보를 확인하세요.");
      }
    }
  }
};
</script>
