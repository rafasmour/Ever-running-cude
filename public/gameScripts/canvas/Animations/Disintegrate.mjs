import { ColorManager } from "../colors/ColorManager.mjs";
export class Disintegrate{
    constructor(){
        this.parts = []
    }
    createParts(object) {
        let numParts = 25; // Number of pieces the cube will break into
        let j = 5;
        let l = 1;
        for (let i = 0; i < numParts; i++) {
            if (j == 1){
                l++;
                j = 5;
            }
            console.log(object.color)
            let part = {
                x: object.x + (object.width / j),
                y: object.y + (object.width / l),
                size: object.width / 4 + Math.random() * 5,  // Random size for variation
                dx: (Math.random() - 0.5) * 4,  // Random X velocity
                dy: (Math.random() - 0.5) * 4,  // Random Y velocity
                color: new ColorManager(object.color),
                alpha: 1  // Opacity of the piece
            };
            this.parts.push(part);
            j--
        }
        this.animation = true;
    }
    animate(ctx) {
        this.parts.forEach((part, index) => {
            ctx.fillStyle = part.color.getRGBA(part.alpha);
            ctx.fillRect(part.x, part.y, part.size, part.size);

            // Move the parts
            part.x += part.dx;
            part.y += part.dy;

            // Fade out and shrink the parts
            part.alpha -= 0.02;  // Decrease alpha to make parts fade out
            part.size -= 0.1;     // Shrink the parts

            // Remove the part if it's too small or completely transparent
            if (part.size <= 0 || part.alpha <= 0) {
                this.parts.splice(index, 1);
            }
        });
        if(this.parts.length == 0)
            this.animation = false
    }
}