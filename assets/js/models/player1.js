class Player1 {


    constructor (ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.w = PLAYER1_W / 1.2;
        this.h = PLAYER1_H / 1.2;
      

        this.vx = 0;
        this.vy = 0;

        this.floor = CANVAS_H - this.h - 30;;

        this.gravity = 0.5;
        this.jumpStrength = -10;

        this.sprite = new Image();
        this.sprite.src = PLAYER1_SPRITE;
        this.sprite.vFrames = 2; 
        this.sprite.hFrames = 3; 
        this.sprite.vFramesIndex = 0;
        this.sprite.hFramesIndex = 0; 
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.vFrames)
            this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.hFrames)
        }


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
                    this.vx = -player1VX;
                } else {
                    this.vx = 0;
                }
                break;

            case KEY_RIGHT:
                if (isPressed) {
                    this.vx = player1VX;
                } else {
                    this.vx = 0;
                }
                break;
            
            case KEY_UP:
                if (!this.isJumping) {
                    this.isJumping = true;
                    this.vy = player1VY;
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
        this.animate()
        this.drawCount ++
    
    }

    animate () {

        if (this.isJumping) {
            this.sprite.vFramesIndex = 0; 
            this.sprite.hFramesIndex = 2; 
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
           
    }
    }
