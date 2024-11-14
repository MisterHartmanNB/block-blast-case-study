let score = 0;
let board = [];
let blocks = [];
let blockColors = [];
let currentBlock = 0;

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
  let type = 1;
  blockColors[i] = random(['red', 'green', 'blue', 'yellow', 'purple', 'orange']);
    switch(type){
      case 1:
        blocks[i]=[[0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,1,1,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0]];
                    break;
    }
  }
}

function mousePressed() {
  //Check if the mouse is over block 1,2, or 3
  if(mouseX > 20 && mouseX < 140 && mouseY > 365 && mouseY < 485){
    currentBlock = 0;
  } else if(mouseX > 140 && mouseX < 260 && mouseY > 365 && mouseY < 485){
    currentBlock = 1;
  } else if(mouseX > 260 && mouseX < 380 && mouseY > 365 && mouseY < 485){
    currentBlock = 2;
  }
  
  //Check if the mouse is over the board
  if(mouseX > 40 && mouseX < 360 && mouseY > 40 && mouseY < 440){
    let x = floor((mouseX-40)/40);
    let y = floor((mouseY-40)/40);
    if(checkValidMove(x, y)){
      placeBlock(x, y);
    }
  }
}

function checkValidMove() {
  //Find the mouse's location on the board
  let x = floor((mouseX-40)/40);
  let y = floor((mouseY-40)/40);
  for(let i = -3; i<5; i++){
    for(let j = -3; j<5; j++){
      if(blocks[currentBlock][i+3][j+3] !=0){
        if(board[x+i][y+j] === 1){
          return false;
        }
      }
    }
  }
  return true;
}

function placeBlock() {
  let x = floor((mouseX-40)/40);
  let y = floor((mouseY-40)/40);
  for(let i = -3; i<5; i++){
    for(let j = -3; j<5; j++){
      if(blocks[currentBlock][i+3][j+3] === 1){
        board[x+i][y+j] = blockColors[currentBlock];
      }
    }
  }
  //checkForLines();
  //randomizeBlocks();
}