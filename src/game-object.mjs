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
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }
}

export default GameObject;
