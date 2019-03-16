import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    board: [[]],
    hasStarted: false,
    modelOptions: ["empty", "foo", "bar"]
  },
  mutations: {
    CHANGE_BOARD(state, newBoard) {
      state.board = newBoard;
    },

    START_OR_STOP(state) {
      state.hasStarted = !state.hasStarted;
    }
  },
  actions: {
    resize() {},
    reset({ commit }) {
      let newBoard = [
        [1, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1]
      ];
      commit("CHANGE_BOARD", newBoard);
    },
    start() {},
    stop() {}
  }
});

//{ commit }, height, width, model
