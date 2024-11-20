import { Mountain } from "./elements/Mountain.mjs";
import { Sea } from "./elements/Sea.mjs";
import { Sky } from "./elements/sky.mjs";
import { Sun } from "./elements/Sun.mjs";

export class Background {
    constructor(canvasWidth, canvasHeight){
        this.mountain = new Mountain();
        this.sea = new Sea(canvasHeight)
        this.sky = new Sky(canvasHeight);
        this.sun = new Sun(canvasWidth, canvasHeight);
    }
    update(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.mountain.update(canvasWidth, canvasHeight, fixedWidth, fixedHeight)
        this.sun.update(canvasWidth, canvasHeight)
    }
    
    
    draw(ctx, canvasWidth, canvasHeight) {

        this.sky.draw(ctx, canvasWidth, canvasHeight)
        
        
        this.mountain.draw(ctx);
        
        this.sea.draw(ctx, canvasWidth, canvasHeight)
        
        this.sun.draw(ctx, canvasWidth, canvasHeight);
    }
}