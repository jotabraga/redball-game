class Enemy {
    x;
    y;
    radius = 15;
    color = "blue";
    speedX = Math.floor(Math.random()*10 + 5);
    speedY = Math.floor(Math.random()*10 + 5);

    constructor(initialX, initialY) {
      this.x = initialX;
      this.y = initialY;
    }

    bounceOnEdge() {
      if (this.x < 0 || this.x > screenWidth) {
        this.speedX *= -1.001;
      }

      if (this.y < 0 || this.y > screenHeight) {
        this.speedY *= -1.001;
      }
    }

    draw() {
      drawCircle(this.x, this.y, this.radius, this.color);
    }

    move() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
  }