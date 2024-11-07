import { Canvas } from './Canvas.mjs'
import { Player } from './player/Player.mjs'
import { Obstacles } from './obstacles/Obstacles.mjs'
import { Collision } from './Collision.mjs'
const canvas = document.getElementById('gameCanvas');
const draw = new Canvas(canvas);
draw.resizeCanvas()
const player = new Player();
const obstacles = new Obstacles(draw.canvas.width);
const collide = Collision; 
let fixedHeight = draw.canvas.height * 0.125; // fixed height and width to keep models consistent 
let fixedWidth = draw.canvas.width * 0.0625;
console.log(fixedHeight, fixedWidth)
let gameRunning;
function drawGame() {
    draw.drawBackground();
    draw.drawPlayer(player.x, player.y, player.width, player.height)
    obstacles.obstacles.forEach((obstacle) => {
        draw.drawObstacle(obstacle)
    })
    player.bullets.forEach((bullet) => {
        draw.drawBullet(bullet)
    })
    draw.drawScore(obstacles.score);
}
function startGame() {
    player.resize(fixedWidth, fixedHeight, draw.canvas.height)
    draw.drawBackground();
    obstacles.lastSpawnTime = Date.now();
    player.lastBulletTime = Date.now();
    gameRunning = requestAnimationFrame(updateGame);
}

function updateGame() {
    player.update(draw.gravity, draw.canvas.width, draw.canvas.height);
    obstacles.update(draw.canvas.width, draw.canvas.height, fixedWidth, fixedHeight)
    for(const obstacle in obstacles.obstacles){
        if(collide(player,obstacles.obstacles[obstacle])){
            gameOver();
            return;
        }     
        if(player.bullets.length > 0)
            for(const bullet in player.bullets){
                if(collide(player.bullets[bullet], obstacles.obstacles[obstacle])){
                    if(obstacles.obstacles[bullet].type == 'floating'){
                        obstacles.remove(obstacles.obstacles[obstacle])
                        obstacles.score++;
                    }
                player.removeBullet(player.bullets[bullet])
            }
        }
    }
    drawGame();
    requestAnimationFrame(updateGame);
}
function gameOver(){
    draw.drawGameOver(obstacles.score)
}
document.addEventListener('keydown', (e) => {
    if(e.key === 'r'){
        location.reload();
        console.log('startgame')
    }
})
document.addEventListener('keydown', (key) => player.ControlsDown(key.key, draw.canvas.Height));
document.addEventListener('keyup', (key) => player.ControlsUp(key.key, draw.canvas.height));
document.addEventListener('resize', draw.resizeCanvas());
startGame();
