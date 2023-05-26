class Rules {
  constructor(moves) {
    this.moves = moves;
  }

  calculateResult(userMove, computerMove) {
    const movesCount = this.moves.length;
    const halfMoves = Math.floor(movesCount / 2);
    const startIndex = this.moves.indexOf(computerMove);

    const winningMoves = this.moves.slice(
      startIndex + 1,
      startIndex + 1 + halfMoves
    );
    const losingMoves = this.moves.slice(startIndex - halfMoves, startIndex);

    if (winningMoves.includes(userMove)) {
      return "You win!";
    } else if (losingMoves.includes(userMove)) {
      return "You lose!";
    } else {
      return "It's a draw!";
    }
  }
}

module.exports = Rules;
