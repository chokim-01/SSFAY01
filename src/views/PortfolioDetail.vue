<template>
  <div>
    <v-form>
      <v-container my-5>
        <v-layout row>
          <!-- Title -->
          <v-flex sm7>
            <p>Title</p>
            <v-text-field v-model="portfolio.title" solo readonly />
          </v-flex>

          <!-- Date -->
          <v-flex sm5>
            <p>Date</p>
            <v-text-field v-model="portfolio.created_at" solo readonly />
          </v-flex>
        </v-layout>
        <!-- 썸네일 표시하고. 바로 밑에 썸네일, 수정/삭제 오른쪽하단, min-width 필요.-->
        <!-- 제목 ___ Date
        <!-- Context -->
        <p>Context</p>
        <!-- View markdown ( No Edit ) -->
        <template v-if="editflag">
          <vue-markdown>{{ portfolio.body }}</vue-markdown>
        </template>

        <!-- Edit markdown -->
        <template v-else>
          <markdown-editor
            v-model="portfolio.body"
            ref="markdownEditor"
          ></markdown-editor>
        </template>

        <v-btn @click="updatePortfolio">수정</v-btn>
        <v-btn @click="deletePortfolio">삭제</v-btn>
        <v-text-field v-model="portfolio.num"></v-text-field>
      </v-container>

      <!-- Comments -->
      <div class="comments">
        <VueDisqus
          shortname="webmobile-team10"
          :url="'https://webmobile-team10.disqus.com/portfolio' + portfolio.num"
          :identifier="portfolio.num"
        ></VueDisqus>
      </div>
    </v-form>
  </div>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";
import VueMarkdown from "vue-markdown";
import Server from "../services/Server.js";
const BASE_URL = "http://localhost:5000";

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
      form.append("img", this.portfolio.imgSrc);
      form.append("created_at", this.portfolio.date);
      return form;
    },
    updatePortfolio() {
      if (this.editflag) {
        this.editflag = false;
        alert("마크다운 에디터로 전환되었습니다. 수정해주세요.");
        return;
      } else {
        this.editflag = true;
        this.$router.push("/");
      }
      var form = this.makeFormData();
      Server(BASE_URL).post("/api/edit/portfolio", form);

      this.editflag = true;
      this.$router.push("/");
    },
    deletePortfolio() {
      var form = this.makeFormData();
      Server(BASE_URL).post("/api/del/portfolio", form);
      this.$router.push("/");
    }
  }
};
</script>
