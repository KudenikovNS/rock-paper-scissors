class TableGenerator {
  constructor(moves) {
    this.moves = moves;
  }

  generateTable() {
    const table = [["Moves", ...this.moves]];
    this.moves.forEach((move, index) => {
      const row = [move];
      this.moves.forEach((opponentMove) => {
        if (this.isWinningMove(move, opponentMove)) {
          row.push("Win");
        } else if (this.isLosingMove(move, opponentMove)) {
          row.push("Lose");
        } else {
          row.push("Draw");
        }
      });
      table.push(row);
    });
    return table;
  }

  isWinningMove(move, opponentMove) {
    const movesCount = this.moves.length;
    const halfMoves = Math.floor(movesCount / 2);
    const startIndex = this.moves.indexOf(move);
    const endIndex = (startIndex + halfMoves) % movesCount;

    if (endIndex > startIndex) {
      return (
        this.moves.indexOf(opponentMove) >= startIndex &&
        this.moves.indexOf(opponentMove) < endIndex
      );
    } else {
      return (
        this.moves.indexOf(opponentMove) >= startIndex ||
        this.moves.indexOf(opponentMove) < endIndex
      );
    }
  }

  isLosingMove(move, opponentMove) {
    return !this.isWinningMove(move, opponentMove) && move !== opponentMove;
  }
}

module.exports = TableGenerator;
