class Ball {
    context;
    x;
    y;
    radius;
    color;
  
    constructor(context, initialX, initialY, radius, color) {
      this.context = context;
      this.x = initialX;
      this.y = initialY;
      this.radius = radius;
      this.color = color;
    }
  
    draw() {
      this.context.beginPath();
      this.context.fillStyle = this.color;
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.context.fill();
    }
  }