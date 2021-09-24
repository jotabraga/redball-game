function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomBoolean() {
  return Math.random() > 0.5;
}
