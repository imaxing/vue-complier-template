import Vue from "vue";
import Dev from "./serve.vue";
import VueRunTemplate from "@/entry.esm";

Vue.use(VueRunTemplate, {
  renderEmpty: ({ h, descriptor }) => {
    return h("em", "空");
  },
  renderError: ({ h, error }) => {
    return h("em", JSON.stringify(error));
  },
});
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount("#app");
