
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
        this.bullets = [];
        this.bulletCooldown = 1500;
        this.lastBulletTime = 500;
        this.bulletSpeed = 10;
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
    removeBullet(bullet) {
        this.bullets.splice(bullet, 1);
    }
    ControlsDown(key, canvasHeight) {
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
                    this.isjumping = false;
                    this.isDoubleJumping = false;
                    this.dy = 5;
                }
                break;
            case 'a':
                const currentTime = Date.now();
                if(currentTime - this.lastBulletTime > this.bulletCooldown){
                    this.bullets.push({
                        x: this.x + this.width,
                        y: this.y,
                        width: this.width,
                        height: this.height
                    })
                    this.lastBulletTime = Date.now();
                }
        }
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
    destroyBullet(bullet){
        this.bullets.splice(bullet, 1);
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
        for(let i = 0; i < this.bullets.length; i++){
            this.bullets[i].x += this.bulletSpeed;
            if(this.bullets[i].x > canvasWidth)
                this.removeBullet(this.bullets[i])
        }
    }
}