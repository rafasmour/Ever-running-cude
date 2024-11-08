import { Obstacle } from './Obstacle.mjs'

export class Ground extends Obstacle {
    constructor(x, y, width, height){
        console.log(x)
        super(x, (y - height), width, height, '#8B4513')
        this.type = 'ground'
    }
}