import { Mountain } from "./Mountain.mjs";

export class Background {
    constructor(){
        this.mountain = new Mountain();
    }
    update(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.mountain.update(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
    }
    skyGradient(ctx, canvasHeight){
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        skyGradient.addColorStop(0, "#87CEEB"); 
        skyGradient.addColorStop(1, "#4682B4");
        return skyGradient
    }
    seaGradient(ctx, canvasHeight, seaHeight) {
        const seaGradient = ctx.createLinearGradient(0, canvasHeight - seaHeight, 0, canvasHeight);
        seaGradient.addColorStop(0, "#A0D8E0"); 
        seaGradient.addColorStop(1, "#6f89ed"); 
        return seaGradient;
    }
    draw(ctx, canvasWidth, canvasHeight) {
        const skyGradient = this.skyGradient(ctx, canvasHeight);
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight); // Draw the sky
        
        // Draw the sea at the bottom of the canvas
        const seaHeight = canvasHeight * 0.05; // Sea height as 20% of canvas height
        const seaGradient = this.seaGradient(ctx, canvasHeight, seaHeight);
        ctx.fillStyle = seaGradient;
        ctx.fillRect(0, canvasHeight - seaHeight, canvasWidth, seaHeight); // Draw the sea area

        //draws mountains
        this.mountain.draw(ctx);
    
    }
}