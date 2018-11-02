var canvas = document.querySelector("canvas");
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var gravity = 1;
var friction = 0.9;

var mouse = {
  x: 10,
  y: 10
};
var colors = ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#29B0B9"]


window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
  return colors[random(0, colors.length)];
}

function getDistance(x1, y1, x2, y2){
  let xDistance = x2 - x1; 
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}


function Circle(x, y, dx, dy, radius, color) {

  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.update = () => {
    this.draw();
  }

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  }

  this.zoom = () => {
    this.radius += 1;
  }
  
  this.rezoom = () => {
    this.radius -= 1;
  }

}

let circle1;
let circle2;

function init() {
  circle1 = new Circle(700, 500, 0, 0, 100, "black");
  circle2 = new Circle(0, 0, 0, 0, 30, "transparent");
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  circle1.update();
  circle2.x = mouse.x;
  circle2.y = mouse.y;
  circle2.update();

  let dist = getDistance(circle1.x, circle1.y, circle2.x, circle2.y);
  console.log(dist);
  if(dist < circle1.radius + circle2.radius){
    circle1.color = "red";
    circle2.color = "white";
    circle1.zoom();
  }else{
    circle1.color = "black";
    circle2.color = "white";
    if(circle1.radius > 100) {
      circle1.rezoom();
    }
  }
}
init();
animate();