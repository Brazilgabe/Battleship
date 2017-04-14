// this is the working game copy
// we need to fix the button so that it can be restarted on click..




var rows = 10;
var cols = 10;

var container = document.querySelector("#gameBoard");

for (var i = 0; i < cols; i++) {
    var squareCol = document.createElement("tr");
    squareCol.id = "row" + i;
    container.appendChild(squareCol);

    for (var j = 0; j < rows; j++) {
        var squareRow = document.createElement("td");
        squareCol.appendChild(squareRow);
        squareRow.id = "row" + i + " " + "col" + j;
    }
}


var gameState = {
    SHIPSIZE: [5, 4, 3, 3, 2],
    hits: 5, //17
    torpedoes: 2,

    board: [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
    ]
}


function checkHorizontal(xCoord, shipsize, y, start) {

    var arr = [];
    for (start; start < (y + shipsize); start++) {
        if (typeof gameState.board[xCoord][start] != "number") {
            console.log("empty" + start);
            arr.push("empty");
        } else {
            console.log("not empty" + start);
            arr.push("not empty");
        }
    }
    console.log(arr);
    if (arr.includes("not empty")) {
        return true;
    } else {
        return false;
    }
}


function randomizeShips() {

    gameState.SHIPSIZE.forEach(function(shipsize) {
        do {
            var xCoord = Math.floor(Math.random() * 9);
            var yCoord = Math.floor(Math.random() * 9);

            var y = yCoord;
            var start = yCoord;

            if (start + shipsize >= 10) {
                start = 9 - shipsize;
                var y = start;
            };
        }
        while (checkHorizontal(xCoord, shipsize, y, start))


        for (start; start < (y + shipsize); start++) {
            gameState.board[xCoord][start] = shipsize;
        }

    })

}

container.addEventListener('click', fire, false)

function fire(e) {
    var row = e.target.id.substring(3, 4);
    var col = e.target.id.substring(8, 10);
    if (gameState.board[row][col] == "") {
        console.log(gameState.board[row][col]);
        e.target.style.background = 'black';
        gameState.board[row][col] = "miss";
        gameState.torpedoes--;
    }
    if (typeof gameState.board[row][col] == "number") {
        e.target.style.background = 'red';
        gameState.board[row][col] = "hit";
        gameState.hits--;
        console.log(gameState.hits);
        console.log(gameState.board);
        gameState.torpedoes--;

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
    if (gameState.torpedoes == 0) {
        gameState.board.forEach(function(row, x) {
            row.forEach(function(cell, y) {
                if (typeof cell == "number") {
                    //console.log(gameState.board[x][y]);
                    document.getElementById("row" + x + " col" + y).style.background = 'red';
                } else if (cell == "miss") {
                    //  console.log(gameState.board[x][y]);
                    document.getElementById("row" + x + " col" + y).style.background = 'blue';
                }
            })
        })
    }
}

function resetBoard() {
    gameState.torpedoes = 25;
    gameState.board = [
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", "", ""],
    ];

    gameState.board.forEach(function(row, x) {
        row.forEach(function(cell, y) {
            document.getElementById("row" + x + " col" + y).style.background = 'white';
            if (gameState.torpedoes == 0) {
                gameState.torpedoes = 25;
            }
        })

    })
    document.querySelector('#winMessage').innerText = "Let's see if you can sink all the ships!";
    randomizeShips()
}









//
