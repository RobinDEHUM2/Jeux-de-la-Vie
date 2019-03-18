const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({ default: [] });

describe("GameOfLife testing isAlive", () => {
  it("empty board should return false", () => {
    let res = gol.isAlive([[]], 42, 12);
    expect(res).toBe(false);
  });

  //dead cell
  it("Dead cell with no neighbour should stay dead", () => {
    let res = gol.isAlive([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 1, 1);
    expect(res).toBe(false);
  });

  it("Dead cell with 2 neighbours should stay dead", () => {
    let res = gol.isAlive([[0, 1, 1], [0, 0, 0], [0, 0, 0]], 1, 1);
    expect(res).toBe(false);
  });

  it("Dead cell with too many neighbours should stay dead", () => {
    let res = gol.isAlive([[0, 1, 1], [1, 0, 0], [0, 1, 0]], 1, 1);
    expect(res).toBe(false);
  });

  it("Dead cell with 3 neighbours should become alive", () => {
    let res = gol.isAlive([[0, 1, 1], [1, 0, 0], [0, 0, 0]], 1, 1);
    expect(res).toBe(true);
  });

  //alive cell
  it("Alive cell with no neighbour should die", () => {
    let res = gol.isAlive([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 1, 1);
    expect(res).toBe(false);
  });

  it("Alive cell with 1 neighbour should die", () => {
    let res = gol.isAlive([[0, 1, 0], [0, 0, 0], [0, 0, 0]], 1, 1);
    expect(res).toBe(false);
  });

  it("Alive cell with too many neighbours should die", () => {
    let res = gol.isAlive([[0, 1, 1], [1, 0, 0], [0, 1, 0]], 1, 1);
    expect(res).toBe(false);
  });

  it("Alive cell with 2 neighbours should stay alive", () => {
    let res = gol.isAlive([[0, 1, 1], [1, 0, 0], [0, 0, 0]], 1, 1);
    expect(res).toBe(true);
  });

  it("Alive cell with 3 neighbours should stay alive", () => {
    let res = gol.isAlive([[0, 1, 1], [1, 0, 0], [0, 0, 0]], 1, 1);
    expect(res).toBe(true);
  });

  it("Top left cell in diagonal should stay alive", () => {
    let res = gol.isAlive([[1, 0, 0], [0, 1, 0], [0, 0, 1]], 0, 0);
    expect(res).toBe(true);
  });
});
