<template>
  <div>
    <v-form>
      <v-container my-5>
        <!-- Title Text field-->
        <v-flex>
          <v-text-field
            v-model="title"
            color="#00adb5"
            label="Title"
            box
          ></v-text-field>
        </v-flex>

        <v-textarea
          v-model="content"
          placeholder="내용"
          rows="20"
          solo
          light
        ></v-textarea>

        <!-- Write Portfolio Button -->
        <v-btn
          class="right"
          id="highlight-backColor"
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
      form.append("author", this.$store.state.umail);
      form.append("title", this.title);
      form.append("body", this.content);
      return form;
    },
    pushFormData(title) {
      var form = new FormData();
      form.append("title", "Post가 등록되었습니다.");
      form.append("message", title);

      return form;
    },
    writePost() {
      if (this.chkNull()) {
        var form = this.makeFormData();
        var postform = this.pushFormData(this.title);

        Server(this.$store.state.SERVER_URL).post("/api/add/post", form);
        Server(this.$store.state.SERVER_URL).post("/api/post/push", postform);
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
