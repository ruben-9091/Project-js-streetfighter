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

        this.floor = this.y;

        this.gravity = 0.5;
        this.jumpStrength = -10;
        
        this.sprite = new Image();
        this.sprite.src = "directorio de la iamgen"; 
        
        this.sprite.vFrames = 2;
        this.sprite.hFrames = 2;
        this.sprite.vFrameIndex = 0;    
        this.sprite.hFrameIndex = 1;
        
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameW = Math.floor(this.sprite.width / this.sprite.vFrames);
            this.sprite.frameH = Math.floor(this.sprite.height / this.sprite.hFrames);

        }
    }



    groundTo (groundY) {
        
        this.y = groundY - this.h;
        this.ground = groundY; 

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

        this.vy += this.gravity;
        if (this.y > this.floor) {
            this.y = this.floor;
            this.vy = 0;
            this.isJumping = false;
        }

    }

    draw () {

        //aqui ahora con la imagen hacemos lo siguiente:

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
            );
            this.animate();
}}

            animate () {

                if (this.isJumping) {
                    this.sprite.hFrameIndex = 0;
                    this.sprite.vFrameIndex = 0;
                } else if (this.vx !== 0){
                    this.sprite.hFrameIndex = 0;
                    this.sprite.vFrameIndex = 1;

                } else {
                    this.sprite.hFrameIndex = 1;
                    this.sprite.vFrameIndex = 0;
                }

            }







        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.player1.w, this.player1.h);
    }





    collidesWith(element) {
        return (this.x < element.x + element.w) &&
               (this.x + this.w > element.x) &&
               (this.y < element.y + element.h) &&
               (this.y + this.h > element.y);     
    }