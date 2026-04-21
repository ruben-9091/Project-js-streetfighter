class Player1 {


    constructor (ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.w = PLAYER1_W;
        this.h = PLAYER1_H;
        this.color = 'red';

        this.vx = 0;
        this.vy = 0;

        this.floor = CANVAS_H - this.h - 50;;

        this.gravity = 0.5;
        this.jumpStrength = -10;
        
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
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    
    }

    animate () {

   
    }





    collidesWith(element) {
           
    }
    }
