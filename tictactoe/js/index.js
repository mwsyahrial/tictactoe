$("#enterBtn").click(function () {
  init();
});
$("#resetBtn").click(function () {
  resetGame();
});

var empty = "&nbsp;",
  boxes = [],
  turn = "X",
  o_win = 0,
  x_win = 0,
  moves,
  reset = false;

//Initializes the Tic Tac Toe board and starts the game.

function init() {
  tictactoe = document.getElementById("tictactoe");
  var board = document.createElement("table");
  this.size = $("#enterNum").val();
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);

  var identifier = 1;
  for (var i = 0; i < size; i++) {
    var row = document.createElement("tr");
    board.appendChild(row);
    for (var j = 0; j < size; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("height", 120);
      cell.setAttribute("width", 120);
      cell.setAttribute("align", "center");
      cell.setAttribute("valign", "center");
      cell.classList.add("col" + j, "row" + i);
      if (i == j) {
        cell.classList.add("diagonal0");
      }
      if (j == size - i - 1) {
        cell.classList.add("diagonal1");
      }
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  if (tictactoe.hasChildNodes()) {
    tictactoe.removeChild(tictactoe.childNodes[0]);
  }
  document.getElementById("tictactoe").append(board);
  startNewGame();
}

function resetGame() {
  this.reset = true;
  o_win = 0;
  x_win = 0;
  init();
}

// New game

function startNewGame() {
  moves = 0;
  turn = "X";
  boxes.forEach(function (square) {
    square.innerHTML = empty;
  });
  $("#o_win").text(o_win);
  $("#x_win").text(x_win);
}

// Check if a win or not

function win(clicked) {
  // Get all cell classes
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = "." + memberOf[i];
    var items = contains("#tictactoe " + testClass, turn);
    // winning condition: turn == size
    if (items.length == size) {
      return true;
    }
  }
  return false;
}

// Helper function to check if NodeList from selector has a particular text

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

// Sets clicked square and also updates the turn.

function set() {
  if (this.innerHTML !== empty) {
    return;
  }
  this.innerHTML = turn;
  turn === "X" ? this.style.color = "red" : this.style.color = "blue";
  moves += 1;
  if (win(this)) {
    turn === "X" ? x_win++ : o_win++;
    alert("Winner: Player " + turn);
    startNewGame();
  } else if (moves === size * size) {
    alert("Draw");
    startNewGame();
  } else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById("turn").textContent = "Player " + turn;
  }
}

init();
