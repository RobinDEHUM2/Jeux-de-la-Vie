const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({});
process.env.MAX_SPEED = 20;

describe("GameOfLife testing changeSpeed", () => {
  it("should set speed to minimum if strange input", () => {
    gol.changeSpeed("test");
    expect(gol.state.speed).toBe(2000);
  });

  it("should set speed to minimum if negative", () => {
    gol.changeSpeed(-12);
    expect(gol.state.speed).toBe(2000);
  });

  it("should set speed", () => {
    gol.changeSpeed(50);
    expect(gol.state.speed).toBe(40);
  });
});
