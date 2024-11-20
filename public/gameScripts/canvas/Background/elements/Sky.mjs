export class Sky{
    constructor(){
        this.height
    }
    skyGradient(ctx, canvasHeight){
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        skyGradient.addColorStop(0, "#fff2e6"); 
        skyGradient.addColorStop(1, "#4682B4");
        return skyGradient
    }
    draw(ctx, canvasWidth, canvasHeight){
        const skyGradient = this.skyGradient(ctx, canvasHeight);
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight); // Draw the sky
    }
}