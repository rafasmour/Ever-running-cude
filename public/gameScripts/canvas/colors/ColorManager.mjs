export class ColorManager {
    constructor(hexColor) {
        // Parse the RGB values only once
        this.r = parseInt(hexColor.substring(1, 3), 16);
        this.g = parseInt(hexColor.substring(3, 5), 16);
        this.b = parseInt(hexColor.substring(5, 7), 16);
    }

    // Only changes the alpha value
    getRGBA(alpha) {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${alpha})`;
    }
}