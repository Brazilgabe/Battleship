var rows = 10;
var cols = 10;

var container = document.querySelector("#gameBoard");

for (var i = 0; i<cols; i++) {
  var squareCol = document.createElement("tr");
  squareCol.id = "row" + i;
  container.appendChild(squareCol);

  for (var j = 0; j<rows; j++) {
    var squareRow = document.createElement("td");
    squareCol.appendChild(squareRow);
    squareRow.id =  "row" + i  + " " + "col" + j;
    //console.log(squareRow);      //"ind" + i+j; // "row" + i  + " " + "col" + j + " ind"
  }
}

var gameState = {
  SHIPSIZE: [2,3,3,4,5],
  hits: 5, //17
  torpedoes: 5,
  // currentPlayer: 'X',

  board: [
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
  ]
}
// function checkHorizontal(x,y,length){
//   if (gameState.SHIPSIZE.length + 1 )
// }

function randomizeShips(){


  var count = 0;
  while(count < gameState.SHIPSIZE.length){
    var xCoord = Math.floor(Math.random()*9);
    var yCoord = Math.floor(Math.random()*9);

    // if (checkHorizontal(xCoord, yCoord, length)){
      if (gameState.board[xCoord][yCoord] != "ship"){
      gameState.board[xCoord][yCoord] = "ship";
      count++;
  }
  }
  }
  console.log(gameState.board);


container.addEventListener('click',fire, false)

function fire(e){
  var row = e.target.id.substring(3,4);
  var col = e.target.id.substring(8,10); //9
  //console.log(gameState.board[row][col]);
  if(gameState.board[row][col] == ""){
    //Uncaught TypeError: Cannot read property 'd' of undefined
    //at HTMLTableElement.fire (game.js:54)   (happens when you click and drag)
    console.log(gameState.board[row][col]);
    e.target.style.background = 'black';
    gameState.board[row][col] = "miss";
    gameState.torpedoes--;
  }
  if (gameState.board[row][col] == "ship") {
    e.target.style.background = 'red';
    gameState.board[row][col] = "hit";
    gameState.hits--;
    console.log(gameState.hits);
    console.log(gameState.board);
    gameState.torpedoes--;
    //alert("you hit the ship!")
  }
  document.getElementById("stats").innerHTML = "Torpedoes Remaining: " + gameState.torpedoes;

  console.log(gameState.torpedoes);
  ussMidway()

}

function ussMidway() {
  if (gameState.hits == 0) {
    document.querySelector('#winMessage').innerText = "Congrats, you sunk all the ships!!!";
  }
  if (gameState.torpedoes == 0) {
    document.querySelector('#winMessage').innerText = "You suck, you used all 25 torpedoes and still couldn't sink 5 ships";
     showBoard()
  }
}

function showBoard() {
  if (gameState.torpedoes == 0 ){
    gameState.board.forEach(function(row, x){
      row.forEach(function(cell, y){
        //console.log(cell, y);
        if (cell == "ship"){
          console.log(gameState.board[x][y]);
          document.getElementById("row" + x + " col"+ y).style.background = 'red';
        } else if (cell == "miss"){
          console.log(gameState.board[x][y]);
          document.getElementById("row" + x + " col"+ y).style.background = 'blue';
        }
      })
    })
}
}

function resetBoard(){
  gameState.torpedoes = 5;
  //eventually run function that selects new ship locations
  gameState.board = [
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
  ["","","","","","","","","",""],
];

    gameState.board.forEach(function(row, x){
      row.forEach(function(cell, y){
        //console.log(cell, y);
          document.getElementById("row" + x + " col"+ y).style.background = 'white';
        })
      })
    }









//
