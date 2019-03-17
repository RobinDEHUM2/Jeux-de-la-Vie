import Vue from "vue";
import Vuex from "vuex";

import App from "./App.vue";
import golStore from "./golStore";
import patterns from "../config/patterns.json";
import config from "../config/config.json";

const ipc = window.require("electron").ipcRenderer;

Vue.config.productionTip = false;
Vue.use(Vuex);

if (!patterns.default || !patterns.default[0]) {
  patterns.default = [[]];
}

const store = golStore(patterns, ipc);

console.log(
  config.DEFAULT_SPEED,
  patterns.default.length,
  patterns.default[0].length
);

new Vue({
  store,
  render: h =>
    h(App, {
      props: {
        selectedSpeed: config.DEFAULT_SPEED,
        selectedHeight: patterns.default.length,
        selectedWidth: patterns.default[0].length
      }
    })
}).$mount("#app");
