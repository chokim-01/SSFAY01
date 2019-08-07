<template>
  <v-content>
    <v-container fluid>
      <v-flex
        xs12
        class="text-xs-center text-sm-center text-md-center text-lg-center"
      >
        <!-- Show image -->
        <div
          id="show_image"
          v-if="imageUrl"
          :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
        ></div>

        <v-text-field
          label="Thumbnail Image"
          @click="selectImg"
          v-model="imageName"
          prepend-icon="attach_file"
        ></v-text-field>

        <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="selectedImg"
        />
      </v-flex>
    </v-container>
  </v-content>
</template>

<script>
import ImgurApi from "../services/ImgurApi";
import Server from "../services/Server.js";

export default {
  data() {
    return {
      imageName: "",
      imageUrl: "",
      imageFile: "",
      cnt: 0
    };
  },
  mounted() {
    var self = this;

    // writePortfolio
    this.$EventBus.$on("writePF", function(author, title, content) {
      if (self.imageUrl !== "") {
        self.getImgurUrl().then(res => {
          self.imageUrl = res.data.data.link;
          self.sendPF(author, title, content);
        });
      } else {
        self.imageUrl = "https://source.unsplash.com/random";
        self.sendPF(author, title, content);
      }

      alert("글을 작성했습니다.");
      self.$router.push("/");
    });

    // Image Banner upload
    this.$EventBus.$on("uploadImgBanner", function() {
      self.sendBanner();
    });

    this.sendBanner;
    this.sendPF;
    this.getImgurUrl;
  },
  beforeDestroy() {
    this.$EventBus.$off("writePF");
  },
  methods: {
    sendFormData(author, title, body, img) {
      var form = new FormData();
      form.append("author", author);
      form.append("title", title);
      form.append("body", body);
      form.append("img", img);

      return form;
    },
    makeFormData(albumID) {
      var form = new FormData();
      form.append("image", this.imageFile);
      form.append("title", this.imageName);
      form.append("album", albumID);

      return form;
    },
    async sendBanner() {
      const bannerID = "N9DRFuvC9ppf6r4";
      var form = this.makeFormData(bannerID);
      await ImgurApi(this.$store.state.IMGUR_URL).post(`image`, form);
    },
    getImgurUrl() {
      const portfolioID = "3W37WEYawFLVyPi";
      var form = this.makeFormData(portfolioID);
      return ImgurApi(this.$store.state.IMGUR_URL).post(`image`, form);
    },
    sendPF(author, title, content) {
      var portfolioForm = this.sendFormData(
        author,
        title,
        content,
        this.imageUrl
      );
      Server(this.$store.state.SERVER_URL).get("/api/push");
      return Server(this.$store.state.SERVER_URL).post(
        "/api/add/portfolio",
        portfolioForm
      );
    },
    selectImg() {
      this.$refs.image.click();
    },
    selectedImg(e) {
      const files = e.target.files;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(files[0]);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          this.imageFile = files[0];
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    }
  }
};
</script>

<style scoped>
#show_image {
  height: 200px;
  width: 100%;
  background-size: contain;
  background-position: center;
}
</style>
