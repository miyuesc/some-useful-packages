import Vue from "vue";

Vue.config.productionTip = false;

import ElementUI from "element-ui";
Vue.use(ElementUI);

import ClickOutside from "vue-click-outside";
Vue.directive("click-outside", ClickOutside);

import "normalize.css/normalize.css";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
new Vue({
  render: (h) => h(App)
}).$mount("#app");
