import GameObject from './game-object.mjs';

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

export default Snake;
