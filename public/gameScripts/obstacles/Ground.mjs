import { Obstacle } from './Obstacle.mjs'

export class Ground extends Obstacle {
    constructor(x, y, width, height){
        console.log(x)
        super(x, (y - height), width, height)
        this.type = 'ground'
    }
}