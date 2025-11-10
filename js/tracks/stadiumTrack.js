/**
 * Soccer Stadium Track
 * Manchester United's futuristic stadium with goal challenges
 */

class StadiumTrack {
    constructor(scene) {
        this.scene = scene;
        this.name = 'Soccer Stadium';
        this.trackColor = GameConfig.colors.stadiumGreen;
        this.obstacles = [];
        this.goals = [];
        this.crowdParticles = [];
    }

    create() {
        // Create stadium background
        this.createBackground();

        // Create track boundaries
        this.createTrackBoundaries();

        // Create soccer ball obstacles
        this.createSoccerBalls();

        // Create goal challenge zones
        this.createGoalZones();

        // Create crowd atmosphere
        this.createCrowdEffects();

        // Create glowing effects
        this.createStadiumLights();
    }

    createBackground() {
        const graphics = this.scene.add.graphics();

        // Stadium grass
        graphics.fillStyle(this.trackColor, 1);
        graphics.fillRect(0, 0, GameConfig.width, GameConfig.height);

        // Track lines
        graphics.lineStyle(5, 0xFFFFFF, 0.8);
        for (let i = 0; i < GameConfig.width; i += 50) {
            graphics.lineBetween(i, 0, i, GameConfig.height);
        }

        // Center circle
        graphics.strokeCircle(GameConfig.width / 2, GameConfig.height / 2, 100);
    }

    createTrackBoundaries() {
        // Create invisible boundaries for collision
        this.boundaries = this.scene.physics.add.staticGroup();

        // Top and bottom boundaries
        const topBoundary = this.scene.add.rectangle(
            GameConfig.width / 2, 10,
            GameConfig.width, 20,
            0xFFFFFF, 0
        );
        const bottomBoundary = this.scene.add.rectangle(
            GameConfig.width / 2, GameConfig.height - 10,
            GameConfig.width, 20,
            0xFFFFFF, 0
        );

        this.scene.physics.add.existing(topBoundary, true);
        this.scene.physics.add.existing(bottomBoundary, true);

        this.boundaries.add(topBoundary);
        this.boundaries.add(bottomBoundary);
    }

    createSoccerBalls() {
        // Create floating soccer balls as obstacles
        for (let i = 0; i < 10; i++) {
            const x = Phaser.Math.Between(100, GameConfig.width - 100);
            const y = Phaser.Math.Between(100, GameConfig.height - 100);

            const ball = this.scene.add.circle(x, y, 20, 0xFFFFFF);
            this.scene.physics.add.existing(ball);

            // Add pentagon pattern for soccer ball look
            const graphics = this.scene.add.graphics();
            graphics.lineStyle(2, 0x000000, 1);
            graphics.strokeCircle(x, y, 20);

            // Make balls move in patterns
            ball.body.setVelocity(
                Phaser.Math.Between(-100, 100),
                Phaser.Math.Between(-100, 100)
            );
            ball.body.setBounce(1, 1);
            ball.body.setCollideWorldBounds(true);

            this.obstacles.push(ball);
        }
    }

    createGoalZones() {
        // Create goal challenge zones
        const goal1 = this.scene.add.rectangle(
            200, GameConfig.height / 2,
            80, 200,
            GameConfig.colors.manchesterRed, 0.3
        );

        const goal2 = this.scene.add.rectangle(
            GameConfig.width - 200, GameConfig.height / 2,
            80, 200,
            GameConfig.colors.manchesterRed, 0.3
        );

        this.scene.physics.add.existing(goal1, true);
        this.scene.physics.add.existing(goal2, true);

        // Add glowing effect to goals
        this.scene.tweens.add({
            targets: [goal1, goal2],
            alpha: { from: 0.3, to: 0.8 },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        this.goals.push(goal1, goal2);
    }

    createCrowdEffects() {
        // Create animated crowd particles
        const colors = [
            GameConfig.colors.manchesterRed,
            0xFFFFFF,
            0xFFFF00
        ];

        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, GameConfig.width);
            const y = Phaser.Math.Between(0, 100);

            const particle = this.scene.add.circle(
                x, y, 3,
                colors[i % colors.length]
            );

            this.scene.tweens.add({
                targets: particle,
                y: y + Phaser.Math.Between(-20, 20),
                alpha: { from: 0.5, to: 1 },
                duration: Phaser.Math.Between(1000, 2000),
                yoyo: true,
                repeat: -1
            });

            this.crowdParticles.push(particle);
        }
    }

    createStadiumLights() {
        // Create glowing stadium lights effect
        const lights = [];

        for (let i = 0; i < 4; i++) {
            const x = (GameConfig.width / 5) * (i + 1);
            const light = this.scene.add.circle(x, 50, 30, 0xFFFF00, 0.6);

            this.scene.tweens.add({
                targets: light,
                alpha: { from: 0.4, to: 0.8 },
                scale: { from: 0.8, to: 1.2 },
                duration: 800,
                yoyo: true,
                repeat: -1,
                delay: i * 200
            });

            lights.push(light);
        }
    }

    update() {
        // Update track elements
        // Soccer balls continue moving (handled by physics)
    }

    onGoalScored(player) {
        // Called when player enters goal zone
        console.log('GOAL! +100 points');

        // Create celebration effect
        this.createGoalCelebration(player.x, player.y);

        return 100; // Points awarded
    }

    createGoalCelebration(x, y) {
        // Fireworks effect
        for (let i = 0; i < 20; i++) {
            const particle = this.scene.add.circle(
                x, y, 5,
                [GameConfig.colors.manchesterRed, 0xFFFF00, 0xFFFFFF][i % 3]
            );

            this.scene.tweens.add({
                targets: particle,
                x: x + Phaser.Math.Between(-100, 100),
                y: y + Phaser.Math.Between(-100, 100),
                alpha: 0,
                duration: 1000,
                onComplete: () => particle.destroy()
            });
        }
    }

    getObstacles() {
        return this.obstacles;
    }

    getGoals() {
        return this.goals;
    }

    getBoundaries() {
        return this.boundaries;
    }
}
