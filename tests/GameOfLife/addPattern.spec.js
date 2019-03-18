const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({});

describe("GameOfLife testing addPattern", () => {
  it("should throw error if running", () => {
    gol.state.running = true;
    expect(() => gol.addPattern({ board: [[]] })).toThrow(
      "not a valid pattern"
    );
  });

  it("should throw error if board is not valid", () => {
    gol.state.running = false;
    expect(() => gol.addPattern()).toThrow("not a valid pattern");
  });

  it("should throw error if board is not valid", () => {
    expect(() => gol.addPattern({ board: 5 })).toThrow("not a valid pattern");
  });

  it("should throw error if board is not valid", () => {
    expect(() => gol.addPattern({ board: [] })).toThrow("not a valid pattern");
  });

  it("should throw error if board is not valid", () => {
    expect(() => gol.addPattern({ name: "test" })).toThrow(
      "not a valid pattern"
    );
  });

  it("should return a valid board", () => {
    let res = gol.addPattern({ name: "test", board: [[]] });
    expect(res.name).toBe("test");
    expect(res.board).toEqual([[]]);
  });
});
