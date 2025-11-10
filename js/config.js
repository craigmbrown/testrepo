/**
 * Game Configuration
 * Soccer Sprint: A Racing Adventure with Manchester United and Sea Otters
 */

const GameConfig = {
    // Game dimensions
    width: 1024,
    height: 768,

    // Physics
    gravity: 0,

    // Game settings
    maxSpeed: 500,
    acceleration: 300,
    friction: 0.95,

    // Tracks
    tracks: {
        stadium: {
            name: 'Soccer Stadium',
            description: 'Race through Manchester United\'s futuristic stadium',
            difficulty: 'Medium',
            color: '#e74c3c'
        },
        beach: {
            name: 'Sea Otter Beach',
            description: 'Navigate the sunset beach while dodging playful otters',
            difficulty: 'Easy',
            color: '#f39c12'
        },
        techHub: {
            name: 'Tech Hub Circuit',
            description: 'Speed through the neon-lit digital raceway',
            difficulty: 'Hard',
            color: '#3498db'
        }
    },

    // Characters
    characters: {
        ronaldo: {
            name: 'Cristiano Ronaldo',
            type: 'player',
            speed: 5,
            handling: 4,
            acceleration: 5
        },
        fernandes: {
            name: 'Bruno Fernandes',
            type: 'player',
            speed: 4,
            handling: 5,
            acceleration: 4
        },
        rashford: {
            name: 'Marcus Rashford',
            type: 'player',
            speed: 5,
            handling: 3,
            acceleration: 5
        },
        seaOtter: {
            name: 'Lightning Otter',
            type: 'otter',
            speed: 3,
            handling: 5,
            acceleration: 4
        },
        speedOtter: {
            name: 'Speed Otter',
            type: 'otter',
            speed: 5,
            handling: 3,
            acceleration: 5
        }
    },

    // Colors
    colors: {
        manchesterRed: 0xDA291C,
        stadiumGreen: 0x00A650,
        beachSand: 0xF4A460,
        oceanBlue: 0x006994,
        techNeon: 0x00FFFF,
        techPurple: 0x9D00FF
    }
};
