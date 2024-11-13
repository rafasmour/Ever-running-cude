export class Background {
    constructor(){
        this.mountains = []
        this.mountainSpeed = 5
        this.mountainSpawnInterval = 1500;
        this.mountainLastSpawnTime
    }
    getRandomMountainColor() {
        const colors = ['#7B8D92', '#A4B0C6', '#B1C3D1'];
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
                    y: canvasHeight - fixedHeight,
                    width: width,
                    height: height,
                    speed: Math.random() * 0.5 + 0.3, 
                    color: this.getRandomMountainColor(),
                }
            )
            this.mountainLastSpawnTime = currentTime;
        }
        
    }
    destroyMountain(mountain){
        this.mountains.splice(mountain, 1);
    }
    update(canvasWidth, canvasHeight, fixedWidth, fixedHeight){
        this.spawnMountain(canvasWidth, canvasHeight, fixedWidth, fixedHeight);
        for(let i = 0; i < this.mountains.length; i++){
            this.mountains[i].x -= this.mountainSpeed
            if(this.mountains[i].x + this.mountains.width <= 0)
                this.destroyMountain(this.mountains[i])
        }
    }
    skyGradient(ctx, canvasHeight){
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        skyGradient.addColorStop(0, "#87CEEB"); 
        skyGradient.addColorStop(1, "#4682B4");
        return skyGradient
    }
    drawMountain(ctx, mountain){
        ctx.beginPath();
        ctx.moveTo(mountain.x, mountain.y); 
        ctx.lineTo((mountain.x - mountain.width) / 2, mountain.y + mountain.height);
        ctx.lineTo((mountain.x + mountain.width) / 2, mountain.y + mountain.height);
        ctx.closePath(); 
        ctx.fillStyle = mountain.color;
        ctx.fill(); 
        ctx.stroke();
    }
    draw(ctx, canvasWidth, canvasHeight) {
        const skyGradient = this.skyGradient(ctx, canvasHeight);
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        for(let i = 0; i < this.mountains.length; i++){
            this.drawMountain(ctx, this.mountains[i])
        }
    }
}