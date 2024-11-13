import { Obstacle } from "../ObstacleBase.mjs";

export class Pillar extends Obstacle{
    constructor(x, y, width, height){
        super(x, -height/2, width, y, '#708090')
        this.type = 'Pillar'
    }
}