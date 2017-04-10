var rows = 10;
var cols = 10;
var squareSize = 60;

var container = document.querySelector("#gameBoard");

  for (var i = 0; i<cols; i++) {
  var squareCol = document.createElement("tr");
    squareCol.id = "row" + i;
    container.appendChild(squareCol);

  for (var j = 0; j<rows; j++) {
      var squareRow = document.createElement("td");
      squareCol.appendChild(squareRow);
      squareRow.id = "row" + i  + " " + "col" + j;
  }
}



// As a user when I click on a position, the position changes color so that I can tell that a position has been torpedoed.
//
// Hint: document.getElementById("myDiv").className = "hit" to set the class of an element called "myDiv"
