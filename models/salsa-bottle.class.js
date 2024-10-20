class SalsaBottles extends DrawableObject {
    IMAGES_SALSA_BOTTLES = [
        "assets/img_pollo_locco/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "assets/img_pollo_locco/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];

    y = 360;
    height = 60;
    width = 50;
    currentImageIndex = 0;
    img;

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
    };

    constructor() {
        super().loadImage(this.IMAGES_SALSA_BOTTLES[0]);
        this.loadImages(this.IMAGES_SALSA_BOTTLES);
        this.playAnimation(this.IMAGES_SALSA_BOTTLES);
        this.salsaBottlesPosition();
        this.animate();
    }

    /**
     * Sets the position of the salsa bottle object randomly along the x-axis.
     * The x position is a random value between 300 and 2100.
     */
    salsaBottlesPosition() {
        this.x = 300 + Math.random() * 1800;
    }

    /**
     * Animates the salsa bottle by repeatedly playing the salsa bottle animation.
     * The animation is played every 500 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SALSA_BOTTLES);
        }, 500);
    }
}
