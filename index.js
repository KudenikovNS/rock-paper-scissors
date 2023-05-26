const Game = require("./Game");

const moves = process.argv.slice(2);
if (moves.length % 2 === 0 || new Set(moves).size !== moves.length) {
  console.log(
    `Invalid arguments. Please provide an odd number of unique moves.`
  );
} else if (moves.length < 3) {
  console.log(`The number of arguments must be greater than or equal to 3.`);
} else {
  const game = new Game(moves);
  game.play();
}
