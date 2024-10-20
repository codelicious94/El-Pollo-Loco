let canvas;
let world;
let keyboard = new Keyboard();
let isDead = false;
let sounds = [];
let isMuted = false;

let gameWinSound = new Audio("audio/win.mp3");
let gameOverSound = new Audio("audio/gameOver.mp3");

/**
 * Initializes the canvas and the game world.
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);

    if (localStorage.getItem('isMuted') !== null) {
        isMuted = (localStorage.getItem('isMuted') === 'true'); 
        applyAudioState();
    }
}


/**
 * Starts the game by initializing the level and setting up event listeners and sounds.
 */
function startGame() {
    initLevel();
    init();

    keyboard.touchPress();
    keyboard.touchEnd();

    world.initSounds();

    document.getElementById("playButton").disabled = true;
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("playButton").classList.add("d-none");
    document.getElementById("restartButton").classList.add("d-none");
}

/**
 * Handles the logic for when the player wins the game.
 * Stops sounds, clears intervals, and displays the win screen.
 */
function winGame() {
    stopAllSounds();
    clearAllIntervals();
    document.getElementById("winGame").classList.remove("d-none");
    document.getElementById("restartButton").classList.remove("d-none");
    document.getElementById("playButton").classList.add("d-none");
    if (!isMuted) {
        setTimeout(function () {
            gameWinSound.play();
        }, 800);
    }
}

/**
 * Handles the logic for when the player loses the game.
 * Stops sounds, clears intervals, and displays the game over screen.
 */
function gameOver() {
    stopAllSounds();
    clearAllIntervals();

    document.getElementById("gameOver").classList.remove("d-none");
    document.getElementById("restartButton").classList.remove("d-none");
    document.getElementById("playButton").classList.add("d-none");
    if (!isMuted) {
        setTimeout(function () {
            gameOverSound.play();
        }, 800);
    }
}

/**
 * Restarts the game by reinitializing the level, resetting the world and UI elements.
 */
function restartGame() {
    stopAllSounds();
    clearAllIntervals();
    initLevel();
    init();

    world.coinsCollected = 0;
    world.salsaBottlesCollected = 0;
    world.character.energy = 100;
    world.character.x = 120;
    world.character.y = 80;
    world.endboss.energy = 100;
    world.throwableObjects = [];

    world.statusBar.setPercentage(world.character.energy);
    world.statusCoins.setPercentage(0);
    world.statusBarBottle.setPercentage(0);
    world.statusBarEndboss.setPercentage(world.endboss.energy);

    // Audio-Zustand nach Neustart beibehalten
    applyAudioState();

    resetGameUI();
}

/**
 * Resets the game UI elements to their initial state.
 */
function resetGameUI() {
    document.getElementById("restartButton").classList.add("d-none");
    document.getElementById("gameOver").classList.add("d-none");
    document.getElementById("winGame").classList.add("d-none");
    document.getElementById("startScreen").classList.remove("d-none");

    document.getElementById("gameOver").style.transform = "translateY(0)";
    document.getElementById("winGame").style.transform = "translateY(0)";
}

/**
 * Clears all active intervals in the game to reset timed functions.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Applies the current mute state to all game sounds.
 * If the game is muted, all sounds will be muted, and if not, the sounds will be unmuted.
 * Also updates the audio icon in the UI to reflect the current mute state.
 */
function applyAudioState() {
    sounds.forEach((sound) => {
        sound.muted = isMuted;
    });
    updateAudioIcon(); // Aktualisiert das Audio-Symbol im UI
}

/**
 * Toggles the game audio between muted and unmuted.
 * Updates the UI icon to reflect the mute state.
 */
function toggleAudio() {
    isMuted = !isMuted;
    sounds.forEach((sound) => {
        sound.muted = isMuted;
    });
    localStorage.setItem('isMuted', isMuted); 
    updateAudioIcon();
}

/**
 * Updates the audio icon in the UI based on whether the audio is muted.
 */
function updateAudioIcon() {
    const soundIcon = document.getElementById("audioIcon");
    soundIcon.src = isMuted
        ? "./assets/img_pollo_locco/12_audio/audio_mute.png"
        : "./assets/img_pollo_locco/12_audio/audio.png";
}

/**
 * Stops all playing sounds and resets them to the start.
 */
function stopAllSounds() {
    sounds.forEach((sound) => {
        sound.pause();
        sound.currentTime = 0;
    });
}

/**
 * Event listener for keydown events, updates the keyboard object when a key is pressed.
 * @param {KeyboardEvent} e - The keydown event.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Event listener for keyup events, updates the keyboard object when a key is released.
 * @param {KeyboardEvent} e - The keyup event.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});
