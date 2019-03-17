/**
 * countNeighbours, isAlive, newCycle
 * those methods should be private,
 * I could have placed them outside of the class, since they do not require any attribute from this class
 * But I value unit testing more
 */
module.exports = class GameOfLife {
  constructor(patterns) {
    //I know it is a repetition from src/main
    //but I don't see any elegant way to prevent it
    if (!patterns.default || !patterns.default[0]) {
      patterns.default = [[]];
    }

    this.state = {
      board: patterns.default,
      running: false,
      stop: false,
      speed: process.env.MAX_SPEED,
      previousBoard: clone(patterns.default),
      patterns
    };

    this.onInterupt;
  }

  init(patternName = "default") {
    let newBoard = this.state.patterns[patternName];
    this.state.board = newBoard ? newBoard : this.state.patterns.default;

    return this.state.board;
  }

  addPattern(pattern) {
    if (!this.state.running || !pattern.board || !pattern.board[0]) {
      this.state.board = pattern.board;
      this.resize(this.state.board[0].length, this.state.board.length); //to make sure board is rectangular
      this.state.patterns[pattern.name] = this.state.board;
      console.log("pattern added");

      return { name: pattern.name, board: this.state.board };
    }
    throw "not a valid pattern";
  }

  changeSpeed(speed) {
    //just to make sure it can always work
    speed = typeof speed === "number" && speed > 0 ? speed : 1;

    this.state.speed = (process.env.MAX_SPEED * 100) / speed;
  }

  changeCell(line, column) {
    if (!this.state.running) {
      console.log("current board : ", this.state.board, line, column);
      this.state.board[line][column] = this.state.board[line][column] ? 0 : 1;

      return this.state.board;
    }
  }

  startEdit() {
    if (!this.state.running) {
      this.state.previousBoard = clone(this.state.board);
    }
  }

  cancel() {
    if (!this.state.running) {
      this.state.board = clone(this.state.previousBoard);

      console.log("changed", this.state.board);

      return this.state.board;
    }
  }

  /**
   * run newCycle until maxCyclesis reached or runing state is turned off
   * @param  {Array<Array<Integer>>} board
   * @param  {Function(Array<Array<Integer>>)} [onCycleEnd] callback triggered at the end of each cycle
   * @param  {Integer} [maxCycles]  maximum number of cycle allowed, if lower or equal to 0 ignored, app will run until
   * @param  {Function(Array<Array<Integer>>)} [onEnd]   callback triggered at the end
   */
  start(onCycleEnd) {
    if (!this.state.running) {
      this.state.running = true;

      this.run(onCycleEnd);
    }
  }

  run(onCycleEnd) {
    if (!this.state.stop) {
      this.state.board = this.newCycle(this.state.board);

      if (onCycleEnd) {
        onCycleEnd(this.state.board);
      }

      setTimeout(this.run.bind(this), this.state.speed, onCycleEnd);
    } else {
      this.state.running = false;
      this.state.stop = false;

      if (this.onInterupt) {
        this.onInterupt(this.state.board);
      }
    }
  }

  /**
   * stop the game
   * @param  {[type]} [onInterupt] callback triggered at the end
   */
  stop() {
    if (this.state.running) {
      return new Promise(resolve => {
        this.onInterupt = resolve;
        this.state.stop = true;
      });
    }

    return Promise.resolve();
  }

  resize(width, height) {
    if (width > 0 && height > 0) {
      if (height <= this.state.board.length) {
        this.state.board.length = height;

        if (width <= this.state.board[0].length) {
          this.state.board.forEach(line => {
            line.length = width;
          });
        } else {
          this.state.board.map(line => enlargeArray(line, width, () => 0));
        }
      } else {
        if (width <= this.state.board[0].length) {
          this.state.board.forEach(line => {
            line.length = width;
          });
        } else {
          this.state.board.map(line => enlargeArray(line, width, () => 0));
        }

        enlargeArray(this.state.board, height, () =>
          Array.from({ length: width }, () => 0)
        );
      }
    } else {
      this.state.board = [[]];
    }

    return this.state.board;
  }

  /**
   * Check every neighbour of the taurus board return the number of alive neighbours
   * do not count self
   * @param  {Array<Array<Integer>>} board
   * @param  {Integer} line   line index of tested cell
   * @param  {Integer} column column index of tested cell
   * @return {Integer}        number of alive neighbours
   */
  countNeighbours(board, line, column) {
    let count = 0;

    if (isNotEmpty(board)) {
      let height = board.length;
      let width = board[0].length;

      let lines = [
        line - 1 < 0 ? height - 1 : line - 1,
        line,
        line + 1 >= height ? 0 : line + 1
      ];

      let columns = [
        column - 1 < 0 ? width - 1 : column - 1,
        column,
        column + 1 >= width ? 0 : column + 1
      ];

      lines.forEach(i =>
        columns.forEach(j => {
          if ((i !== line || j !== column) && board[i][j]) {
            ++count;
          }
        })
      );
    }

    return count;
  }

  /**
   * Check if a cell is alive
   * @param  {Array<Array<Integer>>} board
   * @param  {Integer} line   line index of tested cell
   * @param  {Integer} column column index of tested cell
   * @return {Boolean}        true if cell is alive, false if not
   */
  isAlive(board, line, column) {
    if (isNotEmpty(board)) {
      let res = this.countNeighbours(board, line, column);

      // live cell stay alive if it has 2 or 3 neighbours
      if (board[line][column]) {
        return res === 2 || res === 3;
      }

      // cell is born if it has 3 neighbours
      return res === 3;
    }

    return false;
  }

  /**
   * check every cell of board and build a new board with the new state of each cell
   * @param  {Array<Array<Integer>>} board
   * @return {Array<Array<Integer>>} a new board with updated states
   */
  newCycle(board) {
    let nextBoard = [[]];
    if (isNotEmpty(board)) {
      //I repeat myself here, but the alternative is not nice
      let height = board.length;
      let width = board[0].length;

      // build an array of array from board each cell will have new state
      nextBoard = board.map(
        (line, i) => line.map((_, j) => this.isAlive(board, i, j) | 0) // '| 0' is to cast a boolean in a Number
      );
    }
    return nextBoard;
  }
};

/**
 * check if board is valid, not necessarily useful but I hate repeting myself
 * @param  {Array<Array<Integer>>} board
 * @return {Boolean}
 */
function isNotEmpty(board) {
  return board.length > 0 && board[0].length > 0;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function enlargeArray(line, width, filler) {
  for (let i = line.length; i < width; i++) {
    line.push(filler(i));
  }

  return line;
}

function clone(board) {
  return board.map(line => line.map(cell => cell));
}
