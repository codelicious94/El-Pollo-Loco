/**
 * Represents a level in the game, containing various game elements such as enemies, clouds, collectibles, and background objects.
 *
 * @class
 */
class Level {
    enemies;
    endBoss;
    clouds;
    coins;
    salsaBottles;
    backgroundObjects;
    level_end_x = 2200;

    /**
     * Creates an instance of the Level class.
     */
    constructor(enemies, endBoss, clouds, backgroundObjects, coins, salsaBottles) {
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.salsaBottles = salsaBottles;
    }
}
