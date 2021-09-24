class Game {
  screenWidth;
  screenHeight;
  canvas;
  context;
  gameIntervalId;
  enemiesIntervalId;
  friendsIntervalId;
  scoreIntervalId;
  player;
  enemies;
  friends;
  score;

  constructor(screenWidth, screenHeight, canvas) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.canvas = canvas;
    this.canvas.width = screenWidth;
    this.canvas.height = screenHeight;
    this.context = canvas.getContext("2d");
  }

  start() {
    this.player = new Player(
      this.context,
      this.screenWidth / 2,
      this.screenHeight / 2
    );
    this.enemies = [];
    this.friends = [];

    this.updateScore(0);
    this.clearIntervals();

    this.gameIntervalId = setInterval(() => this.gameLoop(), 1000 / 60);
    this.enemiesIntervalId = setInterval(() => this.spawnEnemy(), 2000);
    this.friendsIntervalId = setInterval(() => this.spawnFriend(), 1000);
    this.scoreIntervalId = setInterval(
      () => this.updateScore(this.score + 0.1),
      30
    );
    document.querySelector("body").classList.remove("fail");
  }

  spawnEnemy() {
    this.enemies.push(new Enemy(this.context));
  }

  spawnFriend() {
    this.friends.push(new Friend(this.context));
  }

  gameLoop() {
    this.updateState();
    this.renderGame();
  }

  updateState() {
    this.enemies.forEach((enemy) => {
      enemy.move();

      if (this.player.checkCollision(enemy)) {
        this.endGame();
      }

      enemy.bounceOnEdge();
      enemy.increaseSpeed();
    });

    this.friends.forEach((friend) => {
      friend.move();

      if (this.player.checkCollision(friend)) {
        this.updateScore(this.score + 20);
        this.deleteFriend(friend);
      }

      if (friend.isOutOfScreen()) {
        this.deleteFriend(friend);
      }
    });
  }

  endGame() {
    this.clearIntervals();
    document.querySelector("body").classList.add("fail");
    setTimeout(() => {
      alert(`Fim do jogo! Você fez ${this.score.toFixed(1)} pontos!`);
    }, 2000);
  }

  clearIntervals() {
    clearInterval(this.gameIntervalId);
    clearInterval(this.enemiesIntervalId);
    clearInterval(this.friendsIntervalId);
    clearInterval(this.scoreIntervalId);
  }

  deleteFriend(friend) {
    this.friends = this.friends.filter((f) => f !== friend);
  }

  updateScore(newScore) {
    const element = document.querySelector(".score");

    if (newScore - this.score > 10) {
      element.classList.add("highlight");
      setTimeout(() => element.classList.remove("highlight"), 100);
    }

    this.score = newScore;
    element.innerText = "Score: " + this.score.toFixed(1);
  }

  renderGame() {
    this.clearScreen();
    this.player.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.friends.forEach((friend) => friend.draw());
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  onMouseMove(event) {
    this.player.moveTo(event.clientX, event.clientY);
  }
}
