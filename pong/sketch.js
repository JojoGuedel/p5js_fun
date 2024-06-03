class Ball {
  constructor() {
    this.reset();
    
    this.r = 10;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;

    this.speed = width * .005;
    this.direction = createVector(1, 0).rotate(PI).rotate(random(-QUARTER_PI, QUARTER_PI));
  }

  update() {
    this.x += this.direction.x * this.speed;
    this.y += this.direction.y * this.speed;

    if (this.y < this.r || this.y + this.r > height) {
      this.y = max(this.r, min(this.y, height - this.r));
      this.direction.y *= -1;
    }
  }

  draw() {
    noStroke();
    fill(255);
    circle(this.x, this.y, this.r*2);
  }

  // y' = y + vy * t
  // t = (y' - y) / vy

  trajectory(draw) {
    stroke(100);

    var tx, ty, t;
    var x = this.x;
    var y = this.y;
    var vx = this.direction.x;
    var vy = this.direction.y;

    do {
      ty = vy < 0? this.r : height - this.r;
      t = (ty - y) / vy;
      tx = x + vx * t;

      line(x, y, tx, ty);
      x = tx;
      y = ty;
      
      vy *= -1;
    } while (tx > 0 && tx < width);
    
    tx = vx < 0 ? this.r + 30 : width - this.r - 30;
    t = (tx - x) / vx;
    ty = y - vy * t;

    return [tx, ty];
  }
}

class Paddle {
  constructor(x) {
    this.height = .1 * height;
    this.width = 20;

    this.x = x;
    this.y = height / 2 - this.height / 2;

    this.sens = this.height * .2;
  }

  update() {
    if (keyIsPressed) {
      switch (keyCode) {
        case UP_ARROW:
          this.y -= this.sens;
          break;
        case DOWN_ARROW:
          this.y += this.sens;
          break;
      }
    }

    this.y = max(0, min(height - this.height, this.y));
  }

  draw() {
    noStroke();
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}

var ball;
var p1, p2;
var hs;

function setup() {
  createCanvas(windowWidth, windowHeight);

  p1 = new Paddle(20);
  p2 = new Paddle(width - 40);
  ball = new Ball();
}


function settings() {
  // fullscreen(true);
}

function draw() {
  background(51);

  ball.update();
  p1.update();

  if (ball.x < p1.x + p1.width + ball.r) {
    if (ball.y < p1.y + p1.height + ball.r && ball.y > p1.y - ball.r) {
      ball.direction.x *= -1;
      ball.speed *= 1.05;
    } else {
      ball.reset();
    }
  }

  if (ball.x > p2.x - ball.r) {
    if (ball.y < p2.y + p2.height + ball.r && ball.y > p2.y - ball.r) {
      ball.direction.x *= -1;
      ball.speed *= 1.05;
    } else {
      ball.reset();
    }
  }

  if (ball.direction.x > 0) {
    var [tx, ty] = ball.trajectory(true);
    
    var s = ball.x / width;
    
    ty = max(0, min(height - p2.height, ty - p2.height / 2))
    ty = p2.y + (ty - p2.y) * s;

    p2.x = tx;
    p2.y = ty;
  } else {
    ball.trajectory(true);
  }

  
  ball.draw();
  p1.draw();
  p2.draw();

  hs = max(ball.speed, hs);

  textSize(20);
  text("speed: " + int(ball.speed), 10, 20);
  text("hs: " + int(hs), 10, 40);
}
