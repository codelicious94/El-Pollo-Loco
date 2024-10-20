class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    touchPress() {
        document.getElementById("walkLeft").addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.LEFT = true;
        });
        document.getElementById("walkRight").addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById("jump").addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.SPACE = true;
        });
        document.getElementById("throw").addEventListener("touchstart", (event) => {
            event.preventDefault();
            this.D = true;
        });
    }

    touchEnd() {
        document.getElementById("walkLeft").addEventListener("touchend", (event) => {
            event.preventDefault();
            this.LEFT = false;
        });
        document.getElementById("walkRight").addEventListener("touchend", (event) => {
            event.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById("jump").addEventListener("touchend", (event) => {
            event.preventDefault();
            this.SPACE = false;
        });
        document.getElementById("throw").addEventListener("touchend", (event) => {
            event.preventDefault();
            this.D = false;
        });
    }
}
