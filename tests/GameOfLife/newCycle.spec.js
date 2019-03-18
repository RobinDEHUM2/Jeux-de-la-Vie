const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({});

describe("GameOfLife testing newCycle", () => {
  it("empty board should return [[]]", () => {
    let res = gol.newCycle([[]]);
    expect(res).toEqual([[]]);
  });

  it("no offspring if no cell is alive", () => {
    let res = gol.newCycle([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    expect(res).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });

  it("lone cell should die", () => {
    let res = gol.newCycle([[0, 0, 0], [0, 1, 0], [0, 0, 0]]);
    expect(res).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });

  it("2 cells should die", () => {
    let res = gol.newCycle([[1, 0, 0], [0, 0, 0], [0, 0, 1]]);
    expect(res).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });

  it("3 cells should fill board", () => {
    let res = gol.newCycle([[1, 0, 0], [0, 1, 0], [0, 0, 1]], 1);
    expect(res).toEqual([[1, 1, 1], [1, 1, 1], [1, 1, 1]]);
  });

  it("6 cells should die", () => {
    let res = gol.newCycle([[1, 1, 0], [1, 1, 0], [1, 0, 1]], 1);
    expect(res).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });
});
