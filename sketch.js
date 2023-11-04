let img;
let audio; 
let fft;
let rects = []; 
let amp; 

function preload() {
  img = loadImage("artwork.jpg");
  audio = loadSound("audio.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight); 
  img.resize(windowWidth, windowHeight); 
  noStroke();
  img.loadPixels();

  let gridSize = 10;

  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      let index = (x + y * img.width) * 4;

      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      let w = random(gridSize / 2, gridSize * 1.5);
      let h = random(gridSize / 2, gridSize * 1.5);

      let c = color(r, g, b)
      rects.push(new MyRect(x, y, w, h, c))
    }
  }

  fft = new p5.FFT(0.3);
}

function draw() {
  background(255)
  fft.analyze();
  amp = fft.getEnergy(20, 200);
  var s = map(amp, 0, 255, 0.4, 1.1);
  for (let i = 0; i < rects.length; i++) {
    rects[i].display(s)
  }
}

class MyRect {
  constructor(x, y, w, h, c) {
    this.x = x; 
    this.y = y;
    this.w = w; 
    this.h = h; 
    this.c = c; 
    this.ang = 0; 
  }

  display(s) {
    push()
    translate(this.x, this.y)
    rectMode(CENTER)
    scale(s) 
    fill(this.c);
    rotate(this.ang)
    rect(0, 0, this.w, this.h)
    pop()

    this.ang += 0.1;
  }
}

function mousePressed() {
  if (!audio.isPlaying()) {
    audio.play()
  }
}
