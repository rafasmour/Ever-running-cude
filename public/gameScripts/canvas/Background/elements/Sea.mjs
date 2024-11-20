export class Sea {
    constructor(canvasHeight){
        this.seaHeight = canvasHeight*0.04;
        console.log(this.seaHeight)
    }
    seaGradient(ctx, canvasWidth, canvasHeight) {
        const seaGradient = ctx.createLinearGradient(0, canvasHeight - this.seaHeight, canvasWidth, canvasHeight);
        seaGradient.addColorStop(0, "#A0D8E0"); 
        seaGradient.addColorStop(1, "#6f89ed"); 
        return seaGradient;
    }
    draw(ctx, canvasWidth, canvasHeight){
        const seaGradient = this.seaGradient(ctx, canvasHeight, canvasWidth);
        console.log(canvasHeight, canvasWidth)
        ctx.fillStyle = seaGradient;
        ctx.fillRect(0, canvasHeight - this.seaHeight, canvasWidth, this.seaHeight); // Draw the sea area
    }
}