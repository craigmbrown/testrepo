# Soccer Sprint: A Racing Adventure

A futuristic racing game featuring **Manchester United** players and **Sea Otters** in an epic competition across three unique tracks!

![Game Type](https://img.shields.io/badge/Game-Racing-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Web-blue)
![Framework](https://img.shields.io/badge/Framework-Phaser.js-orange)

## Game Overview

**Soccer Sprint** is an exciting racing game that blends sports, nature, and futuristic technology. Race as your favorite Manchester United player or a speedy sea otter through three spectacular tracks, each with unique challenges and obstacles.

## Features

### Three Unique Tracks

1. **Soccer Stadium** ⚽
   - Race through Manchester United's futuristic stadium
   - Navigate around floating soccer balls
   - Score goals for bonus points
   - Difficulty: Medium
   - Special: Glowing stadium lights and crowd effects

2. **Sea Otter Beach** 🌊
   - Sunset-lit beach with ocean waves
   - Dodge playful sea otters as obstacles
   - Navigate through seashells and starfish
   - Difficulty: Easy
   - Special: Beautiful sunset effects and animated waves

3. **Tech Hub Circuit** 💻
   - Neon-lit, high-tech racing circuit
   - Avoid AI-controlled drones
   - Complete virtual goal challenges
   - Difficulty: Hard
   - Special: Holographic displays and data stream effects

### Playable Characters

**Manchester United Players:**
- **Cristiano Ronaldo** - High speed and acceleration
- **Bruno Fernandes** - Balanced stats with excellent handling
- **Marcus Rashford** - Maximum speed with explosive acceleration

**Sea Otters:**
- **Lightning Otter** - Superior handling and agility
- **Speed Otter** - Fast acceleration and top speed

Each character has unique stats:
- ⚡ **Speed**: Maximum velocity
- 🎯 **Handling**: Turning capability
- 🚀 **Acceleration**: How quickly you reach top speed

### Game Mechanics

- **Racing Controls**: Use arrow keys to navigate
- **Boost System**: Press SPACE to activate speed boost (3 boosts per race)
- **Scoring System**:
  - Score goals: +100 to +150 points
  - Hit obstacles: -10 to -30 points
  - Race time tracked
- **Vehicle Customization**: Choose from 5 different colors
- **Special Challenges**: Each track has unique bonus objectives

## How to Play

### Getting Started

1. **Clone or download this repository**
   ```bash
   git clone <repository-url>
   cd testrepo
   ```

2. **Open the game**
   - Simply open `index.html` in a modern web browser
   - No installation or build process required!

3. **Select Your Track**
   - Choose from Soccer Stadium, Sea Otter Beach, or Tech Hub Circuit
   - Each track offers different challenges and difficulty levels

4. **Choose Your Racer**
   - Pick a Manchester United player or a sea otter
   - Review their stats (Speed, Handling, Acceleration)
   - Customize your vehicle color

5. **Race!**
   - Use arrow keys to move
   - Press SPACE for boost
   - Avoid obstacles and score points
   - Try to get the best time and highest score!

### Controls

| Key | Action |
|-----|--------|
| ↑ | Accelerate Forward |
| ↓ | Reverse |
| ← | Turn Left |
| → | Turn Right |
| SPACE | Activate Boost |
| ESC | Pause Game |
| Q | Quit (when paused) |

### Scoring

- **Stadium Track**: Score goals by passing through goal zones (+100 points)
- **Beach Track**: Avoid sea otters (-20 points if hit)
- **Tech Hub**: Complete virtual goals (+150 points), avoid drones (-30 points)
- **Soccer Balls**: Hitting soccer balls in stadium costs -10 points

## Game Strategy Tips

1. **Learn Each Track**: Each track has different obstacles and bonus zones
2. **Save Your Boosts**: Use boosts strategically for difficult sections
3. **Character Selection**: Match character stats to track difficulty
4. **Practice Handling**: Good handling helps avoid penalties
5. **Goal Hunting**: Actively seek goal zones for maximum points

## Technical Details

### Built With

- **Phaser.js 3.70.0** - HTML5 game framework
- **JavaScript ES6** - Game logic and mechanics
- **HTML5 Canvas** - Rendering engine
- **CSS3** - Styling and effects

### Project Structure

```
testrepo/
├── index.html              # Main HTML entry point
├── js/
│   ├── config.js          # Game configuration
│   ├── characters.js      # Character classes
│   ├── main.js            # Game initialization
│   ├── scenes/
│   │   ├── MenuScene.js          # Main menu
│   │   ├── CharacterSelectScene.js  # Character selection
│   │   └── RaceScene.js          # Main race gameplay
│   └── tracks/
│       ├── stadiumTrack.js   # Soccer Stadium
│       ├── beachTrack.js     # Sea Otter Beach
│       └── techHubTrack.js   # Tech Hub Circuit
└── README.md              # This file
```

### Browser Compatibility

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### Performance

- Recommended resolution: 1024x768 or higher
- 60 FPS target frame rate
- Works on desktop and laptop computers
- Mobile support: Limited (designed for keyboard controls)

## Features Breakdown

### Visual Effects

- **Particle Systems**: Speed trails, explosions, celebrations
- **Animation**: Smooth tweening for all movements
- **Lighting**: Dynamic glow effects and neon lighting
- **Weather**: Sunset gradients, waves, data streams
- **Feedback**: Screen shake, flashes, score popups

### Audio (Future Enhancement)

Currently visual-only. Audio features planned:
- Engine sounds
- Collision effects
- Goal celebration sounds
- Background music for each track

## Development

### Future Enhancements

- [ ] Team Mode multiplayer
- [ ] Online leaderboards
- [ ] More characters from Manchester United
- [ ] Additional tracks
- [ ] Power-up items
- [ ] Achievement system
- [ ] Sound effects and music
- [ ] Mobile touch controls
- [ ] Tournament mode

### Contributing

This is a demonstration project. Feel free to:
1. Fork the repository
2. Create feature branches
3. Add new tracks or characters
4. Submit pull requests

## Credits

**Game Design**: Soccer Sprint
**Framework**: Phaser.js by Photon Storm
**Inspiration**: Manchester United FC & Sea Otters

## License

This project is open source and available under the MIT License.

---

## Quick Start Summary

1. Open `index.html` in your browser
2. Select a track
3. Choose your character
4. Customize your vehicle
5. Race and have fun!

**Made with ❤️ for racing and soccer fans everywhere!**

---

## 🤖 Robotic Random Video Generator

**NEW!** This repository also includes an automated AI video generation system powered by Venice AI.

### What is it?

The Robotic Random Video Generator is a Python-based automation tool that creates random, creative videos using Venice AI's state-of-the-art video generation models (Sora 2, Veo 3.1, Kling 2.5 Turbo).

### Features

- 🎬 Automated video generation with customizable delays
- 🎨 8 diverse prompt categories (Nature, Urban, Fantasy, Sci-Fi, Abstract, Animals, Sports, Food)
- 🤖 Fully automated or interactive modes
- 📊 Session tracking and detailed statistics
- 🎯 40+ creative prompts with enhancement system
- ⚙️ Flexible JSON configuration

### Quick Start

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up your Venice AI API key:**
   ```bash
   cp .env.example .env
   # Edit .env and add your API key from https://venice.ai/api-beta
   ```

3. **Run the generator:**
   ```bash
   # Automated mode - generate 10 videos
   python robo_video_maker.py --auto

   # Interactive mode - full control
   python robo_video_maker.py --interactive

   # Single video generation
   python robo_video_maker.py --single
   ```

### Full Documentation

For complete documentation, see [VIDEO_GENERATOR_README.md](VIDEO_GENERATOR_README.md)

### Example Usage

```bash
# Generate 5 videos with 30 second delay between each
python robo_video_maker.py --auto --count 5 --delay 30

# Generate a nature-themed video
python robo_video_maker.py --single --category nature
```

---

**Two projects in one repository:**
- 🏁 **Soccer Sprint** - A futuristic racing game
- 🎬 **Robo Video Maker** - AI-powered video generation