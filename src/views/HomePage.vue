<template>
  <div>
    <!-- Top image -->
    <ImgBanner>
      <div id="imgBanner" slot="text">
        <h1 id="bannerTxt">
          Keep Going
        </h1>
      </div>
    </ImgBanner>

    <!-- About Me -->
    <v-container>
      <v-carousel
        align-center
        dark
        hide-delimiters
        delimiter-icon="stop"
        prev-icon="fa-angle-left"
        next-icon="fa-angle-right"
        id="about"
      >
        <!-- Get member information -->
        <v-carousel-item v-for="(member, i) in members" :key="i">
          <v-layout fill-height id="aboutMe">
            <v-flex xs12 md8 id="about-text" mx-2>
              <h2 class="titles mb-3 font-weight-light">
                <span>About</span>
                <span id="highlight-fontColor">Me</span>
              </h2>

              <p class="font-weight-light">
                {{ member.name }}
              </p>

              <!-- Each information of Member -->
              <p v-for="prof in member.profile" :key="prof.name">
                {{ prof }}
              </p>
            </v-flex>

            <!-- Member Image -->
            <v-flex md4 mx-2 id="about-img">
              <v-img
                id="about-img2"
                v-bind:src="member.src"
                aspect-ratio="1.5"
              />
            </v-flex>
          </v-layout>
        </v-carousel-item>
      </v-carousel>

      <!-- Scroll Button -->
      <v-layout class="align-center justify-center">
        <button
          class="scrollbtn"
          v-on:click="check('#Portfolio')"
          @click="$vuetify.goTo(target, options)"
          icon
        >
          <v-icon size="30px">fa-arrow-down</v-icon>
        </button>
      </v-layout>

      <!-- Post, Portfolio, Gitlab information -->
      <div v-for="view in views" v-bind:id="view.name" :key="view.name">
        <v-layout my-5 class="contents">
          <v-flex xs12>
            <h2 class="titles my-3 font-weight-light text-xs-center">
              {{ view.name }}
            </h2>
            <component :is="view.comp" :column="view.column"></component>
          </v-flex>
        </v-layout>

        <v-layout
          v-if="view.name === 'Portfolio' || view.name === 'Post'"
          class="align-center justify-center"
        >
          <button
            class="scrollbtn"
            v-on:click="check(view.next)"
            @click="$vuetify.goTo(target, options)"
            icon
          >
            <v-icon size="30px">fa-arrow-down</v-icon>
          </button>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import RepositoryList from "../components/RepositoryList";

export default {
  name: "HomePage",
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList
  },
  data() {
    return {
      language: "KOR",
      views: [
        {
          name: "Portfolio",
          comp: PortfolioList,
          next: "#Post",
          column: 0
        },
        {
          name: "Post",
          comp: PostList,
          next: "#Project",
          column: 2
        },
        {
          name: "Project",
          comp: RepositoryList,
          next: "None",
          column: 0
        }
      ],
      members: [
        {
          name: "양동권 \n",
          profile: [
            "전남대학교 소프트웨어공학전공",
            "국립아시아문화전당 창제작센터 실습",
            "빅데이터엔지니어양성과정 1기",
            "삼성청년소프트웨어아카데미 1기"
          ],
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          name: "박사홍 \n",
          profile: [
            "조선대학교 컴퓨터공학과",
            "멋쟁이사자처럼 5기 운영진",
            "BOB 7기 보안제품개발 트랙",
            "삼성청년소프트웨어아카데미 1기"
          ],
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          name: "박근형 \n",
          profile: [
            "조선대학교 컴퓨터공학전공",
            "정보보호 동아리 Hacker Login",
            "삼성청년소프트웨어아카데미 1기"
          ],
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        }
      ],
      type: "selector",
      selector: "",
      duration: 400,
      offset: 50
    };
  },
  methods: {
    getImgUrl(img) {
      return require("../assets/" + img);
    },
    check(value) {
      this.selector = value;
    }
  },
  computed: {
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset
      };
    }
  }
};
</script>

<style scoped>
.contents,
#about {
  background-color: #212121;
  padding: 20px;
  border-radius: 10px;
}

#about {
  margin-top: 50px;
  margin-bottom: 50px;
  height: 400px !important;
}

#about-img2 {
  height: 350px;
}

@media screen and (max-width: 780px) {
  #about {
    height: 300px !important;
  }
}

@media screen and (max-width: 600px) {
  #about {
    height: 300px !important;
  }
  #about-img {
    display: none;
  }
}
</style>
