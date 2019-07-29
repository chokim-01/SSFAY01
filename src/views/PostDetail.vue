<template>
  <div>
    <v-form>
      <v-container my-5>
        <template v-if="editflag">
          <!-- Post title -->
          <v-layout justify-center>
            <p class="posttitle">{{ post.title }}</p>
          </v-layout>

          <hr />

          <!-- Post author -->
          <v-layout justify-end>
            <v-chip color="#00adb5" label>
              <v-icon left>mdi-account-circle-outline</v-icon>
              {{ post.author }}
            </v-chip>
          </v-layout>

          <!-- Post created time -->
          <v-layout>
            <v-chip color="grey" label text-color="white">
              <v-icon left>label</v-icon>
              {{ post.created_at }}
            </v-chip>
          </v-layout>
        </template>

        <!-- Edit page If user click edit button -->
        <template v-else>
          <v-flex>
            <v-text-field v-model="post.title" solo></v-text-field>
          </v-flex>
        </template>

        <!-- Post body -->
        <v-textarea
          class="postcontext my-5"
          v-model="post.body"
          placeholder="내용"
          :readonly="editflag"
          rows="20"
          solo
          light
        ></v-textarea>

        <template v-if="authCheck">
          <div class="editBtn">
            <v-btn @click="updatePost">수정</v-btn>
            <v-btn @click="deletePost">삭제</v-btn>
          </div>
        </template>
        <div class="comments">
          <!-- Post Comments -->
          <VueDisqus
            shortname="webmobile-team10"
            :url="this.$store.state.DISQUS_URL + '/post' + post.num"
            :identifier="'post' + post.num"
          ></VueDisqus>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Server from "../services/Server.js";

export default {
  data() {
    return {
      post: this.$route.params.post,
      editflag: true,
      authCheck: false
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
      Server(this.$store.state.SERVER_URL).post("/api/edit/post", form);
      this.$router.push("/");
      alert("수정 되었습니다.");
    },
    deletePost() {
      var form = this.makeFormData();
      Server(this.$store.state.SERVER_URL).post("/api/del/post", form);
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
