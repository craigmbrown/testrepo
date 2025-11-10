/**
 * Main Game Entry Point
 * Soccer Sprint: A Racing Adventure with Manchester United and Sea Otters
 */

const config = {
    type: Phaser.AUTO,
    width: GameConfig.width,
    height: GameConfig.height,
    parent: 'game-container',
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MenuScene, CharacterSelectScene, RaceScene]
};

const game = new Phaser.Game(config);

// Global game events
game.events.on('ready', () => {
    console.log('Soccer Sprint: Game Loaded!');
    console.log('Choose your track and racer to begin!');
});
