class Game{
  constructor(template,end=500){
    this.template = template;
    this.ROWS = this.template.ROWS;
    this.COLS = this.template.COLS;
    this.grid = copyGrid(this.template.grid, this.ROWS, this.COLS);
    this.generation = 0;
    this.maxGeneration = end;
  }
  update(){
    if(this.generation < this.maxGeneration){
      this.grid = updateGrid(this.grid,this.ROWS,this.COLS);
      this.generation++
    }else{
      console.log("DONE: "+this.generation);
      console.log(countGrid(this.grid, this.ROWS, this.COLS))
    }
  }
  start(){
    for(var i = 0; i < this.maxGeneration + 1; i++){
      this.update();
    }
  }
}
class Template {
  constructor(w,h){
    this.ROWS = h;
    this.COLS = w;
    this.grid = createGrid(this.ROWS,this.COLS);
  }
}

function countGrid(grid, ROWS, COLS){
  var total = 0;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if(grid[i][j] == 1){
        total += 1;
      }
    }
  }
  return total;
}
function createGrid(ROWS,COLS) {
  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    grid[i] = [];
    for (let j = 0; j < COLS; j++) {
      grid[i][j] = Math.random() < 0.5 ? -1 : 1;
    }
  }
  return grid;
}
function createEmptyGrid(ROWS,COLS){
  const grid = [];
  for (let i = 0; i < ROWS; i++) {
    grid[i] = new Array(COLS);
  }
  return grid;
}
function updateGrid(grid,ROWS,COLS){
  const newGrid = createEmptyGrid(ROWS,COLS);
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const neighbors = countNeighbors(grid,i, j, ROWS, COLS);
      if (grid[i][j] === 1) {
        if (neighbors < 2 || neighbors > 3) {
          newGrid[i][j] = -1;
        } else {
          newGrid[i][j] = 1;
        }
      } else {
        if (neighbors === 3) {
          newGrid[i][j] = 1;
        } else {
          newGrid[i][j] = -1;
        }
      }
    }
  }
  grid = newGrid;
  return grid;
}

function countNeighbors(grid,row, col, ROWS,COLS) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
        if (i !== 0 || j !== 0) {
          count += Math.max(grid[newRow][newCol],0);
        }
      }
    }
  }
  return count;
}
function copyGrid(toCopy, ROWS, COLS){
  const g = [];
  for(let i = 0; i < ROWS; i++){
    g[i] = [];
    for(let j = 0; j < COLS; j++){
      g[i][j] = toCopy[i][j]
    }
  }
  return g;
}


module.exports = {
  Game, Template
}

