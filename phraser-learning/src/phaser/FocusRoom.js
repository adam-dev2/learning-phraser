import Phaser from 'phaser';

export default class FocusRoom extends Phaser.Scene {
  constructor() {
    super('FocusRoom');
  }

  preload() {
    this.load.image('bg', 'https://labs.phaser.io/assets/skies/space3.png');
    this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
  }

  create() {
    this.add.image(400, 300, 'bg');
    this.star = this.physics.add.sprite(200, 300, 'star');
    this.player = this.physics.add.image(400, 300, 'player');

    // Set up WASD controls
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
    });
  }

  update() {
    const isShiftDown = this.keys.shift.isDown;
    const speed = isShiftDown ? 250 : 200;
    this.player.setVelocity(0);
    this.star.setCollideWorldBounds(true);
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

    if(this.keys.shift.isDown) {
        if (this.keys.left.isDown) {
            this.player.setVelocityX(-(speed * 2));
        } else if (this.keys.right.isDown) {
            this.player.setVelocityX((speed * 2));
        }

        if (this.keys.up.isDown) {
            this.player.setVelocityY(-(speed * 2));
        } else if (this.keys.down.isDown) {
            this.player.setVelocityY((speed * 2));
        }
    }

    if (this.player.x < 20) {
      this.scene.start('Hallway');
    }
  }
}
