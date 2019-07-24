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
            <v-text-field v-model="portfolio.date" solo readonly />
          </v-flex>
        </v-layout>

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
      </v-container>
    </v-form>
  </div>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";
import VueMarkdown from "vue-markdown";
import Fbs from "../services/FirebaseService.js";

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
    updatePortfolio() {
      if (this.editflag) {
        this.editflag = false;
        alert("마크다운 에디터로 전환되었습니다. 수정해주세요.");
        return;
      }
      Fbs.updatePortfolio(this.portfolio.id, this.portfolio.body);
      this.editflag = true;
      this.$router.push("/");
    },
    deletePortfolio() {
      Fbs.deletePortfolio(this.portfolio.id);
      this.$router.push("/");
    }
  }
};
</script>
