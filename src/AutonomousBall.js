class AutonomousBall extends Ball {
  speedX;
  speedY;

  constructor(context, radius, color) {
    super(context, 0, 0, radius, color);

    const randomInitialPosition = this.generateRandomInitialPosition();
    this.x = randomInitialPosition.x;
    this.y = randomInitialPosition.y;

    this.speedX = this.generateRandomSpeed();
    this.speedY = this.generateRandomSpeed();
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  generateRandomSpeed() {
    return randomIntFromInterval(3, 7) * (randomBoolean() ? 1 : -1);
  }

  generateRandomInitialPosition() {
    const horizontalOrVertical = randomBoolean();

    if (horizontalOrVertical) {
      const leftOrRight = randomBoolean() ? 0 : screenWidth;
      const randomY = randomIntFromInterval(0, screenHeight);
      return { x: leftOrRight, y: randomY };
    } else {
      const topOrBottom = randomBoolean() ? 0 : screenHeight;
      const randomX = randomIntFromInterval(0, screenWidth);
      return { x: randomX, y: topOrBottom };
    }
  }
}
