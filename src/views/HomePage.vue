<template>
  <div class="fullpage-container">
    <div class="fullpage-wp" v-fullpage="opts" ref="example">
      <!-- Top image -->
      <section class="page" id="bannerPage">
        <ImgBanner>
          <div id="imgBanner" slot="text" v-animate="{ value: 'flash' }">
            <h1 class="bannerLarge" id="bannerTxt">
              Keep Going
            </h1>
            <div class="bannerSmall" id="bannerTxt">
              <h1>Keep</h1>
              <h1>Going</h1>
            </div>
          </div>
        </ImgBanner>
      </section>

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
              id="about"
              hide-delimiters
              hide-controls
              vertical
              grid-list-md
              text-xs-center
              v-animate="{ value: 'fadeInLeft', delay: 600 }"
            >
              <!-- Get member information -->
              <v-carousel-item v-for="(member, i) in members" :key="i">
                <v-layout id="aboutMe" mx-2 row align-center>
                  <!-- Member Image -->
                  <v-flex id="about-img" md6>
                    <v-img id="about-img2" v-bind:src="member.src" />
                  </v-flex>

                  <!-- Each information of Member -->
                  <v-flex id="about-text" xs12 md6 text-xs-right>
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
            <v-flex xs12>
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

      <!-- Context Us -->
      <div class="page" id="contactUs">
        <v-container fill-height grid-list-md>
          <v-layout contents row wrap align-center>
            <v-flex xs12>
              <h2
                class="titles font-weight-light text-xs-center"
                v-animate="{ value: 'fadeIn', delay: 0 }"
              >
                contact us
              </h2>
              <div
                class="text-xs-center"
                v-for="item in members"
                v-animate="{ value: 'fadeIn', delay: 300 }"
                :key="item.name_en"
              >
                <p id="name_en">{{ item.name_en }}</p>

                <v-btn class="mx-4 mb-3" :href="item.github" icon>
                  <v-icon id="contact_icon">fa-github</v-icon>
                </v-btn>

                <v-btn class="mx-4 mb-3" :href="item.email" icon>
                  <v-icon id="contact_icon">fa-envelope-open</v-icon>
                </v-btn>
                <v-divider />
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import ImgBanner from "../components/HomeImgBanner.vue";
import PortfolioList from "../components/PortfolioList.vue";
import PostList from "../components/PostList.vue";
import RepositoryList from "../components/RepositoryList.vue";

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
          name: "박사홍 \n",
          name_en: "Sahong Pak",
          profile: [
            "조선대학교 컴퓨터공학과",
            "멋쟁이사자처럼 5기 운영진",
            "BOB 7기 보안제품개발 트랙",
            "삼성청년소프트웨어아카데미 1기"
          ],
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
          github: "https://github.com/k3y6reak",
          email: "mailto:k3y6reak@naver.com"
        },
        {
          name: "양동권 \n",
          name_en: "Dongkwon Yang",
          profile: [
            "전남대학교 소프트웨어공학전공",
            "국립아시아문화전당 창제작센터 실습",
            "빅데이터엔지니어양성과정 1기",
            "삼성청년소프트웨어아카데미 1기"
          ],
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          github: "https://github.com/ydk7819",
          email: "mailto:ydk9557819@naver.com"
        },
        {
          name: "박근형 \n",
          name_en: "Keounhyung Park",
          profile: [
            "조선대학교 컴퓨터공학전공",
            "정보보호 동아리 Hacker Login",
            "삼성청년소프트웨어아카데미 1기"
          ],
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
          github: "https://github.com/chokim-01",
          email: "mailto:trial159@gmail.com"
        }
      ],
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
    }
  },
  computed: {
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

#contactUs {
  background-image: url("../assets/img/bg_4.jpg");
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

#name_en {
  font-family: "Do Hyeon", sans-serif;
  font-size: 30px;
}

#contact_icon {
  font-size: 50px;
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

  #contact_icon {
    font-size: 30px;
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
