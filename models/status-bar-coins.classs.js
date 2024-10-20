class StatusBarCoins extends MovableObject {
    IMAGES = [
        "assets/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(5);
    }
}
