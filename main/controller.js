module.exports = (ipc, gameOfLife, fileExplorer) => {
  ipc.on("RESIZE", async (event, { width, height }) => {
    await gameOfLife.stop();

    event.returnValue = gameOfLife.resize(width, height);
  });

  ipc.on("RESET", async (event, pattern) => {
    await gameOfLife.stop();

    event.returnValue = gameOfLife.init(pattern);
  });

  ipc.on("START", event => {
    gameOfLife.start(board => {
      event.sender.send("CHANGE_BOARD", board);
    });

    event.returnValue = 1;
  });

  ipc.on("STOP", async event => {
    await gameOfLife.stop();

    event.returnValue = 1;
  });

  ipc.on("UPDATE_SPEED", (_, speed) => {
    gameOfLife.changeSpeed(speed);
  });

  ipc.on("CHANGE_BOARD", (event, { line, column }) => {
    event.returnValue = gameOfLife.changeCell(line, column);
  });

  ipc.on("START_EDIT", async event => {
    await gameOfLife.stop();

    gameOfLife.startEdit();

    event.returnValue = 1;
  });

  ipc.on("CANCEL", event => {
    event.returnValue = gameOfLife.cancel();
  });

  ipc.on("SAVE", async event => {
    await gameOfLife.stop();
    fileExplorer.save(gameOfLife.state.board);
    event.returnValue = 1;
  });

  ipc.on("LOAD", event => {
    gameOfLife
      .stop()
      .then(() => fileExplorer.load())
      .then(pattern => gameOfLife.addPattern(pattern))
      .then(res => (event.returnValue = { success: true, data: res }))
      .catch(err => (event.returnValue = { success: false }));
  });
};
