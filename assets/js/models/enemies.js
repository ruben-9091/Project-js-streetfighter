class Enemies {
    
    constructor (ctx, x, y, sprite) {

        this.ctx = ctx; 
        this.x = x;
        this.y = y; 
        this.w = ENEMY_W;
        this.h = ENEMY_H; 

        this.vx = ENEMY_VX; 

        this.sprite = new Image();
        this.sprite.src = sprite; 

        this.sprite.vFrames = 3;
        this.sprite.hFrames = 1;
        this.sprite.vFrameIndex = 0;
        this.sprite.hFrameIndex = 0; 

        this.sprite.onload = () => {
            this.sprite.isReady = true; 
            this.sprite.frameW = this.sprite.width / this.sprite.vFrames;
            this.sprite.frameH = this.sprite.height / this.sprite.hFrames; 

        }

        this.drawCount= 0; 
    }

    move () {
        this.x += this.vx
    }

    draw () {
        if (this.sprite.isReady) {
            this.ctx.drawImage (
                this.ctx, 
                this.sprite.vFrameIndex * this.sprite.frameW,
                this.sprite.hFrameIndex * this.sprite.frameH,
                this.sprite.frameW,
                this.sprite.frameH, 
                this.x,
                this.y,
                this.w,
                this.h
            )
            this.drawCount++
        }
    }

    animate () {
        if (this.drawCount >= ENEMY_ANIMATE_FREQ) {
            this.drawCount = 0;
            this.sprite.vFrameIndex = (this.sprite.vFrameIndex + 1) % this.sprite.vFrames; 
        }
    }



}