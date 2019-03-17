/**
 * countNeighbours, isAlive, newCycle
 * those methods should be private,
 * I could have placed them outside of the class, since they do not require any attribute from this class
 * But I value unit testing more
 */
module.exports = class GameOfLife {
  constructor(board = [[]]) {
    this.state = {
      running: false,
      speed: 100
    };

    this.board = board;
    this.interval;
  }

  init(board = [[]]) {
    this.board = board;

    return this.board;
  }

  /**
   * run newCycle until maxCyclesis reached or runing state is turned off
   * @param  {Array<Array<Integer>>} board
   * @param  {Function(Array<Array<Integer>>)} [onCycleEnd] callback triggered at the end of each cycle
   * @param  {Integer} [maxCycles]  maximum number of cycle allowed, if lower or equal to 0 ignored, app will run until
   * @param  {Function(Array<Array<Integer>>)} [onEnd]   callback triggered at the end
   */
  start(onCycleEnd, maxCycles = 0) {
    if (!this.state.runing) {
      this.state.running = true;
      let isLimited = maxCycles > 0;

      if (maxCycles > 0) {
        for (; maxCycles > 0; --maxCycles) {
          setTimeout(this.run.bind(this), this.state.speed, onCycleEnd);
        }
      } else {
        clearInterval(this.interval);
        this.interval = setInterval(
          this.run.bind(this),
          this.state.speed,
          onCycleEnd
        );
      }
    }
  }

  run(onCycleEnd) {
    this.board = this.newCycle(this.board);

    if (onCycleEnd) {
      onCycleEnd(this.board);
    }
  }

  /**
   * stop the game
   * @param  {[type]} onEnd callback triggered at the end
   */
  stop(onEnd) {
    clearInterval(this.interval);
    this.state.runing = false;
  }

  resize(width, height) {
    if (width > 0 && height > 0) {
      if (height <= this.board.length) {
        this.board.length = height;

        if (width <= this.board[0].length) {
          this.board.forEach(line => {
            line.length = width;
          });
        } else {
          let start = this.board[0].length;
          this.board.map(line => {
            line.length = width;
            line.fill(0, start, width);

            return line;
          });
        }
      } else {
        if (width <= this.board[0].length) {
          this.board.forEach(line => {
            line.length = width;
          });
        } else {
          let start = this.board[0].length;
          this.board.map(line => {
            line.length = width;
            line.fill(0, start, width);

            return line;
          });
        }

        let start = this.board.length;
        this.board.length = height;
        this.board.fill(Array.from({ length: width }, () => 0), start, height);
      }
    } else {
      this.board = [[]];
    }

    return this.board;
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