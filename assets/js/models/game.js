
class Game {

    constructor(canvasId, selectedP1, selectedP2) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.player1 = Player.buildPlayer(this.ctx, 50, 280, selectedP1, 'P1');
        this.player1.groundTo(this.canvas.height - BG_FLOOR)


        this.player2 = Player.buildPlayer(this.ctx, 700, 300, selectedP2, 'P2');
        this.player2.groundTo(this.canvas.height - BG_FLOOR)


        this.background = new Background(this.ctx)

        this.backgroundGameOver = new Image();
        this.backgroundGameOver.src = BACKGROUND_GAMEOVER;
        this.backgroundGameOver.onload = () => {
            this.backgroundGameOver.isReady = true; 
        }

        this.healthIcon = []; 
        this.healthTimeoutId = undefined; 

        this.kames = []; 
        this.superKames = [];

        this.enemies = [];
        this.enemiesTimeoutId = undefined; 
        

        this.drawIntervalID = undefined;
        this.fps = FPS;

        this.coinTimeOutID = undefined;
        this.setupListeners();
    }

    setupListeners() {
    addEventListener('keydown', (event) => {

        this.player1.onKeyEvent(event)
        this.player2.onKeyEvent(event)

        if (event.keyCode === KEY_0) {
            const kame = this.player1.shootKame();
            if (kame) {
                this.kames.push(kame)
            }
        }

         
        if (event.keyCode === KEY_Q) {
            const kame = this.player2.shootKame();
            if (kame) {
                this.kames.push(kame)
            }
        }

        if (event.keyCode === KEY_1) {
            const kame2 = this.player1.shootSuperKame();
            if (kame2) {
                this.superKames.push(kame2)
            }
        }

         
        if (event.keyCode === KEY_E) {
            const kame2 = this.player2.shootSuperKame();
            if (kame2) {
                this.superKames.push(kame2)
            }
        }


    })
        
    addEventListener('keyup', (event) => this.player1.onKeyEvent(event))
    addEventListener('keyup', (event) => this.player2.onKeyEvent(event))
    }


    start() {
        
        if(!this.drawIntervalID) {
            this.drawIntervalID = setInterval(() => {
                this.clear(); 
                this.checkCollisions();
                this.move();
                this.draw();
                this.generateElements(); 
                this.checkGameOver(); 
        }, this.fps);
        }
    }

    stop () {
        clearInterval(this.drawIntervalID);
        this.drawIntervalID = undefined;

    }
    
    move() {
        this.player1.move();
        this.player2.move();

        if (this.player1.collidesWith(this.player2)) {
            if (this.player1.x < this.player2.x) {
                this.player1.x = this.player2.x - this.player1.w;
                } else {
                this.player1.x = this.player2.x + this.player2.w;
                }
                }
        if (this.player2.collidesWith(this.player1)) {
            if (this.player2.x < this.player1.x) {
                this.player2.x = this.player1.x - this.player2.w;
                } else {
                this.player2.x = this.player1.x + this.player1.w;
            }
            }
        this.kames.forEach(kame => kame.move())
        this.superKames.forEach(superkame => superkame.move());
        this.enemies.forEach(enemy => enemy.move())

        this.kames = this.kames.filter(kame => !kame.isOutOfBounds);
        this.superKames = this.superKames.filter(superkame => !superkame.isOutOfBounds);
        this.enemies = this.enemies.filter(enemy => !enemy.isOutOfBounds);


        this.checkBounds();
        }

    checkBounds() { //para que no se me salga de la pantalla
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

    checkCollisions () {
        this.healthIcon = this.healthIcon.filter((health) => {
            if (this.player1.collidesWith(health)){
                this.player1.health += health.health
                return false; 
            } else if (this.player2.collidesWith(health)) {
                this.player2.health += health.health
                return false
            } else {
                return true;
            }
        })

        this.kames = this.kames.filter ((kame) => {
            if (this.player1.collidesWith(kame)) {
                this.player1.takeDamage (kame.damage)
                return false;
            } else if (this.player2.collidesWith(kame)){
                this.player2.takeDamage (kame.damage)
                return false; 
            } else {
                return true; 
            }
        })

         this.superKames = this.superKames.filter(superkame => {
            let hit = false;

            this.enemies = this.enemies.filter(enemy => {
                if (superkame.collidesWith(enemy)) {
                    enemy.health -= superkame.damage;

                    if (enemy.health <= 0) {
                        return false; 
                    }
                    hit = true; 
                    return true;
                }
                return true; 
            });
            return !hit; 
        });

        this.superKames = this.superKames.filter ((superkame) => {
            if (this.player1.collidesWith(superkame)) {
                this.player1.takeDamage (superkame.damage)
                return false;
            } else if (this.player2.collidesWith(superkame)){
                this.player2.takeDamage (superkame.damage)
                return false; 
            } else {
                return true; 
            }
        })

        this.enemies = this.enemies.filter ((enemy) => {
            if (this.player1.collidesWith(enemy)) {
                this.player1.health -= enemy.health
                return false; 
            } else if (this.player2.collidesWith(enemy)) {
                this.player2.health -= enemy.health
                return false; 
            } else {
                return true; 
            }
        })

       

        if (this.player1.isHitting && this.player1.collidesWith(this.player2)) {      
            this.player2.takeDamage(30);
            
        } else if (this.player2.isHitting && this.player2.collidesWith(this.player1)) {
            this.player1.takeDamage(30);
    }
    }

    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw () {
        this.background.draw(); 
        this.player1.draw();
        this.player2.draw();
        this.kames.forEach(kame => kame.draw());
        this.superKames.forEach(superkame => superkame.draw())
        this.healthIcon.forEach(health => health.draw()); 
        this.enemies.forEach(enemy => enemy.draw())
        

        this.drawHealth();
        
    }

    generateElements () {
        if (!this.healthTimeoutId && this.healthIcon.length < MAX_INGAME_HEALTHICON) {
             
            this.healthTimeoutId = setTimeout(() => {
                const HEALTH_MINY = 150;
                const HEALTH_MAXY = CANVAS_H - BG_FLOOR - this.player1.h  - 50;
                this.healthIcon.push(new Health (this.ctx, Math.random()*(this.canvas.width - HEALTH_W), HEALTH_MINY + Math.random() * (HEALTH_MAXY - HEALTH_MINY)))
                this.healthTimeoutId = undefined;
                
            }, Math.floor(Math.random() *10) * 1000);
             
        }

            if (!this.enemiesTimeoutId && this.enemies.length < MAX_INGAME_ENEMIES) {

            this.enemiesTimeoutId = setTimeout (() => {
                const randomSprite = ENEMIES_SPRITES [Math.floor (Math.random() * ENEMIES_SPRITES.length)];
                this.enemies.push(new Enemies (this.ctx, 0, this.canvas.height - BG_FLOOR - (ENEMY_H/2), randomSprite))
                this.enemiesTimeoutId = undefined; 
            }, Math.floor(Math.random()*10)* 1000); 
        }



    }

    checkGameOver () {
        if (this.player1.health <= 0 || this.player2.health <= 0) {
            this.stop();
            
            this.drawGameOver(); 
            document.getElementById("restartBtn").style.display = "block";
        }
    }

    drawHealth () {
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillStyle = "white"

        this.ctx.textAlign = 'left';
        this.ctx.fillText(`PLAYER 1: ${this.player1.health}`, 40, 50);

        this.ctx.textAlign = 'right';
        this.ctx.fillText(`PLAYER 2: ${this.player2.health}`, this.canvas.width - 40, 50);

    }

    drawGameOver () {

         if (this.backgroundGameOver.isReady) {
                this.ctx.drawImage (
                    this.backgroundGameOver,
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                )
            }

        let winner;

        if (this.player2.health <= 0) {
            winner = "PLAYER 1 WINS!"
            this.ctx.fillStyle = '#00aaff';
            
        } else if (this.player1.health <= 0) {
            winner = "PLAYER 2 WINS!"
            this.ctx.fillStyle = '#f14a4a';
            
        }

        this.ctx.shadowColor = this.ctx.fillStyle;
        this.ctx.shadowBlur = 25;
        this.ctx.font = 'bold 40px Arial';
        this.ctx.fillText(winner, this.canvas.width / 2 + 150, this.canvas.height / 2 + 200);

       



    }

    reset () {
        this.player1.health = PLAYER1_HEALTH;
        this.player2.health = PLAYER2_HEALTH;
        this.player1.x = 50;
        this.player1.y = 700;
        this.healthIcon = [];
        this.kames = [];
        document.getElementById ("restartBtn").style.display = "none"
        this.start(); 
    }


    }