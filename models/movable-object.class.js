class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object, affecting its vertical position (y-axis).
     * If the object is above the ground or has a positive speedY, it moves downward,
     * simulating the effect of gravity.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.isJumping = false;
                this.jumpAnimationCompleted = false;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * If the object is a ThrowableObject, it is always considered above the ground.
     * For other objects, the check is based on their y position.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 140;
        }
    }

    /**
     * Checks if the object is colliding with another object.
     * Collision is determined based on the object's x and y position, width, height,
     * and offsets.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Reduces the object's energy by a given damage value (default is 20).
     * If the energy falls below 0, it is set to 0. Also updates the time of the last hit.
     */
    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Determines if the object is currently hurt. The time since the last hit is checked.
     * The duration during which the object is considered hurt is shorter for the 'character'
     * (1 second) and longer for other objects (2 seconds).
     */
    isHurt(obj) {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        if (obj == "character") {
            return timepassed < 1;
        } else {
            return timepassed < 2;
        }
    }

    /**
     * Checks if the object is dead (i.e., energy is 0).
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by increasing its x position by its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its x position by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed (speedY) to 30.
     */
    jump() {
        this.speedY = 30;
    }
}
