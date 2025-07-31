import Phaser from 'phaser';

export default class Hallway extends Phaser.Scene {
  constructor() {
    super('Hallway');
  }

  preload() {
    // Valid background and player sprite
    this.load.image('bg2', 'https://labs.phaser.io/assets/skies/nebula.jpg');
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
  }

  create() {
    // Make background fit the entire screen
    const bg = this.add.image(0, 0, 'bg2').setOrigin(0);
    bg.setDisplaySize(this.scale.width, this.scale.height);

    this.player = this.physics.add.image(400, 300, 'player');

    // Set up WASD + SHIFT keys
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
    });
  }

  update() {
    const isShiftDown = this.keys.shift.isDown;
    const baseSpeed = 200;
    const speed = isShiftDown ? baseSpeed * 2 : baseSpeed;

    this.player.setVelocity(0);

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.keys.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.keys.down.isDown) {
      this.player.setVelocityY(speed);
    }

    // Scene switch to FocusRoom
    if (this.player.x > 780) {
      this.scene.start('FocusRoom');
    }
  }
}
