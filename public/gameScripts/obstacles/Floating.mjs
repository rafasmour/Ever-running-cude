import { Obstacle } from "./Obstacle.mjs";

export class Floating extends Obstacle {
    
    constructor(x, y, width, height){
        console.log(x, y, width, height)
        let randomHeight = (y) => {
            let random;
            return random == 0.33 ? y*0.2: random == 0.66 ? y*0.4 : y*0.6
        };
        super(x, randomHeight(y), width, height)
        this.floatOffSet = 100;
        this.type = "floating";
    }
    float(){
        this.floatOffSet += 5;
        this.y = (Math.sin(this.floatOffset)) + (this.y);
    }
}