/**
 * Character Classes
 * Defines player characters and their attributes
 */

class Character {
    constructor(config) {
        this.name = config.name;
        this.type = config.type;
        this.speed = config.speed;
        this.handling = config.handling;
        this.acceleration = config.acceleration;
        this.customization = {
            color: '#FFFFFF',
            decal: 'default',
            pattern: 'solid'
        };
    }

    setCustomization(options) {
        if (options.color) this.customization.color = options.color;
        if (options.decal) this.customization.decal = options.decal;
        if (options.pattern) this.customization.pattern = options.pattern;
    }

    getStats() {
        return {
            speed: this.speed,
            handling: this.handling,
            acceleration: this.acceleration
        };
    }
}

class ManchesterPlayer extends Character {
    constructor(config) {
        super(config);
        this.team = 'Manchester United';
        this.jerseyNumber = config.jerseyNumber || 7;
    }

    applyTeamBonus() {
        // Team mode bonus
        return {
            speed: this.speed * 1.1,
            handling: this.handling * 1.05,
            acceleration: this.acceleration * 1.1
        };
    }
}

class SeaOtter extends Character {
    constructor(config) {
        super(config);
        this.species = 'Sea Otter';
        this.favoriteFood = config.favoriteFood || 'fish';
        this.agility = 5; // Otters have high agility
    }

    applyAgilityBonus() {
        // Sea otters get agility bonus on beach track
        return {
            speed: this.speed,
            handling: this.handling * 1.2,
            acceleration: this.acceleration * 1.15
        };
    }
}

// Factory function to create characters
function createCharacter(characterKey) {
    const config = GameConfig.characters[characterKey];

    if (config.type === 'player') {
        return new ManchesterPlayer({
            ...config,
            jerseyNumber: characterKey === 'ronaldo' ? 7 :
                         characterKey === 'fernandes' ? 18 : 10
        });
    } else if (config.type === 'otter') {
        return new SeaOtter({
            ...config,
            favoriteFood: characterKey === 'seaOtter' ? 'fish' : 'clams'
        });
    }

    return new Character(config);
}
