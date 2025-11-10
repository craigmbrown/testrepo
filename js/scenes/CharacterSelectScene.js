/**
 * Character Selection Scene
 * Choose between Manchester United players or Sea Otters
 */

class CharacterSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectScene' });
        this.selectedCharacter = null;
    }

    create() {
        const { width, height } = this.scale;

        // Background
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(
            0x2c3e50, 0x2c3e50,
            0x34495e, 0x34495e,
            1
        );
        graphics.fillRect(0, 0, width, height);

        // Title
        const title = this.add.text(
            width / 2, 60,
            'SELECT YOUR RACER',
            {
                fontSize: '48px',
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 6
            }
        ).setOrigin(0.5);

        // Section headers
        this.add.text(
            200, 140,
            'MANCHESTER UNITED PLAYERS',
            {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#DA291C'
            }
        ).setOrigin(0.5);

        this.add.text(
            width - 200, 140,
            'SEA OTTERS',
            {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#f39c12'
            }
        ).setOrigin(0.5);

        // Create character cards
        const players = ['ronaldo', 'fernandes', 'rashford'];
        const otters = ['seaOtter', 'speedOtter'];

        players.forEach((key, index) => {
            this.createCharacterCard(key, 200, 220 + (index * 150));
        });

        otters.forEach((key, index) => {
            this.createCharacterCard(key, width - 200, 220 + (index * 150));
        });

        // Customization panel (initially hidden)
        this.createCustomizationPanel();

        // Back button
        this.createBackButton();

        // Start race button (initially disabled)
        this.createStartButton();
    }

    createCharacterCard(characterKey, x, y) {
        const character = GameConfig.characters[characterKey];
        const cardWidth = 300;
        const cardHeight = 120;

        const card = this.add.container(x, y);

        // Card background
        const bg = this.add.rectangle(
            0, 0, cardWidth, cardHeight,
            character.type === 'player' ? 0xDA291C : 0xf39c12,
            0.7
        );
        bg.setStrokeStyle(3, 0xffffff, 0.5);

        // Character name
        const name = this.add.text(
            0, -30,
            character.name,
            {
                fontSize: '22px',
                fontFamily: 'Arial Black',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        // Stats
        const stats = this.add.text(
            0, 10,
            `Speed: ${'★'.repeat(character.speed)}\n` +
            `Handling: ${'★'.repeat(character.handling)}\n` +
            `Accel: ${'★'.repeat(character.acceleration)}`,
            {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);

        card.add([bg, name, stats]);

        // Make interactive
        bg.setInteractive({ useHandCursor: true });

        bg.on('pointerover', () => {
            this.tweens.add({
                targets: card,
                scale: 1.05,
                duration: 200
            });
            bg.setStrokeStyle(3, 0xffffff, 1);
        });

        bg.on('pointerout', () => {
            if (this.selectedCharacter !== characterKey) {
                this.tweens.add({
                    targets: card,
                    scale: 1,
                    duration: 200
                });
                bg.setStrokeStyle(3, 0xffffff, 0.5);
            }
        });

        bg.on('pointerdown', () => {
            this.selectCharacter(characterKey, card, bg);
        });

        // Store reference
        card.characterKey = characterKey;
        card.bgRect = bg;

        // Entrance animation
        card.setAlpha(0);
        card.x -= 50;
        this.tweens.add({
            targets: card,
            alpha: 1,
            x: x,
            duration: 400,
            ease: 'Back.easeOut'
        });
    }

    selectCharacter(characterKey, card, bg) {
        // Deselect previous
        if (this.selectedCard) {
            this.selectedCard.bgRect.setStrokeStyle(3, 0xffffff, 0.5);
            this.tweens.add({
                targets: this.selectedCard,
                scale: 1,
                duration: 200
            });
        }

        // Select new
        this.selectedCharacter = characterKey;
        this.selectedCard = card;
        bg.setStrokeStyle(3, 0xFFFF00, 1);

        // Show customization panel
        this.showCustomizationPanel();

        // Enable start button
        this.startButton.setAlpha(1);
        this.startButton.setInteractive();
    }

    createCustomizationPanel() {
        const { width, height } = this.scale;

        this.customizationPanel = this.add.container(width / 2, height - 120);
        this.customizationPanel.setAlpha(0);

        const bg = this.add.rectangle(0, 0, 600, 100, 0x34495e, 0.9);
        bg.setStrokeStyle(2, 0xffffff, 0.5);

        const title = this.add.text(
            0, -30,
            'CUSTOMIZE YOUR VEHICLE',
            {
                fontSize: '20px',
                fontFamily: 'Arial Black',
                color: '#ffffff'
            }
        ).setOrigin(0.5);

        const colorText = this.add.text(
            -200, 10,
            'Color:',
            {
                fontSize: '16px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        );

        // Color options
        const colors = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF];
        colors.forEach((color, index) => {
            const colorBtn = this.add.circle(
                -100 + (index * 40), 10,
                12, color
            );
            colorBtn.setStrokeStyle(2, 0xffffff);
            colorBtn.setInteractive({ useHandCursor: true });

            colorBtn.on('pointerdown', () => {
                this.registry.set('vehicleColor', color);
            });

            this.customizationPanel.add(colorBtn);
        });

        this.customizationPanel.add([bg, title, colorText]);
    }

    showCustomizationPanel() {
        this.tweens.add({
            targets: this.customizationPanel,
            alpha: 1,
            y: this.scale.height - 120,
            duration: 300,
            ease: 'Power2'
        });
    }

    createBackButton() {
        const backBtn = this.add.text(
            40, 40,
            '← BACK',
            {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#ffffff'
            }
        ).setInteractive({ useHandCursor: true });

        backBtn.on('pointerover', () => {
            backBtn.setColor('#ffff00');
        });

        backBtn.on('pointerout', () => {
            backBtn.setColor('#ffffff');
        });

        backBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }

    createStartButton() {
        const { width } = this.scale;

        this.startButton = this.add.text(
            width - 40, 40,
            'START RACE →',
            {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#ffffff'
            }
        ).setOrigin(1, 0);

        this.startButton.setAlpha(0.3);

        this.startButton.on('pointerover', () => {
            if (this.selectedCharacter) {
                this.startButton.setColor('#00ff00');
                this.tweens.add({
                    targets: this.startButton,
                    scale: 1.1,
                    duration: 200
                });
            }
        });

        this.startButton.on('pointerout', () => {
            this.startButton.setColor('#ffffff');
            this.tweens.add({
                targets: this.startButton,
                scale: 1,
                duration: 200
            });
        });

        this.startButton.on('pointerdown', () => {
            if (this.selectedCharacter) {
                this.registry.set('selectedCharacter', this.selectedCharacter);
                this.scene.start('RaceScene');
            }
        });
    }
}
