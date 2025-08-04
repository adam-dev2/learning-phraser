import Phaser from 'phaser';

export default class DiscussionRoom extends Phaser.Scene {
    constructor() {
        super('DiscussionRoom');
    }

    preload() {
        this.load.image('player', 'https://labs.phaser.io/assets/sprites/phaser-dude.png');
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 600);
        
        this.add.rectangle(400, 300, 800, 600, 0xffd3a5);
        
        this.add.text(400, 100, 'Welcome to the Discussion Room', {
            fontSize: '24px',
            fill: '#2c3e50',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 150, 'Features coming soon:', {
            fontSize: '16px',
            fill: '#e67e22'
        }).setOrigin(0.5);

        this.add.text(400, 200, '💬 Real-time Chat\n🎙️ Voice Communication\n👥 User Presence', {
            fontSize: '14px',
            fill: '#2c3e50',
            align: 'center'
        }).setOrigin(0.5);

        this.player = this.physics.add.sprite(400, 400, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setDrag(300, 300);
        this.player.setMaxVelocity(400, 400);
        this.player.body.setGravityY(0);

        this.add.text(400, 500, 'Press ESC to return to Hallway', {
            fontSize: '14px',
            fill: '#7f8c8d'
        }).setOrigin(0.5);

        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            escape: Phaser.Input.Keyboard.KeyCodes.ESC
        });

        this.keys.escape.on('down', () => {
            this.scene.start('Hallway');
        });
    }

    update() {
        const baseSpeed = 200;
        const speed = this.keys.shift.isDown ? baseSpeed * 2.5 : baseSpeed;
        
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
    }
}