
export class Player {
    contructor() {
        this.x = 50;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.dy = 0;
        this.isJumping = false;
        this.isDoubleJumping = false;
        this.isSliding = false;
        this.jumpVelocity = -this.height * 0.045;
    }
    resize(width, height){
        this.width = width * 0.0625;
        this.height = height * 0.125;
        this.y = height * 0.125;
    }
}