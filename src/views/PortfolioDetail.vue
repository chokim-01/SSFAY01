<template>
  <div>
    <v-form>
      <v-container my-5>
        <template v-if="editflag">
          <!-- Portfolio title -->
          <v-layout justify-center>
            <p class="posttitle">{{ portfolio.title }}</p>
          </v-layout>

          <hr />

          <!-- Portfolio author -->
          <v-layout justify-end>
            <v-chip color="#00adb5" label>
              <v-icon left>mdi-account-circle-outline</v-icon>
              {{ portfolio.author }}
            </v-chip>
          </v-layout>

          <!-- Portfolio created time -->
          <v-layout>
            <v-chip color="grey" label text-color="white">
              <v-icon left>label</v-icon>
              {{ portfolio.created_at }}
            </v-chip>
          </v-layout>

          <!-- Portfolio body readonly -->
          <div class="postcontext my-5">
            <vue-markdown>{{ portfolio.body }}</vue-markdown>
          </div>
        </template>

        <!-- Edit portfolio body -->
        <template v-else>
          <v-flex>
            <v-text-field v-model="portfolio.title" solo></v-text-field>
          </v-flex>
          <markdown-editor
            v-model="portfolio.body"
            ref="markdownEditor"
          ></markdown-editor>
        </template>

        <template v-if="authCheck">
          <div class="editBtn">
            <v-btn @click="updatePortfolio">수정</v-btn>
            <v-btn @click="deletePortfolio">삭제</v-btn>
          </div>
        </template>

        <!-- Portfolio comments -->
        <div class="comments">
          <VueDisqus
            shortname="webmobile-team10"
            :url="this.$store.state.DISQUS_URL + '/portfolio' + portfolio.num"
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

export default {
  components: {
    VueMarkdown,
    markdownEditor
  },
  data() {
    return {
      portfolio: this.$route.params.portfolio,
      editflag: true,
      authCheck: false
    };
  },
  created() {
    var uauth = this.$store.state.uauth;
    if (uauth == 2) {
      this.authCheck = true;
    } else if (uauth == 1) {
      if (this.$store.state.umail == this.portfolio.author) {
        this.authCheck = true;
      }
    }
  },
  methods: {
    makeFormData() {
      var form = new FormData();
      form.append("num", this.portfolio.num);
      form.append("title", this.portfolio.title);
      form.append("body", this.portfolio.body);
      form.append("loginId", this.$store.state.umail);
      return form;
    },
    updatePortfolio() {
      if (this.editflag) {
        this.editflag = false;
        alert("마크다운 에디터로 전환되었습니다. 수정해주세요.");
        return;
      }
      var form = this.makeFormData();
      Server(this.$store.state.SERVER_URL).post("/api/edit/portfolio", form);
      this.$router.push("/");
      alert("수정 되었습니다.");
    },
    deletePortfolio() {
      var form = this.makeFormData();
      Server(this.$store.state.SERVER_URL).post("/api/del/portfolio", form);
      this.$router.push("/");
      alert("삭제 되었습니다.");
    }
  }
};
</script>

<style>
.postcontext {
  border: 2px solid white;
  min-height: 500px;
}

.posttitle {
  font-size: 3em;
}

hr {
  border: dotted;
  width: 40%;
  margin: 0 auto;
}

.editBtn {
  float: right;
}
</style>
