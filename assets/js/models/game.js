class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.player1 = new Player1(this.ctx, 50, 300);
        this.player2 = new Player2(this.ctx, 700, 300);

        this.background = new Background(this.ctx);
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
                this.player1.move();
                this.player2.move();
                this.player1.draw();
                this.player2.draw();
                this.checkCollision();
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

        this.checkBounds();

    }

    checkBounds() {
        if (this.player1.x < 0) {
            this.player1.x = 0;
        }
        if (this.player1.x + this.player1.w > this.canvas.width) {
            this.player1.x = this.canvas.width - this.player1.w;
        }

    }




    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw () {
        this.background.draw();
        this.player1.draw();
        this.player2.draw();
    }

// para ver si colisionan los personajes, se puede usar el siguiente método:

    checkCollision () {
        this.coins = this.coins.filter(coin => {
            const areColliding = this.mario.collidesWith(coin);
            if (this.mario.collidesWith(coin)) {

        }


    generateElements () {
        if (!this.coinTimeOutID) {
            this.coinTimeOutID = setTimeout();
            this.coins.push(new Coin(this.ctx));
            this.coinTimeOutID = undefined

            ,{ Math.floor(Math.random() * 500) * 1000 }, 2000);



    
    }
    }












}