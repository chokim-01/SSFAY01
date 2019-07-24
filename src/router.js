import Vue from "vue";
import Router from "vue-router";
import HomePage from "./views/HomePage.vue";
import PostPage from "./views/PostPage.vue";
import PortfolioPage from "./views/PortfolioPage.vue";
import PortfolioWritePage from "./views/PortfolioWritePage.vue";
import SignUpPage from "./views/SignUpPage.vue";
import AdminPage from "./views/AdminPage.vue";

Vue.use(Router);

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
      path: "/admin",
      name: "admin",
      component: AdminPage
    }
  ]
});
