import { Canvas } from './canvas/Canvas.mjs'
import { Player } from './player/Player.mjs'
import { Obstacles } from './obstacles/Obstacles.mjs'
import { Collision } from './helperFunctions/Collision.mjs'
import { Background } from './canvas/Background/Background.mjs';
import { AnimationMain } from './canvas/Animations/AnimationMain.mjs';
const canvas = document.getElementById('gameCanvas');
const draw = new Canvas(canvas);
draw.resizeCanvas()

//fixed values
let canvasWidth =  draw.canvas.width;
let canvasHeight =  draw.canvas.height;
let fixedHeight = canvasHeight * 0.125;
let fixedWidth = canvasWidth * 0.0625;

//rest of classes

const background = new Background(canvasHeight, canvasWidth);
const player = new Player();
const obstacles = new Obstacles();
const animation = new AnimationMain();
const collide = Collision;
//boolean
let gameRunning;
function drawGame(drawPlayer) {
    background.draw(draw.ctx, canvasWidth, canvasHeight, fixedWidth, fixedHeight);
    if(drawPlayer)
        player.draw(draw.ctx);
    obstacles.draw(draw.ctx)
    animation.animate(draw.ctx);
}
function startGame() {
    player.resize(fixedWidth, fixedHeight, canvasHeight)
    background.mountain.lastSpawnTime = Date.now();
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
        if(obstacles.obstacles[obstacle].x < canvasWidth )
            player.score++
        if(player.bullet.bullets.length > 0)
            for(const bullet in player.bullet.bullets){
                if(collide(player.bullet.bullets[bullet], obstacles.obstacles[obstacle])){
                    animation.disintegrate.createParts(player.bullet.bullets[bullet])
                    if(obstacles.obstacles[obstacle].type == 'floating'){
                        animation.disintegrate.createParts(obstacles.obstacles[obstacle])
                        obstacles.remove(obstacles.obstacles[obstacle])
                        player.score++;
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
    draw.gameOver(obstacles.score)
    animation.animate(draw.ctx);
    if(animation.disintegrate.parts.length == 0)
        return
    requestAnimationFrame(drawGameOver)
}
function gameOver(){
    animation.disintegrate.createParts(player)
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
