<template>
  <div id="detail">
    <v-form>
      <!-- random img -->
      <div class="mt-5">
        <v-img :src="random_base_url" height="300px" />
      </div>

      <v-container mt-3>
        <template v-if="editflag">
          <!-- Post title -->
          <div id="detail_title">
            <h2>{{ post.title }}</h2>
          </div>

          <!-- Post author -->
          <div class="mb-1">
            {{ post.author }}
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

          <!-- Post created time -->
          <div>
            {{ post.created_at }}
          </div>

          <!-- Post body readonly -->
          <div class="postcontext my-5">
            <vue-markdown>{{ post.body }}</vue-markdown>
          </div>
        </template>

        <!-- Edit portfolio body -->
        <template v-else>
          <v-flex>
            <v-text-field
              color="#00adb5"
              v-model="post.title"
              label="Title"
              box
            ></v-text-field>
          </v-flex>
          <markdown-editor
            v-model="post.body"
            ref="markdownEditor"
          ></markdown-editor>
        </template>

        <!-- Edit and Delte button -->
        <template v-if="authCheck">
          <div class="editBtn">
            <v-btn color="#00adb5" @click="updatePost" depressed>
              수정
            </v-btn>
            <v-btn color="error" @click="deletePost" depressed>
              삭제
            </v-btn>
          </div>
        </template>
        <v-btn @click="vb">버튼</v-btn>
        <!-- Post Comments -->
        <div class="comments">
          <VueDisqus
            shortname="webmobile-team10"
            :url="this.$store.state.DISQUS_URL + '/post' + post.num"
            :identifier="'post' + post.num"
            v-on:new-comment="newComment"
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
      post: this.$route.params.post,
      editflag: true,
      authCheck: false,
      random_base_url: "https://source.unsplash.com/random",
      user_auth: "",
      grades: ["🧑Guest", "👪Member", "🤴Admin"],
      oncomment: ""
    };
  },
  created() {
    var uauth = this.$store.state.uauth;
    if (uauth == 2) {
      this.authCheck = true;
    } else if (uauth == 1) {
      if (this.$store.state.umail == this.post.author) {
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
      form.append("num", this.post.num);
      form.append("title", this.post.title);
      form.append("body", this.post.body);
      form.append("loginId", this.$store.state.umail);
      return form;
    },
    updatePost() {
      if (this.editflag) {
        this.editflag = false;
        alert("수정모드로 전환되었습니다. 수정해주세요.");
        return;
      }
      var form = this.makeFormData();
      Server(this.$store.state.SERVER_URL).post("/api/edit/post", form);
      this.$router.push("/");
      alert("수정 되었습니다.");
    },
    deletePost() {
      var form = this.makeFormData();
      Server(this.$store.state.SERVER_URL).post("/api/del/post", form);
      this.$router.push("/");
      alert("삭제 되었습니다.");
    },
    pushFormData(title) {
      var form = new FormData();
      form.append("title", "Comment가 등록되었습니다.");
      form.append("message", "Portfolio : " + title);

      return form;
    },
    newComment() {
      var form = this.pushFormData(this.post.title);
      Server(this.$store.state.SERVER_URL).post("/api/comment/push", form);
    },
    async getUserAuth() {
      var form = new FormData();
      form.append("umail", this.post.author);
      await Server(this.$store.state.SERVER_URL)
        .post("/api/get/user_auth", form)
        .then(res => {
          this.user_auth = res.data[0].uauth;
        });
    }
  }
};
</script>
