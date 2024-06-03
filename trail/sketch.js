var max_particles = 100;
var particle_size = 40;
var particles;
var current = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(240);
  particles = Array(max_particles).fill(createVector(0, 0));
}

function draw() {
  background(51);

  particles[current] = createVector(mouseX, mouseY);
  
  noStroke();
  for (var i = 0; i < max_particles; i++) {
    var f = ((max_particles - current + i) % max_particles) / max_particles;
    fill(255, 255, 255, 255 * f);
    circle(particles[i].x, particles[i].y, particle_size * f);
  }

  current = ++current % max_particles;
}
