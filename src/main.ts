import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
// eslint-disable-next-line import/prefer-default-export
export const bus = new Vue();

new Vue({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render: (h) => h(App),
}).$mount("#app");
