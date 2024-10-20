/**
 * Represents a background object in the game, which extends the MovableObject class.
 * Handles the display and position of background images.
 * 
 * @class
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {

  /**
   * Creates an instance of BackgroundObject.
   * Initializes the background image, position, and size.
   * 
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The x-coordinate where the background image will be placed.
   */
  constructor(imagePath, x) {  
      super().loadImage(imagePath);  
      this.x = x;                    
      this.y = 0;                     
      this.width = 720;               
      this.height = 480;              
  }
}
