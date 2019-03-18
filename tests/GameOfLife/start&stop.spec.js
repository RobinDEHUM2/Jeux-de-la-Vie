const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({});

describe("GameOfLife testing start && stop", () => {
  it("should not do anything", () => {
    gol.state.running = true;
    expect(gol.start()).toEqual(undefined);

    gol.state.running = false;
    gol.stop().then(res => expect(res).toEqual(undefined));
  });

  it("should run once", () => {
    gol.state.running = false;

    return new Promise(resolve =>
      gol.start(() => gol.stop().then(resolve))
    ).then(res => expect(res).toEqual([[]]));
  });
});
