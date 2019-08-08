<template>
  <div id="detail">
    <v-form>
      <!-- Portfolio img -->
      <div class="mt-5">
        <v-img :src="portfolio.img" height="300px" />
      </div>

      <v-container mt-3>
        <template v-if="editflag">
          <!-- Portfolio title -->
          <div id="detail_title">
            <h2>{{ portfolio.title }}</h2>
          </div>

          <!-- Portfolio author -->
          <div class="mb-1">
            {{ portfolio.author }}
            <template v-for="(grade, index) in grades">
              <span
                class="ml-2"
                id="user_auth"
                v-if="user_auth == index"
                v-bind:key="grade"
              >
                {{ grade }}
              </span>
            </template>
          </div>

          <!-- Portfolio created time -->
          <div>
            {{ portfolio.created_at }}
          </div>

          <!-- Portfolio body readonly -->
          <div class="postcontext my-5">
            <vue-markdown>{{ portfolio.body }}</vue-markdown>
          </div>
        </template>

        <!-- Edit portfolio body -->
        <template v-else>
          <v-flex>
            <v-text-field
              color="#00adb5"
              v-model="portfolio.title"
              label="Title"
              box
            ></v-text-field>
          </v-flex>
          <markdown-editor
            v-model="portfolio.body"
            ref="markdownEditor"
          ></markdown-editor>
        </template>

        <!-- Edit and Delte button -->
        <template v-if="authCheck">
          <div class="editBtn">
            <v-btn depressed color="#00adb5" @click="updatePortfolio">
              수정
            </v-btn>
            <v-btn depressed color="error" @click="deletePortfolio">
              삭제
            </v-btn>
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
      authCheck: false,
      user_auth: "",
      grades: ["🧑Guest", "👪Member", "🤴Admin"]
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
  mounted() {
    this.getUserAuth();
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
    },
    async getUserAuth() {
      var form = new FormData();
      form.append("umail", this.portfolio.author);
      await Server(this.$store.state.SERVER_URL)
        .post("/api/get/user_auth", form)
        .then(res => {
          this.user_auth = res.data[0].uauth;
        });
    }
  }
};
</script>
