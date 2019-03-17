import { Store } from "vuex";

class GOLStore extends Store {
  constructor(patterns, ipc) {
    super({
      state: {
        board: patterns.default,
        hasStarted: false,
        modelOptions: Object.keys(patterns),
        editable: false
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
        },

        EDIT_TRUE(state) {
          state.editable = true;
        },

        EDIT_FALSE(state) {
          state.editable = false;
        },

        ADD_PATTERN(state, name) {
          if (!state.modelOptions.includes(name)) {
            state.modelOptions.push(name);
          }
        }
      },

      actions: {
        resize({ commit }, { width, height }) {
          const newBoard = ipc.sendSync("RESIZE", { width, height });
          commit("STOP");
          commit("CHANGE_BOARD", newBoard);
        },

        reset({ commit }, model) {
          console.log("hellow world");
          const newBoard = ipc.sendSync("RESET25", model);

          console.log("received message : ", newBoard);
          commit("STOP");
          commit("CHANGE_BOARD", newBoard);
        },

        start({ commit }) {
          commit("EDIT_FALSE");
          ipc.sendSync("START");
          commit("START");
        },

        stop({ commit }) {
          ipc.sendSync("STOP");
          commit("STOP");
        },

        updateSpeed(_, speed) {
          ipc.send("UPDATE_SPEED", speed);
        },

        edit({ commit }) {
          ipc.sendSync("START_EDIT");
          commit("STOP");
          commit("EDIT_TRUE");
        },

        updateBoard({ commit, state }, { line, column }) {
          if (state.editable) {
            const newBoard = ipc.sendSync("CHANGE_BOARD", { line, column });
            commit("CHANGE_BOARD", newBoard);
          }
        },

        cancel({ commit, state }) {
          if (state.editable) {
            const newBoard = ipc.sendSync("CANCEL");
            console.log("ipc receive in front : CANCEL", newBoard);
            commit("CHANGE_BOARD", newBoard);
          }
        },

        save({ commit }) {
          commit("STOP");
          ipc.sendSync("SAVE");
        },

        load({ commit }) {
          commit("STOP");
          let res = ipc.sendSync("LOAD");

          if (res.success) {
            commit("CHANGE_BOARD", res.data.board);
            commit("ADD_PATTERN", res.data.name);
          }
        }
      }
    });
  }
}

let golStore = null;
//singleton
export default (patterns, ipc) => {
  if (!golStore) {
    golStore = new GOLStore(patterns, ipc);

    ipc.on("CHANGE_BOARD", (_, board) => {
      golStore.commit("CHANGE_BOARD", board);
    });
  }
  return golStore;
};
