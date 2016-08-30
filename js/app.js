/* GLOBAL VARIABLES */
var playerX = 200;
var playerY = 375;
var deathMarker = 0;
var playerLeft;
var playerRight;
var score = 0;

// Enemies our player must avoid
var Enemy = function(row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -100;
    this.y = row;
    this.speed = Math.floor((Math.random() * 200) + 100);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (Math.round(this.speed * dt));
    if (this.x > 1000) {
        this.x = -200;
    }

    /* COLLISION */
    if (this.x > playerLeft && this.x < playerRight && this.y == playerY) {
        playerX = 200;
        playerY = 375;
        deathMarker = 1;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 375;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    /* UPDATE AFTER COLLISION */
    if (deathMarker == 1) {
        this.x = playerX;
        this.y = playerY;
        deathMarker = 0;
        score = score - 100;
        console.log("Score: " + score);
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(allowedKeys) {
    var originalPosition;
    var changedPosition;
    var topBoundary = -25;
    var bottomBoundary = 375;
    var leftBoundary = 0;
    var rightBoundary = 400;

    if (allowedKeys == 'up') {
        originalPosition = this.y;
        changedPosition = this.y - 80;
        if (changedPosition < topBoundary) {
            this.y = originalPosition;
        } else {
            this.y = changedPosition;
        }
    }
    if (allowedKeys == 'down') {
        originalPosition = this.y;
        changedPosition = this.y + 80;
        if (changedPosition > bottomBoundary) {
            this.y = originalPosition;
        } else {
            this.y = changedPosition;
        }
    }

    if (allowedKeys == 'left') {
        originalPosition = this.x;
        changedPosition = this.x - 100;
        if (changedPosition < leftBoundary) {
            this.x = originalPosition;
        } else {
            this.x = changedPosition;
        }
    }
    if (allowedKeys == 'right') {
        originalPosition = this.x;
        changedPosition = this.x + 100;
        if (changedPosition > rightBoundary) {
            this.x = originalPosition;
        } else {
            this.x = changedPosition;
        }
    }

    /* PLAYER BOUNDARIES POSITION */
    playerLeft = this.x - 50;
    playerRight = this.x + 50;
    playerY = this.y;

    /* GAME END (WIN) */
    if (this.y == -25) {
        this.x = 200;
        this.y = 375;
        score = score + 100;
        console.log("Score: " + score);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(55), new Enemy(135), new Enemy(215),
    new Enemy(55), new Enemy(135), new Enemy(215),
    new Enemy(55), new Enemy(135), new Enemy(215),
    new Enemy(55), new Enemy(135), new Enemy(215)
];
var player = new Player();


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