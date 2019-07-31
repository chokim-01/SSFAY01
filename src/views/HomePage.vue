<template>
  <div class="fullpage-container">
    <div class="fullpage-wp" v-fullpage="opts" ref="example">
      <!-- Top image -->
      <div class="page bannerPage">
        <ImgBanner>
          <div id="imgBanner" slot="text" v-animate="{ value: 'flash' }">
            <h1 id="bannerTxt" class="bannerLarge">
              Keep Going
            </h1>
            <div id="bannerTxt" class="bannerSmall">
              <h1>Keep</h1>
              <h1>Going</h1>
            </div>
          </div>
        </ImgBanner>
      </div>

      <!-- About Me -->
      <div class="page aboutPage">
        <v-container fill-height grid-list-md>
          <v-layout row wrap align-center>
            <!-- Title -->
            <v-layout>
              <v-flex xs12>
                <h2
                  class="titles my-3 font-weight-light text-xs-center"
                  v-animate="{ value: 'fadeInLeft' }"
                >
                  <span>About</span>
                  <span id="highlight-fontColor">US</span>
                </h2>
                <p
                  class="text-xs-center"
                  v-animate="{ value: 'fadeInLeft', delay: 300 }"
                >
                  안녕하세요<br />
                  10TRIILION입니다<br />
                  3명이지만 힘들지 않습니다🤢
                </p>
              </v-flex>
            </v-layout>

            <!-- content -->
            <v-carousel
              hide-delimiters
              hide-controls
              vertical
              grid-list-md
              text-xs-center
              id="about"
              v-animate="{ value: 'fadeInLeft', delay: 600 }"
            >
              <!-- Get member information -->
              <v-carousel-item v-for="(member, i) in members" :key="i">
                <v-layout id="aboutMe" mx-2 row align-center>
                  <!-- Member Image -->
                  <v-flex md6 id="about-img">
                    <v-img id="about-img2" v-bind:src="member.src" />
                  </v-flex>

                  <!-- Each information of Member -->
                  <v-flex xs12 md6 id="about-text" text-xs-right>
                    <h2
                      class="titles m_name font-weight-light"
                      id="highlight-fontColor"
                    >
                      {{ member.name }}
                    </h2>

                    <p v-for="prof in member.profile" :key="prof.name">
                      {{ prof }}
                    </p>
                  </v-flex>
                </v-layout>
              </v-carousel-item>
            </v-carousel>
          </v-layout>
        </v-container>
      </div>

      <!-- Post, Portfolio, Gitlab information -->
      <div
        class="page"
        v-for="view in views"
        :id="view.name"
        :key="view.name"
        :class="view.name"
      >
        <v-container fill-height grid-list-md>
          <v-layout my-5 contents row wrap align-center>
            <v-flex xs12 column>
              <h2
                class="titles my-3 font-weight-light text-xs-center"
                v-animate="{ value: 'fadeInUp', delay: 0 }"
              >
                {{ view.name }}
              </h2>
              <v-flex v-animate="{ value: 'flipInX', delay: 300 }">
                <component :is="view.comp" :column="view.column"></component>
              </v-flex>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import ImgBanner from "../components/HomeImgBanner";
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
          column: 0
        },
        {
          name: "Post",
          comp: PostList,
          column: 1
        },
        {
          name: "Project",
          comp: RepositoryList,
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
      offset: 50,
      opts: {
        start: 0,
        dir: "v",
        duration: 500
      }
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
  padding: 20px;
}

#aboutMe {
  margin-left: 30px;
  margin-right: 30px;
  margin-top: auto;
  margin-bottom: auto;
}

#Portfolio {
  background-image: url("../assets/img/bg_3.jpg");
}

#Post {
  background-image: url("../assets/img/bg_1.jpg");
}

#Project {
  background-image: url("../assets/img/bg_2.jpg");
}

.aboutPage {
  background-image: url("../assets/img/about_bg.jpg");
}

.page {
  background-size: cover;
}

.titles {
  font-size: 100px;
}

.m_name {
  font-size: 80px;
}

.bannerSmall {
  display: none;
}

#about {
  height: 400px !important;
}

#about-img2 {
  height: 80%;
}

.fullpage-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.fullpage-wp {
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
}

.page {
  box-sizing: border-box;
  display: block;
  position: relative;
  width: 100% !important;
  height: 100%;
  flex-shrink: 0;
  margin: 0px !important;
  overflow: hidden;
}

@media screen and (max-width: 600px) {
  #about-img {
    border-radius: 50%;
  }

  #about-text {
    text-align: center !important;
  }

  #aboutMe {
    margin: auto;
  }

  #about {
    height: 280px !important;
  }

  .titles {
    font-size: 60px;
  }

  .m_name {
    font-size: 40px;
  }

  .bannerLarge {
    display: none;
  }

  .bannerSmall {
    display: block;
  }
}
</style>
