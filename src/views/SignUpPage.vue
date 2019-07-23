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
                label="Password"
                v-model="password"
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
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "signUpPage",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      FirebaseService.signUp(this.email, this.password);
    }
  }
};
</script>
