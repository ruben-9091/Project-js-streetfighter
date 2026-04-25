class Health {

    constructor (ctx, x, y, w = HEALTH_W, h = HEALTH_H, damage = HEALTH, src = HEALTH_SRC) {
        this.ctx = ctx

        this.x = x;
        this.y = y;
        this.w = w / 3.5; 
        this.h = h / 3.5; 



        this.health = damage; 

        this.sprite = new Image ();
        
        this.sprite.vFrames = 4;
        this.sprite.hFrames = 1;
        this.sprite.vFrameIndex = 0; 
        this.sprite.hFrameIndex = 0; 

        this.sprite.onload = () => {
            this.sprite.isReady = true; 
            this.sprite.frameW = Math.floor(this.sprite.width/this.sprite.vFrames);
            this.sprite.frameH = Math.floor(this.sprite.height/this.sprite.hFrames);

        }
        this.sprite.src = src; 
        this.drawCount = 0;
    }

    draw () {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite, 
                this.sprite.vFrameIndex * this.sprite.frameW,
                this.sprite.hFrameIndex * this.sprite.frameH,
                this.sprite.frameW,
                this.sprite.frameH,
                this.x,
                this.y,
                this.w,
                this.h
            ) 
                 
            this.animate();
            this.drawCount ++
        }
    }

    animate () {
        if (this.drawCount >= HEALTH_ANIMATION_FREQ) {
            this.drawCount = 0;
            this.sprite.vFrameIndex = (this.sprite.vFrameIndex +1) % this.sprite.vFrames; 
        }
    }

}