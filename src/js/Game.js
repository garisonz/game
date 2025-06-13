// Game.js - Debug version to help identify loading issues
class Game {
    constructor(canvasId) {
        this.canvas = document.querySelector(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 1024;
        this.canvas.height = 576;
        
        this.imagesLoaded = 0;
        this.totalImages = 2;
        this.isRunning = false;
        
        this.keys = {
            w: { pressed: false },
            s: { pressed: false },
            a: { pressed: false },
            d: { pressed: false }
        };
        this.lastKey = '';
        
        this.sprites = {};
        this.player = null;
        
        console.log('Game initialized');
        this.init();
    }
    
    init() {
        this.loadAssets();
        this.setupEventListeners();
        this.clearCanvas();
    }
    
    loadAssets() {
        console.log('Loading assets...');
        
        // Load background image
        const backgroundImage = new Image();
        backgroundImage.src = 'assets/RPG Map.png';
        backgroundImage.onload = () => {
            console.log('Background image loaded:', backgroundImage.width, 'x', backgroundImage.height);
            this.sprites.background = new Sprite({
                position: { x: -202, y: -280 },
                image: backgroundImage
            });
            this.onImageLoad();
        };
        backgroundImage.onerror = () => {
            console.error('Failed to load background image:', backgroundImage.src);
        };
        
        // Load player image
        const playerImage = new Image();
        playerImage.src = 'assets/ACharDown.png';
        playerImage.onload = () => {
            console.log('Player image loaded:', playerImage.width, 'x', playerImage.height);
            this.player = new Player({
                image: playerImage,
                scale: 3,
                frameWidth: playerImage.width / 2,
                frameHeight: playerImage.height / 2
            });
            this.onImageLoad();
        };
        playerImage.onerror = () => {
            console.error('Failed to load player image:', playerImage.src);
        };
    }
    
    onImageLoad() {
        this.imagesLoaded++;
        console.log(`Images loaded: ${this.imagesLoaded}/${this.totalImages}`);
        if (this.imagesLoaded === this.totalImages) {
            console.log('All images loaded, starting game...');
            this.start();
        }
    }
    
    start() {
        this.isRunning = true;
        this.gameLoop();
    }
    
    gameLoop() {
        if (!this.isRunning) return;
        
        requestAnimationFrame(() => this.gameLoop());
        
        this.update();
        this.render();
    }
    
    update() {
        this.handleMovement();
    }
    
    render() {
        this.clearCanvas();
        
        // Draw background
        if (this.sprites.background) {
            this.sprites.background.draw(this.ctx);
        } else {
            console.log('Background not ready');
        }
        
        // Draw player
        if (this.player && this.player.image) {
            this.player.draw(this.ctx, this.canvas.width, this.canvas.height);
        } else {
            console.log('Player not ready');
            // Draw a placeholder rectangle for the player
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(
                this.canvas.width / 2 - 25, 
                this.canvas.height / 2 - 25, 
                50, 50
            );
        }
    }
    
    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    handleMovement() {
        const moveSpeed = 2;
        
        if (!this.sprites.background) return;
        
        if (this.keys.w.pressed && this.lastKey === 'w') {
            this.sprites.background.position.y += moveSpeed;
        } else if (this.keys.a.pressed && this.lastKey === 'a') {
            this.sprites.background.position.x += moveSpeed;
        } else if (this.keys.s.pressed && this.lastKey === 's') {
            this.sprites.background.position.y -= moveSpeed;
        } else if (this.keys.d.pressed && this.lastKey === 'd') {
            this.sprites.background.position.x -= moveSpeed;
        }
    }
    
    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
        window.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }
    
    handleKeyDown(e) {
        const key = e.key.toLowerCase();
        if (this.keys[key]) {
            this.keys[key].pressed = true;
            this.lastKey = key;
        }
    }
    
    handleKeyUp(e) {
        const key = e.key.toLowerCase();
        if (this.keys[key]) {
            this.keys[key].pressed = false;
        }
    }
    
    stop() {
        this.isRunning = false;
    }
}