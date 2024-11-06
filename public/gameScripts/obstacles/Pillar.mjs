import { Obstacle } from "./Obstacle.mjs";

export class Pillar extends Obstacle{
    constructor(x, y, width, height){
        super(x, y - height/2, width, height)
        this.type = 'Pillar'
    }
}