class Player2 {


    constructor (ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;


        this.w = PLAYER2_W * 2.5;
        this.h = PLAYER2_H * 2.5;


        this.vx = 0;
        this.vy = 0;

        this.floor = CANVAS_H - this.h - 30;

        this.spriteLeft = new Image();
        this.spriteLeft.src = PLAYER2_LEFT_SPRITE; 
        this.spriteLeft.vFrames = 3;
        this.spriteLeft.hFrames = 3;
        this.spriteLeft.vFramesIndex = 0; 
        this.spriteLeft.hFramesIndex = 0;
        this.spriteLeft.onload = () => {
            this.spriteLeft.isReady = true;
            this.spriteLeft.frameW = Math.floor (this.spriteLeft.width / this.spriteLeft.vFrames);
            this.spriteLeft.frameH = Math.floor (this.spriteLeft.height / this.spriteLeft.hFrames); 
        }

        this.spriteRight = new Image ();
        this.spriteRight.src = PLAYER2_RIGHT_SPRITE;
        this.spriteRight.vFrames = 3;
        this.spriteRight.hFrames = 3; 
        this.spriteRight.vFramesIndex = 0;
        this.spriteRight.hFramesIndex = 0;
        this.spriteRight.onload = () => {
            this.spriteRight.isReady = true; 
            this.spriteRight.frameW = Math.floor (this.spriteRight.width / this.spriteRight.vFrames);
            this.spriteRight.frameH = Math.floor (this.sprite.height / this.sprite.hFrames)
        }

        this.sprite = this.spriteLeft; 
        this.drawCount = 0; 
        
    }

    groundTo (groundY) {
        this.y = groundY - this.h
        this.ground = groundY
    }


    
    onKeyEvent (event) {
        const isPressed = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_A:
                if (isPressed) {
                    this.sprite = this.spriteLeft;
                    this.vx = -player2VX;
                } else {
                    this.vx = 0;
                }
                break;

            case KEY_D:
                if (isPressed) {
                    this.sprite = this.spriteRight;
                    this.vx = player2VX;
                } else {
                    this.vx = 0;
                }
                break;

            case KEY_W:
                if (!this.isJumping) {
                    this.isJumping = true;
                    this.vy = player2VY;
                }
                break;
        }
    }

    move () {
        this.x += this.vx;
        this.y += this.vy;

        this.vy += GRAVITY;
        if (this.y > this.floor) {
            this.y = this.floor;
            this.vy = 0;
            this.isJumping = false;
        }
    }

    draw () {
       if (this.sprite.isReady) {
        this.ctx.drawImage (
            this.sprite,
            this.sprite.vFramesIndex * this.sprite.frameW,
            this.sprite.hFramesIndex * this.sprite.frameH,
            this.sprite.frameW,
            this.sprite.frameH,
            this.x,
            this.y,
            this.w,
            this.h
        )
       }
       this.animate ()
       this.drawCount++
    }

    animate () {

        if (this.isJumping) {
            this.sprite.vFramesIndex = 1;
            this.sprite.hFramesIndex = 1; 
            return;
        }
        if (this.vx !== 0){
            if (this.drawCount >= PLAYER2_FREQ) {
                this.sprite.vFramesIndex = (this.sprite.vFramesIndex + 1) % this.sprite.vFrames
                this.drawCount = 0;
            }
            return;
        }
        this.sprite.vFramesIndex = 0; 
        this.sprite.hFramesIndex = 0;
    }

    }