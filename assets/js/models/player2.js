class Player2 {


    constructor (ctx, x, y,) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.color = 'blue';
        this.vx = 0;
        
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
        }
    }

    move () {
        this.x += this.vx;
    }

    draw () {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    }