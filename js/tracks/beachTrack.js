/**
 * Beach Track
 * Sunset beach with playful sea otter obstacles
 */

class BeachTrack {
    constructor(scene) {
        this.scene = scene;
        this.name = 'Sea Otter Beach';
        this.trackColor = GameConfig.colors.beachSand;
        this.otters = [];
        this.obstacles = [];
        this.waves = [];
    }

    create() {
        // Create beach background
        this.createBackground();

        // Create track boundaries
        this.createTrackBoundaries();

        // Create sea otter obstacles
        this.createSeaOtters();

        // Create ocean waves
        this.createWaves();

        // Create beach decorations
        this.createBeachElements();

        // Create sunset effect
        this.createSunsetEffect();
    }

    createBackground() {
        const graphics = this.scene.add.graphics();

        // Sand gradient
        graphics.fillGradientStyle(
            GameConfig.colors.beachSand, GameConfig.colors.beachSand,
            0xE8C39E, 0xE8C39E,
            1
        );
        graphics.fillRect(0, 0, GameConfig.width, GameConfig.height * 0.7);

        // Ocean
        graphics.fillGradientStyle(
            GameConfig.colors.oceanBlue, GameConfig.colors.oceanBlue,
            0x004d6d, 0x004d6d,
            1
        );
        graphics.fillRect(
            0, GameConfig.height * 0.7,
            GameConfig.width, GameConfig.height * 0.3
        );

        // Track path
        graphics.lineStyle(150, 0xD2B48C, 0.5);
        graphics.strokeRect(50, 50, GameConfig.width - 100, GameConfig.height - 100);
    }

    createTrackBoundaries() {
        this.boundaries = this.scene.physics.add.staticGroup();

        const margin = 50;
        const thickness = 20;

        // Top boundary
        const top = this.scene.add.rectangle(
            GameConfig.width / 2, margin,
            GameConfig.width - margin * 2, thickness,
            0xFFFFFF, 0
        );

        // Bottom boundary
        const bottom = this.scene.add.rectangle(
            GameConfig.width / 2, GameConfig.height - margin,
            GameConfig.width - margin * 2, thickness,
            0xFFFFFF, 0
        );

        // Left boundary
        const left = this.scene.add.rectangle(
            margin, GameConfig.height / 2,
            thickness, GameConfig.height - margin * 2,
            0xFFFFFF, 0
        );

        // Right boundary
        const right = this.scene.add.rectangle(
            GameConfig.width - margin, GameConfig.height / 2,
            thickness, GameConfig.height - margin * 2,
            0xFFFFFF, 0
        );

        [top, bottom, left, right].forEach(boundary => {
            this.scene.physics.add.existing(boundary, true);
            this.boundaries.add(boundary);
        });
    }

    createSeaOtters() {
        // Create playful sea otter obstacles
        for (let i = 0; i < 8; i++) {
            const x = Phaser.Math.Between(100, GameConfig.width - 100);
            const y = Phaser.Math.Between(100, GameConfig.height - 100);

            // Otter body
            const otter = this.scene.add.container(x, y);

            // Body
            const body = this.scene.add.ellipse(0, 0, 40, 60, 0x8B4513);

            // Head
            const head = this.scene.add.circle(0, -25, 20, 0x8B4513);

            // Eyes
            const eye1 = this.scene.add.circle(-8, -28, 4, 0x000000);
            const eye2 = this.scene.add.circle(8, -28, 4, 0x000000);

            // Nose
            const nose = this.scene.add.circle(0, -20, 3, 0x000000);

            // Whiskers
            const graphics = this.scene.add.graphics();
            graphics.lineStyle(1, 0x000000, 0.5);
            graphics.lineBetween(-15, -22, -30, -22);
            graphics.lineBetween(-15, -20, -30, -18);
            graphics.lineBetween(15, -22, 30, -22);
            graphics.lineBetween(15, -20, 30, -18);

            otter.add([body, head, eye1, eye2, nose, graphics]);

            this.scene.physics.add.existing(otter);
            otter.body.setCircle(30);

            // Random movement pattern
            const movePattern = () => {
                const newX = Phaser.Math.Between(100, GameConfig.width - 100);
                const newY = Phaser.Math.Between(100, GameConfig.height - 100);

                this.scene.tweens.add({
                    targets: otter,
                    x: newX,
                    y: newY,
                    duration: Phaser.Math.Between(2000, 4000),
                    ease: 'Sine.easeInOut',
                    onComplete: movePattern
                });

                // Add playful rotation
                this.scene.tweens.add({
                    targets: otter,
                    angle: Phaser.Math.Between(-15, 15),
                    duration: 500,
                    yoyo: true,
                    repeat: 3
                });
            };

            movePattern();

            this.otters.push(otter);
        }
    }

    createWaves() {
        // Create animated wave effects at the bottom
        for (let i = 0; i < 10; i++) {
            const wave = this.scene.add.ellipse(
                i * (GameConfig.width / 10),
                GameConfig.height * 0.7,
                60, 20,
                0xFFFFFF, 0.3
            );

            this.scene.tweens.add({
                targets: wave,
                y: GameConfig.height * 0.7 + Phaser.Math.Between(-10, 10),
                alpha: { from: 0.2, to: 0.5 },
                duration: Phaser.Math.Between(1500, 2500),
                yoyo: true,
                repeat: -1,
                delay: i * 200
            });

            this.waves.push(wave);
        }
    }

    createBeachElements() {
        // Add seashells, starfish, etc.
        const elements = [];

        for (let i = 0; i < 15; i++) {
            const x = Phaser.Math.Between(50, GameConfig.width - 50);
            const y = Phaser.Math.Between(50, GameConfig.height * 0.6);

            // Seashell
            const shell = this.scene.add.polygon(
                x, y,
                [0, -10, -8, 5, 8, 5],
                0xFFE4C4
            );

            this.scene.tweens.add({
                targets: shell,
                angle: 360,
                duration: 10000,
                repeat: -1
            });

            elements.push(shell);
        }

        // Add starfish
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(50, GameConfig.width - 50);
            const y = Phaser.Math.Between(GameConfig.height * 0.6, GameConfig.height - 50);

            const starfish = this.scene.add.star(x, y, 5, 10, 20, 0xFFA500);

            this.scene.tweens.add({
                targets: starfish,
                scale: { from: 1, to: 1.2 },
                duration: 2000,
                yoyo: true,
                repeat: -1
            });

            elements.push(starfish);
        }

        this.obstacles.push(...elements);
    }

    createSunsetEffect() {
        // Create sunset gradient overlay
        const sunset = this.scene.add.graphics();
        sunset.fillGradientStyle(
            0xFF6B6B, 0xFF6B6B,
            0xFFA07A, 0xFFD700,
            0.3, 0.3, 0.1, 0.1
        );
        sunset.fillRect(0, 0, GameConfig.width, GameConfig.height * 0.5);
        sunset.setDepth(-1);

        // Animated sun
        const sun = this.scene.add.circle(
            GameConfig.width - 150, 100,
            50, 0xFFD700, 0.8
        );

        this.scene.tweens.add({
            targets: sun,
            y: 150,
            scale: { from: 1, to: 1.1 },
            duration: 5000,
            yoyo: true,
            repeat: -1
        });
    }

    update() {
        // Update wave animations (handled by tweens)
    }

    onOtterHit(player) {
        // Called when player collides with otter
        console.log('Otter collision! -20 points');

        // Create splash effect
        this.createSplashEffect(player.x, player.y);

        return -20; // Points penalty
    }

    createSplashEffect(x, y) {
        for (let i = 0; i < 10; i++) {
            const droplet = this.scene.add.circle(
                x, y, 5,
                GameConfig.colors.oceanBlue, 0.6
            );

            this.scene.tweens.add({
                targets: droplet,
                x: x + Phaser.Math.Between(-50, 50),
                y: y + Phaser.Math.Between(-50, 50),
                alpha: 0,
                duration: 600,
                onComplete: () => droplet.destroy()
            });
        }
    }

    getOtters() {
        return this.otters;
    }

    getObstacles() {
        return this.obstacles;
    }

    getBoundaries() {
        return this.boundaries;
    }
}
