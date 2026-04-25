class Kame {

    constructor (ctx, x, y, vx, w = KAME_W, h = KAME_H, damage = KAME,) {


        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.w = w*2;
        this.h = h*2; 

        this.vx = vx; 

        this.damage = damage; 

        this.spriteRigth = new Image(); 

        this.spriteRigth.vFrames = 6;
        this.spriteRigth.hFrames = 1;
        this.spriteRigth.vFrameIndex = 0;
        this.spriteRigth.hFrameIndex = 0;

        this.spriteRigth.onload = () => {
            this.spriteRigth.isReady = true; 
            this.spriteRigth.frameW = Math.floor (this.spriteRigth.width/this.spriteRigth.vFrames);
            this.spriteRigth.frameH = Math.floor (this.spriteRigth.height/this.spriteRigth.hFrames); 
        }

        this.spriteRigth.src = "/assets/images/Sprites/kame-icon/kame-icon-right.png";

        this.spriteLeft = new Image();
        
        this.spriteLeft.vFrames = 6;
        this.spriteLeft.hFrames = 1;
        this.spriteLeft.vFrameIndex = 0;
        this.spriteLeft.hFrameIndex = 0;

        this.spriteLeft.onload = () => {
            this.spriteLeft.isReady = true; 
            this.spriteLeft.frameW = Math.floor (this.spriteLeft.width/this.spriteLeft.vFrames);
            this.spriteLeft.frameH = Math.floor (this.spriteLeft.height/this.spriteLeft.hFrames);
            }

        this.spriteLeft.src = "/assets/images/Sprites/kame-icon/kame-icon-left.png"; 

        this.sprite = vx > 0 ? this.spriteRigth : this.spriteLeft;

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

