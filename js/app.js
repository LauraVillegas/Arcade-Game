// hero class
class Hero {
    // hero properties
    constructor() {
        this.xMove = 101;
        this.yMove = 83;
        this.yEdge = this.yMove * 4;
        this.didWin = false;
        this.xEdge = this.xMove * 4;
        this.xInit = this.xMove * 2;
        this.yInit = (this.yMove * 5) - 40 ;
        this.x = this.xInit;
        this.y = this.yInit;
        this.sprite = 'images/char-boy.png';
    }
    // render hero in screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // cases for the different key values sent by the evt listener for allowed arrow keys
    handleInput (input) {
        switch(input) {
            case 'up':
                if (this.y > 0) {
                this.y -= this.yMove ;
                }
                break; 
            case 'down':
                if (this.y < this.yEdge) {
                this.y += this.yMove;
                }
                break;
            case 'left':
                if (this.x > 0){
                    this.x -= this.xMove;
                }
                break;
            case 'right':
                if (this.x < this.xEdge) {
                    this.x += this.xMove;
                }
                break;     
        };
    }
    // sets the position of the player to the initial position
    reset() {
        this.y = this.yInit;
        this.x = this.xInit;
    }
    // checks for collision and 
    update(){
        for(let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.xMove/2 > this.x && enemy.x < this.x + this.xMove/2)) {
                this.reset();
            } 
        }
        if (this.y === -40) {
            this.didWin = true;
        }
    }
};

const player = new Hero();


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load image.
    this.xMove = 101;
    this.yMove = 83;
    this.x = x;
    this.y = (y + this.yMove) - 40 ;
    this.edge = this.xMove * 5;
    this.speed = speed;
    this.firstPos = -this.xMove;
    this.sprite = 'images/enemy-bug.png'; 
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // multiplies any movement by the dt parameter
    // this ensures the game runs at the same speed for
    // all computers.
    if (this.x < this.edge) {
        this.x += this.speed * dt;
    }
    else {
        this.x = this.firstPos;
    }
};
// This renders enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// creating new enemies with different parameters x position, y position and speed
const bug1 = new Enemy(-101, 0, 300);
const bug2 = new Enemy((-101 * 1.5), 83, 100);
const bug3 = new Enemy((-101 * 4), 83, 100);
const bug4 = new Enemy((101 * 3),  (83 * 2), 250);

// array for enemies
const allEnemies = [];
//appending enemies to the array
allEnemies.push(bug1, bug2, bug3, bug4);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});




