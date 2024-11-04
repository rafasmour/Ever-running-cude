// Obstacles.js
class Obstacles {
    constructor(canvas) {
        this.canvas = canvas;
        this.obstacles = [];
        this.lastSpawnTime = Date.now();
        this.obstacleSpeed = canvas.width * 0.01;
    }

    reset() {
        this.obstacles = [];
        this.lastSpawnTime = Date.now();
    }

    update(score, obstacleSpawnInterval) {
        const currentTime = Date.now();
        if (currentTime - this.lastSpawnTime > obstacleSpawnInterval) {
            this.spawnObstacle();
            this.lastSpawnTime = currentTime;
        }

        this.obstacles.forEach(obstacle => {
            obstacle.x -= this.obstacleSpeed;
            if (obstacle.type === 'floating') obstacle.y += Math.sin(obstacle.floatOffset);
        });

        this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    }

    spawnObstacle() {
        const yPosition = this.canvas.height - 50;
        const obstacle = {
            x: this.canvas.width,
            y: yPosition,
            width: 20,
            height: 50,
            type: 'ground',
            floatOffset: Math.random() * 100
        };
        this.obstacles.push(obstacle);
    }

    getObstacles() {
        return this.obstacles;
    }

    removeObstacle(index) {
        this.obstacles.splice(index, 1);
    }
}

export default Obstacles;
