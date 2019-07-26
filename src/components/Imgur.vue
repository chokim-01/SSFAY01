<template>
  <v-content>
    <v-container fluid>
      <v-flex
        xs12
        class="text-xs-center text-sm-center text-md-center text-lg-center"
      >
        <img :src="imageUrl" height="150" v-if="imageUrl" />

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
//import Fbs from "../services/FirebaseService.js";
import ImgurApi from "../services/ImgurApi";
import Server from "../services/Server.js";
const IMGUR_URL = "https://api.imgur.com/3/";
const SERVER_URL = "http://localhost:5000";

export default {
  data() {
    return {
      imageName: "",
      imageUrl: "",
      imageFile: ""
    };
  },
  created() {
    var self = this;

    // writePortfolio
    this.$EventBus.$once("writePF", function(author, title, content) {
      self.sendPF(author, title, content);
    });

    // Image Banner upload
    this.$EventBus.$once("uploadImgBanner", function() {
      self.sendBanner();
    });
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
      await ImgurApi(IMGUR_URL).post(`image`, form);
    },
    async sendPF(author, title, content) {
      const portfolioID = "3W37WEYawFLVyPi";
      var form = this.makeFormData(portfolioID);
      var self = this;
      await ImgurApi(IMGUR_URL)
        .post(`image`, form)
        .then(response => {
          this.imageUrl = response.data.data.link;
        });
      var portfolioForm = this.sendFormData(
        author,
        title,
        content,
        self.imageUrl
      );
      await Server(SERVER_URL).post("/api/add/portfolio", portfolioForm);
      alert("글을 작성했습니다.");
      window.location.href = "/";
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
