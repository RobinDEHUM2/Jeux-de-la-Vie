const { dialog } = require("electron");
const fs = require("fs");

module.exports = class FileExplorer {
  constructor() {}

  save(board) {
    let fileName = dialog.showSaveDialog({ defaultPath: "./savedFiles" });

    if (fileName) {
      if (!fileName.endsWith(".json")) {
        fileName = fileName + ".json";
      }

      fs.writeFile(fileName, JSON.stringify(board), err => {
        if (err) {
          console.error(err);

          dialog.showMessageBox(
            {
              title: "Saving Error",
              message: `An error occured while trying to save your game.
                Would you like to try to save it again ?`,
              buttons: ["retry", "cancel"],
              cancelId: 1
            },
            response => {
              if (response === 0) {
                this.save(board);
              }
            }
          );
        }

        console.log("file saved");
      });
    }
  }

  load() {
    return new Promise(resolve =>
      dialog.showOpenDialog(
        { defaultPath: "./savedFiles", multiSelections: false },
        fileName => {
          if (fileName && fileName[0] && fileName[0].endsWith(".json")) {
            let name = fileName[0]
              .split("/")
              .pop()
              .split("\\") //for windows
              .pop()
              .split(".")[0];
            resolve({ name, board: require(fileName[0]) });
          }
        }
      )
    );
  }
};
