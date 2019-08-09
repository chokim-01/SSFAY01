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

        <!-- Markdown Editor -->
        <markdown-editor
          v-model="content"
          ref="markdownEditor"
        ></markdown-editor>

        <!-- upload image -->
        <Imgur></Imgur>
        <button id="writebutton">버튼</button>

        <!-- Write Portfolio Button -->
        <v-btn
          class="right"
          id="highlight-backColor"
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
import Imgur from "../components/Imgur.vue";

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
        this.$EventBus.$emit("writePF", this.author, this.title, this.content);
      }
    }
  }
};
</script>

<style scoped>
@import "~simplemde/dist/simplemde.min.css";
</style>
