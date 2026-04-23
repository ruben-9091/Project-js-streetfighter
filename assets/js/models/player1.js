class Player1 {


    constructor (ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.w = PLAYER1_W * 2.5;
        this.h = PLAYER1_H * 2.5;
      

        this.vx = 0;
        this.vy = 0;

        this.floor = CANVAS_H - this.h - 30;;

        this.health = PLAYER1_HEALTH;

        this.gravity = 0;
        this.jumpStrength = -10;

        this.spriteRight = new Image();
        this.spriteRight.src = PLAYER1_RIGHT_SPRITE;
        this.spriteRight.vFrames = 3; 
        this.spriteRight.hFrames = 3; 
        this.spriteRight.vFramesIndex = 0;
        this.spriteRight.hFramesIndex = 0; 
        this.spriteRight.onload = () => {
            this.spriteRight.isReady = true;
            this.spriteRight.frameW = Math.floor(this.spriteRight.width / this.spriteRight.vFrames)
            this.spriteRight.frameH = Math.floor(this.spriteRight.height / this.spriteRight.hFrames)
        }

        this.spriteLeft = new Image();
        this.spriteLeft.src = PLAYER1_LEFT_SPRITE;
        this.spriteLeft.vFrames = 3; 
        this.spriteLeft.hFrames = 3; 
        this.spriteLeft.vFramesIndex = 0;
        this.spriteLeft.hFramesIndex = 0; 
        this.spriteLeft.onload = () => {
            this.spriteLeft.isReady = true;
            this.spriteLeft.frameW = Math.floor(this.spriteLeft.width / this.spriteLeft.vFrames)
            this.spriteLeft.frameH = Math.floor(this.spriteLeft.height / this.spriteLeft.hFrames)
        }


        this.sprite = this.spriteRight;
        this.drawCount = 0; 


        }
    
    groundTo(groundY) {
        this.y = groundY - this.h
        this.ground = groundY
    }

    onKeyEvent (event) {
        const isPressed = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_LEFT:
                if (isPressed) {
                    this.sprite = this.spriteLeft;
                    this.vx = -player1VX;
                } else {
                    this.vx = 0;
                }
                break;

            case KEY_RIGHT:
                if (isPressed) {
                    this.sprite = this.spriteRight;
                    this.vx = player1VX;
                } else {
                    this.vx = 0;
                }
                break;
            
            case KEY_UP:
                if (!this.isJumping) {
                    this.isJumping = true;
                    this.vy = player1VY;
                    this.gravity = GRAVITY
                }
                break;
        }
        }
        
    

    move () {
        this.prevX = this.x;
        this.prevY = this.y;

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
        this.animate()
        this.drawCount ++
    
    }

    animate () {

        if (this.isJumping) {
            this.sprite.vFramesIndex = 0; 
            this.sprite.hFramesIndex = 1; 
            return;
            } 
         

        
        if (this.vx !== 0){
            if (this.drawCount >= PLAYER1_FREQ) {
            this.sprite.vFramesIndex = (this.sprite.vFramesIndex + 1) % this.sprite.vFrames
            this.drawCount = 0; 
            } 
            return; 
            }

        this.sprite.vFramesIndex = 0; 
        this.sprite.hFramesIndex = 0;
        }
        
      
    

    collidesWith(element) {
        return (
            (this.x < element.x + element.w) &&
            (this.x + this.w > element.x) &&
            (this.y < element.y + element.h) &&
            (this.y + this.h > element.y)
        )       
    }
    }
