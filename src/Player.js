class Player extends Ball {
  constructor(context, initialX, initialY) {
    super(context, initialX, initialY, 50, "red");
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  checkCollision(ball) {
    const distance = Math.sqrt((this.x - ball.x) ** 2 + (this.y - ball.y) ** 2);

    return distance < this.radius + ball.radius;
  }
}
