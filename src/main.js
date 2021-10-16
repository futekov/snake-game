class GameArea {
  constructor(snake) {
    this.canvas = this.createCanvas();
    this.context = this.canvas.getContext('2d');
    this.frameN = 0;
    this.interval = null;
    this.keysPressed = {};
    this.obstacles = [];
    this.snake = snake;
    window.addEventListener('keydown', this.keydownHandler.bind(this));
    window.addEventListener('keyup', this.keyupHandler.bind(this));
  }

  createCanvas() {
    const canvas = document.createElement('canvas');
    
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style.backgroundColor = '#fff';
    canvas.backgroundColor = '#fff';

    document.body.append(canvas);

    return canvas;
  }

  start() {
    this.interval = setInterval(this.updateGameArea.bind(this), 15);
  }

  stop() {
    clearInterval(this.interval);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  updateGameArea() {
    this.snake.moveAngle = 0;
    this.snake.speed = 3;
    if (this.keysPressed && this.keysPressed[37]) {this.snake.moveAngle = -6; }
    if (this.keysPressed && this.keysPressed[39]) {this.snake.moveAngle = 6; }

    for (let i = 0; i < this.obstacles.length; i += 1) {
      if (this.snake.collidesWith(this.obstacles[i])) {
        alert('collision');
        this.stop();
        return;
      }
    }

    this.snake.newPos();
    this.snake.update();
  }

  keydownHandler(e) {
    e.preventDefault();

    this.keysPressed[e.keyCode] = (e.type == 'keydown');
  }

  keyupHandler(e) {
    this.keysPressed[e.keyCode] = (e.type == 'keydown');
  }
}

class GameObject {
  constructor(gameArea, x, y, width, height, angle = 0) {
    this.gameArea = gameArea;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.update();
  }

  update() {
    const ctx = this.gameArea.context;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }
}

class Snake extends GameObject {
  constructor(gameArea) {
    super(gameArea, 500, 500, 10, 10);
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.lastCoordinates = null;
  }

  update() {
    const ctx = this.gameArea.context;

    // Clear last rectangle
    if (this.lastCoordinates) {
      ctx.save();
      ctx.translate(this.lastCoordinates.x, this.lastCoordinates.y);
      ctx.rotate(this.lastCoordinates.angle);
      ctx.fillStyle = this.gameArea.canvas.backgroundColor;
      ctx.fillRect(Math.round(this.width / -2) - 1, Math.round(this.height / -2) - 1, this.width + 2, this.height + 2);
      ctx.restore();
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = 'black';
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  }

  newPos() {
    // Record last coordinates
    if (this.lastCoordinates === null) this.lastCoordinates = {};
    this.lastCoordinates.x = this.x;
    this.lastCoordinates.y = this.y;
    this.lastCoordinates.angle = this.angle;
    
    // Change angle
    this.angle += this.moveAngle * Math.PI / 180;
    
    // Change coordinates
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }

  collidesWith(gameObject) {
    const vertices = {
      x1: this.x,
      x2: this.x + this.width,
      y1: this.y,
      y2: this.y + this.height
    };

    const otherObjectVertices = {
      x1: gameObject.x,
      x2: gameObject.x + gameObject.width,
      y1: gameObject.y,
      y2: gameObject.y + gameObject.height
    };

    if (Math.max(vertices.x1, vertices.x2) > Math.min(otherObjectVertices.x1, otherObjectVertices.x2)
        && Math.min(vertices.x1, vertices.x2) < Math.max(otherObjectVertices.x1, otherObjectVertices.x2)
        && Math.max(vertices.y1, vertices.y2) > Math.min(otherObjectVertices.y1, otherObjectVertices.y2)
        && Math.min(vertices.y1, vertices.y2) < Math.max(otherObjectVertices.y1, otherObjectVertices.y2)) {
      return true;
    }

    return false;
  }
}

function main() {
  const gameAreaInstance = new GameArea();
  
  let snakeInstance = new Snake(gameAreaInstance);
  
  const wallTop = new GameObject(gameAreaInstance, 5, 5, 1910, 5);
  const wallRight = new GameObject(gameAreaInstance, 1910, 5, 5, 1070);
  const wallBottom = new GameObject(gameAreaInstance, 5, 1070, 1910, 5);
  const wallLeft = new GameObject(gameAreaInstance, 5, 5, 5, 1070);

  gameAreaInstance.obstacles.push(wallTop);
  gameAreaInstance.obstacles.push(wallRight);
  gameAreaInstance.obstacles.push(wallBottom);
  gameAreaInstance.obstacles.push(wallLeft);

  gameAreaInstance.snake = snakeInstance;

  gameAreaInstance.start();
}

window.addEventListener('DOMContentLoaded', main);
