import Vuex from "vuex";

export default (patterns, ipc) =>
  new Vuex.Store({
    state: {
      board: patterns.defaut,
      hasStarted: false,
      modelOptions: Object.keys(patterns)
    },

    mutations: {
      CHANGE_BOARD(state, newBoard) {
        state.board = newBoard;
      },

      START(state) {
        state.hasStarted = true;
      },

      STOP(state) {
        state.hasStarted = false;
      }
    },

    actions: {
      resize({ commit }, { width, height }) {
        const newBoard = ipc.sendSync("RESIZE", { width, height });
        commit("STOP");
        commit("CHANGE_BOARD", newBoard);
      },

      reset({ commit }, model) {
        const newBoard = ipc.sendSync("RESET", model);
        commit("STOP");
        commit("CHANGE_BOARD", newBoard);
      },

      start({ commit }) {
        ipc.sendSync("START");
        commit("START");
      },

      stop({ commit }) {
        ipc.sendSync("STOP");
        commit("STOP");
      },

      updateSpeed(_, speed) {
        ipc.send("UPDATE_SPEED", speed);
      }
    }
  });
