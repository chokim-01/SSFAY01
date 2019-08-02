<template>
<div>
  <v-form>
    <v-container my-5>
      <!-- Title Text field-->
      <v-flex>
        <v-text-field v-model="title" label="제목" solo></v-text-field>
      </v-flex>

      <!-- Markdown Editor -->
      <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>

      <!-- upload image -->
      <Imgur></Imgur>

      <!-- Write Portfolio Button -->
      <v-btn id="highlight-backColor" class="right" @click="writePortfolio" depressed>
        글쓰기
      </v-btn>
    </v-container>
  </v-form>
</div>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";
import Imgur from "../components/Imgur";

/////////////////////////////////////////////////////////////////////////
const webpush = require('web-push');
// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

const pushSubscription = {
endpoint: "https://fcm.googleapis.com/fcm/send/c_gj8lkHBJw:APA91bHf0PhZaSSqPnOzrAIfuq5N9qDKA30qLeMubG49uczr_sHns5HTwEtsyNy_ZT0GNWNjjYuKlHZJvqXYYjXmsmCP3DXKMHy-9uTW29gUoleMNf5-s7dsfmdV830wE1aHDNOCfSx7",
  keys: {
    p256dh: 'BKRlP5d01Ehx9jEvh7kAFtZox/rHclvBI2r90SVR41+1hZpNpnQusqRtx5TnuhU/XOqg611kebhOWJgM2YY9aV0=',
    auth: 'InzRSqHNc63giqrLvUz2sA=='
  }
};

const payload = 'Pay Load!';

const options = {
  gcmAPIKey: "AAAAg4OB7Yk:APA91bFPb7kkVePgoWGDOfauKSBw45b5GwlV1qbo9XgLISbBRFI-t_LeZ-Pnu2q34vTMgtyWwFnBomUsoku_HA2Y5Kw0floMAtd4KzJiCPd7oP-3VpmYF5X9wg20vOF7lcTbvAHhBM94",
  vapidDetails: {
    subject: 'mailto:chokim159@naver.com',
    publicKey: vapidKeys.publicKey,
    privateKey: vapidKeys.privateKey
  },
  TTL: 4,
  headers: {
  'Content-type':'application/json'
    }
}
/////////////////////////////////////////////////////////////////////////
/*
const webpush = require("web-push");

*/
export default {
  components: {
    markdownEditor,
    Imgur
  },
  data() {
    return {
      title: "",
      content: "",
      dialog: false,
      author: this.$store.state.umail
    };
  },
  methods: {
    chkNull() {
      var chk = false;
      if (this.title.length < 1) {
        alert("제목을 입력하세요");
        return chk;
      } else if (this.content.length < 1) {
        alert("내용을 입력하세요");
        return chk;
      }
      chk = true;
      return chk;
    },
    writePortfolio() {
      if (this.chkNull()) {
        // writePF $on at compoents/Imgur.vue

      webpush.sendNotification(pushSubscription, payload, options);


        //webpush.sendNotification(pushSubscription, payload, options);

        this.$EventBus.$emit("writePF", this.author, this.title, this.content);
      }
    }
  }
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>
