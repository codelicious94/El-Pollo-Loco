class StatusBarBottle extends MovableObject {
    IMAGES = [
        "assets/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "assets/img_pollo_locco/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(7);
    }
}
