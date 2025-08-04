import Phaser from 'phaser';

export default class Hallway extends Phaser.Scene {
    constructor() {
        super('Hallway');
    }

    preload() {
        // Create simple player sprite
        const graphics = this.add.graphics();
        graphics.fillStyle(0x3498db);
        graphics.fillCircle(16, 16, 12);
        graphics.generateTexture('player', 32, 32);
        graphics.destroy();

        // Create a transparent texture for doors
        const doorGraphics = this.add.graphics();
        doorGraphics.fillStyle(0xffffff, 0); // transparent
        doorGraphics.fillRect(0, 0, 60, 15);
        doorGraphics.generateTexture('door', 60, 15);
        doorGraphics.destroy();
    }

    create() {
        // Set world bounds
        this.physics.world.setBounds(0, 0, 800, 600, true, true, true, true); // Enable all boundaries
        
        // Create hallway background
        this.add.rectangle(400, 300, 800, 600, 0xecf0f1);
        
        // Create room containers
        this.createRooms();
        this.createDoors();
        this.createPlayer();
        this.createRoomWalls();
        this.setupInput();
        this.createUI();
    }

    createRoomWalls() {
      this.roomWalls =this.physics.add.staticGroup()
    }

    createRooms() {
        // Top room - Exploration Room
        this.explorationRoom = this.add.rectangle(400, 120, 400, 180, 0xbdc3c7);
        this.explorationRoom.setStrokeStyle(2, 0x95a5a6);
        this.add.text(400, 120, 'Exploration Room', {
            fontSize: '18px',
            fill: '#2c3e50',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(400, 140, 'Discover new knowledge', {
            fontSize: '12px',
            fill: '#7f8c8d'
        }).setOrigin(0.5);

        // Bottom Left - Focus Room
        this.focusRoom = this.add.rectangle(200, 450, 320, 220, 0xa8e6cf);
        this.focusRoom.setStrokeStyle(2, 0x81c784);
        this.add.text(200, 420, 'Focus Room', {
            fontSize: '16px',
            fill: '#2c3e50',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(200, 440, 'Notes • Code • Pomodoro', {
            fontSize: '11px',
            fill: '#4caf50'
        }).setOrigin(0.5);
        this.add.text(200, 470, 'Space for focused work\nand deep concentration.', {
            fontSize: '10px',
            fill: '#66bb6a',
            align: 'center'
        }).setOrigin(0.5);

        // Bottom Right - Discussion Room
        this.discussionRoom = this.add.rectangle(600, 450, 320, 220, 0xffd3a5);
        this.discussionRoom.setStrokeStyle(2, 0xffb74d);
        this.add.text(600, 420, 'Discussion Room', {
            fontSize: '16px',
            fill: '#2c3e50',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        this.add.text(600, 440, 'Chat • Voice • Collaborate', {
            fontSize: '11px',
            fill: '#ff9800'
        }).setOrigin(0.5);
        this.add.text(600, 470, 'Connect with others and\nshare ideas in real-time.', {
            fontSize: '10px',
            fill: '#ffb74d',
            align: 'center'
        }).setOrigin(0.5);
    }

    createDoors() {
        // Create door physics bodies
        this.doors = this.physics.add.staticGroup();

        // Exploration Room Door (top center)
        this.explorationDoor = this.physics.add.sprite(400, 215, null);
        this.explorationDoor.body.setSize(60, 15);
        this.explorationDoor.roomType = 'exploration';
        this.doors.add(this.explorationDoor);
        
        // Visual door
        this.add.rectangle(400, 215, 60, 15, 0x8e44ad);
        this.add.text(400, 215, '🚪', { fontSize: '12px' }).setOrigin(0.5);

        // Focus Room Door (bottom left)
        this.focusDoor = this.physics.add.sprite(200, 340, null);
        this.focusDoor.body.setSize(60, 15);
        this.focusDoor.roomType = 'focus';
        this.doors.add(this.focusDoor);
        
        // Visual door
        this.add.rectangle(200, 340, 60, 15, 0x27ae60);
        this.add.text(200, 340, '🚪', { fontSize: '12px' }).setOrigin(0.5);

        // Discussion Room Door (bottom right)
        this.discussionDoor = this.physics.add.sprite(600, 340, null);
        this.discussionDoor.body.setSize(60, 15);
        this.discussionDoor.roomType = 'discussion';
        this.doors.add(this.discussionDoor);
        
        // Visual door
        this.add.rectangle(600, 340, 60, 15, 0xe67e22);
        this.add.text(600, 340, '🚪', { fontSize: '12px' }).setOrigin(0.5);
    }

    createPlayer() {
        // Create player
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true; // Ensure world bounds collision events are enabled
        this.player.setDrag(300, 300);
        this.player.setMaxVelocity(300, 300);
        this.player.body.setGravityY(0);
        // Track nearby door
        this.nearbyDoor = null;
        
        // Check overlap with doors
        this.physics.add.overlap(this.player, this.doors, (_, door) => {
            this.nearbyDoor = door;
        }, null, this);
    }

    setupInput() {
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            interact: Phaser.Input.Keyboard.KeyCodes.X
        });

        // Handle room entry
        this.keys.interact.on('down', () => {
            if (this.nearbyDoor) {
                this.enterRoom(this.nearbyDoor.roomType);
            }
        });
    }

    createUI() {
        // Create interaction prompt
        this.interactionText = this.add.text(400, 80, '', {
            fontSize: '14px',
            fill: '#e74c3c',
            backgroundColor: '#ffffff',
            padding: { x: 8, y: 4 },
            align: 'center'
        }).setOrigin(0.5).setVisible(false);
    }

    update() {
        // Reset player velocity
        this.player.setVelocity(0);
        
        // Calculate speed
        const baseSpeed = 200;
        const speed = this.keys.shift.isDown ? baseSpeed * 1.5 : baseSpeed;
        
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

        // Check if near door and show prompt
        this.updateInteractionPrompt();
    }

    updateInteractionPrompt() {
        if (this.nearbyDoor) {
            const roomName = this.capitalizeFirst(this.nearbyDoor.roomType);
            this.interactionText.setText(`Press X to enter ${roomName} Room`);
            this.interactionText.setVisible(true);
            
            // Position prompt above player
            this.interactionText.setPosition(this.player.x, this.player.y - 40);
        } else {
            this.interactionText.setVisible(false);
        }
        
        // Reset nearby door if player moved away
        if (this.nearbyDoor) {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                this.nearbyDoor.x, this.nearbyDoor.y
            );
            if (distance > 40) {
                this.nearbyDoor = null;
            }
        }
    }

    enterRoom(roomType) {
        // Add entrance effect
        this.cameras.main.flash(200, 255, 255, 255);
        
        // Start the appropriate room scene
        switch(roomType) {
            case 'focus':
                this.scene.start('FocusRoom');
                break;
            case 'discussion':
                this.scene.start('DiscussionRoom');
                break;
            case 'exploration':
                this.scene.start('ExplorationRoom');
                break;
        }
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}