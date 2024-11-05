import { Canvas } from './Canvas.mjs'
import { Player } from './Player.mjs'
import { Obstacles } from './Obstacles.mjs'
import { Collision } from './Collision.mjs'
const canvas = document.getElementById('gameCanvas');
const draw = new Canvas(canvas);
draw.resizeCanvas()
const player = new Player();
const obstacles = new Obstacles(draw.canvas.width);
const collide = Collision;
let score = 0;
function drawGame() {
    draw.drawBackground();
    draw.drawPlayer(player.x, player.y, player.width, player.height)
    obstacles.obstacles.forEach((obstacle) => {
        draw.drawObstacle(obstacle)
    })
    player.bullets.forEach((bullet) => {
        draw.drawBullet(bullet)
    })
    draw.drawScore();
}

function startGame() {
    player.resize(draw.canvas.width, draw.canvas.height)
    draw.drawBackground();
    obstacles.lastSpawnTime = Date.now();
    player.lastBulletTime = Date.now();
    requestAnimationFrame(updateGame);
}

function updateGame() {
    drawGame();
    console.log(draw.gravity)
    player.update(draw.gravity, draw.canvas.width, draw.canvas.height);
    obstacles.update(draw.canvas.width, draw.canvas.height)
    for(const obstacle in obstacles.obstacles){
        if(collide(player,obstacles.obstacles[obstacle]))
            return;
            if(player.bullets.length > 0)
                for(const bullet in player.bullets){
                console.log(collide(bullet, obstacle))
                    if(collide(player.bullets[bullet], obstacles.obstacles[obstacle])){
                        if(obstacles.obstacles[bullet].type == 'floating'){
                            obstacles.remove(obstacles.obstacles[obstacle])
                            obstacles.score++;
                        }
                        player.removeBullet(player.bullets[bullet])
                    }
                }
    }
    requestAnimationFrame(updateGame);
}
document.addEventListener('keydown', (key) => player.ControlsDown(key.key));
document.addEventListener('keyup', (key) => player.ControlsUp(key.key, draw.canvas.height));
document.addEventListener('resize', draw.resizeCanvas());
startGame();
