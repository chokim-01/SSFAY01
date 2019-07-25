<template>
  <div>
    <v-form>
      <v-container my-5>
        <template v-if="editflag">
          <!-- Title -->
          <v-layout justify-center>
            <p>{{ post.title }}</p>
          </v-layout>
          <hr />
          <!-- Date -->

          <v-flex>
            <v-text-field v-model="post.created_at" readonly reverse />
          </v-flex>

          <!-- Context -->
          <!-- View markdown ( No Edit ) -->
          <vue-markdown>{{ post.body }}</vue-markdown>
        </template>

        <!-- Edit markdown -->

        <template v-else>
          <v-flex>
            <v-text-field v-model="post.title" solo></v-text-field>
          </v-flex>
          <markdown-editor
            v-model="post.body"
            ref="markdownEditor"
          ></markdown-editor>
        </template>

        <div class="editBtn">
          <v-btn @click="updatePost">수정</v-btn>
          <v-btn @click="deletePost">삭제</v-btn>
        </div>
        <div class="comments">
          <VueDisqus
            shortname="webmobile-team10"
            :url="'https://webmobile-team10.disqus.com/post' + post.num"
            :identifier="post.num"
          ></VueDisqus>
        </div>
      </v-container>
      <!-- Comments -->
    </v-form>
  </div>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";
import VueMarkdown from "vue-markdown";
import Server from "../services/Server.js";
const SERVER_URL = "http://localhost:5000";

export default {
  components: {
    VueMarkdown,
    markdownEditor
  },
  data() {
    return {
      post: this.$route.params.post,
      editflag: true
    };
  },
  methods: {
    makeFormData() {
      var form = new FormData();
      form.append("num", this.post.num);
      form.append("title", this.post.title);
      form.append("body", this.post.body);
      form.append("created_at", this.post.created_at);
      return form;
    },
    updatePost() {
      if (this.editflag) {
        this.editflag = false;
        alert("마크다운 에디터로 전환되었습니다. 수정해주세요.");
        return;
      }
      var form = this.makeFormData();
      Server(SERVER_URL).post("/api/edit/post", form);
      this.$router.push("/");
      alert("수정 되었습니다.");
    },
    deletePost() {
      var form = this.makeFormData();
      Server(SERVER_URL).post("/api/del/post", form);
      this.$router.push("/");
      alert("삭제 되었습니다.");
    }
  }
};
</script>

<style>
hr {
  border: dotted;
  width: 40%;
  margin: 0 auto;
}
.editBtn {
  float: right;
}
</style>
