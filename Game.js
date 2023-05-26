const readline = require("readline");
const TableGenerator = require("./TableGenerator");
const Rules = require("./Rules");
const CryptoUtils = require("./CryptoUtils");

class Game {
  constructor(moves) {
    this.moves = moves;
    this.hmacKey = "";
    this.computerMove = "";
    this.userMove = "";
    this.tableGenerator = new TableGenerator(this.moves);
    this.rules = new Rules(this.moves);
    this.cryptoUtils = new CryptoUtils();
  }

  generateComputerMove() {
    const randomIndex = Math.floor(Math.random() * this.moves.length);
    this.computerMove = this.moves[randomIndex];
  }

  showAvailableMoves() {
    console.log("Available moves:");
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log("0 - exit");
    console.log("? - help");
  }

  play() {
    this.hmacKey = this.cryptoUtils.generateKey();
    console.log();
    this.generateComputerMove();
    const hmac = this.cryptoUtils.generateHMAC(this.hmacKey, this.computerMove);

    console.log(`HMAC: ${hmac}`);
    console.log();
    this.showAvailableMoves();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Enter your move: ", (userInput) => {
      this.userMove = this.moves[userInput - 1];
      rl.close();

      if (userInput === "0") {
        console.log("Goodbye!");
        return;
      }

      if (userInput === "?") {
        this.showHelp();
        return;
      }

      if (!this.userMove) {
        console.log("Invalid move. Please try again.");
        return;
      }

      console.log(`Your move: ${this.userMove}`);
      console.log(`Computer move: ${this.computerMove}`);

      const result = this.rules.calculateResult(
        this.userMove,
        this.computerMove
      );
      console.log(result);
      console.log(`HMAC key: ${this.hmacKey}`);
    });
  }

  showHelp() {
    console.log("Help:");
    const table = this.tableGenerator.generateTable();
    this.printTable(table);
  }

  printTable(table) {
    const maxColumnWidths = [];
    for (let i = 0; i < table[0].length; i++) {
      let maxWidth = 0;
      for (let j = 0; j < table.length; j++) {
        if (table[j][i].length > maxWidth) {
          maxWidth = table[j][i].length;
        }
      }
      maxColumnWidths.push(maxWidth);
    }

    for (let i = 0; i < table.length; i++) {
      let row = "";
      for (let j = 0; j < table[i].length; j++) {
        const cell = table[i][j].padEnd(maxColumnWidths[j]);
        row += cell + "  ";
      }
      console.log(row);
    }
  }
}

module.exports = Game;
