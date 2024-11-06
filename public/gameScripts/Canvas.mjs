export class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gravity;
        this.jumpVelocity;

    }
    resizeCanvas() {
        const aspectRatio = 800 / 400;  
        this.canvas.width = window.innerWidth < 800 ? window.innerWidth : 800;
        this.canvas.height = this.canvas.width / aspectRatio;
        // player.width = newWidth * 0.0625;
        // player.height = height;
        // player.y = newHeight - height;
        this.gravity = this.canvas.height * 0.0025;
    }
    drawBackground() {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      gradient.addColorStop(0, '#F1F9FF'); // Light blue at the top
      gradient.addColorStop(1, '#A7D3E0'); // Darker blue at the bottom
      this.ctx.fillStyle = gradient; // Set the gradient as the fill style
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Fill the canvas
    }
    drawPlayer(playerX, playerY, playerWidth, playerHeight){
        this.ctx.fillStyle = '#FF6B6B'; // Coral Red
        this.ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    }
    drawObstacle(obstacle){
        this.ctx.fillStyle = obstacle.type === 'ground' ? '#FFC300' : (obstacle.type === 'floating' ? '#6BFF6B' : 'purple');
        this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
    drawBullet(bullet){
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
    drawScore(score){
        this.ctx.fillStyle = 'black';
        this.ctx.font = '2vw Roboto';
        this.ctx.font(`Score: ${score}`, 20, 400)
    }
}