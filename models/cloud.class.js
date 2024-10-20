/**
 * Represents a cloud in the game that moves from right to left.
 * Inherits properties and methods from the MovableObject class.
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;

    /**
     * Creates an instance of Cloud.
     * Loads the cloud image and assigns a random x-coordinate.
     * Initiates the cloud animation (movement).
     */
    constructor() {
        super().loadImage("assets/img_pollo_locco/5_background/layers/4_clouds/1.png");
        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Animates the cloud by moving it from right to left.
     */
    animate() {
        this.moveLeft();
    }
}
