<template>
  <div>
    <v-form>
      <v-container my-5>
        <!-- Title Text field-->
        <v-flex>
          <v-text-field v-model="title" label="제목" solo></v-text-field>
        </v-flex>

        <!-- Markdown Editor -->
        <markdown-editor
          v-model="content"
          ref="markdownEditor"
        ></markdown-editor>

        <!-- upload image -->
        <Imgur></Imgur>

        <!-- Write Portfolio Button -->
        <v-btn
          id="highlight-backColor"
          class="right"
          @click="writePortfolio"
          depressed
        >
          글쓰기
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>

import markdownEditor from "vue-simplemde/src/markdown-editor";
import Imgur from "../components/Imgur";

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
        navigator.serviceWorker.ready.then(
          navigator.serviceWorker.controller.postMessage({
          'Title': this.title,
          'Author': this.author,
          'Content': this.content
        }));
        // writePF $on at compoents/Imgur.vue
        this.$EventBus.$emit("writePF", this.author, this.title, this.content);
      }
    }
  }
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
</style>
