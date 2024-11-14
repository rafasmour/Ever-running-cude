import { Bullet } from "./playerWeapons/Bullet.mjs";
export class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.dy = 0;
        this.isJumping = false;
        this.isDoubleJumping = false;
        this.isSliding = false;
        this.jumpVelocity = 0;
        this.bullet = new Bullet();
        this.color = "#FFA500";
    }
    resize(fixedWidth, fixedHeight, canvasHeight){
        this.width = fixedWidth;
        this.height = fixedHeight;
        this.x = 50;
        this.y = canvasHeight - this.height;
        this.dy = 0;
        this.jumpVelocity = -this.height * 0.3;
        this.isJumping = false;
        this.isDoubleJumping = false;
        this.isSliding = false;
    }
    ControlsDown(key) {
        switch (key) {
            case ' ':
                if(!this.isJumping){
                    this.isJumping = true;
                    this.dy = this.jumpVelocity;
                } else if (!this.isDoubleJumping) {
                    this.isDoubleJumping = true;
                    this.dy = this.jumpVelocity;
                }
                break;
            case 's':
                if(!this.isSliding){
                    this.isSliding = true;
                    this.height /= 2;
                    this.y += this.height;
                    this.isjumping = true;
                    this.isDoubleJumping = true;
                    this.dy = 20;
                }
                break;
            case 'a':
                this.bullet.addBullet(this.x, this.y, this.width, this.height)
            
        }
        console.log(this.isJumping, this.isDoubleJumping)
    }
    ControlsUp(key, canvasHeight) {
        switch (key) {
            case 's':
                if(this.isSliding){
                    this.isSliding = false;
                    this.height *= 2;
                    this.y = canvasHeight - this.height;
                }
        }
    }
    update(gravity, canvasWidth, canvasHeight){
        if(this.isJumping || this.isDoubleJumping){
            this.dy += gravity;
            this.y += this.dy;
            if (this.y >= canvasHeight - this.height) {
                this.isJumping = false;
                this.isDoubleJumping = false;
                this.dy = 0;
                this.y = canvasHeight - this.height;
            }
        }
        this.bullet.update(canvasWidth);
    }
    playerGradient(ctx) {
        const gradient = ctx.createLinearGradient(this.x, this.y, this.width, this.height);
        gradient.addColorStop(0, "#FFD700"); // Gold
        gradient.addColorStop(1, "#FFA500"); // Orange
        return gradient; // Return the gradient to use elsewhere
    }
    draw(ctx){
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;  
        ctx.shadowOffsetX = -5;  
        ctx.shadowOffsetY = 5;  
        let gradient = this.playerGradient(ctx);
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.bullet.draw(ctx);
    }
}