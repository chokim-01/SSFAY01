import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PostPage from "./views/PostPage.vue";
import PostWritePage from "./views/PostWritePage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import PortfolioWritePage from "./views/PortfolioWritePage.vue";
import SignUpPage from "./views/SignUpPage.vue";
import PortfolioDetail from "./views/PortfolioDetail.vue";
import PostDetail from "./views/PostDetail.vue";
import AdminPage from "./views/AdminPage.vue";
import store from "./store.js";

Vue.use(Router);

const requireAuth = () => (from, to, next) => {
  if (store.state.uauth == 2) return next();
  next("/");
};

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/post",
      name: "post",
      component: PostPage
    },
    {
      path: "/postWrite",
      name: "postWrite",
      component: PostWritePage
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: PortfolioPage
    },
    {
      path: "/portfolioWrite",
      name: "portfolioWrite",
      component: PortfolioWritePage
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUpPage
    },
    {
      path: "/portfoliodetail",
      name: "portfoliodetail",
      component: PortfolioDetail,
      props: true
    },
    {
      path: "/postdetail",
      name: "postdetail",
      component: PostDetail,
      props: true
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
      beforeEnter: requireAuth()
    }
  ]
});
