let video;
let label = "waiting...";
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/NZkN-uhQI/';

var bird;
var pipes = [];

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(740, 480);
  bird = new Bird();
  pipes.push(new Pipe());
  video = createCapture(VIDEO);
  // video.hide();

  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  // console.log('Up')
  console.log(label)
  classifyVideo();
}

function draw() {
  background(0);

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      // console.log('HIT');
      null
    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  bird.update();
  bird.show();

  if (label == 'Up') {
    bird.up();
  }

  if (frameCount % 95 == 0) {
    pipes.push(new Pipe());
  }
}