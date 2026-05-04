
// constantes de archivos
const BACKGR_MAIN = "/assets/images/backgrounds/congreso de los diputados.png"
const BACKGROUND_GAMEOVER = "/assets/images/backgrounds/game-over/game-over-2.png"

const ENEMIES_SPRITES = [
    "/assets/images/Sprites/enemies/Teletubbies/batman.png",
    "/assets/images/Sprites/enemies/Teletubbies/thanos.png",
    "/assets/images/Sprites/enemies/Teletubbies/po.png",
    "/assets/images/Sprites/enemies/Teletubbies/vader.png",
    "/assets/images/Sprites/enemies/Teletubbies/mewtwo.png"
];

const PLAYER_RIGHT_MOVEMENTS = {
    left: 37, 
    up: 38,
    right: 39,
    down: 40, 
    attack: 96,
    attack2: 97
}
const PLAYER_LEFT_MOVEMENTS = {
    left: 65,
    up: 87,
    right: 68,
    down: 83,
    attack: 81, 
    attack2: 69
}




const ENEMY_W = 246;
const ENEMY_H = 330; 
const ENEMY_VX = 2; 
const ENEMY_ANIMATE_FREQ = 5; 
const ENEMY_HEALTH = 50; 


const FPS = 1000/60;

//constantes de width y height de canvas, background y jugadores 
const CANVAS_W = 1200;
const CANVAS_H = 800;

// alto y ancho de las imagenes
const RYU_H = 94;
const RYU_W = 82;

const KEN_H = 94;
const KEN_W = 82;

const SAGAT_H = 94;
const SAGAT_W = 82;

const BIANKA_H = 94;
const BIANKA_W = 82;


// constantes de velocidad de jugadores
const player1VX = 5;
const player2VX = 5;

const player1VY = -20;
const player2VY = -20;

//frecuencia de animacion
const PLAYER1_FREQ = 5;
const PLAYER2_FREQ = 5; 

//vida jugadores
const PLAYER1_HEALTH = 300;
const PLAYER2_HEALTH = 300; 

//constantes de teclas
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40; 
const KEY_0 = 96; 
const KEY_1 = 97;


const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;
const KEY_W = 87;
const KEY_Q = 81;
const KEY_E = 69; 

//constantes para clase health
const HEALTH = 30; 
const HEALTH_W = 289;
const HEALTH_H = 287; 
const HEALTH_SRC = "/assets/images/Sprites/health/hearth-icon.png"
const HEALTH_ANIMATION_FREQ = 5; 

//constantes para clase kame
const KAME = 50; 
const KAME_W = 66;
const KAME_H = 38; 
const KAME_RIGHT_SRC = "/assets/images/Sprites/kame-icon/kame-icon-right.png"
const KAME_LEFT_SRC = "/assets/images/Sprites/kame-icon/kame-icon-left.png"
const KAME_ANIMATION_FREQ = 5;
const KAME_VX = 5;  

//constantes para clase Kame2
const KAME2 = 90; 
const KAME2_W = 66;
const KAME2_H = 38; 
const KAME2_RIGHT_SRC = "/assets/images/Sprites/kame-icon/kame-sagat-right.png"
const KAME2_LEFT_SRC = "/assets/images/Sprites/kame-icon/kame-sagat-left.png"
const KAME2_ANIMATION_FREQ = 5;
const KAME2_VX = 5; 


const MAX_INGAME_HEALTHICON = 1; 
const MAX_INGAME_ENEMIES = 1; 


const BG_FLOOR = 70;

// constantes de velocidades 
const GRAVITY = 0.5
const JUMP_STRENGTH = -10

//para limitar la aparicion de el icono de health



const CHARACTERS =  {
    ryu: {
        health: 300,
        w: RYU_W,
        h: RYU_H,
        sprites: {
            right: "/assets/images/Sprites/Main-character/ryu-right-character3.png",
            left:  "/assets/images/Sprites/Main-character/ryu-left-character3.png"
        }
    },
    ken: {
        health: 300, 
        w: KEN_W,
        h: KEN_H, 
        sprites: {
            right: "/assets/images/Sprites/Main-character/ken-right-character2.png",
            left: "/assets/images/Sprites/Main-character/ken-left-character2.png"
        }
    },
    sagat: {
        health: 300, 
        w: SAGAT_W,
        h: SAGAT_H, 
        sprites: {
            right: "/assets/images/Sprites/Main-character/sagat-right-character-2.png",
            left: "/assets/images/Sprites/Main-character/sagat-left-character-2.png"
        }
    },bianka: {
        health: 300, 
        w: BIANKA_W,
        h: BIANKA_H, 
        sprites: {
            right: "/assets/images/Sprites/Main-character/bianka-right-character-2.png",
            left: "/assets/images/Sprites/Main-character/bianka-left-character-2.png"
        }
    }
}
