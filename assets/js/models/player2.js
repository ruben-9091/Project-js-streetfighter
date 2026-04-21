class Player2 {


    constructor (ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;


        this.w = PLAYER2_W;
        this.h = PLAYER2_H;


        this.color = 'blue';
        this.vx = 0;
        this.vy = 0;

        this.floor = CANVAS_H - this.h - 50;
        
    }


    onKeyEvent (event) {
        const isPressed = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_A:
                if (isPressed) {
                    this.vx = -player2VX;
                } else {
                    this.vx = 0;
                }
                break;

            case KEY_D:
                if (isPressed) {
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
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    }