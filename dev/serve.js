import Vue from "vue";
import Dev from "./serve.vue";
import { parse } from "@vue/compiler-sfc";
import VueRunTemplate from "@/entry.esm";

Vue.use(VueRunTemplate, {
  evalScript: eval,
  parseCode: (v) => parse(v),
  renderEmpty({ h }) {
    return h("em", "空");
  },
  renderError({ h, error }) {
    return h("em", JSON.stringify(error));
  },
});
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount("#app");
