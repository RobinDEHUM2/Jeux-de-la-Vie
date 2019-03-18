const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({});

describe("GameOfLife testing countNeighbours", () => {
  it("empty board should return 0", () => {
    let res = gol.countNeighbours([[]], 42, 12);
    expect(res).toBe(0);
  });

  // testing from middle
  it("No neighbours should be 0", () => {
    let res = gol.countNeighbours([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 1, 1);
    expect(res).toBe(0);
  });

  it("Some neighbours should be counted", () => {
    let res = gol.countNeighbours([[1, 0, 0], [0, 0, 1], [0, 1, 0]], 1, 1);
    expect(res).toBe(3);
  });

  it("Should not count itself", () => {
    let res = gol.countNeighbours([[1, 0, 0], [0, 1, 1], [0, 1, 0]], 1, 1);
    expect(res).toBe(3);
  });

  it("Full should be 8", () => {
    let res = gol.countNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 1);
    expect(res).toBe(8);
  });

  //testing from top
  it("No neighbours should be 0", () => {
    let res = gol.countNeighbours([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 0, 1);
    expect(res).toBe(0);
  });

  it("Some neighbours should be counted from top", () => {
    let res = gol.countNeighbours([[0, 0, 0], [0, 0, 1], [0, 1, 0]], 0, 1);
    expect(res).toBe(2);
  });

  it("Full should be 8", () => {
    let res = gol.countNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, 1);
    expect(res).toBe(8);
  });

  //testing from bottom
  it("No neighbours should be 0", () => {
    let res = gol.countNeighbours([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 2, 1);
    expect(res).toBe(0);
  });

  it("Some neighbours should be counted from bottom", () => {
    let res = gol.countNeighbours([[1, 0, 0], [0, 0, 1], [0, 1, 0]], 2, 1);
    expect(res).toBe(2);
  });

  it("Full should be 8", () => {
    let res = gol.countNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 2, 1);
    expect(res).toBe(8);
  });

  //testing from left
  it("No neighbours should be 0", () => {
    let res = gol.countNeighbours([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 1, 0);
    expect(res).toBe(0);
  });

  it("Some neighbours should be counted from left", () => {
    let res = gol.countNeighbours([[1, 0, 0], [0, 1, 1], [0, 1, 0]], 1, 0);
    expect(res).toBe(4);
  });

  it("Full should be 8", () => {
    let res = gol.countNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 0);
    expect(res).toBe(8);
  });

  //testing from right
  it("No neighbours should be 0", () => {
    let res = gol.countNeighbours([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 1, 2);
    expect(res).toBe(0);
  });

  it("Some neighbours should be counted from right", () => {
    let res = gol.countNeighbours([[1, 0, 0], [0, 1, 1], [0, 1, 0]], 1, 2);
    expect(res).toBe(3);
  });

  it("Full should be 8", () => {
    let res = gol.countNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1, 2);
    expect(res).toBe(8);
  });

  //testing from top left
  it("No neighbours should be 0", () => {
    let res = gol.countNeighbours([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 0, 0);
    expect(res).toBe(0);
  });

  it("Some neighbours should be counted from top left", () => {
    let res = gol.countNeighbours([[1, 0, 0], [0, 1, 1], [0, 1, 0]], 0, 0);
    expect(res).toBe(3);
  });

  it("Full should be 8", () => {
    let res = gol.countNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 0, 0);
    expect(res).toBe(8);
  });

  //testing from bottom right
  it("No neighbours should be 0", () => {
    let res = gol.countNeighbours([[0, 0, 0], [0, 0, 0], [0, 0, 0]], 2, 2);
    expect(res).toBe(0);
  });

  it("Some neighbours should be counted from bottom right", () => {
    let res = gol.countNeighbours([[1, 0, 0], [0, 1, 1], [0, 1, 0]], 2, 2);
    expect(res).toBe(4);
  });

  it("Full should be 8", () => {
    let res = gol.countNeighbours([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 2, 2);
    expect(res).toBe(8);
  });
});
