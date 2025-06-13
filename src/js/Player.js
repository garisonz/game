// Player.js - Player class extending Sprite
class Player extends Sprite {
    constructor({ image, scale = 1, frameWidth, frameHeight }) {
        // Player is centered, so we don't need a fixed position
        super({ 
            position: { x: 0, y: 0 }, 
            image, 
            scale 
        });
        
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.currentFrame = { x: 0, y: 0 };
        this.animationSpeed = 8;
        this.frameCounter = 0;
    }

    draw(ctx, canvasWidth, canvasHeight) {
        if (!this.image) return;

        const scaledWidth = this.frameWidth * this.scale;
        const scaledHeight = this.frameHeight * this.scale;
        
        // Center the player on the screen
        const centerX = canvasWidth / 2 - scaledWidth / 2;
        const centerY = canvasHeight / 2 - scaledHeight / 2;

        ctx.drawImage(
            this.image,
            this.currentFrame.x * this.frameWidth, // Source X
            this.currentFrame.y * this.frameHeight, // Source Y
            this.frameWidth, // Source width
            this.frameHeight, // Source height
            centerX, // Destination X
            centerY, // Destination Y
            scaledWidth, // Destination width
            scaledHeight // Destination height
        );
    }

    animate() {
        this.frameCounter++;
        if (this.frameCounter >= this.animationSpeed) {
            this.frameCounter = 0;
            this.currentFrame.x = (this.currentFrame.x + 1) % 2;
        }
    }

    setDirection(direction) {
        // Set sprite row based on direction
        switch (direction) {
            case 'down':
                this.currentFrame.y = 0;
                break;
            case 'up':
                this.currentFrame.y = 1;
                break;
            case 'left':
                this.currentFrame.y = 2;
                break;
            case 'right':
                this.currentFrame.y = 3;
                break;
        }
    }
}