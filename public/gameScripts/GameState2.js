import { start } from 'repl';
import { Canvas } from './Canvas.mjs'
import { Player } from './Player.mjs'
const canvas = document.getElementById('gameCanvas');
const draw = new Canvas(canvas);
const player = new Player();
let gameInterval
canvas.resize()
canvas.drawGame(player.x, player.y, player.width, player.height);
function startGame() {
    draw.resizeCanvas()
    player.resize(draw.canvas.width, draw.canvas.height)
    updateGame();
    gameInterval = requestAnimationFrame(updateGame);
}

function updateGame() {
    canvas.drawGame(player.x, player.y, player.width, player.height);

    requestAnimationFrame(updateGame);
}

startGame()