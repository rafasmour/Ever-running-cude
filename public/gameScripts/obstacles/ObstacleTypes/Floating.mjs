import { Obstacle } from "../ObstacleBase.mjs";

export class Floating extends Obstacle {
    
    constructor(x, y, width, height){
        super(x, ((y/1.75 ) * (Math.random()+0.5)), width, height, '#6A5ACD')
        this.floatOffSet = Math.random() * 100;
        this.type = "floating";
    }
    float(){
        this.floatOffSet += 0.09;
        this.y += Math.sin(this.floatOffSet);
    }
    
    

}