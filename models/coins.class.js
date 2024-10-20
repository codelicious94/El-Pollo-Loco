class Coins extends DrawableObject {
    y = 50;
    height = 120;
    width = 120;
    currentImageIndex = 0;
    img;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 50,
    };

    IMAGES_COINS = ["assets/img_pollo_locco/8_coin/coin_1.png", "assets/img_pollo_locco/8_coin/coin_2.png"];

    constructor() {
        super().loadImage(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.playAnimation(this.IMAGES_COINS);
        this.coinsPosition();
        this.animate();
    }

    /**
     * Sets a random position for the coin on the x and y axes.
     * The x position is randomized between 300 and 2100, and the y position is randomized between 60 and 160.
     */
    coinsPosition() {
        this.x = 300 + Math.random() * 1800;
        this.y = 60 + Math.random() * 100;
    }

    /**
     * Animates the coin by cycling through its images (frames) at a regular interval of 500 milliseconds.
     * This gives the effect of the coin spinning or changing.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 500);
    }
}
