import { Obstacle } from "./Obstacle.mjs";

export class Pillar extends Obstacle{
    constructor(x, y, width, height){
        super(x, -height/2, width, y)
        this.type = 'Pillar'
    }
}