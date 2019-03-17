module.exports = (ipc, patterns, gameOfLife) => {
  ipc.on("RESIZE", (event, { width, height }) => {
    gameOfLife.stop();
    event.returnValue = gameOfLife.resize(width, height);
  });

  ipc.on("RESET", (event, pattern) => {
    gameOfLife.stop();
    event.returnValue = gameOfLife.init(patterns[pattern]);
  });

  ipc.on("START", event => {
    gameOfLife.start(board => {
      event.sender.send("CHANGE_BOARD", board);
    });
    event.returnValue = 1;
  });

  ipc.on("STOP", event => {
    gameOfLife.stop();
    event.returnValue = 1;
  });

  ipc.on("UPDATE_SPEED", (_, speed) => {
    console.log("trying to change speed : ", speed);
    gameOfLife.changeSpeed(speed);
  });
};
