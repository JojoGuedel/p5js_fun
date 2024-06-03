var scale_ = .05
var delay = 150;
var start_size = 1;
var hs = 1;
var snake;

class Snake {
  constructor() {
    this.size = width * scale_;
    this.maxWidth = int(width / this.size) - 1;
    this.maxHeight = int(height / this.size) - 1;
    
    this.reset();
    this.last_update = millis(); 
  }

  snakeContainsApple() {
    for (var i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].x == this.apple.x && this.tiles[i].y == this.apple.y) {
        return true;
      }
    }

    return false;
  }

  generateApple() {
    while (true) {
      this.apple = createVector(int(random(0, this.maxWidth)), int(random(0, this.maxHeight)));
      if (!this.snakeContainsApple()) return;
    }
  }
  
  reset() {
    this.direction = -2;
    this.target_dir = -2;
    this.front = 0;
    this.tiles = Array(start_size).fill(createVector(int(width / this.size / 2), int(height / this.size / 2)));

    this.generateApple();
  }

  update() {
    var now = millis();

    if (keyIsPressed) {
      switch (keyCode) {
        case UP_ARROW: this.target_dir = 1; break;
        case RIGHT_ARROW: this.target_dir = 2; break;
        case DOWN_ARROW: this.target_dir = 3; break;
        case LEFT_ARROW: this.target_dir = 4; break;
      }
    }
    
    if (now - this.last_update < delay) return;
    var last = (this.front + 1) % this.tiles.length;
    
    if (abs(this.target_dir - this.direction) != 2)
      this.direction = this.target_dir;
    
    var offset = createVector(0, 0);
    switch (this.direction) {
      case 1: offset.y--; break;
      case 2: offset.x++; break;
      case 3: offset.y++; break;
      case 4: offset.x--; break;
      default: return;
    }

    var head = this.tiles[this.front].copy().add(offset);

    for (var i = 0; i < this.tiles.length; i++) {
      if (i == last) continue;
      if (this.tiles[i].x == head.x && this.tiles[i].y == head.y) {
        this.reset();
        return;
      }
    }

    if (head.x * this.size < 0 || head.x * this.size + this.size > width) {
      this.reset();
      return;
    }
    if (head.y * this.size < 0 || head.y * this.size + this.size > height) {
      this.reset();
      return;
    }

    this.tiles[last] = head;
    this.front = last;


    if (this.snakeContainsApple()) {
      this.generateApple();
      this.tiles.push(head.copy())

      hs = max(hs, this.tiles.length);
    }
    
    this.last_update = now;
  }

  draw() {
    noStroke();
    fill(255, 0, 0);
    rect(this.apple.x * this.size, this.apple.y * this.size, this.size - 1, this.size - 1)
    
    fill(0, 255, 0);
    this.tiles.forEach(tile => {
      rect(tile.x * this.size, tile.y * this.size, this.size - 1, this.size - 1);
    });

    fill(255);
    textSize(20);
    textAlign(LEFT);
    text("" + this.tiles.length, 10, 30);
    textAlign(RIGHT);
    text("hs: " + hs, width - 10, 30);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  snake = new Snake();
}

function draw() {
  background(51);

  snake.update();
  snake.draw();
}
