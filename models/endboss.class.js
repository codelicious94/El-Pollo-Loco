class Endboss extends MovableObject {
    IMAGES_WALKING = [
        "assets/img_pollo_locco/4_enemie_boss_chicken/1_walk/G1.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/1_walk/G2.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/1_walk/G3.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/1_walk/G4.png",
    ];

    IMAGES_ALERT = [
        "assets/img_pollo_locco/4_enemie_boss_chicken/2_alert/G5.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/2_alert/G6.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/2_alert/G7.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/2_alert/G8.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/2_alert/G9.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/2_alert/G10.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/2_alert/G11.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_ATTACK = [
        "assets/img_pollo_locco/4_enemie_boss_chicken/3_attack/G13.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/3_attack/G14.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/3_attack/G15.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/3_attack/G16.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/3_attack/G17.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/3_attack/G18.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/3_attack/G19.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/3_attack/G20.png",
    ];

    IMAGES_HURT = [
        "assets/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G21.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G22.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "assets/img_pollo_locco/4_enemie_boss_chicken/5_dead/G24.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/5_dead/G25.png",
        "assets/img_pollo_locco/4_enemie_boss_chicken/5_dead/G26.png",
    ];

    height = 400;
    width = 250;
    y = 55;

    endbossFirstSee = false;
    endbossWalk = false;
    endbossHit = false;
    endbossDead = false;

    offset = {
        top: 50,
        left: 30,
        right: 30,
        bottom: 50,
    };

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.speed = 10;
        this.animateEndboss();
    }

    /**
     * Starts the endboss animation loop. Depending on the state of the endboss
     * (dead, first encounter, walking, etc.), it triggers the appropriate behavior.
     * This function checks the boss state every 150 milliseconds.
     */
    animateEndboss() {
        this.endbossInterval = setInterval(() => {
            if (this.isDead()) {
                this.handleDeath();
            } else if (!this.endbossFirstSee) {
                this.handleFirstEncounter();
            } else if (this.endbossWalk) {
                this.handleWalking();
            }
        }, 150);
    }

    /**
     * Handles the logic when the endboss is dead.
     * Stops the endboss from walking, sets the dead state, stops its movement,
     * and plays the death animation.
     */
    handleDeath() {
        this.endbossWalk = false;
        this.endbossDead = true;
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Handles the first encounter logic of the endboss with the player.
     * If the player is far enough (x < 2000), the boss plays the alert animation.
     * If the player is within range (x >= 2000), the boss starts moving left and
     * plays the walking animation.
     */
    handleFirstEncounter() {
        if (world.character.x < 2000) {
            this.playAnimation(this.IMAGES_ALERT);
        } else {
            this.endbossFirstSee = true;
            this.moveLeft();
            this.endbossWalk = true;
            this.playAnimation(this.IMAGES_WALKING);
            this.speed = 2;
        }
    }

    /**
     * Handles the endboss walking behavior. If the boss is hurt, it plays the hurt animation.
     * If the boss is not hurt, it plays the attack animation and increases its movement speed.
     */
    handleWalking() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.endbossHit = true;
        } else {
            this.playAnimation(this.IMAGES_ATTACK);
            this.moveLeft();
            this.speed = 20;
        }
    }
}
