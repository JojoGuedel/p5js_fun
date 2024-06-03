var x, y, vx, vy, r;

function setup() {
  createCanvas(700, 500);

  noStroke();

  x = 50;
  y = 100;

  vx = 2;
  vy = 2;

  r = 25;
}

function draw() {
  background(51);

  x += vx;
  y += vy;

  if (x + r > width || x - r < 0) {
    x = max(0, min(x, width));
    vx *= -1;
    fill(random(0, 255),random(0, 255), random(0, 255));
  }
  
  if (y + r > height || y - r < 0) {
    y = max(0, min(y, height));
    vy *= -1;
    fill(random(0, 255),random(0, 255), random(0, 255));
  }



  circle(x, y, 2*r);
}
