class Chicken extends MovableObject {
    height = 70;
    width = 80;
    y = 355;
    chickenDead = false;
    removalDelay = 1000;

    IMAGES_WALKING = [
        "assets/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
        "assets/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
        "assets/img_pollo_locco/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];

    DEAD_CHICKEN = ["assets/img_pollo_locco/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

    deadChickenSound;

    offset = {
        top: 5,
        left: 10,
        right: 10,
        bottom: 5,
    };

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.DEAD_CHICKEN);

        this.deadChickenSound = new Audio("audio/deadChicken.mp3");
        sounds.push(this.deadChickenSound);

        this.x = 400 + Math.random() * 1800;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /**
     * Handles the hit action when the chicken is hit by an object or attack.
     * Marks the chicken as dead, stops its movement, triggers the dead animation, plays the dead sound,
     * and removes the chicken from the world after a specified delay.
     */
    hit() {
        this.chickenDead = true;
        this.speed = 0;
        this.deadChicken();

        this.deadChickenSound.play();

        setTimeout(() => {
            this.chickenDead = true;
            this.removeFromWorld = true;
        }, this.removalDelay);
    }

    /**
     * Plays the dead animation for the chicken.
     * This is triggered when the chicken dies.
     */
    deadChicken() {
        this.playAnimation(this.DEAD_CHICKEN);
    }

    /**
     * Animates the chicken by handling movement and animation frame updates.
     * The chicken moves to the left if it's not dead and plays the walking animation periodically.
     */
    animate() {
        setInterval(() => {
            if (!this.chickenDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.chickenDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 130);
    }
}
