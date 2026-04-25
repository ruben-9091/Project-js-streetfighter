class Kame {

    constructor (ctx, x, y, vx, w = KAME_W, h = KAME_H, damage = KAME, src = KAME_SRC) {


        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.w = w*2;
        this.h = h*2; 

        this.vx = vx; 

        this.damage = damage; 

        this.sprite = new Image(); 

        this.sprite.vFrames = 6;
        this.sprite.hFrames = 1;
        this.sprite.vFrameIndex = 0;
        this.sprite.hFrameIndex = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true; 
            this.sprite.frameW = Math.floor (this.sprite.width/this.sprite.vFrames);
            this.sprite.frameH = Math.floor (this.sprite.height/this.sprite.hFrames); 
        }
        this.sprite.src = src; 
        this.drawCount = 0; 
    }



    draw () {
        if (this.sprite.isReady) {
            this.ctx.drawImage (
                this.sprite, 
                this.sprite.vFrameIndex * this.sprite.frameW,
                this.sprite.hFrameIndex *  this.sprite.frameH,
                this.sprite.frameW,
                this.sprite.frameH, 
                this.x,
                this.y,
                this.w,
                this.h
            )
            this.animate ();
            this.drawCount++

        }
    }

    animate () {
        if (this.drawCount >= KAME_ANIMATION_FREQ) {
            this.drawCount = 0;
            this.sprite.vFrameIndex = (this.sprite.vFrameIndex +1) % this.sprite.vFrames
        }
    }

    move () {
        this.x += this.vx
    }


}

