import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 组件
const copsContext = require.context("../pages/components/demos/", true, /\.vue$/);
const copsList = [];
const copsMenu = [];
copsContext.keys().forEach((key) => {
  const component = copsContext(key).default;
  const name = component.cnName || component.name;
  const path = component.name;
  const index = component.name.replace("demo", "");
  copsMenu.push({ name, path, index });
  copsList.push({
    name,
    path,
    component
  });
});

// css 动画
const animationContext = require.context("../pages/animations/demos/", true, /\.vue$/);
const animationList = [];
const animationMenu = [];
animationContext.keys().forEach((key) => {
  const component = animationContext(key).default;
  const name = component.cnName || component.name;
  const path = component.name;
  const index = component.name.replace("demo", "");
  animationMenu.push({ name, path, index });
  animationList.push({
    name,
    path,
    component
  });
});

const router = new VueRouter({
  routes: [
    { path: "*", redirect: "/components" },
    {
      path: "/components",
      component: () => import("../pages/components"),
      children: copsList
    },
    { path: "/animations", component: () => import("../pages/animations"), children: animationList }
  ]
});

export { copsMenu, animationMenu };

export default router;
