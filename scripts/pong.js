function Game() {
  var canvas = document.getElementById("game");
  //court variables
  this.width = canvas.width;
  this.height = canvas.height;
  this.context = canvas.getContext("2d");
  this.context.fillStyle = "white";

  //Paddle variables
  this.p1 = new Paddle(5, 0);
  this.p1.y = this.height/2 - this.p1.height/2;
  this.p2 = new Paddle(this.width - 5 - 2, 0);
  this.p2.y = this.height/2 - this.p2.height/2;

  //Ball variables
  this.ball = new Ball();
  this.ball.x = this.width/2;
  this.ball.y = this.height/2;
  this.ball.vy = Math.floor(Math.random()* 12 - 6);
  this.ball.bv = 7 - Math.abs(this.ball.vy);
}

Game.prototype.draw = function() {
  this.context.clearRect(0, 0, this.width, this.height);
  this.context.fillRect(this.width/2, 0, 2, this.height);

  this.ball.draw(this.context);

  this.p1.draw(this.context);
  this.p2.draw(this.context);
};

Game.prototype.update = function() {
  if (this.paused)
    return;

    this.ball.update();
    if (this.ball.x > this.width || this.ball.x + this.ball.width < 0) {
      this.ball.vx = -this.ball.vy;
    }
};

//Paddle function
function Paddle(x,y) {
  this.x = x;
  this.y = y;
  this.width = 2;
  this.height = 28;
  this.score = 0
}

Paddle.prototype.draw = function(p) {
  p.fillRect(this.x, this.y, this.width, this.height);
};

//Ball function
function Ball() {
this.x = 0;
this.y = 0;
this.vx = 0;
this.vy = 0;
this.width = 4;
this.height = 4;
}

Ball.prototype.update = function() {
  this.x += this.vx;
  this.y += this.vy;
}

Ball.prototype.draw = function(p) {
  p.fillRect(this.x, this.y, this.width, this.height);
}

//Initialize our game instance
var game = new Game();

function MainLoop() {
  game.update();
  game.draw();
  // Call the main loop again at a frame rate of 30fps
  setTimeout(MainLoop, 33.3333);
}

MainLoop();
