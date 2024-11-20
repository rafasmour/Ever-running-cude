

export class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gravity;
        this.jumpVelocity; 
        this.score = 0;
    }
    resizeCanvas() {
        const aspectRatio = 800 / 400;  
        this.canvas.width = window.innerWidth < 800 ? window.innerWidth : 800;
        this.canvas.height = this.canvas.width / aspectRatio;
        this.gravity = this.canvas.height * 0.0025;
    }
    gameOver(score){
        this.canvas.style.animation = "shake 0.5s"
        this.fillstyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Game Over`, this.canvas.width/2, this.canvas.height / 2 - 50)
        this.ctx.fillText(`Press R To Restart`, this.canvas.width/2, this.canvas.height/2 + 50)
        this.ctx.fillText(`Final Score: ${score}`, this.canvas.width/2,  this.canvas.height / 2)
    }
}