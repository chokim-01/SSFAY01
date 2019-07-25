<template>
  <div>
    <v-form>
      <v-container my-5>
        <!-- Title Text field-->
        <v-flex>
          <v-text-field v-model="title" label="제목" solo></v-text-field>
        </v-flex>
        <textarea v-model="content" placeholder="내용"></textarea>

        <!-- Write Portfolio Button -->
        <v-btn
          id="highlight-backColor"
          class="right"
          @click="writePost"
          depressed
        >
          글쓰기
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Server from "../services/Server.js";
const SERVER_URL = "http://localhost:5000";

export default {
  data() {
    return {
      title: "",
      content: "",
      dialog: false
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
    makeFormData() {
      var form = new FormData();
      form.append("title", this.title);
      form.append("body", this.content);
      return form;
    },
    writePost() {
      if (this.chkNull()) {
        var form = this.makeFormData();
        Server(SERVER_URL).post("/api/add/post", form);
        this.$router.push("/");
        alert("글을 작성했습니다.");
      }
    }
  }
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>
