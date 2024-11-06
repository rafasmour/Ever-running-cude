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
    //   const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    //   gradient.addColorStop(0, '#F1F9FF'); // Light blue at the top
    //   gradient.addColorStop(1, '#A7D3E0'); // Darker blue at the bottom
      this.ctx.fillStyle = '#A8DADC'; // Set the gradient as the fill style
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Fill the canvas
    }
    drawPlayer(playerX, playerY, playerWidth, playerHeight){
        const gradient = this.ctx.createLinearGradient(playerX, playerY, playerX, playerY + playerHeight);
        gradient.addColorStop(0.4, '#E9C46A'); // Light blue at the top
        gradient.addColorStop(0.9, '#264653'); // Darker blue at the bottom
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    }
    drawObstacle(obstacle){
        this.ctx.fillStyle = obstacle.type === 'ground' ? '#2A9D8F' : obstacle.type === 'floating' ? '#6A994E' : '#F8C9C9';
        this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
    drawBullet(bullet){
        this.ctx.fillStyle = '#E76F51';
        this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
    drawScore(score){
        this.ctx.font = '3vw Roboto';
        this.ctx.fillStyle = '#E76F51';
        this.ctx.fillText(`score: ${score}`,20,50);
        // this.canvas.style.borderColor = this.ctx.fillStyle;
    }
    drawGameOver(score){
        this.canvas.style.animation = "shake 0.5s"
        this.ctx.font = '3vw Roboto';
        this.ctx.fillStyle = "#E76F51";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Game Over`, this.canvas.width/2, this.canvas.height / 2 - 50)
        this.ctx.fillText(`Press R To Restart`, this.canvas.width/2, this.canvas.height/2 + 50)
        this.ctx.fillText(`Final Score: ${score}`, this.canvas.width/2,  this.canvas.height / 2)
    }
}