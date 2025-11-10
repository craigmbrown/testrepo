/**
 * Tech Hub Track
 * Neon-lit, high-tech circuit with digital challenges
 */

class TechHubTrack {
    constructor(scene) {
        this.scene = scene;
        this.name = 'Tech Hub Circuit';
        this.trackColor = 0x1a1a2e;
        this.obstacles = [];
        this.drones = [];
        this.dataStreams = [];
        this.virtualGoals = [];
    }

    create() {
        // Create tech background
        this.createBackground();

        // Create track boundaries
        this.createTrackBoundaries();

        // Create drone obstacles
        this.createDrones();

        // Create data stream effects
        this.createDataStreams();

        // Create virtual goal challenges
        this.createVirtualGoals();

        // Create holographic effects
        this.createHolographicElements();

        // Create neon grid
        this.createNeonGrid();
    }

    createBackground() {
        const graphics = this.scene.add.graphics();

        // Dark tech background
        graphics.fillStyle(this.trackColor, 1);
        graphics.fillRect(0, 0, GameConfig.width, GameConfig.height);

        // Circuit board pattern
        graphics.lineStyle(1, GameConfig.colors.techNeon, 0.3);
        for (let x = 0; x < GameConfig.width; x += 50) {
            for (let y = 0; y < GameConfig.height; y += 50) {
                graphics.strokeRect(x, y, 50, 50);
            }
        }
    }

    createTrackBoundaries() {
        this.boundaries = this.scene.physics.add.staticGroup();

        // Create neon-outlined boundaries
        const boundaryStyle = {
            color: GameConfig.colors.techNeon,
            alpha: 0.8
        };

        const margin = 60;
        const thickness = 30;

        // Top boundary with neon glow
        const top = this.scene.add.rectangle(
            GameConfig.width / 2, margin,
            GameConfig.width - margin * 2, thickness,
            GameConfig.colors.techNeon, 0.5
        );

        // Bottom boundary
        const bottom = this.scene.add.rectangle(
            GameConfig.width / 2, GameConfig.height - margin,
            GameConfig.width - margin * 2, thickness,
            GameConfig.colors.techNeon, 0.5
        );

        // Left boundary
        const left = this.scene.add.rectangle(
            margin, GameConfig.height / 2,
            thickness, GameConfig.height - margin * 2,
            GameConfig.colors.techNeon, 0.5
        );

        // Right boundary
        const right = this.scene.add.rectangle(
            GameConfig.width - margin, GameConfig.height / 2,
            thickness, GameConfig.height - margin * 2,
            GameConfig.colors.techNeon, 0.5
        );

        [top, bottom, left, right].forEach(boundary => {
            this.scene.physics.add.existing(boundary, true);
            this.boundaries.add(boundary);

            // Add pulsing glow effect
            this.scene.tweens.add({
                targets: boundary,
                alpha: { from: 0.3, to: 0.8 },
                duration: 1000,
                yoyo: true,
                repeat: -1
            });
        });
    }

    createDrones() {
        // Create AI-controlled drone obstacles
        for (let i = 0; i < 6; i++) {
            const x = Phaser.Math.Between(150, GameConfig.width - 150);
            const y = Phaser.Math.Between(150, GameConfig.height - 150);

            const drone = this.scene.add.container(x, y);

            // Drone body
            const body = this.scene.add.rectangle(
                0, 0, 40, 40,
                GameConfig.colors.techPurple, 0.8
            );

            // Propellers
            const prop1 = this.scene.add.circle(-15, -15, 8, GameConfig.colors.techNeon, 0.6);
            const prop2 = this.scene.add.circle(15, -15, 8, GameConfig.colors.techNeon, 0.6);
            const prop3 = this.scene.add.circle(-15, 15, 8, GameConfig.colors.techNeon, 0.6);
            const prop4 = this.scene.add.circle(15, 15, 8, GameConfig.colors.techNeon, 0.6);

            // LED indicator
            const led = this.scene.add.circle(0, 0, 5, 0xFF0000);

            // Scanner beam
            const beam = this.scene.add.rectangle(0, 20, 2, 40, GameConfig.colors.techNeon, 0.4);

            drone.add([body, prop1, prop2, prop3, prop4, led, beam]);

            this.scene.physics.add.existing(drone);
            drone.body.setCircle(25);

            // Propeller rotation
            [prop1, prop2, prop3, prop4].forEach((prop, index) => {
                this.scene.tweens.add({
                    targets: prop,
                    angle: 360,
                    duration: 500,
                    repeat: -1,
                    delay: index * 100
                });
            });

            // LED blinking
            this.scene.tweens.add({
                targets: led,
                alpha: { from: 0.3, to: 1 },
                duration: 500,
                yoyo: true,
                repeat: -1
            });

            // Beam scanning
            this.scene.tweens.add({
                targets: beam,
                angle: { from: -30, to: 30 },
                duration: 2000,
                yoyo: true,
                repeat: -1
            });

            // Patrol pattern
            const patrolPattern = () => {
                const newX = Phaser.Math.Between(150, GameConfig.width - 150);
                const newY = Phaser.Math.Between(150, GameConfig.height - 150);

                this.scene.tweens.add({
                    targets: drone,
                    x: newX,
                    y: newY,
                    duration: 3000,
                    ease: 'Power2',
                    onComplete: patrolPattern
                });
            };

            patrolPattern();

            this.drones.push(drone);
        }
    }

    createDataStreams() {
        // Create flowing data stream effects
        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(0, GameConfig.width);
            const y = -20;

            const stream = this.scene.add.rectangle(
                x, y, 3, 30,
                [GameConfig.colors.techNeon, GameConfig.colors.techPurple, 0x00FF00][i % 3],
                0.7
            );

            this.scene.tweens.add({
                targets: stream,
                y: GameConfig.height + 20,
                duration: Phaser.Math.Between(2000, 4000),
                repeat: -1,
                delay: Phaser.Math.Between(0, 2000)
            });

            this.dataStreams.push(stream);
        }
    }

    createVirtualGoals() {
        // Create holographic goal zones for challenges
        for (let i = 0; i < 3; i++) {
            const x = (GameConfig.width / 4) * (i + 1);
            const y = GameConfig.height / 2;

            // Outer ring
            const ring = this.scene.add.circle(
                x, y, 60,
                GameConfig.colors.techNeon, 0
            );
            ring.setStrokeStyle(4, GameConfig.colors.techNeon, 0.8);

            // Inner target
            const target = this.scene.add.circle(
                x, y, 30,
                GameConfig.colors.techPurple, 0.3
            );

            // Holographic text
            const text = this.scene.add.text(
                x, y, 'GOAL',
                {
                    fontSize: '16px',
                    color: '#00FFFF',
                    fontFamily: 'monospace'
                }
            ).setOrigin(0.5);

            this.scene.physics.add.existing(ring, true);
            this.scene.physics.add.existing(target, true);

            // Rotation animation
            this.scene.tweens.add({
                targets: ring,
                angle: 360,
                duration: 3000,
                repeat: -1
            });

            // Pulse animation
            this.scene.tweens.add({
                targets: [ring, target, text],
                scale: { from: 1, to: 1.2 },
                alpha: { from: 0.5, to: 1 },
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            this.virtualGoals.push({ ring, target, x, y });
        }
    }

    createHolographicElements() {
        // Create floating holographic displays
        const displays = [];

        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(100, GameConfig.width - 100);
            const y = Phaser.Math.Between(100, GameConfig.height - 100);

            // Holographic screen
            const screen = this.scene.add.rectangle(
                x, y, 60, 40,
                GameConfig.colors.techNeon, 0.2
            );
            screen.setStrokeStyle(2, GameConfig.colors.techNeon, 0.6);

            // Scanlines
            const graphics = this.scene.add.graphics();
            graphics.lineStyle(1, GameConfig.colors.techNeon, 0.3);
            for (let line = 0; line < 40; line += 4) {
                graphics.lineBetween(x - 30, y - 20 + line, x + 30, y - 20 + line);
            }

            // Floating animation
            this.scene.tweens.add({
                targets: [screen, graphics],
                y: y + 10,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            // Flicker effect
            this.scene.tweens.add({
                targets: screen,
                alpha: { from: 0.2, to: 0.4 },
                duration: 100,
                yoyo: true,
                repeat: -1
            });

            displays.push(screen);
        }
    }

    createNeonGrid() {
        // Create animated neon grid floor effect
        const gridLines = [];

        for (let i = 0; i < 10; i++) {
            const line = this.scene.add.line(
                0, 0,
                0, GameConfig.height - (i * 60),
                GameConfig.width, GameConfig.height - (i * 60),
                GameConfig.colors.techNeon,
                0.2
            );
            line.setOrigin(0, 0);

            this.scene.tweens.add({
                targets: line,
                alpha: { from: 0.1, to: 0.4 },
                duration: 1000,
                yoyo: true,
                repeat: -1,
                delay: i * 100
            });

            gridLines.push(line);
        }
    }

    update() {
        // Update tech elements (mostly handled by tweens)
    }

    onVirtualGoalHit(player) {
        // Called when player enters virtual goal zone
        console.log('Virtual Goal Complete! +150 points');

        // Create digital explosion effect
        this.createDigitalExplosion(player.x, player.y);

        return 150; // Points awarded
    }

    onDroneHit(player) {
        // Called when player collides with drone
        console.log('Drone collision! -30 points');

        // Create EMP effect
        this.createEMPEffect(player.x, player.y);

        return -30; // Points penalty
    }

    createDigitalExplosion(x, y) {
        // Create particle burst with digital aesthetic
        const colors = [
            GameConfig.colors.techNeon,
            GameConfig.colors.techPurple,
            0x00FF00,
            0xFF00FF
        ];

        for (let i = 0; i < 30; i++) {
            const particle = this.scene.add.rectangle(
                x, y, 8, 8,
                colors[i % colors.length],
                0.8
            );

            const angle = (Math.PI * 2 * i) / 30;
            const distance = 100;

            this.scene.tweens.add({
                targets: particle,
                x: x + Math.cos(angle) * distance,
                y: y + Math.sin(angle) * distance,
                alpha: 0,
                angle: 360,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => particle.destroy()
            });
        }

        // Add text popup
        const text = this.scene.add.text(
            x, y, '+150',
            {
                fontSize: '32px',
                color: '#00FFFF',
                fontFamily: 'monospace',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        this.scene.tweens.add({
            targets: text,
            y: y - 50,
            alpha: 0,
            duration: 1500,
            onComplete: () => text.destroy()
        });
    }

    createEMPEffect(x, y) {
        // Electromagnetic pulse visual effect
        const wave = this.scene.add.circle(x, y, 10, 0xFF00FF, 0.6);

        this.scene.tweens.add({
            targets: wave,
            radius: 80,
            alpha: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => wave.destroy()
        });

        // Static effect
        for (let i = 0; i < 15; i++) {
            const static = this.scene.add.rectangle(
                x + Phaser.Math.Between(-50, 50),
                y + Phaser.Math.Between(-50, 50),
                3, 10,
                0xFFFFFF,
                0.8
            );

            this.scene.tweens.add({
                targets: static,
                alpha: 0,
                duration: 300,
                onComplete: () => static.destroy()
            });
        }
    }

    getDrones() {
        return this.drones;
    }

    getVirtualGoals() {
        return this.virtualGoals;
    }

    getObstacles() {
        return this.obstacles;
    }

    getBoundaries() {
        return this.boundaries;
    }
}
