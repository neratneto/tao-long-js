var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var cellSize = 30;
var bgcolors = ['lightgray', 'gray']
var whiteDragon = {
  color: 'white',
  water: 4,
  fire: 0,
  head: [],
  history: [8],
  facing: 'south'
};




function displayChoices() {
  $(".special").show();
  $("#start").hide();
}



function move(direction, player) {
  switch (this[player].facing) {
    case "north":
      switch (direction) {
          case "forward":
            this[player].head[1] -= cellSize;
            break;
          case "right":
            this[player].facing = "east";
            this[player].head[0] += cellSize;
            break;
          case "left":
            this[player].facing = "west";
            this[player].head[0] -= cellSize;
            break;
        }
      break;
    case "south":
      switch (direction) {
          case "forward":
            this[player].head[1] += cellSize;
            break;
          case "right":
            this[player].facing = "west";
            this[player].head[0] -= cellSize;
            break;
          case "left":
            this[player].facing = "east";
            this[player].head[0] += cellSize;
            break;
        }
      break;
    case "east":
      switch (direction) {
          case "forward":
            this[player].head[0] += cellSize;
            break;
          case "right":
            this[player].facing = "south";
            this[player].head[1] += cellSize;
            break;
          case "left":
            this[player].facing = "north";
            this[player].head[1] -= cellSize;
            break;
        }
      break;
    case "west":
      switch (direction) {
          case "forward":
            this[player].head[0] -= cellSize;
            break;
          case "right":
            this[player].facing = "north";
            this[player].head[1] -= cellSize;
            break;
          case "left":
            this[player].facing = "south";
            this[player].head[1] += cellSize;
            break;
        }
      break;
  }
  moveDragon(player);
}

function moveButton(direction, player) {
  move(direction, player);
  $("#movementList").append("<li>" + player + " moved " + direction + "</li>");
  $("button").hide();
  pass();
}

function standstill(player) {
  $("#movementList").append("<li>" + player + " did not move" + "</li>");
  $("button").hide();
  pass();
}

function repeatableMovement(player) {
  move('forward', player);
  $("#movementList").append("<li>" + player + " moved forward </li>");
  $(".special").hide();
  $(".repetition").show();
}

function doubleMovement() {
  $(".special").hide();
  $(".right").show();
  $(".left").show();
}

function movement() {
  $(".special").hide();
  $(".normal").show();
}

function elementMovement(newelement) {
  element = newelement;
  $("button").hide();
  $(".action").show();
}


function elementAction(action, player) {
  $("#movementList").append("<li>" + player + " " + action + " " + element + "</li>");
  $(".normal").show();
  $(".standstill").hide();
  $(".action").hide();
  switch (action + element) {
    case "absorbedfire":
      this[player].fire += 1;
      break;
    case "releasedfire":
      this[player].fire -= 1;
      break;
    case "absorbedwater":
      this[player].water += 1;
      break;
    case "releasedwater":
      this[player].water -= 1;
      break;
  }
  refreshCounter(player);
}


function repeat(player) {
  move('forward', player);
  $("li:last").append(" twice");
  pass();
}

function pass() {
  $(".repetition").hide();
  $(".special").show();
}


function refreshCounter(player) {
  $("#watercount").text(this[player].water);
  $("#firecount").text(this[player].fire);
}


// == = == = == = == = == == == = = == = = = == = == = = == = = ==== = == = = == ==  == = == = = == == == = = = == = == = == = = ==


function drawSquare(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, cellSize, cellSize);
}

function eraseSquare(x, y) {
  ctx.fillStyle = bgcolors[0];
	ctx.fillRect(x, y, cellSize, cellSize);
  ctx.fillStyle = bgcolors[1];
	ctx.fillRect(x, y, 1, cellSize);
	ctx.fillRect(x, y, cellSize, 1);
}

function setBackground() {
	ctx.fillStyle = bgcolors[0];
	ctx.strokeStyle = bgcolors[1];
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


function moveDragon(player) {
  drawSquare(this[player].head[0], this[player].head[1], this[player].color);
  eraseSquare(this[player].history[6], this[player].history[7]);
  this[player].history.unshift(this[player].head[0], this[player].head[1]);
  this[player].history.pop();
  this[player].history.pop();
}

function dragonInit(player, headX, headY, facing) {
  this[player].facing = facing;
  this[player].head[0] = headX;
  this[player].head[1] = headY;
  drawSquare(this[player].head[0], this[player].head[1], this[player].color);
  drawSquare(this[player].head[0], (this[player].head[1] - cellSize), this[player].color);
  drawSquare((this[player].head[0] + cellSize), (this[player].head[1] - cellSize), this[player].color);
  drawSquare((this[player].head[0] + cellSize), this[player].head[1], this[player].color);
  this[player].history = [this[player].head[0], this[player].head[1],
                          this[player].head[0], (this[player].head[1] - cellSize),
                          (this[player].head[0] + cellSize), (this[player].head[1] - cellSize),
                          (this[player].head[0] + cellSize), this[player].head[1]];
}


/* A R R O W   K E Y S
function changeDirection(keycode) {
	if(keycode == 37 && direction != "right') { directionQueue = 'left'; }
	else if(keycode == 38 && direction != 'down') { directionQueue = 'up'; }
	else if(keycode == 39 && direction != 'left') { directionQueue = 'right'; }
	else if(keycode == 40 && direction != 'top') { directionQueue = 'down' }
} */




function init() {
  $("button").hide();
  $("a").hide();
  $("#start").show();
  setBackground();
  dragonInit('whiteDragon', 0, cellSize, 'south');
}
init();
