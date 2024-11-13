export class Bullet {
    constructor(){
        this.bullets = []
        this.bulletCooldown = 1500;
        this.lastBulletTime = 500;
        this.bulletSpeed = 10;
    }
    addBullet(playerX, playerY, playerWidth, playerHeight){
        const currentTime = Date.now();
        if(currentTime - this.lastBulletTime > this.bulletCooldown){
                this.bullets.push({
                x: playerX + playerWidth,
                    y: playerY,
                    width: playerWidth,
                    height: playerHeight,
                    color:'#FFA500'
                })
                this.lastBulletTime = Date.now();
            }
    }
    removeBullet(bullet) {
        this.bullets.splice(bullet, 1);
    }
    update(canvasWidth){
        for(let i = 0; i < this.bullets.length; i++){
            this.bullets[i].x += this.bulletSpeed
            if(this.bullets[i].x > canvasWidth)
                this.removeBullet(this.bullets[i])
        }
    }
    drawBullet(ctx, bullet){
        ctx.fillStyle = this.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
    draw(ctx){
        this.bullets.forEach((bullet) => {
            this.drawBullet(ctx, bullet)
        })
    }
}