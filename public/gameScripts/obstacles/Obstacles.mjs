import { Floating } from "./Floating.mjs";
import { Ground } from "./Ground.mjs";
import { Pillar } from "./Pillar.mjs";

export class Obstacles {
    constructor(canvasWidth) {
        this.obstacles = [];
        this.spawnInterval = 1500;
        this.speed = canvasWidth * 0.01;
        this.max = 5;
        this.lastSpawnTime = 0;
        this.score = 0;
    }
    updateSpawnInterval(score){
        switch (score) {
            case 20:
                this.spawnInterval = 1300;
                break; 
            case 40:
                this.spawnInterval = 1100;
                break; 
            case 60:
                this.spawnInterval = 900;
                break; 
            case 80:
                this.spawnInterval = 700;
                break;
            case 100:
                this.spawnInverval = 500;
                break;
            default:
                break;
        }
    }
    ground(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.obstacles.push(new Ground(
            canvasWidth,
            canvasHeight,
            fixedWidth,
            fixedHeight
        ));
    }
    floating(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        console.log(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
        this.obstacles.push(
            new Floating(
                canvasWidth,
                canvasHeight,
                fixedWidth,
                fixedHeight
            )
        );
    }
    pillar(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.obstacles.push(
            new Pillar(
                canvasWidth,
                canvasHeight,
                fixedWidth,
                fixedHeight
            )
        )
    }
    spawn(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        console.log(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            const obstacleType = Math.random();
            if (obstacleType < 0.33) {
                this.ground(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            } else if (obstacleType < 0.66) {
                this.floating(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            } else {
                this.pillar(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            }
            console.log(this.obstacles)
        }
    remove(obstacle){
        this.score++;
        this.obstacles.splice(obstacle, 1)
    }
    update(canvasWidth, canvasHeight, fixedWidth, fixedHeight) {
        const currentTime = Date.now(); 
        if (currentTime - this.lastSpawnTime > this.spawnInterval && this.obstacles.length < this.max) {
            console.log(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            this.spawn(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
            this.lastSpawnTime = currentTime;
        } 
        for(let i = 0; i < this.obstacles.length; i++){
            this.obstacles[i].x -=this.speed;
            if(this.obstacles[i].x + this.obstacles[i].canvasWidth <=0)
                this.remove(this.obstacles[i])
            if(this.obstacles[i].type == 'floating'){
                this.obstacles[i].float()
            }
        }
        this.updateSpawnInterval(this.score);
    }   
}


