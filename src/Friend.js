class Friend extends AutonomousBall {
  constructor(context) {
    super(context, 15, "green");
  }

  isOutOfScreen() {
    return (
      this.x < 0 || this.x > screenWidth || this.y < 0 || this.y > screenHeight
    );
  }
}
