/**
 * Race Scene
 * Main gameplay scene with racing mechanics
 */

class RaceScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RaceScene' });
        this.player = null;
        this.currentTrack = null;
        this.score = 0;
        this.speed = 0;
        this.cursors = null;
    }

    create() {
        const { width, height } = this.scale;

        // Get selected track and character
        const trackKey = this.registry.get('selectedTrack') || 'stadium';
        const characterKey = this.registry.get('selectedCharacter') || 'ronaldo';
        const vehicleColor = this.registry.get('vehicleColor') || 0xFF0000;

        // Initialize track
        this.initializeTrack(trackKey);

        // Create player vehicle
        this.createPlayer(characterKey, vehicleColor);

        // Setup input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown-SPACE', () => this.useBoost());
        this.input.keyboard.on('keydown-ESC', () => this.pauseGame());

        // Setup collisions
        this.setupCollisions();

        // Create UI
        this.createUI();

        // Start countdown
        this.startCountdown();
    }

    initializeTrack(trackKey) {
        switch (trackKey) {
            case 'stadium':
                this.currentTrack = new StadiumTrack(this);
                break;
            case 'beach':
                this.currentTrack = new BeachTrack(this);
                break;
            case 'techHub':
                this.currentTrack = new TechHubTrack(this);
                break;
            default:
                this.currentTrack = new StadiumTrack(this);
        }

        this.currentTrack.create();
    }

    createPlayer(characterKey, vehicleColor) {
        const { width, height } = this.scale;
        const character = createCharacter(characterKey);

        // Create player vehicle
        this.player = this.add.container(width / 2, height / 2);

        // Vehicle body
        const body = this.add.rectangle(0, 0, 50, 80, vehicleColor);
        body.setStrokeStyle(3, 0xFFFFFF);

        // Windshield
        const windshield = this.add.rectangle(0, -15, 40, 30, 0x87CEEB, 0.5);

        // Wheels
        const wheel1 = this.add.rectangle(-20, -25, 8, 20, 0x000000);
        const wheel2 = this.add.rectangle(20, -25, 8, 20, 0x000000);
        const wheel3 = this.add.rectangle(-20, 25, 8, 20, 0x000000);
        const wheel4 = this.add.rectangle(20, 25, 8, 20, 0x000000);

        // Character indicator
        const characterIcon = this.add.circle(0, 0, 15, 0xFFFFFF);
        const characterText = this.add.text(
            0, 0,
            character.name.charAt(0),
            {
                fontSize: '20px',
                fontFamily: 'Arial Black',
                color: '#000000'
            }
        ).setOrigin(0.5);

        // Add speed trail effect
        this.speedTrail = this.add.graphics();

        this.player.add([
            body, windshield,
            wheel1, wheel2, wheel3, wheel4,
            characterIcon, characterText
        ]);

        // Add physics
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setDrag(100);
        this.player.body.setMaxVelocity(500);

        // Store character stats
        this.player.character = character;
        this.player.wheels = [wheel1, wheel2, wheel3, wheel4];
        this.player.boost = 3; // Number of boosts available
    }

    setupCollisions() {
        // Track-specific collisions
        const trackKey = this.registry.get('selectedTrack');

        // Boundaries
        if (this.currentTrack.getBoundaries()) {
            this.physics.add.collider(
                this.player,
                this.currentTrack.getBoundaries()
            );
        }

        // Track-specific obstacles
        if (trackKey === 'stadium') {
            // Soccer ball collisions
            const balls = this.currentTrack.getObstacles();
            balls.forEach(ball => {
                this.physics.add.collider(this.player, ball, () => {
                    this.score -= 10;
                    this.updateScore();
                    this.createHitEffect();
                });
            });

            // Goal zones
            const goals = this.currentTrack.getGoals();
            goals.forEach(goal => {
                this.physics.add.overlap(this.player, goal, () => {
                    const points = this.currentTrack.onGoalScored(this.player);
                    this.score += points;
                    this.updateScore();
                }, null, this);
            });

        } else if (trackKey === 'beach') {
            // Sea otter collisions
            const otters = this.currentTrack.getOtters();
            otters.forEach(otter => {
                this.physics.add.overlap(this.player, otter, () => {
                    const points = this.currentTrack.onOtterHit(this.player);
                    this.score += points;
                    this.updateScore();
                    this.createHitEffect();
                }, null, this);
            });

        } else if (trackKey === 'techHub') {
            // Drone collisions
            const drones = this.currentTrack.getDrones();
            drones.forEach(drone => {
                this.physics.add.overlap(this.player, drone, () => {
                    const points = this.currentTrack.onDroneHit(this.player);
                    this.score += points;
                    this.updateScore();
                    this.createHitEffect();
                }, null, this);
            });

            // Virtual goal zones
            const goals = this.currentTrack.getVirtualGoals();
            goals.forEach(goal => {
                this.physics.add.overlap(this.player, goal.ring, () => {
                    const points = this.currentTrack.onVirtualGoalHit(this.player);
                    this.score += points;
                    this.updateScore();
                }, null, this);
            });
        }
    }

    createUI() {
        const { width } = this.scale;

        // Score display
        this.scoreText = this.add.text(
            20, 20,
            'SCORE: 0',
            {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }
        );

        // Speed display
        this.speedText = this.add.text(
            20, 60,
            'SPEED: 0',
            {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }
        );

        // Boost display
        this.boostText = this.add.text(
            width - 20, 20,
            `BOOSTS: ${'⚡'.repeat(this.player.boost)}`,
            {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#ffff00',
                stroke: '#000000',
                strokeThickness: 4
            }
        ).setOrigin(1, 0);

        // Controls hint
        this.controlsText = this.add.text(
            width / 2, 20,
            'Arrow Keys: Move | SPACE: Boost | ESC: Pause',
            {
                fontSize: '16px',
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }
        ).setOrigin(0.5, 0);

        // Timer
        this.timer = 0;
        this.timerText = this.add.text(
            width / 2, 60,
            'TIME: 0.0s',
            {
                fontSize: '20px',
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3
            }
        ).setOrigin(0.5, 0);
    }

    startCountdown() {
        this.gameStarted = false;
        let count = 3;

        const countdownText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            count,
            {
                fontSize: '128px',
                fontFamily: 'Arial Black',
                color: '#ffff00',
                stroke: '#000000',
                strokeThickness: 10
            }
        ).setOrigin(0.5);

        const countdownInterval = this.time.addEvent({
            delay: 1000,
            repeat: 3,
            callback: () => {
                count--;
                if (count > 0) {
                    countdownText.setText(count);
                    this.tweens.add({
                        targets: countdownText,
                        scale: { from: 0.5, to: 1.5 },
                        alpha: { from: 1, to: 0 },
                        duration: 1000
                    });
                } else {
                    countdownText.setText('GO!');
                    countdownText.setColor('#00ff00');
                    this.tweens.add({
                        targets: countdownText,
                        scale: { from: 0.5, to: 2 },
                        alpha: { from: 1, to: 0 },
                        duration: 1000,
                        onComplete: () => {
                            countdownText.destroy();
                            this.gameStarted = true;
                        }
                    });
                }
            }
        });
    }

    update(time, delta) {
        if (!this.gameStarted) return;

        // Update timer
        this.timer += delta;
        this.timerText.setText(`TIME: ${(this.timer / 1000).toFixed(1)}s`);

        // Update track
        if (this.currentTrack && this.currentTrack.update) {
            this.currentTrack.update();
        }

        // Player movement
        const character = this.player.character;
        const acceleration = 300 * (character.acceleration / 5);
        const maxSpeed = 400 * (character.speed / 5);
        const turnSpeed = 250 * (character.handling / 5);

        // Forward/Backward
        if (this.cursors.up.isDown) {
            this.physics.velocityFromRotation(
                this.player.rotation - Math.PI / 2,
                acceleration,
                this.player.body.acceleration
            );
            this.animateWheels();
        } else if (this.cursors.down.isDown) {
            this.physics.velocityFromRotation(
                this.player.rotation - Math.PI / 2,
                -acceleration / 2,
                this.player.body.acceleration
            );
        } else {
            this.player.body.setAcceleration(0);
        }

        // Rotation
        if (this.cursors.left.isDown) {
            this.player.body.setAngularVelocity(-turnSpeed);
        } else if (this.cursors.right.isDown) {
            this.player.body.setAngularVelocity(turnSpeed);
        } else {
            this.player.body.setAngularVelocity(0);
        }

        // Update speed display
        this.speed = Math.sqrt(
            this.player.body.velocity.x ** 2 +
            this.player.body.velocity.y ** 2
        );
        this.speedText.setText(`SPEED: ${Math.floor(this.speed)}`);

        // Speed trail effect
        this.createSpeedTrail();
    }

    animateWheels() {
        this.player.wheels.forEach(wheel => {
            this.tweens.add({
                targets: wheel,
                y: wheel.y + 2,
                duration: 50,
                yoyo: true
            });
        });
    }

    createSpeedTrail() {
        if (this.speed > 200) {
            const trail = this.add.circle(
                this.player.x,
                this.player.y,
                5,
                0xFFFFFF,
                0.3
            );

            this.tweens.add({
                targets: trail,
                alpha: 0,
                scale: 0.5,
                duration: 500,
                onComplete: () => trail.destroy()
            });
        }
    }

    useBoost() {
        if (this.player.boost > 0 && this.gameStarted) {
            this.player.boost--;
            this.updateBoostDisplay();

            // Apply boost
            this.physics.velocityFromRotation(
                this.player.rotation - Math.PI / 2,
                1000,
                this.player.body.velocity
            );

            // Boost visual effect
            this.createBoostEffect();

            // Add temporary speed boost
            this.time.delayedCall(2000, () => {
                // Boost effect ends
            });
        }
    }

    createBoostEffect() {
        for (let i = 0; i < 20; i++) {
            const particle = this.add.circle(
                this.player.x,
                this.player.y,
                Phaser.Math.Between(3, 8),
                [0xFFFF00, 0xFF6600, 0xFF0000][i % 3],
                0.8
            );

            const angle = Phaser.Math.Between(0, 360);
            this.tweens.add({
                targets: particle,
                x: this.player.x + Math.cos(angle) * 100,
                y: this.player.y + Math.sin(angle) * 100,
                alpha: 0,
                duration: 500,
                onComplete: () => particle.destroy()
            });
        }
    }

    createHitEffect() {
        // Screen shake
        this.cameras.main.shake(200, 0.01);

        // Flash effect
        const flash = this.add.rectangle(
            0, 0,
            this.scale.width,
            this.scale.height,
            0xFF0000,
            0.3
        ).setOrigin(0);

        this.tweens.add({
            targets: flash,
            alpha: 0,
            duration: 200,
            onComplete: () => flash.destroy()
        });
    }

    updateScore() {
        this.scoreText.setText(`SCORE: ${this.score}`);

        // Score animation
        this.tweens.add({
            targets: this.scoreText,
            scale: { from: 1, to: 1.2 },
            duration: 200,
            yoyo: true
        });
    }

    updateBoostDisplay() {
        this.boostText.setText(`BOOSTS: ${'⚡'.repeat(this.player.boost)}`);
    }

    pauseGame() {
        this.scene.pause();

        // Create pause menu overlay
        const overlay = this.add.rectangle(
            0, 0,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.7
        ).setOrigin(0);

        const pauseText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 - 50,
            'PAUSED',
            {
                fontSize: '64px',
                fontFamily: 'Arial Black',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        const resumeText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 50,
            'Press ESC to Resume',
            {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        const quitText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 100,
            'Press Q to Quit',
            {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // Resume listener
        this.input.keyboard.once('keydown-ESC', () => {
            overlay.destroy();
            pauseText.destroy();
            resumeText.destroy();
            quitText.destroy();
            this.scene.resume();
        });

        // Quit listener
        this.input.keyboard.once('keydown-Q', () => {
            this.scene.start('MenuScene');
        });
    }
}
