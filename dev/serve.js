import Vue from "vue";
import Dev from "./serve.vue";
import VueRunTemplate from "@/entry.esm";

Vue.use(VueRunTemplate);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount("#app");
