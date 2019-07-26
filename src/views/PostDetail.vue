<template>
  <div>
    <v-form>
      <v-container my-5>
        <template v-if="editflag">
          <!-- Title -->
          <v-layout justify-center>
            <p class="posttitle">{{ post.title }}</p>
          </v-layout>
          <hr />
          <!-- Date -->
          <v-layout justify-right>
            <v-flex>
              <v-text-field v-model="post.created_at" readonly reverse />
            </v-flex>
          </v-layout>
        </template>
        <!-- Edit mode -->
        <template v-else>
          <v-flex>
            <v-text-field v-model="post.title" solo></v-text-field>
          </v-flex>
        </template>
        <!-- Context -->
        <v-textarea
          light
          v-model="post.body"
          placeholder="내용"
          rows="20"
          solo
          :readonly="editflag"
        ></v-textarea>

        <div class="editBtn">
          <v-btn @click="updatePost">수정</v-btn>
          <v-btn @click="deletePost">삭제</v-btn>
        </div>
        <div class="comments">
          <!-- Comments -->
          <VueDisqus
            shortname="webmobile-team10"
            :url="'https://webmobile-team10.disqus.com/post' + post.num"
            :identifier="'post' + post.num"
          ></VueDisqus>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Server from "../services/Server.js";
const SERVER_URL = "http://localhost:5000";

export default {
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
        alert("수정모드로 전환되었습니다. 수정해주세요.");
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
