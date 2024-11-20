import { Disintegrate } from "./Disintegrate.mjs";

export class AnimationMain{
    constructor(){
        this.disintegrate = new Disintegrate()
    }
    animate(ctx){
        this.disintegrate.animate(ctx);
    }
}