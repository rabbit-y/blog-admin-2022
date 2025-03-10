import { createRouter, createWebHistory } from "vue-router";
const Login = () => import("~/pages/login/index.vue");
const Index = () => import("~/pages/index/index.vue");
const Layout = () => import("~/pages/layout/index.vue");
const Profile = () => import("~/pages/profile/index.vue");
const Say = () => import("~/pages/say/index.vue");
const MarkDtl = () => import("~/pages/mark/details.vue");
const Mark = () => import("~/pages/mark/index.vue");
const Classify = () => import("~/pages/classify/index.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "",
          component: Index,
        },
        {
          path: "profile",
          component: Profile,
        },
        {
          path: "say",
          component: Say,
        },
        {
          path: "mark",
          children: [
            {
              path: "",
              component: Mark,
            },
            {
              path: ":id",
              component: MarkDtl,
            },
          ],
        },
        {
          path: "classify",
          component: Classify,
        },
      ],
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("login");
  if (to.path !== "/login" && isLogin === "false") {
    next("/login");
  } else {
    next();
  }
});
export default router;
