class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');


        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.player1 = new Player1(this.ctx, 50, 280);
        this.player1.groundTo(this.canvas.height - BG_FLOOR)


        this.player2 = new Player2(this.ctx, 700, 300);
        this.player2.groundTo(this.canvas.height - BG_FLOOR)


        this.background = new Background(this.ctx)

        this.drawIntervalID = undefined;
        this.fps = FPS;

        this.coinTimeOutID = undefined;
    }

    setupListeners() {
    addEventListener('keydown', (event) => this.player1.onKeyEvent(event))
    addEventListener('keyup', (event) => this.player1.onKeyEvent(event))

    addEventListener('keydown', (event) => this.player2.onKeyEvent(event))
    addEventListener('keyup', (event) => this.player2.onKeyEvent(event))
    }


    start() {
        this.setupListeners();
        if(!this.drawIntervalID) {
            this.drawIntervalID = setInterval(() => {
                this.clear(); 
                this.move();
                this.draw();
        }, this.fps);
        }
    }

    stop () {
        clearInterval(this.drawIntervalID);
        this.drawIntervalID = undefined;
    }
    
    move() {

        //this.background.move();
        this.player1.move();
        this.player2.move();

        if (this.player1.collidesWith(this.player2)) {
            this.player1.x = this.player1.prevX;
            this.player1.y = this.player1.prevY;
            this.player2.x = this.player2.prevX;
            this.player2.y = this.player2.prevY; 
        }

        this.checkBounds();

    }

    checkBounds() { //esto es para que no se me salga de la pantalla
        if (this.player1.x < 0) {
            this.player1.x = 0;
        }
        if (this.player1.x + this.player1.w > this.canvas.width) {
            this.player1.x = this.canvas.width - this.player1.w;
        }

        if (this.player2.x < 0) {
            this.player2.x = 0;
        }
        if (this.player2.x + this.player2.w > this.canvas.width)
            this.player2.x = this.canvas.width - this.player2.w;

    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw () {
        this.background.draw(); 
        this.player1.draw();
        this.player2.draw();

        this.drawHealth();
    }


    drawHealth () {
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = "white"

        this.ctx.textAlign = 'left';
        this.ctx.fillText(`PLAYER 1 ❤️: ${this.player1.health}`, 40, 50);

        this.ctx.textAlign = 'right';
        this.ctx.fillText(`PLAYER 2 ❤️: ${this.player2.health}`, this.canvas.width - 40, 50);

    }


    }