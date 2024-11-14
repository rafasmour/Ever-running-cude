import { Canvas } from './canvas/Canvas.mjs'
import { Player } from './player/Player.mjs'
import { Obstacles } from './obstacles/Obstacles.mjs'
import { Collision } from './helperFunctions/Collision.mjs'
import { Background } from './canvas/Background/Background.mjs';

const canvas = document.getElementById('gameCanvas');
const draw = new Canvas(canvas);
draw.resizeCanvas()
const background = new Background();
const player = new Player();
const obstacles = new Obstacles();
const collide = Collision;

//fixed values
let canvasWidth =  draw.canvas.width;
let canvasHeight =  draw.canvas.height;
let fixedHeight = canvasHeight * 0.125;
let fixedWidth = canvasWidth * 0.0625;
//boolean
let gameRunning;
function drawGame(drawPlayer) {
    background.draw(draw.ctx, canvasWidth, canvasHeight, fixedWidth, fixedHeight);
    if(drawPlayer)
        player.draw(draw.ctx);
    obstacles.draw(draw.ctx)
    if(draw.animation){
        draw.animateDisintegration();
    }
    draw.drawScore(obstacles.score);
}
function startGame() {
    player.resize(fixedWidth, fixedHeight, canvasHeight)
    background.mountain.mountainLastSpawnTime = Date.now();
    obstacles.lastSpawnTime = Date.now();
    player.bullet.lastBulletTime = Date.now();
    gameRunning = requestAnimationFrame(updateGame);
}

function updateGame() {
    player.update(draw.gravity, canvasWidth, canvasHeight);
    obstacles.update(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
    background.update(canvasWidth, canvasHeight, fixedWidth, fixedHeight);
    for(const obstacle in obstacles.obstacles){
        if(collide(player,obstacles.obstacles[obstacle])){
            gameOver();
            return;
        }     
        if(player.bullet.bullets.length > 0)
            for(const bullet in player.bullet.bullets){
                if(collide(player.bullet.bullets[bullet], obstacles.obstacles[obstacle])){
                    draw.createParts(player.bullet.bullets[bullet])
                    if(obstacles.obstacles[obstacle].type == 'floating'){
                        draw.createParts(obstacles.obstacles[obstacle])
                        obstacles.remove(obstacles.obstacles[obstacle])
                        obstacles.score++;
                    }
                player.bullet.removeBullet(player.bullet.bullets[bullet])
            }
        }
    }
    drawGame(true);
    requestAnimationFrame(updateGame);
}
function drawGameOver(){
    drawGame(false)
    draw.drawGameOver(obstacles.score)
    draw.animateDisintegration()
    if(draw.objectsToAnimate.length == 0)
        return
    requestAnimationFrame(drawGameOver)
}
function gameOver(){
    draw.createParts(player)
    requestAnimationFrame(drawGameOver)
}
document.addEventListener('keydown', (e) => {
    if(e.key === 'r'){
        location.reload();
    }
})
document.addEventListener('keydown', (key) => player.ControlsDown(key.key, canvasHeight));
document.addEventListener('keyup', (key) => player.ControlsUp(key.key, canvasHeight));
document.addEventListener('resize', draw.resizeCanvas());
startGame();
