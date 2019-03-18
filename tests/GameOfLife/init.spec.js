const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({
  custom1: [[0, 0, 0]]
});

describe("GameOfLife testing init", () => {
  it("empty should return empty dual array", () => {
    let res = gol.init();
    expect(res).toEqual([[]]);
  });

  it("bad name should return empty dual array", () => {
    let res = gol.init("not a name");
    expect(res).toEqual([[]]);
  });

  it("should return correct array", () => {
    let res = gol.init("custom1");
    expect(res).toEqual([[0, 0, 0]]);
  });
});
