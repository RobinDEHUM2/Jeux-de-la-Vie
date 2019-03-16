const { app, BrowserWindow, ipcMain: ipc } = require("electron");
const path = require("path");

const controller = require("./controller");

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 1000 });

  win.loadFile(path.join(__dirname, "../dist/index.html"));

  win.on("closed", () => {
    win = null;
  });
}

controller(ipc);

app.on("ready", createWindow);

// mac OS :
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
