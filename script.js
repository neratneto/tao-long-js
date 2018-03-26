var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cellSize = 30;
var game = {
  turn: '',
  bgcolors: ['beige', 'gray'],
};
var whiteDragon = {
  color: 'white',
  water: 4,
  fire: 0,
  head: [],
  history: [8],
  facing: '',
};



function displayChoices() {
  hideAll();
  if (this[game.turn].facing == ("south" || "north")) {
    $(".vertical").show();
  } else if ("east" || "west") {
    $(".horizontal").show();
  }
  $(".element").show();
}


function hideAll() {
    $("#start").hide();
    $(".normal").hide();
    $(".vertical").hide();
    $(".element").hide();
    $(".horizontal").hide();
    $(".repetition").hide();
    $(".action").hide();
}


function move(direction) {
  switch (this[game.turn].facing) {
    case "north":
      switch (direction) {
          case "forward":
            this[game.turn].head[1] -= cellSize;
            break;
          case "right":
            this[game.turn].facing = "east";
            this[game.turn].head[0] += cellSize;
            break;
          case "left":
            this[game.turn].facing = "west";
            this[game.turn].head[0] -= cellSize;
            break;
        }
      break;
    case "south":
      switch (direction) {
          case "forward":
            this[game.turn].head[1] += cellSize;
            break;
          case "right":
            this[game.turn].facing = "west";
            this[game.turn].head[0] -= cellSize;
            break;
          case "left":
            this[game.turn].facing = "east";
            this[game.turn].head[0] += cellSize;
            break;
        }
      break;
    case "east":
      switch (direction) {
          case "forward":
            this[game.turn].head[0] += cellSize;
            break;
          case "right":
            this[game.turn].facing = "south";
            this[game.turn].head[1] += cellSize;
            break;
          case "left":
            this[game.turn].facing = "north";
            this[game.turn].head[1] -= cellSize;
            break;
        }
      break;
    case "west":
      switch (direction) {
          case "forward":
            this[game.turn].head[0] -= cellSize;
            break;
          case "right":
            this[game.turn].facing = "north";
            this[game.turn].head[1] -= cellSize;
            break;
          case "left":
            this[game.turn].facing = "south";
            this[game.turn].head[1] += cellSize;
            break;
        }
      break;
  }
  moveDragon();
}

function moveButton(direction) {
  move(direction);
  $("#movementList").append("<li>" + game.turn + " moved " + direction + "</li>");
  displayChoices();
}

function standstill() {
  $("#movementList").append("<li>" + game.turn + " did not move" + "</li>");
  displayChoices();
}

function repeatableMovement() {
  hideAll();
  move('forward');
  $("#movementList").append("<li>" + game.turn + " moved forward </li>");
  $(".repetition").show();
}

function doubleMovement() {
  hideAll();
  $(".normal").show();
  $(".standstill").hide();
  $(".front").hide();
}

function movement() {
  hideAll();
  $(".normal").show();
}

function elementMovement(newelement) {
  element = newelement;
  hideAll();
  $(".action").show();
}


function elementAction(action) {
  hideAll();
  switch (action) {
    case "absorbed":
      if (this[game.turn][element] == 4) {
        $("#movementList").append("Cannot absorb anymore, " + element + " is full.");
        $(".release").show();
      } else {
        $("#movementList").append("<li>" + game.turn + " " + action + " " + element + "</li>");
        $(".normal").show();
        $(".standstill").hide();
        this[game.turn][element] += 1;
      }
      break;
    case "released":
      if (this[game.turn][element] == 0) {
        $("#movementList").append("Cannot release, " + element + " is empty.");
        $(".absorb").show();
      } else {
        $("#movementList").append("<li>" + game.turn + " " + action + " " + element + "</li>");
        $(".normal").show();
        $(".standstill").hide();
        if (element == "fire") {
          this[game.turn].fire -= 1;
          drawAttack('fire');
        } else {
          drawAttack('water');
        }
      }
  }
  refreshCounter();
}


function repeat() {
  move('forward');
  $("li:last").append(" twice");
  displayChoices();
}


function refreshCounter() {
  $("#watercount").text(this[game.turn].water);
  $("#firecount").text(this[game.turn].fire);
}


// == = == = == = == = == == == = = == = = = == = == = = == = = ==== = == = = == ==  == = == = = == == == = = = == = == = == = = ==


function drawSquare(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, cellSize, cellSize);
}

function eraseSquare(x, y) {
  ctx.fillStyle = game.bgcolors[0];
	ctx.fillRect(x, y, cellSize, cellSize);
  ctx.fillStyle = game.bgcolors[1];
	ctx.fillRect(x, y, 1, cellSize);
	ctx.fillRect(x, y, cellSize, 1);
}

function setBackground() {
	ctx.fillStyle = game.bgcolors[0];
	ctx.strokeStyle = game.bgcolors[1];
	ctx.fillRect(0, 0, canvas.height, canvas.width);
	for(var x = 0.5; x < canvas.width; x += cellSize) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas.height);
	}
	for(var y = 0.5; y < canvas.height; y += cellSize) {
		ctx.moveTo(0, y);
		ctx.lineTo(canvas.width, y);
	}
	ctx.stroke()
}


function moveDragon() {
  drawSquare(this[game.turn].head[0], this[game.turn].head[1], this[game.turn].color);
  eraseSquare(this[game.turn].history[6], this[game.turn].history[7]);
  this[game.turn].history.unshift(this[game.turn].head[0], this[game.turn].head[1]);
  this[game.turn].history.pop();
  this[game.turn].history.pop();
}

function drawAttack(type) {
  /*switch (type) {
    case "water":
      switch (this[game.turn].facing) {
        case "north":
          drawSquare((this[game.turn].headX), (this[game.turn].headY - cellSize), "blue");
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY - cellSize), "blue");
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY - cellSize), "blue");
          drawSquare((this[game.turn].headX), (this[game.turn].headY - 2*cellSize), "blue");
          break;
        case "south":
          drawSquare((this[game.turn].headX), (this[game.turn].headY + cellSize), "blue");
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY + cellSize), "blue");
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY + cellSize), "blue");
          drawSquare((this[game.turn].headX), (this[game.turn].headY + 2*cellSize), "blue");
          break;
        case "east":
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY), "blue");
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY + cellSize), "blue");
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY - cellSize), "blue");
          drawSquare((this[game.turn].headX + 2*cellSize), (this[game.turn].headY), "blue");
          break;
        case "west":
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY), "blue");
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY + cellSize), "blue");
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY - cellSize), "blue");
          drawSquare((this[game.turn].headX - 2*cellSize), (this[game.turn].headY), "blue");
          break;
      };
      break;
    case "fire":
      switch (this[game.turn].facing) {
        case "north":
          drawSquare((this[game.turn].headX), (this[game.turn].headY - cellSize), "red");
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY - cellSize), "red");
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY - cellSize), "red");
          drawSquare((this[game.turn].headX), (this[game.turn].headY - 2*cellSize), "red");
          break;
        case "south":
          drawSquare((this[game.turn].headX), (this[game.turn].headY + cellSize), "red");
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY + cellSize), "red");
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY + cellSize), "red");
          drawSquare((this[game.turn].headX), (this[game.turn].headY + 2*cellSize), "red");
          break;
        case "east":
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY), "red");
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY + cellSize), "red");
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY - cellSize), "red");
          drawSquare((this[game.turn].headX + 2*cellSize), (this[game.turn].headY), "red");
          break;
        case "west":
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY), "red");
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY + cellSize), "red");
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY - cellSize), "red");
          drawSquare((this[game.turn].headX - 2*cellSize), (this[game.turn].headY), "red");
          break;
      };
      break;
    case "bite":
      switch (this[game.turn].facing) {
        case "north":
          drawSquare((this[game.turn].headX), (this[game.turn].headY - cellSize), "darkgray");
          break;
        case "south":
          drawSquare((this[game.turn].headX), (this[game.turn].headY + cellSize), "darkgray");
          break;
        case "east":
          drawSquare((this[game.turn].headX + cellSize), (this[game.turn].headY), "darkgray");
          break;
        case "west":
          drawSquare((this[game.turn].headX - cellSize), (this[game.turn].headY), "darkgray");
          break;
      };
      break;
  }*/
}

function dragonInit(dragon, headX, headY, facing) {
  game.turn = dragon;
  this[game.turn].facing = facing;
  this[game.turn].head[0] = headX;
  this[game.turn].head[1] = headY;
  drawSquare(this[game.turn].head[0], this[game.turn].head[1], this[game.turn].color);
  drawSquare(this[game.turn].head[0], (this[game.turn].head[1] - cellSize), this[game.turn].color);
  drawSquare((this[game.turn].head[0] + cellSize), (this[game.turn].head[1] - cellSize), this[game.turn].color);
  drawSquare((this[game.turn].head[0] + cellSize), this[game.turn].head[1], this[game.turn].color);
  this[game.turn].history = [this[game.turn].head[0], this[game.turn].head[1],
                          this[game.turn].head[0], (this[game.turn].head[1] - cellSize),
                          (this[game.turn].head[0] + cellSize), (this[game.turn].head[1] - cellSize),
                          (this[game.turn].head[0] + cellSize), this[game.turn].head[1]];
}


/* A R R O W   K E Y S
function changeDirection(keycode) {
	if(keycode == 37 && direction != "right') { directionQueue = 'left'; }
	else if(keycode == 38 && direction != 'down') { directionQueue = 'up'; }
	else if(keycode == 39 && direction != 'left') { directionQueue = 'right'; }
	else if(keycode == 40 && direction != 'top') { directionQueue = 'down' }
} */




function init() {
  $(".normal").hide();
  $(".vertical").hide();
  $(".element").hide();
  $(".horizontal").hide();
  $(".repetition").hide();
  $(".action").hide();
  $("#start").show();
  setBackground();
  dragonInit('whiteDragon', 0, cellSize, 'south');
}
init();
