import Vue from "vue";
import Vuex from "vuex";

import App from "./App.vue";
import golStore from "./golStore";
import patterns from "../config/patterns.json";

const ipc = window.require("electron").ipcRenderer;

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = golStore(patterns, ipc);

ipc.on("CHANGE_BOARD", (_, board) => {
  store.commit("CHANGE_BOARD", board);
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
