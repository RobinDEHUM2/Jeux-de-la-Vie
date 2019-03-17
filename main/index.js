const config = require("../config/config.json");
process.env = { ...process.env, ...config };

const { app, BrowserWindow, ipcMain: ipc } = require("electron");
const path = require("path");

const controller = require("./controller");
const golPatterns = require("../config/patterns.json");
const GameOfLife = require("./GameOfLife");
const FileExplorer = require("./FileExplorer");

let win;
const gameOfLife = new GameOfLife(golPatterns);
const fileExplorer = new FileExplorer(win);

function createWindow() {
  win = new BrowserWindow({
    width: process.env.WINDOW_WIDTH,
    height: process.env.WINDOW_HEIGHT
  });

  win.loadFile(path.join(__dirname, "../dist/index.html"));

  win.on("closed", () => {
    win = null;
  });
}

controller(ipc, gameOfLife, fileExplorer);

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
