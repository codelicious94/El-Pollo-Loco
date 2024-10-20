class World {
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coinsCollected = 0;
    salsaBottlesCollected = 0;
    salsaBottles = [];
    maxSalsaBottles = 7;
    throwableObjects = [];

    character = new Character();
    endboss = this.level.endBoss[0];
    statusBarEndboss = new StatusBarEndboss();
    statusBar = new StatusBar();
    statusBarBottle = new StatusBarBottle();
    statusCoins = new StatusBarCoins();
    coins = new Coins();
    salsaBottles = new SalsaBottles();

    collectedCoinsSound;
    collectedSalsaBottlesSound;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.initSounds();
        this.playBackgroundAudio();
    }

    /**
     * Draws all the game objects on the canvas.
     * This includes translating the camera position, adding objects like the character,
     * enemies, background objects, and status bars to the canvas, and requesting the next animation frame.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects -----
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusCoins);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endBoss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.ctx.restore();

        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Links the game world to the character object.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop, which runs various checks (e.g., collisions, collecting items)
     * and manages game logic at a rate of 50 frames per second.
     */
    run() {
        setInterval(() => {
            this.collectedCoins();
            this.collectedSalsaBottles();
            this.checkCollisions();
            this.checkCollisionEndboss();
            this.checkCollisionEndbossBottle();
            this.checkCollisionEnemiesBottle();
            this.createStatusBarEndboss();
            this.checkWinGame();
            this.checkGameOver();
        }, 1000 / 50);
        this.controlThrowBottle();
    }

    /**
     * Checks if the character collects any coins. If collected, the coin is removed from the level,
     * a sound is played, and the status bar for coins is updated.
     */
    collectedCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.coinsCollected++;

                this.collectedCoinsSound.play();

                let percentage = (this.coinsCollected / 5) * 100;
                this.statusCoins.setPercentage(percentage);
            }
        });
    }

    /**
     * Checks if the character collects any salsa bottles. If collected, the bottle is removed from the level,
     * a sound is played, and the status bar for salsa bottles is updated.
     */
    collectedSalsaBottles() {
        this.level.salsaBottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.level.salsaBottles.splice(i, 1);
                this.salsaBottlesCollected++;

                this.collectedSalsaBottlesSound.play();

                let percentage = (this.salsaBottlesCollected / this.maxSalsaBottles) * 100;
                this.statusBarBottle.setPercentage(percentage);
            }
        });
    }

    /**
     * Adds multiple objects to the map by calling `addToMap` for each object.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an individual object to the map and handles flipping the image if the object is facing the other direction.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally if the object is facing the other direction.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped image back to its original state.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Handles the logic for throwing salsa bottles if the 'D' key is pressed and the player has collected bottles.
     * Throws the bottle based on the character's current direction.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.salsaBottlesCollected > 0) {
            let salsaBottle;
            if (this.character.otherDirection) {
                salsaBottle = new ThrowableObject(this.character.x, this.character.y + 100);
                salsaBottle.otherDirection = true;
                salsaBottle.throwOtherDirection();
            } else {
                salsaBottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                salsaBottle.throw();
            }
            this.throwableObjects.push(salsaBottle);
            salsaBottle.bottleThrow = true;
            this.salsaBottlesCollected--;
            this.statusBarBottle.setPercentage((this.salsaBottlesCollected / this.maxSalsaBottles) * 100);
        }
    }

    /**
     * Continuously checks if the player is trying to throw a salsa bottle.
     */
    controlThrowBottle() {
        setInterval(() => {
            this.checkThrowObjects();
        }, 100);
    }

    /**
     * Creates and updates the status bar for the endboss when the player first encounters the endboss.
     */
    createStatusBarEndboss() {
        if (this.endboss.endbossFirstSee) {
            this.statusBarEndboss.height = 50;
            this.statusBarEndboss.width = 170;
        } else {
            this.statusBarEndboss.height = 0;
            this.statusBarEndboss.width = 0;
        }
    }

    /**
     * Checks if a thrown salsa bottle has collided with the endboss. If so, it plays a hit sound,
     * updates the endboss's energy, triggers the splash animation, and removes the bottle.
     */
    checkCollisionEndbossBottle() {
        this.throwableObjects.forEach((salsaBottle, bottleIndex) => {
            if (salsaBottle.isColliding(this.endboss)) {
                if (!salsaBottle.hasHitEndboss) {
                    this.endboss.hit();
                    this.hitEndbossSound.play();
                    this.statusBarEndboss.setPercentage(this.endboss.energy);

                    salsaBottle.triggerSplashAnimation();
                    salsaBottle.hasHitEndboss = true;

                    setTimeout(() => {
                        this.throwableObjects.splice(bottleIndex, 1);
                    }, 1000);
                }
            }
        });
    }

    /**
     * Checks if the character is colliding with the endboss. If so, the character's energy is set to 0.
     */
    checkCollisionEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.character.energy = 0;
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }

    /**
     * Checks for collisions between the character and enemies. If the character is above an enemy,
     * the enemy is hit. Otherwise, the character takes damage.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (enemy.removeFromWorld) {
                this.level.enemies.splice(index, 1);
                return;
            }
            if (!enemy.isDead() && this.character.isColliding(enemy)) {
                if (this.character.isAboveGround(enemy) && !this.character.isHurt() && !enemy.isDead()) {
                    enemy.hit();
                } else if (
                    !this.character.isHurt() &&
                    this.character.isColliding(enemy) &&
                    !enemy.chickenDead &&
                    !enemy.chickDead
                ) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks if a thrown salsa bottle has collided with any enemies (Chick or Chicken). If so,
     * the enemy is hit, the bottle splash animation is triggered, and the enemy is removed after a delay.
     */
    checkCollisionEnemiesBottle() {
        this.throwableObjects.forEach((salsaBottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (salsaBottle.isColliding(enemy) && (enemy instanceof Chick || enemy instanceof Chicken)) {
                    enemy.hit();
                    if (enemy instanceof Chick) {
                        enemy.deadChickSound.play();
                    } else if (enemy instanceof Chicken) {
                        enemy.deadChickenSound.play();
                    }
                    this.throwableObjects.splice(bottleIndex, 1);
                    salsaBottle.triggerSplashAnimation();
                    setTimeout(() => {
                        enemy.removeFromWorld = true;
                        this.level.enemies.splice(enemyIndex, 1);
                    }, enemy.removalDelay);
                }
            });
        });
    }

    /**
     * Checks if the player has won the game by defeating the endboss.
     */
    checkWinGame() {
        if (this.endboss.isDead()) {
            this.character.walkingSound.pause();
            setTimeout(() => {
                winGame();
            }, 1500);
        }
    }

    /**
     * Checks if the game is over by determining if the character's energy has reached 0.
     */
    checkGameOver() {
        if (this.character.isDead()) {
            this.character.walkingSound.pause();
            this.character.dead();
            this.endboss.endbossWalk = false;
            setTimeout(() => {
                gameOver();
            }, 1000);
        }
    }

    /**
     * Initializes all the audio sounds used in the game (e.g., collecting salsa bottles, coins, hitting the endboss).
     */
    initSounds() {
        this.collectedSalsaBottlesSound = new Audio("./audio/bottle.mp3");
        this.collectedCoinsSound = new Audio("./audio/coin.mp3");
        this.hitEndbossSound = new Audio("./audio/hitEndboss.mp3");
        this.backgroundAudio = new Audio("./audio/backgroundMusic.mp3");
        sounds.push(
            this.collectedSalsaBottlesSound,
            this.collectedCoinsSound,
            this.hitEndbossSound,
            this.backgroundAudio
        );
    }

    /**
     * Plays the background audio on loop during the game.
     */
    playBackgroundAudio() {
        this.backgroundAudio.loop = true;
        this.backgroundAudio.play();
        this.backgroundAudio.volume = 0.8;
    }
}
