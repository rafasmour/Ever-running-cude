import { Mountain } from "./elements/Mountain.mjs";
import { Sea } from "./elements/Sea.mjs";

export class Background {
    constructor(canvasHeight){
        this.mountain = new Mountain();
        this.sea = new Sea(canvasHeight)
    }
    update(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.mountain.update(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
    }
    skyGradient(ctx, canvasHeight){
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        skyGradient.addColorStop(0, "#ababab"); 
        skyGradient.addColorStop(1, "#4682B4");
        return skyGradient
    }
    
    draw(ctx, canvasWidth, canvasHeight) {

        const skyGradient = this.skyGradient(ctx, canvasHeight);
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight); // Draw the sky
        
        //draws mountains
        this.mountain.draw(ctx);

        // Draw the sea at the bottom of the canvas
        this.sea.draw(ctx, canvasWidth, canvasHeight)
    
    }
}