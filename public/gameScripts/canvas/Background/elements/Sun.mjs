export class Sun{
    constructor(canvasWidth, canvasHeight){
        this.height = canvasHeight * 0.1;
        this.color = "#ffffe6";
        this.sunshines = [];
        this.sunshinesNumber = 5;
        for(let i = 0; i < this.sunshinesNumber; i++){
            const angle =  Math.random() * 2 * Math.PI;
            this.sunshines.push({
                x: canvasWidth + i * 10,
                y: 200,
                color: "rgba(255, 255, 150, 0.5)",
                angle: angle
            })
        } 
    }
    update(canvasWidth){
        for (let i = 0; i < this.sunshines.length; i++) {
            const sunshine = this.sunshines[i];
        
            // Update the angle to make the sunshine rotate
            sunshine.angle += 0.01;  // Adjust this value to control rotation speed
        
            // Update x and y using polar to Cartesian conversion
            sunshine.x = canvasWidth + Math.cos(sunshine.angle) * sunshine.x;  // Use sunshine.y as the distance
            sunshine.y = this.height + Math.sin(sunshine.angle) * sunshine.y;
        
        }
        console.log(this.sunshines)
    }
    drawSunshine(ctx, canvasWidth, canvasHeight, sunshine) {
        ctx.strokeStyle = sunshine.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvasWidth, 0);  // Start from the center of the sun
        ctx.lineTo(sunshine.x, sunshine.y);  // Draw the ray to the updated position
        ctx.stroke();
    }
    drawSun(ctx, canvasWidth, canvasHeight){
        ctx.fillStyle = this.color
        ctx.beginPath();
        ctx.arc(canvasWidth, 0, this.height, 0, 90);
        ctx.fill();
    }
    draw(ctx, canvasWidth, canvasHeight){
        for(let i = 0; i < this.sunshines.length; i++)
            this.drawSunshine(ctx, canvasWidth, canvasHeight, this.sunshines[i])
        this.drawSun(ctx, canvasWidth, canvasHeight)
        
    }
}