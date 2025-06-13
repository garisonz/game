// Sprite.js - Base sprite class
class Sprite {
    constructor({ position, velocity = { x: 0, y: 0 }, image, scale = 1 }) {
        this.position = position;
        this.velocity = velocity;
        this.image = image;
        this.scale = scale;
    }

    draw(ctx) {
        if (!this.image) return;
        
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.image.width * this.scale,
            this.image.height * this.scale
        );
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    getBounds() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.image.width * this.scale,
            height: this.image.height * this.scale
        };
    }
}