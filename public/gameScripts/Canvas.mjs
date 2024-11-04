export class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.height;
        this.gravity;
        this.jumpVelocity;

    }
    resizeCanvas() {
        const aspectRatio = 800 / 400;
        this.canvas.width = window.innerWidth < 800 ? window.innerWidth : 800;
        this.canvas.height = this.canvas.width / aspectRatio;
        this.height = this.canvas.height * 0.125;
        // player.width = newWidth * 0.0625;
        // player.height = height;
        // player.y = newHeight - height;
        this.gravity = this.height * 0.0025;
        console.log(this.height)
    }
    drawBackground() {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      gradient.addColorStop(0, '#F1F9FF'); // Light blue at the top
      gradient.addColorStop(1, '#A7D3E0'); // Darker blue at the bottom

      this.ctx.fillStyle = gradient; // Set the gradient as the fill style
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height); // Fill the canvas
    }
    drawGame(playerX, playerY, playerWidth, playerHeight) {
        this.drawBackground();
        ctx.fillStyle = '#FF6B6B'; // Coral Red
        ctx.fillRect(playerX, playerY, playerWidth, playerHeight);
    }
}