const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({
  default: [[0, 0, 0]]
});

describe("GameOfLife testing resize", () => {
  it("should empty", () => {
    expect(gol.resize(-5, 2)).toEqual([[]]);
    expect(gol.resize(5, -2)).toEqual([[]]);
    expect(gol.resize()).toEqual([[]]);
  });

  it("smaller width and height", () => {
    gol.state.board = [
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    expect(gol.resize(3, 2)).toEqual([[0, 0, 0], [0, 1, 0]]);
  });

  it("smaller height and bigger width", () => {
    gol.state.board = [
      [0, 0, 0, 1, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];
    expect(gol.resize(7, 2)).toEqual([
      [0, 0, 0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0]
    ]);
  });

  it("bigger height and smaller width", () => {
    gol.state.board = [[0, 0, 0, 0, 0], [0, 1, 0, 0, 0]];
    expect(gol.resize(3, 4)).toEqual([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  });

  it("bigger width and height", () => {
    gol.state.board = [[0, 0], [0, 1]];
    expect(gol.resize(5, 4)).toEqual([
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]);
  });
});
