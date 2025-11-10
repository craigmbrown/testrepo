/**
 * Menu Scene
 * Main menu for game start and track selection
 */

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const { width, height } = this.scale;

        // Background gradient
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(
            0x667eea, 0x667eea,
            0x764ba2, 0x764ba2,
            1
        );
        graphics.fillRect(0, 0, width, height);

        // Animated background particles
        this.createBackgroundParticles();

        // Title
        const title = this.add.text(
            width / 2, 100,
            'SOCCER SPRINT',
            {
                fontSize: '72px',
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8
            }
        ).setOrigin(0.5);

        // Subtitle
        const subtitle = this.add.text(
            width / 2, 180,
            'A Racing Adventure with Manchester United & Sea Otters',
            {
                fontSize: '20px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // Pulsing title animation
        this.tweens.add({
            targets: title,
            scale: { from: 1, to: 1.05 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Track selection cards
        const tracks = [
            {
                key: 'stadium',
                name: 'Soccer Stadium',
                description: 'Race through Manchester United\'s futuristic stadium',
                color: 0xe74c3c,
                y: 300
            },
            {
                key: 'beach',
                name: 'Sea Otter Beach',
                description: 'Navigate the sunset beach dodging playful otters',
                color: 0xf39c12,
                y: 420
            },
            {
                key: 'techHub',
                name: 'Tech Hub Circuit',
                description: 'Speed through the neon-lit digital raceway',
                color: 0x3498db,
                y: 540
            }
        ];

        tracks.forEach((track, index) => {
            this.createTrackCard(track, index);
        });

        // Instructions
        const instructions = this.add.text(
            width / 2, height - 40,
            'Click a track to start racing!',
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // Blinking animation for instructions
        this.tweens.add({
            targets: instructions,
            alpha: { from: 0.5, to: 1 },
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }

    createTrackCard(track, index) {
        const { width } = this.scale;
        const cardWidth = 700;
        const cardHeight = 90;
        const x = width / 2;
        const y = track.y;

        // Card container
        const card = this.add.container(x, y);

        // Card background
        const bg = this.add.rectangle(0, 0, cardWidth, cardHeight, track.color, 0.8);
        bg.setStrokeStyle(3, 0xffffff, 0.8);

        // Track name
        const name = this.add.text(
            -cardWidth / 2 + 20, -15,
            track.name,
            {
                fontSize: '28px',
                fontFamily: 'Arial Black',
                color: '#ffffff'
            }
        );

        // Track description
        const desc = this.add.text(
            -cardWidth / 2 + 20, 15,
            track.description,
            {
                fontSize: '16px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        );

        // Difficulty badge
        const difficulty = GameConfig.tracks[track.key].difficulty;
        const badge = this.add.text(
            cardWidth / 2 - 100, 0,
            difficulty,
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#000000',
                backgroundColor: '#ffffff',
                padding: { x: 10, y: 5 }
            }
        ).setOrigin(0.5);

        card.add([bg, name, desc, badge]);

        // Make interactive
        bg.setInteractive({ useHandCursor: true });

        bg.on('pointerover', () => {
            this.tweens.add({
                targets: card,
                scale: 1.05,
                duration: 200
            });
            bg.setFillStyle(track.color, 1);
        });

        bg.on('pointerout', () => {
            this.tweens.add({
                targets: card,
                scale: 1,
                duration: 200
            });
            bg.setFillStyle(track.color, 0.8);
        });

        bg.on('pointerdown', () => {
            // Flash effect
            this.tweens.add({
                targets: card,
                alpha: 0.5,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.registry.set('selectedTrack', track.key);
                    this.scene.start('CharacterSelectScene');
                }
            });
        });

        // Entrance animation
        card.setAlpha(0);
        card.y += 50;
        this.tweens.add({
            targets: card,
            alpha: 1,
            y: track.y,
            duration: 500,
            delay: index * 200,
            ease: 'Back.easeOut'
        });
    }

    createBackgroundParticles() {
        // Create floating particles for atmosphere
        for (let i = 0; i < 30; i++) {
            const x = Phaser.Math.Between(0, this.scale.width);
            const y = Phaser.Math.Between(0, this.scale.height);

            const particle = this.add.circle(
                x, y,
                Phaser.Math.Between(2, 5),
                0xffffff,
                0.3
            );

            this.tweens.add({
                targets: particle,
                x: x + Phaser.Math.Between(-100, 100),
                y: y + Phaser.Math.Between(-100, 100),
                alpha: { from: 0.1, to: 0.5 },
                duration: Phaser.Math.Between(3000, 6000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }
}
