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

export default GameArea;
