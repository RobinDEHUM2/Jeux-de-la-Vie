const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({});

describe("GameOfLife testing startEdit and cancel", () => {
  it("should not do anything if runing", () => {
    gol.state.running = true;
    expect(gol.startEdit()).toEqual(undefined);

    expect(gol.cancel()).toEqual(undefined);
  });

  it("should save current board", () => {
    gol.state.running = false;
    gol.state.board = [[0]];
    gol.state.previousBoard = [[1]];
    gol.startEdit();
    expect(gol.state.previousBoard).toEqual([[0]]);
  });

  it("should revert to previousBoard", () => {
    gol.state.board = [[0]];
    gol.state.previousBoard = [[1]];
    gol.cancel();
    expect(gol.state.board).toEqual([[1]]);
  });
});
