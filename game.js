var rows = 10;
var cols = 10;
//var squareSize = 60;s

var container = document.querySelector("#gameBoard");

  for (var i = 0; i<cols; i++) {
  var squareCol = document.createElement("tr");
    squareCol.id = "row" + i;
    container.appendChild(squareCol);

  for (var j = 0; j<rows; j++) {
      var squareRow = document.createElement("td");
      squareCol.appendChild(squareRow);
      squareRow.id =  "row" + i  + " " + "col" + j;
      //console.log(squareRow);

      //"ind" + i+j;
      // "row" + i  + " " + "col" + j + " ind"
      //squareRow.onclick = "handleClick(" + i + j + ")";
  }
}

var gameState = {
  PLAYER_ONE: 'X',
  hits: 5, //17
  torpedoes: 25,
  currentPlayer: 'X',
  board: [
          ["","","","","","","","","",""],
          ["","","","ship","","","","","",""],
          ["","","","","","","","ship","",""],
          ["","","","","","","","","",""],
          ["","","","ship","","","","","",""],
          ["","","","","","","","","",""],
          ["","","","","","","","","",""],
          ["","","ship","","","","","ship","",""],
          ["","","","","","","","","",""],
          ["","","","","","","","","",""],
        ]
}

container.addEventListener('click',fire, false)
// As a user when I click on a position, the position changes color so that I can tell that a position has been torpedoed.
//
// Hint: document.getElementById("myDiv").className = "hit" to set the class of an element called "myDiv"


function fire(e){
  var row = e.target.id.substring(3,4);
  var col = e.target.id.substring(8,10); //9
  //console.log(row);
  //console.log(col);
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
  console.log("show board");
}









//
