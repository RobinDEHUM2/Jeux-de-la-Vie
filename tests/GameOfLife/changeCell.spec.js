const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({ default: [[0]] });

describe("GameOfLife testing changeCell", () => {
  it("should not do anything if runing", () => {
    gol.state.running = true;
    expect(gol.changeCell()).toEqual(undefined);
  });

  it("should not do anything if line too big", () => {
    gol.state.running = false;
    expect(gol.changeCell(5, 0)).toEqual(undefined);
  });

  it("should not do anything if column too big", () => {
    expect(gol.changeCell(0, 5)).toEqual(undefined);
  });

  it("should not do anything if line too low", () => {
    expect(gol.changeCell(-2, 0)).toEqual(undefined);
  });

  it("should not do anything if column too low", () => {
    expect(gol.changeCell(0, -2)).toEqual(undefined);
  });

  it("should change cell state to 1", () => {
    expect(gol.changeCell(0, 0)).toEqual([[1]]);
  });

  it("should change cell state to 0", () => {
    expect(gol.changeCell(0, 0)).toEqual([[0]]);
  });
});
