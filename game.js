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
  }
}

var gameState = {
  SHIPSIZE: [5,4,3,3,2],
  hits: 5, //17
  torpedoes: 5,

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
function checkHorizontal(x,y,length){
    // check the (x,y) coordinates of the random numbers that are generatred from x all the way to x + length (of ship)

    // var count = xCoord;
    // var start = xCoord;
    //for (start; start < (count+shipsize); start++){

    var a = y;

  var arr = [];
    for (a; a < y + length; a++) {
      if (gameState.board[x][a] == "") {
        console.log("empty");
        //console.log("sum " + sum);
        arr.push("empty");
      } else {
        console.log("not empty");
        arr.push("not empty");
      }
    }

    if (arr.includes("not empty")) {
      return true;
    } else {
      return false;
    }
}

function randomizeShips(){
  //debugger;

  // for (var count = 0; count< gameState.SHIPSIZE.length; count++){
  //     var xCoord = Math.floor(Math.random()*9);
  //     var yCoord = Math.floor(Math.random()*9);
  //   if (checkHorizontal(xCoord, yCoord, length)){
  //     if (gameState.board[xCoord][yCoord] != "ship"){
  //     gameState.board[xCoord][yCoord] = "ship";
  //     count++;
  // }
  gameState.SHIPSIZE.forEach(function(shipsize){
    do {
      var xCoord = Math.floor(Math.random()*9);
      var yCoord = Math.floor(Math.random()*9);
    }
    while(checkHorizontal(xCoord, yCoord, shipsize))


    // var direction = 'h'; //if (v or h)
    // if (direction === 'h'){ //'v'){
    //
    var count = xCoord;
    var start = xCoord;
    if (start + shipsize >= 10){
      start = 9 - shipsize;
      var count = start;
    };

    for (start; start < (count+shipsize); start++){
        gameState.board[yCoord][start] = shipsize;
      }


    //console.log(gameState.board);

    // if (direction === 'v'){ //'v'){
    //   var start2;
    //   for (start2= yCoord; start2 < (yCoord+shipsize); start2++){
    //     if (yCoord+shipsize < 10){
    //       gameState.board[xCoord][start] = shipsize;
    //     }
    //   }
    // }
  })

}

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
  if (typeof gameState.board[row][col] == "number") { //typeof parseInt(cell) == "number"
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
        if (typeof cell == "number"){
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
    row.forEach(function(cell, y){ //console.log(cell, y);
      document.getElementById("row" + x + " col"+ y).style.background = 'white';
    })
  })
}

// var gameState = {
//   SHIPSIZE: [2,3,3,4,5],

// var direction = 'h';
// //if (v or h)
//
// gameState.SHIPSIZE.forEach(function(shipsize){
//   if (direction === 'h'){ //'v'){
//     var c;
//     for (c = xCoord; c < (xCoord+shipsize); c++){
//       gameState.board[yCoord][c] = string(shipsize);
//     // } else {
//     //   // for direction = 'v';
//     // }
//   }


// })







//
