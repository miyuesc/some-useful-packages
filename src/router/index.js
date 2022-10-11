import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "*", redirect: "/components" },
    { path: "/components", component: () => import("../pages/components") },
    { path: "/animations", component: () => import("../pages/animations") }
  ]
});

export default router;
