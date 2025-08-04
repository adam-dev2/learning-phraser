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
    // Enable physics world bounds
    this.physics.world.setBounds(0, 0, 800, 600);
    
    // Create room background
    this.add.rectangle(400, 300, 800, 600, 0xa8e6cf);
    
    // Room title and description
    this.add.text(400, 100, 'Welcome to the Focus Room', {
        fontSize: '24px',
        fill: '#2c3e50',
        fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(400, 150, 'Areas coming soon:', {
        fontSize: '16px',
        fill: '#27ae60'
    }).setOrigin(0.5);

    this.add.text(400, 200, '📝 Note-taking Zone\n💻 Code Editor Zone\n⏰ Pomodoro Timer Zone', {
        fontSize: '14px',
        fill: '#2c3e50',
        align: 'center'
    }).setOrigin(0.5);

    // Use sprite instead of image for better physics
    this.player = this.physics.add.sprite(400, 400, 'player');
    
    // Configure physics properties
    this.player.setCollideWorldBounds(true);
    this.player.setDrag(300, 300);
    this.player.setMaxVelocity(400, 400);
    this.player.setBounce(0.1, 0.1);
    this.player.body.setGravityY(0);

    // Exit instruction
    this.add.text(400, 500, 'Press ESC to return to Hallway', {
        fontSize: '14px',
        fill: '#7f8c8d'
    }).setOrigin(0.5);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
      shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
      escape: Phaser.Input.Keyboard.KeyCodes.ESC
    });

    // Handle return to hallway
    this.keys.escape.on('down', () => {
        this.scene.start('Hallway');
    });
  }

  update() {
    // Simplified speed calculation
    const baseSpeed = 200;
    const speed = this.keys.shift.isDown ? baseSpeed * 2.5 : baseSpeed;
    
    // Reset velocity each frame
    this.player.setVelocity(0);
    
    // Handle movement
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
  }
}