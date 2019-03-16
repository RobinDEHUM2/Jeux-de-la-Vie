import Vue from "vue";
import Vuex from "vuex";

const { patternNames } = require("../golPatterns");

const ipc = window.require("electron").ipcRenderer;

Vue.use(Vuex);

const state = {
  board: [[]],
  hasStarted: false,
  modelOptions: patternNames
};

//resize, reset, start, and stop are synchronous to avoid side effect in back
//changing board while the app is runing could lead to desastrous issues
const actions = {
  resize({ commit }, width, height) {
    const newBoard = ipc.sendSync("RESIZE", width, height);
    commit("CHANGE_BOARD", newBoard);
  },

  reset({ commit }, model) {
    const newBoard = ipc.sendSync("RESET", model);
    commit("CHANGE_BOARD", newBoard);
  },

  start({ commit }) {
    ipc.sendSync("START");
    commit("START");
  },

  stop({ commit }) {
    ipc.sendSync("STOP");
    commit("STOP");
  }
};

const mutations = {
  CHANGE_BOARD(state, newBoard) {
    state.board = newBoard;
  },

  START(state) {
    state.hasStarted = true;
  },

  STOP(state) {
    state.hasStarted = false;
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions
});

ipc.on("CHANGE_BOARD", () => {
  store.commit("CHANGE_BOARD");
});

export default store;