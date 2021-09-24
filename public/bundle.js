/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AutonomousBall.js":
/*!*******************************!*\
  !*** ./src/AutonomousBall.js ***!
  \*******************************/
/***/ (() => {

eval("class AutonomousBall extends Ball {\n  speedX;\n  speedY;\n\n  constructor(context, radius, color) {\n    super(context, 0, 0, radius, color);\n\n    const randomInitialPosition = this.generateRandomInitialPosition();\n    this.x = randomInitialPosition.x;\n    this.y = randomInitialPosition.y;\n\n    this.speedX = this.generateRandomSpeed();\n    this.speedY = this.generateRandomSpeed();\n  }\n\n  move() {\n    this.x += this.speedX;\n    this.y += this.speedY;\n  }\n\n  generateRandomSpeed() {\n    return randomIntFromInterval(3, 7) * (randomBoolean() ? 1 : -1);\n  }\n\n  generateRandomInitialPosition() {\n    const horizontalOrVertical = randomBoolean();\n\n    if (horizontalOrVertical) {\n      const leftOrRight = randomBoolean() ? 0 : screenWidth;\n      const randomY = randomIntFromInterval(0, screenHeight);\n      return { x: leftOrRight, y: randomY };\n    } else {\n      const topOrBottom = randomBoolean() ? 0 : screenHeight;\n      const randomX = randomIntFromInterval(0, screenWidth);\n      return { x: randomX, y: topOrBottom };\n    }\n  }\n}\n\n\n//# sourceURL=webpack://redball/./src/AutonomousBall.js?");

/***/ }),

/***/ "./src/Ball.js":
/*!*********************!*\
  !*** ./src/Ball.js ***!
  \*********************/
/***/ (() => {

eval("class Ball {\n  context;\n  x;\n  y;\n  radius;\n  color;\n\n  constructor(context, initialX, initialY, radius, color) {\n    this.context = context;\n    this.x = initialX;\n    this.y = initialY;\n    this.radius = radius;\n    this.color = color;\n  }\n\n  draw() {\n    this.context.beginPath();\n    this.context.fillStyle = this.color;\n    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);\n    this.context.fill();\n  }\n}\n\n\n//# sourceURL=webpack://redball/./src/Ball.js?");

/***/ }),

/***/ "./src/Enemy.js":
/*!**********************!*\
  !*** ./src/Enemy.js ***!
  \**********************/
/***/ (() => {

eval("class Enemy extends AutonomousBall {\n  constructor(context) {\n    super(context, 20, \"blue\");\n  }\n\n  bounceOnEdge() {\n    if (this.x < 0 || this.x > screenWidth) {\n      this.speedX *= -1;\n    }\n\n    if (this.y < 0 || this.y > screenHeight) {\n      this.speedY *= -1;\n    }\n  }\n\n  increaseSpeed() {\n    this.speedX *= 1.0001;\n    this.speedY *= 1.0001;\n  }\n}\n\n\n//# sourceURL=webpack://redball/./src/Enemy.js?");

/***/ }),

/***/ "./src/Friend.js":
/*!***********************!*\
  !*** ./src/Friend.js ***!
  \***********************/
/***/ (() => {

eval("class Friend extends AutonomousBall {\n  constructor(context) {\n    super(context, 15, \"green\");\n  }\n\n  isOutOfScreen() {\n    return (\n      this.x < 0 || this.x > screenWidth || this.y < 0 || this.y > screenHeight\n    );\n  }\n}\n\n\n//# sourceURL=webpack://redball/./src/Friend.js?");

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/***/ (() => {

eval("class Game {\n  screenWidth;\n  screenHeight;\n  canvas;\n  context;\n  gameIntervalId;\n  enemiesIntervalId;\n  friendsIntervalId;\n  scoreIntervalId;\n  player;\n  enemies;\n  friends;\n  score;\n\n  constructor(screenWidth, screenHeight, canvas) {\n    this.screenWidth = screenWidth;\n    this.screenHeight = screenHeight;\n    this.canvas = canvas;\n    this.canvas.width = screenWidth;\n    this.canvas.height = screenHeight;\n    this.context = canvas.getContext(\"2d\");\n  }\n\n  start() {\n    this.player = new Player(\n      this.context,\n      this.screenWidth / 2,\n      this.screenHeight / 2\n    );\n    this.enemies = [];\n    this.friends = [];\n\n    this.updateScore(0);\n    this.clearIntervals();\n\n    this.gameIntervalId = setInterval(() => this.gameLoop(), 1000 / 60);\n    this.enemiesIntervalId = setInterval(() => this.spawnEnemy(), 2000);\n    this.friendsIntervalId = setInterval(() => this.spawnFriend(), 1000);\n    this.scoreIntervalId = setInterval(\n      () => this.updateScore(this.score + 0.1),\n      30\n    );\n    document.querySelector(\"body\").classList.remove(\"fail\");\n  }\n\n  spawnEnemy() {\n    this.enemies.push(new Enemy(this.context));\n  }\n\n  spawnFriend() {\n    this.friends.push(new Friend(this.context));\n  }\n\n  gameLoop() {\n    this.updateState();\n    this.renderGame();\n  }\n\n  updateState() {\n    this.enemies.forEach((enemy) => {\n      enemy.move();\n\n      if (this.player.checkCollision(enemy)) {\n        this.endGame();\n      }\n\n      enemy.bounceOnEdge();\n      enemy.increaseSpeed();\n    });\n\n    this.friends.forEach((friend) => {\n      friend.move();\n\n      if (this.player.checkCollision(friend)) {\n        this.updateScore(this.score + 20);\n        this.deleteFriend(friend);\n      }\n\n      if (friend.isOutOfScreen()) {\n        this.deleteFriend(friend);\n      }\n    });\n  }\n\n  endGame() {\n    this.clearIntervals();\n    document.querySelector(\"body\").classList.add(\"fail\");\n    setTimeout(() => {\n      alert(`Fim do jogo! Você fez ${this.score.toFixed(1)} pontos!`);\n    }, 2000);\n  }\n\n  clearIntervals() {\n    clearInterval(this.gameIntervalId);\n    clearInterval(this.enemiesIntervalId);\n    clearInterval(this.friendsIntervalId);\n    clearInterval(this.scoreIntervalId);\n  }\n\n  deleteFriend(friend) {\n    this.friends = this.friends.filter((f) => f !== friend);\n  }\n\n  updateScore(newScore) {\n    const element = document.querySelector(\".score\");\n\n    if (newScore - this.score > 10) {\n      element.classList.add(\"highlight\");\n      setTimeout(() => element.classList.remove(\"highlight\"), 100);\n    }\n\n    this.score = newScore;\n    element.innerText = \"Score: \" + this.score.toFixed(1);\n  }\n\n  renderGame() {\n    this.clearScreen();\n    this.player.draw();\n    this.enemies.forEach((enemy) => enemy.draw());\n    this.friends.forEach((friend) => friend.draw());\n  }\n\n  clearScreen() {\n    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n  }\n\n  onMouseMove(event) {\n    this.player.moveTo(event.clientX, event.clientY);\n  }\n}\n\n\n//# sourceURL=webpack://redball/./src/Game.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ (() => {

eval("class Player extends Ball {\n  constructor(context, initialX, initialY) {\n    super(context, initialX, initialY, 50, \"red\");\n  }\n\n  moveTo(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n\n  checkCollision(ball) {\n    const distance = Math.sqrt((this.x - ball.x) ** 2 + (this.y - ball.y) ** 2);\n\n    return distance < this.radius + ball.radius;\n  }\n}\n\n\n//# sourceURL=webpack://redball/./src/Player.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ (() => {

eval("function randomIntFromInterval(min, max) {\n  return Math.floor(Math.random() * (max - min + 1) + min);\n}\n\nfunction randomBoolean() {\n  return Math.random() > 0.5;\n}\n\n\n//# sourceURL=webpack://redball/./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ \"./src/Game.js\");\n/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Game__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _AutonomousBall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AutonomousBall */ \"./src/AutonomousBall.js\");\n/* harmony import */ var _AutonomousBall__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_AutonomousBall__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ball */ \"./src/Ball.js\");\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Ball__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Enemy */ \"./src/Enemy.js\");\n/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Enemy__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _Friend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Friend */ \"./src/Friend.js\");\n/* harmony import */ var _Friend__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Friend__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Player__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_helpers__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\nconst screenWidth = window.innerWidth;\nconst screenHeight = window.innerHeight;\nconst canvas = document.querySelector(\"#canvas\");\n\nconst game = new (_Game__WEBPACK_IMPORTED_MODULE_0___default())(screenWidth, screenHeight, canvas);\ngame.start();\n\nfunction onMouseMove(event) {\n  game.onMouseMove(event);\n}\n\nfunction startGame() {\n  game.start();\n}\n\n//# sourceURL=webpack://redball/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;