import Game from "./Game";
import AutonomousBall from "./AutonomousBall";
import Ball from "./Ball";
import Enemy from "./Enemy";
import Friend from "./Friend";
import Player from "./Player"
import helpers from "./helpers"

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const canvas = document.querySelector("#canvas");

const game = new Game(screenWidth, screenHeight, canvas);
game.start();

function onMouseMove(event) {
  game.onMouseMove(event);
}

function startGame() {
  game.start();
}