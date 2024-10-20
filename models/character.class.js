class Character extends MovableObject {
    IMAGES_WALKING = [
        "assets/img_pollo_locco/2_character_pepe/2_walk/W-21.png",
        "assets/img_pollo_locco/2_character_pepe/2_walk/W-22.png",
        "assets/img_pollo_locco/2_character_pepe/2_walk/W-23.png",
        "assets/img_pollo_locco/2_character_pepe/2_walk/W-24.png",
        "assets/img_pollo_locco/2_character_pepe/2_walk/W-25.png",
        "assets/img_pollo_locco/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING = [
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-31.png",
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-32.png",
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-33.png",
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-34.png",
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-35.png",
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-36.png",
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-37.png",
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-38.png",
        "assets/img_pollo_locco/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_HURT = [
        "assets/img_pollo_locco/2_character_pepe/4_hurt/H-41.png",
        "assets/img_pollo_locco/2_character_pepe/4_hurt/H-42.png",
        "assets/img_pollo_locco/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_WAIT = [
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-1.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-2.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-3.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-4.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-5.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-6.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-7.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-8.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-9.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/idle/I-10.png",
    ];

    IMAGES_SLEEP = [
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-11.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-12.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-13.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-14.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-15.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-16.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-17.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-18.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-19.png",
        "assets/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-20.png",
    ];

    IMAGES_DEAD = [
        "assets/img_pollo_locco/2_character_pepe/5_dead/D-51.png",
        "assets/img_pollo_locco/2_character_pepe/5_dead/D-52.png",
        "assets/img_pollo_locco/2_character_pepe/5_dead/D-53.png",
        "assets/img_pollo_locco/2_character_pepe/5_dead/D-54.png",
        "assets/img_pollo_locco/2_character_pepe/5_dead/D-55.png",
        "assets/img_pollo_locco/2_character_pepe/5_dead/D-56.png",
        "assets/img_pollo_locco/2_character_pepe/5_dead/D-57.png",
    ];

    y = 80;
    height = 280;
    speed = 10;
    sleepTimer = 0;
    world;
    gameOver = false;
    tired = false;
    timeoutTired = false;
    tiredTimeoutValue = 0;
    isJumping = false;
    jumpAnimationCompleted = false;

    walkingSound;
    jumpingSound;
    snoringSound;
    hurtingSound;
    deadSound;

    offset = {
        top: 100,
        left: 10,
        right: 20,
        bottom: 0,
    };

    constructor() {
        super();
        this.loadAllSounds();
        this.loadAllImages();
        this.applyGravity();
        this.animate();
    }

    loadAllSounds() {
        this.walkingSound = new Audio("audio/running.mp3");
        this.jumpingSound = new Audio("audio/jump.mp3");
        this.snoringSound = new Audio("audio/snoring.mp3");
        this.hurtingSound = new Audio("audio/hurt.mp3");
        this.deadSound = new Audio("audio/deadCharacter.mp3");
        sounds.push(this.walkingSound, this.jumpingSound, this.snoringSound, this.hurtingSound, this.deadSound);
        this.jumpingSound.volume = 0.8;
        this.hurtingSound.volume = 0.3;
    }

    /**
     * Loads all images required for character animations.
     * This includes images for walking, jumping, being hurt, sleeping, and other states.
     */
    loadAllImages() {
        this.loadImage(this.IMAGES_WAIT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WAIT);
        this.loadImages(this.IMAGES_SLEEP);
    }

    /**
     * Animates the character by handling movement, sound effects, and camera positioning.
     * This function sets up two intervals: one for checking movement and managing the sleep timer,
     * and another for updating the character's state based on its current condition.
     */
    animate() {
        setInterval(() => {
            this.walkingSound.pause();
            let isMoving = false;

            this.LeftRightSpace(() => {
                isMoving = true;
            });

            if (isMoving) {
                this.sleepTimer = 0;
                this.resetTiredState();
            } else {
                this.sleepTimer += 1000 / 60;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => this.handleCharacterState(), 50);
    }

    /**
     * Handles character movement when left, right, or space (jump) keys are pressed.
     * Depending on the direction, it moves the character, plays the walking or jumping sound,
     * and sets the movement flag.
     */
    LeftRightSpace(setMoving) {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.walkingSound.play();
            setMoving();
        }

        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.walkingSound.play();
            setMoving();
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jumping();
            this.jumpingSound.currentTime = 0;
            this.jumpingSound.play();
            setMoving();
        }
    }

    /**
     * Updates the character's state, managing death, hurt, jumping, and idle animations.
     * It checks whether the character is dead, hurt, above ground (jumping), or idle.
     * Additionally, it triggers sleep animation if the character has been idle for long enough.
     */
    handleCharacterState() {
        if (this.isDead()) {
            this.dead();
        } else if (this.isHurt("character")) {
            this.hurtCharacter();
        } else if (this.isAboveGround()) {
            if (!this.jumpAnimationCompleted) {
                this.jumping();
            }
        } else {
            this.isJumping = false;
            this.jumpAnimationCompleted = false;

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.walk();
            } else if (this.sleepTimer >= 4000) {
                this.sleep();
            } else {
                this.playAnimation(this.IMAGES_WAIT);
            }
        }
    }

    /**
     * Handles the character's death state, playing the death animation and setting game over.
     *
     * @method dead
     */
    dead() {
        this.resetTiredState();
        this.gameOver = true;
        this.playAnimation(this.IMAGES_DEAD);
        this.deadSound.play();
        isDead = true;
    }

    /**
     * Handles the character being hurt, playing the hurt animation and sound.
     * Resets the tired state and ensures the hurt sound is played only once per instance of hurt.
     *
     * @method hurtCharacter
     */
    hurtCharacter() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurtSound();
        this.sleepTimer = 0;
        setTimeout(() => (this.hurtSoundPlayed = false), 1000);
    }

    /**
     * Plays the hurt sound if it hasn't been played recently.
     *
     * @method hurtSound
     */
    hurtSound() {
        if (!this.hurtSoundPlayed) {
            this.hurtingSound.play();
            this.hurtSoundPlayed = true;
        }
    }

    /**
     * Handles the jumping animation and resets the character's tired state.
     * This is called when the character is in the air or jumping.
     *
     * @method jumping
     */
    jumping() {
        if (!this.isJumping) {
            this.isJumping = true; // Setze isJumping, um die Animation zu sperren
            this.jumpAnimationCompleted = false; // Animation ist noch nicht abgeschlossen
            this.playJumpingAnimation(); // Starte die Animation
        }
    }

    /**
     * Plays the jumping animation by looping through all IMAGES_JUMPING once.
     */
    playJumpingAnimation() {
        let imageIndex = 0; // Start bei der ersten Bild der Sprung-Animation

        let jumpAnimationInterval = setInterval(() => {
            // Zeige nacheinander alle Bilder der Sprunganimation an
            this.img = this.imageCache[this.IMAGES_JUMPING[imageIndex]];
            imageIndex++;

            // Wenn die Animation alle Bilder durchlaufen hat, stoppen
            if (imageIndex >= this.IMAGES_JUMPING.length) {
                clearInterval(jumpAnimationInterval);
                this.jumpAnimationCompleted = true; // Markiere die Animation als abgeschlossen
            }
        }, 100); // Ändere das Bild alle 100ms (oder passe den Wert an)
    }

    /**
     * Handles the walking animation and resets the character's tired state.
     * This is called when the character is moving left or right.
     *
     * @method walk
     */
    walk() {
        // Reset tired state and play walking animation
        this.resetTiredState();
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Handles the sleep/wait animation and sets the character's tired state.
     * If the character is inactive for 4 seconds, it will switch to a tired state.
     */
    sleep() {
        // Set tired state to false and play waiting/sleep animation
        this.tired = false;
        this.playAnimation(this.IMAGES_SLEEP);
        this.snoringSound.play();

        // Start a timer to set tired state after 4 seconds of inactivity
        if (!this.timeoutTired) {
            this.tiredTimeoutValue = setTimeout(() => {
                this.tired = true;
            }, 4000);
            this.timeoutTired = true;
        }
    }

    /**
     * Resets the tired state of the character and stops the snoring sound if playing.
     *
     * @method resetTiredState
     */
    resetTiredState() {
        this.tired = false;
        this.timeoutTired = false;
        clearTimeout(this.tiredTimeoutValue);
        this.snoringSound.pause();
        this.sleepTimer = 0;
    }
}
