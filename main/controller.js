module.exports = ipc => {
  ipc.on("RESIZE", (event, args) => {
    console.log("RESIZE");
    event.returnValue = [[]];
  });

  ipc.on("RESET", (event, args) => {
    console.log("RESET");
    event.returnValue = [[]];
  });

  ipc.on("START", event => {
    console.log("START");
    event.returnValue = 1;
  });

  ipc.on("STOP", event => {
    console.log("STOP");
    event.returnValue = 1;
  });
};
