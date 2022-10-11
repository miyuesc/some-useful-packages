import Vue from "vue";

Vue.config.productionTip = false;

import ElementUI from "element-ui";
Vue.use(ElementUI);

import ClickOutside from "vue-click-outside";
Vue.directive("click-outside", ClickOutside);

import "reset-css";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/demo.scss";

import App from "./App.vue";
import router from "@/router";

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
