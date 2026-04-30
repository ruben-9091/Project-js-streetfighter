class Player {

    static buildPlayer(ctx, x, y, character, mode) {
        console.log('character:', character);
        const movements = (mode === 'P1') ? PLAYER_RIGHT_MOVEMENTS : PLAYER_LEFT_MOVEMENTS
        const sprites = (mode === 'P1') ? {...CHARACTERS[character].sprites, direction: 'right'} : {...CHARACTERS[character].sprites, direction: 'left'}
        return new Player (ctx, x, y, movements, sprites, CHARACTERS[character])
    }
   

    constructor(ctx, x, y, movements, sprites, character) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.movements = movements;

        this.w = character.w * 2.5;
        this.h = character.h * 2.5;
        this.health = character.health;


        this.vx = 0;
        this.vy = 0;

        this.floor = CANVAS_H - this.h - 30;;

        

        this.gravity = 0;
        this.jumpStrength = -10;

        this.spriteRight = new Image();
        this.spriteRight.src = sprites.right;
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
        this.spriteLeft.src = sprites.left;
        this.spriteLeft.vFrames = 3;
        this.spriteLeft.hFrames = 3;
        this.spriteLeft.vFramesIndex = 0;
        this.spriteLeft.hFramesIndex = 0;
        this.spriteLeft.onload = () => {
            this.spriteLeft.isReady = true;
            this.spriteLeft.frameW = Math.floor(this.spriteLeft.width / this.spriteLeft.vFrames)
            this.spriteLeft.frameH = Math.floor(this.spriteLeft.height / this.spriteLeft.hFrames)
        }


        this.sprite = (sprites.direction === 'right') ? this.spriteRight : this.spriteLeft;
        this.drawCount = 0;

        this.isDamaged = false;



    }

    groundTo(groundY) {
        this.y = groundY - this.h
        this.ground = groundY
        this.floor = groundY - this.h;
    }

    onKeyEvent(event) {
        const isPressed = event.type === 'keydown';
        switch (event.keyCode) {
            case this.movements.left:
                if (isPressed) {
                    this.sprite = this.spriteLeft;
                    this.vx = -player1VX;
                } else {
                    this.vx = 0;
                }
                break;

            case this.movements.right:
                if (isPressed) {
                    this.sprite = this.spriteRight;
                    this.vx = player1VX;
                } else {
                    this.vx = 0;
                }
                break;

            case this.movements.up:
                if (!this.isJumping) {
                    this.isJumping = true;
                    this.vy = player1VY;
                    this.gravity = GRAVITY
                }
                break;


            case this.movements.attack:
                this.isAttack = isPressed && !this.isAttack;

                break;
        }
    }

    move() {
        this.prevX = this.x;
        this.prevY = this.y;

        this.x += this.vx;
        this.y += this.vy;

        this.vy += GRAVITY;

        if (this.y + this.h > this.ground) {
            this.groundTo(this.ground);
            this.vy = 0;
            this.gravity = 0;
            this.isJumping = false;

        }

    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
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
        this.drawCount++

    }

    animate() {

        if (this.isJumping) {

            this.sprite.vFramesIndex = 1;
            this.sprite.hFramesIndex = 1;


        } else if (this.isAttack) {

            this.sprite.vFramesIndex = 1;
            this.sprite.hFramesIndex = 2;


        } else if (this.vx !== 0) {

            this.sprite.hFramesIndex = 0;

            if (this.drawCount >= PLAYER1_FREQ) {
                this.sprite.vFramesIndex = (this.sprite.vFramesIndex + 1) % this.sprite.vFrames
                this.drawCount = 0;
            }
        } else {
            this.sprite.vFramesIndex = 0;
            this.sprite.hFramesIndex = 0;
        }
    }

    shootKame() {
        if (this.sprite === this.spriteRight) {
            return new Kame(this.ctx, (this.x + this.w + 20), this.y + this.h / 3.5, KAME_VX)
        } else if (this.sprite === this.spriteLeft) {
            return new Kame(this.ctx, this.x - this.w + 50, this.y + this.h / 3.5, -KAME_VX)
        }
    }


    takeDamage(amount) {
        if (this.isDamaged) {
            return;
        }

        this.health -= amount;
        this.isDamaged = true;

        setTimeout(() => {
            this.isDamaged = false;
        }, 1000)


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
