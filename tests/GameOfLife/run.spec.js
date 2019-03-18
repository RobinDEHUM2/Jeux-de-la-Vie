const GameOfLife = require("../../main/GameOfLife");
let gol = new GameOfLife({});
process.env.MAX_SPEED = 50;

describe("GameOfLife testing start && stop", () => {
  it("should stop", () => {
    gol.state.stop = true;
    gol.state.running = true;

    gol.run();
    expect(gol.state.stop).toBe(false);
    expect(gol.state.running).toBe(false);
  });

  it("should run six times", () => {
    gol.state.board = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ];

    let i = 0;

    return new Promise(resolve => {
      gol.run(() => {
        if (i < 6) {
          ++i;
        } else {
          gol.stop().then(resolve);
        }
      });
    }).then(() => {
      expect(gol.state.board).toEqual([
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]);
    });
  });

  it("should run with no call back", () => {
    gol.state.board = [[1]];
    gol.run();

    return new Promise(resolve =>
      setTimeout(() => {
        gol.stop();
        resolve();
      }, 75)
    ).then(() => expect(gol.state.board).toEqual([[0]]));
  });
});
