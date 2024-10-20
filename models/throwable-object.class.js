class ThrowableObject extends MovableObject {
    IMAGES_ROTATION = [
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_SPLASH = [
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "assets/img_pollo_locco/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];

    bottleThrow = false;
    otherDirection = false;
    bottleSplash = false;
    salsaBottleSplashSound;

    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10,
    };

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_ROTATION[0]);
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.salsaBottleSplashSound = new Audio("./audio/breakSalsaBottle.mp3");
        sounds.push(this.salsaBottleSplashSound);
        this.x = x;
        this.y = y;
        this.speedY = 0;
        this.height = 60;
        this.width = 50;
        this.lastThrow = 0;
        this.animate();
    }

    /**
     * Initiates the throwing action of the bottle.
     * The direction of the throw is determined by the character's current direction (`otherDirection`).
     * The bottle moves horizontally, and its position is updated at a rate of 50 frames per second.
     * It checks if the bottle hits the ground or lands, triggering appropriate actions.
     */
    throw() {
        this.handleThrow();
        const initialDirection = world.character.otherDirection;
        this.flyingInterval = setInterval(() => {
            this.bottleGroundHit();
            if (this.splash) {
                this.bottleLandet();
            } else {
                this.x += initialDirection ? -7 : 7;
            }
        }, 1000 / 50);
    }

    /**
     * Handles the initial throw action by setting the vertical speed and applying gravity to the bottle.
     */
    handleThrow() {
        this.speedY = 20;
        this.applyGravity();
    }

    /**
     * Checks if the bottle has hit the ground.
     * If the bottle's y-position is greater than or equal to 360, it triggers the splash animation.
     */
    bottleGroundHit() {
        if (this.y >= 360) {
            this.bottleSplash = true;
        }
    }

    /**
     * Handles the landing of the bottle after it has hit the ground.
     * Plays the bottle splash sound and stops the flying and gravity intervals.
     */
    bottleLandet() {
        this.salsaBottleSplashSound.volume = isMuted ? 0 : 0.2;
        this.salsaBottleSplashSound.muted = isMuted;
        this.salsaBottleSplashSound.play();
        clearInterval(this.flyingInterval);
        clearInterval(this.gravityInterval);
    }

    /**
     * Triggers the splash animation for the bottle when it hits the ground and starts removing the bottle after 1 second.
     */
    triggerSplashAnimation() {
        this.bottleSplash = true;
        this.playAnimation(this.IMAGES_SPLASH);
        setTimeout(() => this.remove(), 1000);
    }

    /**
     * Removes the bottle object by clearing its flying and gravity intervals.
     */
    remove() {
        clearInterval(this.flyingInterval);
        clearInterval(this.gravityInterval);
    }

    /**
     * Animates the bottle. If the bottle has splashed and is above the ground, the splash animation is played.
     * Otherwise, the rotation animation is played.
     * The animation runs at 60 frames per second.
     */
    animate() {
        setInterval(() => {
            if (this.bottleSplash && this.isAboveGround()) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 1000 / 60);
    }
}
