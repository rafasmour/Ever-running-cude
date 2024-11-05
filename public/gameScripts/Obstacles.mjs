// Obstacles.js
export class Obstacles {
    constructor(width) {
        this.obstacles = [];
        this.spawnInterval = 1500;
        this.speed = width * 0.01;
        this.max = 5;
        this.lastSpawnTime = 0;
        this.score = 0;
    }
    updateSpawnInterval(score){

    }
    ground(width, height){
        this.obstacles.push({
            x: width,
            y: height - height * 0.125,
            width: width * 0.0625,
            height: height * 0.125,
            type: 'ground'
        });
    }
    floating(width, height){
        this.obstacles.push({
            x: width,
            y: height*0.4 + (height*0.01*(Math.random()*10)),
            width: width * 0.0625,
            height: height * 0.125,
            type: 'floating',
            floatOffset: 100 // Added for floating movement'
        });
    }
    pillar(width, height){
        this.obstacles.push({
            x: width,
            y: -height * 0.125/2,
            width: width * 0.0625,
            height: height,
            type: 'pillar',
        })
    }
    spawn(width, height){
            console.log(width)
            const obstacleType = Math.random();
            if (obstacleType < 0.33) {
                this.ground(width, height)
            } else if (obstacleType < 0.66) {
                this.floating(width, height)
            } else {
                this.pillar(width, height)
            }
        }
    remove(obstacle){
        this.score++;
        this.obstacles.splice(obstacle, 1)
    }
    update(width, height) {
        const currentTime = Date.now(); 
        console.log()
        if (currentTime - this.lastSpawnTime > this.spawnInterval && this.obstacles.length < this.max) {
            this.spawn(width, height)
            this.lastSpawnTime = currentTime;
        } 
        for(let i = 0; i < this.obstacles.length; i++){
            this.obstacles[i].x -=this.speed;
            if(this.obstacles[i].x + this.obstacles[i].width <=0)
                this.remove(this.obstacles[i])
            if(this.obstacles[i].type = 'floating'){
                this.obstacles[i].offset += 0.05;
                this.obstacles[i].y = (Math.sin(this.obstacles[i].floatOffset)) + (this.obstacles[i].y);
            }
        }
    }   
}


