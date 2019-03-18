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
      board: patterns.default, // active board
      running: false,
      stop: false,
      speed: process.env.MAX_SPEED,
      previousBoard: clone(patterns.default),
      patterns
    };

    this.onInterupt; // action to cast when the game get stopped
  }

  /**
   * choose a pattern in the list and reinitialise the board
   * @param  {String} [patternName="default"] name of desired pattern
   * @return {Array<Array<Integer>>}        current board
   */
  init(patternName = "default") {
    let newBoard = this.state.patterns[patternName];
    this.state.board = clone(newBoard ? newBoard : this.state.patterns.default);

    return this.state.board;
  }

  /**
   * add a pattern to the list
   * @param {Object{name:Integer, board:Array<Array<Integer>>}} pattern to be added
   * @return {Object{name:Integer, board:Array<Array<Integer>>}}
   */
  addPattern(pattern) {
    if (!this.state.running && pattern && pattern.board && pattern.board[0]) {
      this.state.board = pattern.board;
      this.resize(this.state.board[0].length, this.state.board.length); //to make sure board is rectangular
      this.state.patterns[pattern.name] = clone(this.state.board);

      return { name: pattern.name, board: this.state.board };
    }
    throw "not a valid pattern";
  }

  /**
   * @param  {Integer[1:100]} speed
   */
  changeSpeed(speed) {
    //just to make sure it can always work
    speed = typeof speed === "number" && speed > 0 ? speed : 1;

    this.state.speed = (process.env.MAX_SPEED * 100) / speed;
  }

  /**
   * switch the state of a selected cell
   * @param  {Integer} line   line index
   * @param  {Integer} column column index
   * @return {Array<Array<Integer>>}        current board
   */
  changeCell(line, column) {
    if (
      !this.state.running &&
      line >= 0 &&
      column >= 0 &&
      line < this.state.board.length &&
      column < this.state.board[0].length
    ) {
      this.state.board[line][column] = this.state.board[line][column] ? 0 : 1;

      return this.state.board;
    }
  }

  /**
   * save the board before edition (so changes can be cancel)
   */
  startEdit() {
    if (!this.state.running) {
      this.state.previousBoard = clone(this.state.board);
    }
  }

  /**
   * undo any changes to the board
   * @return {Array<Array<Integer>>}        current board
   */
  cancel() {
    if (!this.state.running) {
      this.state.board = clone(this.state.previousBoard);

      return this.state.board;
    }
  }

  /**
   * run newCycle until maxCyclesis reached or runing state is turned off
   * @param  {Function(Array<Array<Integer>>)} [onCycleEnd] callback triggered at the end of each cycle
   * @param  {Function(Array<Array<Integer>>)} [onEnd]   callback triggered at the end
   */
  start(onCycleEnd) {
    if (!this.state.running) {
      this.state.running = true;

      this.run(onCycleEnd);
    }
  }

  /**
   * @param  {Function(Array<Array<Integer>>)} [onCycleEnd] callback triggered at the end of each cycle
   */
  run(onCycleEnd) {
    if (this.state.stop) {
      //check if the app should stop

      this.state.running = false;
      this.state.stop = false;

      if (this.onInterupt) {
        //trigger onInterrupt if it exists, let stop know cycle has finished
        this.onInterupt(this.state.board);
      }
    } else {
      this.state.board = this.newCycle(this.state.board); //next step

      if (onCycleEnd) {
        //trigger cyclic callback
        onCycleEnd(this.state.board);
      }

      setTimeout(this.run.bind(this), this.state.speed, onCycleEnd);
      //wait for next cycle
    }
  }

  /**
   * stop the game
   * @return {Promise} resolve when app is ready
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

  /**
   * change the shape of the double array
   * @param  {Integer} width
   * @param  {Integer} height
   * @return {Array<Array<Integer>>}        current board
   */
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

//private

/**
 * check if board is valid, not necessarily useful but I hate repeting myself
 * @param  {Array<Array<Integer>>} board
 * @return {Boolean}
 */
function isNotEmpty(board) {
  return board.length > 0 && board[0].length > 0;
}

/**
 * change the size of an array to a bigger array
 * @param  {Array} line   Array to be modified
 * @param  {Integer} width  desired width
 * @param  {function(id)} filler fill each cell with this function
 * @return {Array} modified array
 */
function enlargeArray(line, width, filler) {
  for (let i = line.length; i < width; i++) {
    line.push(filler(i));
  }

  return line;
}

/**
 * @param  {Array<Array<Integer>>} board to be copied
 * @return {Array<Array<Integer>>}       copy
 */
function clone(board) {
  return board.map(line => line.map(cell => cell));
}

// sorry for the long post have an abstract potato
