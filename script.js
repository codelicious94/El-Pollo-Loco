window.onload = checkOrientation;
window.onresize = checkOrientation;

document.addEventListener(
    "contextmenu",
    function (e) {
        e.preventDefault();
    },
    false
);

/**
 * Checks if the screen is in portrait orientation.
 * Displays a warning if the height is greater than the width.
 */
function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById("portraitWarning").style.display = "flex";
    } else {
        document.getElementById("portraitWarning").style.display = "none";
    }
}

/**
 * Toggles fullscreen mode for the specified element.
 * Calls enterFullscreen() to initiate fullscreen.
 */
function fullscreen() {
    let fullscreenElement = document.getElementById("fullscreen");
    enterFullscreen(fullscreenElement);
}

/**
 * Requests fullscreen for a specified element.
 * Adjusts the canvas size when fullscreen mode is activated.
 *
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
    let canvas = document.getElementById("canvas");

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }

    document.addEventListener("fullscreenchange", function () {
        if (document.fullscreenElement) {
            canvas.style.width = "100vw";
            canvas.style.height = "100vh";
        } else {
            exitFullscreen();
        }
    });
}

/**
 * Exits fullscreen mode and restores the canvas size to its default dimensions.
 */
function exitFullscreen() {
    let canvas = document.getElementById("canvas");

    canvas.style.width = "720px";
    canvas.style.height = "480px";

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Displays the game information popup.
 */
function showInformation() {
    let popup = document.getElementById("infoPopup");
    popup.style.display = "flex";
}

/**
 * Hides the game information popup.
 */
function hideInformation() {
    let popup = document.getElementById("infoPopup");
    popup.style.display = "none";
}
