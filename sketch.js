let score = 0;
let board = [];
let blocks = [];
let blockColors = [];
let currentBlock = 0;
let isEmpty = [true,true,true];
let gameOverFlag = false;


function setup() {
  createCanvas(400, 600);
  // Create the board array
  for(let i = 0; i<8; i++){
    board[i] = [];
    for(let j = 0; j<8; j++){
      board[i][j] = 0;
    }
  }


  //Create three block arrays to store the next block
  for(let i = 0; i<3; i++){
    blocks[i] = [];
    for(let j = 0; j< 8; j++){
      blocks[i][j] = [];
      for(let k = 0; k<8; k++){
        blocks[i][j][k] = 0;
      }
    }


//Randomize the blocks
  randomizeBlocks();
  }
}


function draw() {
  background(255);


//Display the score at the top and center of the screen
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("Score: " + score, width/2, 25);


  drawBoard();
  drawBlocks();
  drawPreview();

  if(gameOverFlag){
    fill(0);
    textSize(36);
    textAlign(CENTER);
    text("Game Over", width/2, height/2);
  }
}


function drawBoard() {
  for(let i = 0; i<8; i++){
    for(let j = 0; j<8; j++){
      stroke(0);
      if(board[i][j] === 0){
        fill(220);
      } else {
        fill(board[i][j]);
      }
      rect(i*40+40, j*40+40, 40, 40);
    }
  }
}

function drawBlocks() {
  for(let i = 0; i<3; i++){
    noFill();
    stroke('green');
    if(currentBlock==i) rect(20+i*120, 365, 120, 120);
    for(let j = 0; j<8; j++){
      for(let k = 0; k<8; k++){
        if(blocks[i][j][k] === 1){
          stroke(0);
          fill(blockColors[i]);
          rect(j*15+20+i*120, k*15+365, 15, 15);
        }
      }
    }
  }
}


function randomizeBlocks() {
  for(let i = 0; i<3; i++){
  let type = random([1,2,3,4,5]);
  blockColors[i] = random(['red', 'green', 'blue', 'yellow', 'purple', 'orange']);
    switch(type){
      case 1:
        blocks[i]= [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,1,1,1,0,0],
                    [0,0,0,1,1,1,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
                    break;
      case 2:
        blocks[i]= [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
                    break;
      case 3:
        blocks[i]= [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,1,1,1,0,0],
                    [0,0,0,1,1,1,0,0],
                    [0,0,0,1,1,1,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
                    break;
      case 4:
        blocks[i]= [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,1,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
                    break;
      case 5:
        blocks[i]= [[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,1,0,0,0,0],
                    [0,0,0,1,0,0,0,0],
                    [0,0,0,1,0,0,0,0],
                    [0,0,0,1,0,0,0,0],
                    [0,0,0,1,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
                    break;


    }
    isEmpty[i]=false;
  }
}


function mousePressed() {
  if(!gameOverFlag) {
    //Check if the mouse is over block 1,2, or 3
    if(mouseX > 20 && mouseX < 140 && mouseY > 365 && mouseY < 485){
      currentBlock = 0;
    } else if(mouseX > 140 && mouseX < 260 && mouseY > 365 && mouseY < 485){
      currentBlock = 1;
    } else if(mouseX > 260 && mouseX < 380 && mouseY > 365 && mouseY < 485){
      currentBlock = 2;
    }
  
    //Check if the mouse is over the board
    if((mouseX > 40) && (mouseX < 360) && (mouseY > 40) && (mouseY < 360)){
      let x = floor((mouseX-40)/40);
      let y = floor((mouseY-40)/40);
      if(checkValidMove(x, y, currentBlock)){
        placeBlock(x, y);
      }
    }
  }
}

function checkValidMove(x,y,k) {
  if(isEmpty[k]) return false;
  if(x<0 && x>=8 && y<0 && y>=8) return false;
  for(let i = -3; i<5; i++){
    for(let j = -3; j<5; j++){
      if((x+i<0||x+i>=8||y+j<0||y+j>=8)&&(blocks[k][i+3][j+3] !=0)) {
        return false;
      }
      if(blocks[k][i+3][j+3] !=0){
        if(board[x+i][y+j] != 0){
          return false;
        }
      }
    }
  }
  return true;
}

function placeBlock(x,y) {
  for(let i = -3; i<5; i++){
    for(let j = -3; j<5; j++){
      if(blocks[currentBlock][i+3][j+3] != 0){
        board[x+i][y+j] = blockColors[currentBlock];
      }
    }
  }
  blocks[currentBlock]=[[0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0]];
  isEmpty[currentBlock] = true;
  if(!gameOverFlag) {
  checkForLines();
  checkReset();
  checkGameOver();
  } 
}

function drawPreview() {
//Draw in white where the currentBlock would be placed relative to the mouse, snaps to the grid
  if(!gameOverFlag) {
    let x = floor((mouseX-40)/40);
    let y = floor((mouseY-40)/40);
    for(let i = -3; i<5; i++){
      for(let j = -3; j<5; j++){
        if(blocks[currentBlock][i+3][j+3] != 0){
          stroke('white');
          fill(255, 255, 255, 127);
          if(x>=0&&x<8&&y>=0&&(y<8)) rect((x+i)*40+40, (y+j)*40+40, 40, 40);
        }
      }
    }
  }
}


function checkForLines() {
  //Checks for vertical lines
  for(let i = 0; i<8; i++){
    let line = true;
    for(let j = 0; j<8; j++){
      if(board[i][j] == 0){
        line = false;
      }
    }
    if(line){
      score+=50;
      for(let j = 0; j<8; j++){
        board[i][j] = 0;
      }
    }
  }


  //Checks for horizontal lines
  for(let i = 0; i<8; i++){
    let line = true;
    for(let j = 0; j<8; j++){
      if(board[j][i] == 0){
        line = false;
      }
    }
    if(line){
      score+=50;
      for(let j = 0; j<8; j++){
        board[j][i] = 0;
      }
    }
  }
}


function checkReset() {
  let reset = true;
  for(let i = 0; i<3; i++){
    for(let j = 0; j<8; j++){
      for(let k = 0; k<8; k++){
        if(blocks[i][j][k] != 0) {
          reset = false;
        }
      }
    }
  }
  if(reset) {
    randomizeBlocks();
  }
}


function checkGameOver() {
//Checks every possible place all remaining blocks can be placed, if no blocks can be placed, it returns "true"
let gameOver = [];
for(let k = 0; k<3; k++) {
  gameOver[k] = [];
  for(let x = 0 ; x < 8; x++) {
    gameOver[k][x] = [];
    for(let y = 0; y < 8; y++) {
      gameOver[k][x][y] = checkValidMove(x,y,k);
      //Console log for debugging
      //if(gameOver[k][x][y]) console.log("At Block " + k + " " + x + " " + y + ": " + gameOver[k][x][y] + "\nIs Empty: " + isEmpty[k]);
    }
  }
}

let flag = false;
for(let k = 0; k < 3; k++) {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if(gameOver[k][x][y]==true) flag = true;
    }
  }
}
if(!flag) gameOverFlag = true;
}