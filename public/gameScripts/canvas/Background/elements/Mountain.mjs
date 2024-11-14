export class Mountain {
    constructor(){
        this.mountains = [],
        this.mountainSpeed = 5,
        this.mountainSpawnInterval = 1000,
        this.mountainLastSpawnTime
    }
    getRandomMountainColor() {
        const colors = [
            '#6B705C', // Olive green-brown for distant mountains
            '#A5A58D', // Light brownish green
            '#B7B7A4', // Pale stone gray
            '#D6D3C4', // Sandy brown for sunlit areas
            '#8D99AE', // Cool gray-blue for shadowed areas
            '#4A4E69', // Deep purple-gray for distant silhouettes
            '#283618', // Dark forest green for dense forest areas
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    spawnMountain(canvasWidth, canvasHeight, fixedHeight, fixedWidth){
        const currentTime = Date.now(); 
        if (currentTime - this.mountainLastSpawnTime > this.mountainSpawnInterval) {
            const width = Math.random() * 200 + 150
            const height = Math.random() * 50 + 100
            this.mountains.push(
                {
                    x: canvasWidth + width,
                    y: canvasHeight - height,
                    width: width,
                    height: height,
                    speed: Math.random() * 0.5 + 0.3, 
                    color: this.getRandomMountainColor(),
                }
            )
            this.mountainLastSpawnTime = currentTime;
        }
    }
    update(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.spawnMountain(canvasWidth, canvasHeight, fixedWidth, fixedHeight);
        for(let i = 0; i < this.mountains.length; i++){
            this.mountains[i].x -= this.mountainSpeed
            if(this.mountains[i].x + this.mountains.width <= 0)
                this.destroyMountain(this.mountains[i])
        }
    }
    destroyMountain(mountain) {
        this.mountains.splice(mountain, 1);
    }
    drawMountain(ctx, mountain) {
        ctx.beginPath();
        ctx.moveTo(mountain.x, mountain.y);
        ctx.lineTo(mountain.x - mountain.width / 2, mountain.y + mountain.height);
        ctx.lineTo(mountain.x + mountain.width / 2, mountain.y + mountain.height); 
        ctx.fillStyle = mountain.color;
        ctx.fill(); 
        ctx.stroke();
    }
    draw(ctx){
        for(let i = 0; i < this.mountains.length; i++){
            this.drawMountain(ctx, this.mountains[i])
        }
    }
}