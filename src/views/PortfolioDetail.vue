<template>
  <div>
    <v-form>
      <v-container my-5>
        <template v-if="editflag">
          <!-- Title -->
          <v-layout justify-center>
            <p>{{ portfolio.title }}</p>
          </v-layout>
          <hr />
          <!-- Date -->

          <v-flex>
            <v-text-field v-model="portfolio.created_at" readonly reverse />
          </v-flex>

          <!-- Context -->
          <!-- View markdown ( No Edit ) -->
          <vue-markdown>{{ portfolio.body }}</vue-markdown>
        </template>

        <!-- Edit markdown -->

        <template v-else>
          <v-flex>
            <v-text-field v-model="portfolio.title" solo></v-text-field>
          </v-flex>
          <markdown-editor
            v-model="portfolio.body"
            ref="markdownEditor"
          ></markdown-editor>
        </template>

        <div class="editBtn">
          <v-btn @click="updatePortfolio">수정</v-btn>
          <v-btn @click="deletePortfolio">삭제</v-btn>
        </div>
        <!-- Comments -->
        <div class="comments">
          <VueDisqus
            shortname="webmobile-team10"
            :url="
              'https://webmobile-team10.disqus.com/portfolio' + portfolio.num
            "
            :identifier="'portfolio' + portfolio.num"
          ></VueDisqus>
        </div>
      </v-container>
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
      portfolio: this.$route.params.portfolio,
      editflag: true
    };
  },
  methods: {
    makeFormData() {
      var form = new FormData();
      form.append("num", this.portfolio.num);
      form.append("title", this.portfolio.title);
      form.append("body", this.portfolio.body);
      form.append("img", this.portfolio.img);
      form.append("created_at", this.portfolio.created_at);
      return form;
    },
    updatePortfolio() {
      if (this.editflag) {
        this.editflag = false;
        alert("마크다운 에디터로 전환되었습니다. 수정해주세요.");
        return;
      }
      var form = this.makeFormData();
      Server(SERVER_URL).post("/api/edit/portfolio", form);
      this.$router.push("/");
      alert("수정 되었습니다.");
    },
    deletePortfolio() {
      var form = this.makeFormData();
      Server(SERVER_URL).post("/api/del/portfolio", form);
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
