class StatusBarEndboss extends MovableObject {
    IMAGES = [
        "assets/img_pollo_locco/7_statusbars/2_statusbar_endboss/green/green0.png",
        "assets/img_pollo_locco/7_statusbars/2_statusbar_endboss/green/green20.png",
        "assets/img_pollo_locco/7_statusbars/2_statusbar_endboss/green/green40.png",
        "assets/img_pollo_locco/7_statusbars/2_statusbar_endboss/green/green60.png",
        "assets/img_pollo_locco/7_statusbars/2_statusbar_endboss/green/green80.png",
        "assets/img_pollo_locco/7_statusbars/2_statusbar_endboss/green/green100.png",
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 240;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }
}
