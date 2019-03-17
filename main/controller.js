module.exports = (ipc, gameOfLife) => {
  ipc.on("RESIZE", async (event, { width, height }) => {
    console.log("ipc receive : RESIZE");

    await gameOfLife.stop();

    event.returnValue = gameOfLife.resize(width, height);
  });

  ipc.on("RESET", async (event, pattern) => {
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
};
