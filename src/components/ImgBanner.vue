<template>
  <div>
    <!-- Show Images -->
    <v-img :src="imgSrc" aspect-ratio="2.0">
      <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light">
            <slot name="text" />
          </span>
        </v-flex>
      </v-layout>
    </v-img>

    <v-dialog v-model="dialog" max-width="500px">
      <!-- Get Album Image -->
      <template v-slot:activator="{ on }">
        <v-btn id="getAlbumBtn" @click="getAlbumImg" v-on="on" icon light>
          <v-icon id="highlight-fontColor" size="40px">fa-caret-right</v-icon>
        </v-btn>
      </template>

      <!-- Banner Dialog -->
      <v-card>
        <v-card-title class="headline">
          Select Image
        </v-card-title>
        <v-card-text>
          <v-flex xs12 md12 text-xs-center>
            <v-btn
              id="highlight-backColor"
              @click="uploadBannerDialog = !uploadBannerDialog"
            >
              Image upload
            </v-btn>
          </v-flex>

          <!-- Select Album Image -->
          <v-select
            color="#00adb5"
            :items="albumImgs"
            label="Select Image"
            item-text="title"
            item-value="link"
            v-model="selectedImg"
            append-icon="fa-angle-down"
          >
          </v-select>
        </v-card-text>

        <!-- Close, RandomImg, Save Button -->
        <v-card-actions>
          <v-btn flat @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="RandomImg">Random Img</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="ChangeImg">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Upload Banner Dialog -->
    <v-dialog v-model="uploadBannerDialog" max-width="300px">
      <v-card>
        <v-card-title>
          <span>Upload Image</span>
          <v-spacer></v-spacer>
        </v-card-title>

        <!-- Imgur components -->
        <Imgur></Imgur>

        <v-card-actions>
          <v-btn flat @click="uploadBannerDialog = false">Close</v-btn>
          <v-btn flat @click="Upload()">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Imgur from "../components/Imgur";
import ImgurApi from "../services/ImgurApi";

export default {
  name: "ImgBanner",
  props: {
    text: {
      type: String
    }
  },
  components: {
    Imgur
  },
  data() {
    return {
      imgSrc: "",
      albumImgs: [],
      dialog: false,
      uploadBannerDialog: false,
      selectedImg: "",
      random_base_url: "https://source.unsplash.com/random"
    };
  },
  created() {
    this.$store.commit("setUrl", this.random_base_url);
    this.imgSrc = this.$store.state.url;
  },
  methods: {
    RandomImg() {
      this.$store.commit("setUrl", this.random_base_url);
      this.imgSrc = this.$store.state.url;
      this.dialog = false;
    },
    ChangeImg() {
      if (this.selectedImg == "") {
        alert("이미지를 선택해주세요");
        return;
      }
      this.$store.commit("setUrl", this.selectedImg);
      this.imgSrc = this.selectedImg;
      this.dialog = false;
    },
    getAlbumImg() {
      const BASE_URL = "https://api.imgur.com/3/";
      var images = ImgurApi(BASE_URL).get(`album/pQivCF9`);
      images.then(data => {
        var response = data["data"];
        this.albumImgs = response["data"]["images"];
      });
    },
    Upload() {
      this.$EventBus.$emit("uploadImgBanner");
      this.uploadBannerDialog = false;
    }
  }
};
</script>

<style>
.text-shadow {
  text-shadow: 0 0 15px rgb(255, 255, 255);
  font-family: "Press Start 2P", cursive !important;
}

#getAlbumBtn {
  position: absolute;
  right: 0px;
}
</style>
