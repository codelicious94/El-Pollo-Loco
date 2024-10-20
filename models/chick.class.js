class Chick extends MovableObject {
    IMAGES_WALKING = [
        "assets/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "assets/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "assets/img_pollo_locco/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    DEAD_CHICK = ["assets/img_pollo_locco/3_enemies_chicken/chicken_small/2_dead/dead.png"];

    height = 50;
    width = 40;
    y = 380;
    chickDead = false;
    removalDelay = 1000;

    deadChickSound;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.DEAD_CHICK);

        this.deadChickSound = new Audio("audio/deadChick.mp3");
        sounds.push(this.deadChickSound);

        this.x = 300 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /**
     * Handles the hit action when the chick is hit by an object or attack.
     * Marks the chick as dead, stops its movement, triggers the dead animation, plays the dead sound,
     * and removes the chick from the world after a specified delay.
     */
    hit() {
        this.chickDead = true;
        this.speed = 0;
        this.deadChick();

        this.deadChickSound.play();

        setTimeout(() => {
            this.chickDead = true;
            this.removeFromWorld = true;
        }, this.removalDelay);
    }

    /**
     * Plays the dead animation for the chick.
     * This is triggered when the chick dies.
     */
    deadChick() {
        this.playAnimation(this.DEAD_CHICK);
    }

    /**
     * Animates the chick by handling movement and animation frame updates.
     * The chick moves to the left if it's not dead and plays the walking animation periodically.
     */
    animate() {
        setInterval(() => {
            if (!this.chickDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.chickDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 130);
    }
}
