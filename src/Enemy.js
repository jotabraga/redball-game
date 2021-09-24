class Enemy extends AutonomousBall {
  constructor(context) {
    super(context, 20, "blue");
  }

  bounceOnEdge() {
    if (this.x < 0 || this.x > screenWidth) {
      this.speedX *= -1;
    }

    if (this.y < 0 || this.y > screenHeight) {
      this.speedY *= -1;
    }
  }

  increaseSpeed() {
    this.speedX *= 1.0001;
    this.speedY *= 1.0001;
  }
}
