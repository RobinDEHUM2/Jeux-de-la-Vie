module.exports = (ipc, gameOfLife, fileExplorer) => {
  ipc.on("RESIZE", async (event, { width, height }) => {
    console.log("ipc receive : RESIZE");

    await gameOfLife.stop();

    event.returnValue = gameOfLife.resize(width, height);
  });

  ipc.on("RESET25", async (event, pattern) => {
    console.log("ipc receive : RESET");

    await gameOfLife.stop().then(() => console.log("finish reseting"));

    event.returnValue = gameOfLife.init(pattern);
  });

  ipc.on("START", event => {
    console.log("ipc receive : START");

    gameOfLife.start(board => {
      event.sender.send("CHANGE_BOARD", board);
    });

    event.returnValue = 1;
  });

  ipc.on("STOP", async event => {
    console.log("ipc receive : STOP");

    await gameOfLife.stop();

    event.returnValue = 1;
  });

  ipc.on("UPDATE_SPEED", (_, speed) => {
    console.log("ipc receive : UPDATE_SPEED");
    gameOfLife.changeSpeed(speed);
  });

  ipc.on("CHANGE_BOARD", (event, { line, column }) => {
    console.log("ipc receive : CHANGE_BOARD");
    event.returnValue = gameOfLife.changeCell(line, column);
  });

  ipc.on("START_EDIT", async event => {
    console.log("ipc receive : START_EDIT");

    await gameOfLife.stop();

    gameOfLife.startEdit();

    event.returnValue = 1;
  });

  ipc.on("CANCEL", event => {
    console.log("ipc receive : CANCEL");
    event.returnValue = gameOfLife.cancel();
  });

  ipc.on("SAVE", async event => {
    console.log("ipc receive : SAVE");
    await gameOfLife.stop();
    fileExplorer.save(gameOfLife.state.board);
    event.returnValue = 1;
  });

  ipc.on("LOAD", event => {
    console.log("ipc receive : LOAD");
    gameOfLife
      .stop()
      .then(() => fileExplorer.load())
      .then(pattern => gameOfLife.addPattern(pattern))
      .then(res => (event.returnValue = { success: true, data: res }))
      .catch(err => (event.returnValue = { success: false }));
  });
};
