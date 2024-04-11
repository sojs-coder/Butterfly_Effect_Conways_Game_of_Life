const { Game } = require("./game");
const { workerData, parentPort } = require("worker_threads");

const { template, maxGeneration } = workerData;

const game = new Game(template, maxGeneration);
// modifying one coordinate
var row = Math.floor(Math.random() * game.ROWS);
var col = Math.floor(Math.random() * game.COLS);
game.grid[row][col] *= -1;
game.start((pop, gen)=>{
  parentPort.postMessage({
    pop,
    gen,
    game
  })
});
