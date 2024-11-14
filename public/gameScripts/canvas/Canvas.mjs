import { ColorManager } from "./colorManager.mjs";

export class Canvas {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gravity;
        this.jumpVelocity;  
        this.animation = false;    
        this.objectsToAnimate = [];
    }
    resizeCanvas() {
        const aspectRatio = 800 / 400;  
        this.canvas.width = window.innerWidth < 800 ? window.innerWidth : 800;
        this.canvas.height = this.canvas.width / aspectRatio;
        this.gravity = this.canvas.height * 0.0025;
    }
    drawScore(score){
        this.ctx.shadowColor = '';
        this.ctx.shadowBlur = 0;                    
        this.ctx.shadowOffsetX = 0;                  
        this.ctx.shadowOffsetY = 0; 
        this.ctx.font = '1vw "Press Start 2P", sans-serif';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`score: ${score}`,20,50);
        // this.canvas.style.borderColor = this.ctx.fillStyle;
    }
    drawGameOver(score){
        this.canvas.style.animation = "shake 0.5s"
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Game Over`, this.canvas.width/2, this.canvas.height / 2 - 50)
        this.ctx.fillText(`Press R To Restart`, this.canvas.width/2, this.canvas.height/2 + 50)
        this.ctx.fillText(`Final Score: ${score}`, this.canvas.width/2,  this.canvas.height / 2)
    }
    createParts(object) {
        let numParts = 25; // Number of pieces the cube will break into
        let j = 5;
        let l = 1;
        for (let i = 0; i < numParts; i++) {
            if (j == 1){
                l++;
                j = 5;
            }
            console.log(object.color)
            let part = {
                x: object.x + (object.width / j),
                y: object.y + (object.width / l),
                size: object.width / 4 + Math.random() * 5,  // Random size for variation
                dx: (Math.random() - 0.5) * 4,  // Random X velocity
                dy: (Math.random() - 0.5) * 4,  // Random Y velocity
                color: new ColorManager(object.color),
                alpha: 1  // Opacity of the piece
            };
            this.objectsToAnimate.push(part);
            j--
        }
        this.animation = true;
    }
    animateDisintegration() {
        this.objectsToAnimate.forEach((part, index) => {
            this.ctx.fillStyle = part.color.getRGBA(part.alpha);
            this.ctx.fillRect(part.x, part.y, part.size, part.size);

            // Move the parts
            part.x += part.dx;
            part.y += part.dy;

            // Fade out and shrink the parts
            part.alpha -= 0.02;  // Decrease alpha to make parts fade out
            part.size -= 0.1;     // Shrink the parts

            // Remove the part if it's too small or completely transparent
            if (part.size <= 0 || part.alpha <= 0) {
                this.objectsToAnimate.splice(index, 1);
            }
        });
        if(this.objectsToAnimate.length == 0)
            this.animation = false
    }
}