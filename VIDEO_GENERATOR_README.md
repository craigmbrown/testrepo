# 🤖 Robotic Random Video Generator

An automated video generation system powered by **Venice AI** that creates random, creative videos using state-of-the-art AI models.

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Venice AI](https://img.shields.io/badge/Venice%20AI-Powered-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

- **Automated Video Generation**: Continuously generates videos with customizable delays
- **Random Prompt System**: 8 diverse categories with 40+ creative prompts
- **Multiple AI Models**: Support for Sora 2, Veo 3.1, and Kling 2.5 Turbo
- **Interactive & Automated Modes**: Choose your workflow
- **Prompt Enhancement**: Automatically enhances prompts with cinematic details
- **Session Tracking**: Detailed logs and statistics for each session
- **Flexible Configuration**: Easy JSON-based configuration
- **Category Mixing**: Create unique videos by combining different categories

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Prompt Categories](#prompt-categories)
- [API Models](#api-models)
- [Examples](#examples)
- [Architecture](#architecture)
- [Troubleshooting](#troubleshooting)

## 🚀 Installation

### Prerequisites

- Python 3.8 or higher
- Venice AI API key ([Get one here](https://venice.ai/api-beta))
- pip package manager

### Step 1: Clone or Download

```bash
git clone <repository-url>
cd testrepo
```

### Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:
- `venice-ai` - Venice AI Python client
- `python-dotenv` - Environment variable management
- `requests` - HTTP library

### Step 3: Set Up API Key

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Venice AI API key:
```
VENICE_API_KEY=your_actual_api_key_here
```

**Important**: Never commit your `.env` file to version control!

## ⚙️ Configuration

The system uses `config.json` for all settings. You can customize:

### Video Settings

```json
{
  "video_settings": {
    "models": ["sora-2", "veo-3.1", "kling-2.5-turbo"],
    "default_model": "sora-2",
    "durations": [4, 8, 12],
    "default_duration": 8,
    "aspect_ratios": ["16:9", "9:16", "1:1"],
    "default_aspect_ratio": "16:9",
    "resolution": "720p"
  }
}
```

### Generation Settings

```json
{
  "generation_settings": {
    "auto_mode": true,
    "delay_between_videos": 60,
    "max_videos_per_session": 10,
    "output_directory": "generated_videos"
  }
}
```

### Adding Custom Prompts

Edit the `prompt_categories` section in `config.json` to add your own prompts:

```json
{
  "prompt_categories": {
    "your_category": [
      "Your custom prompt 1",
      "Your custom prompt 2"
    ]
  }
}
```

## 💻 Usage

### Automated Mode

Generate videos automatically with delays between each generation:

```bash
# Use default settings (10 videos, 60s delay)
python robo_video_maker.py --auto

# Generate 5 videos with 30 second delay
python robo_video_maker.py --auto --count 5 --delay 30

# Generate 20 videos with 120 second delay
python robo_video_maker.py --auto --count 20 --delay 120
```

### Interactive Mode

Run the program interactively with a menu:

```bash
python robo_video_maker.py --interactive
```

Interactive menu options:
1. Generate random video (any category)
2. Choose specific category
3. Enter custom prompt
4. View statistics
5. List categories
6. Exit

### Single Video Generation

Generate one video and exit:

```bash
# Random category
python robo_video_maker.py --single

# Specific category
python robo_video_maker.py --single --category nature

# With custom config
python robo_video_maker.py --single --config my_config.json
```

### Testing Individual Components

Test the prompt generator:
```bash
python random_prompts.py
```

Test the video generator:
```bash
python venice_video_generator.py
```

## 🎨 Prompt Categories

The system includes 8 diverse categories with multiple prompts each:

### 1. **Nature** 🌿
- Waterfalls, sunsets, northern lights, ocean waves, forests
- Perfect for scenic and peaceful content

### 2. **Urban** 🏙️
- Cyberpunk cities, skylines, trains, futuristic metropolises
- Great for modern and technological themes

### 3. **Fantasy** 🐉
- Dragons, floating islands, wizards, enchanted forests
- Ideal for magical and mystical content

### 4. **Sci-Fi** 🚀
- Spaceships, alien planets, time travel, robots
- Perfect for futuristic and space themes

### 5. **Abstract** 🎨
- Ink drops, geometric shapes, liquid metal, fractals
- Great for artistic and experimental videos

### 6. **Animals** 🦁
- Lions, dolphins, hummingbirds, wolves, peacocks
- Perfect for wildlife and nature documentaries

### 7. **Sports** ⚽
- Soccer, surfing, basketball, skateboarding, racing
- Ideal for action and athletic content

### 8. **Food** 🍕
- Cooking, chocolate, pizza, sushi, coffee
- Great for culinary and lifestyle content

## 🎥 API Models

The system supports multiple Venice AI video generation models:

### Sora 2
- **Quality**: High (720p, Pro version supports 1080p)
- **Best for**: Realistic, cinematic scenes
- **Default model**: Yes

### Veo 3.1
- **Quality**: Industry-leading
- **Best for**: Professional-grade videos
- **Provider**: Google

### Kling 2.5 Turbo
- **Quality**: Highest available
- **Best for**: Maximum quality output
- **Speed**: Faster processing

## 📖 Examples

### Example 1: Quick Test

```bash
# Generate a single test video
python robo_video_maker.py --single
```

### Example 2: Automated Campaign

```bash
# Generate 30 videos over 1 hour (120s delay)
python robo_video_maker.py --auto --count 30 --delay 120
```

### Example 3: Category Focus

```bash
# Interactive mode, choose nature category
python robo_video_maker.py --interactive
# Then select option 2 and choose "nature"
```

### Example 4: Custom Configuration

Create `my_config.json`:
```json
{
  "video_settings": {
    "default_model": "veo-3.1",
    "default_duration": 12
  },
  "generation_settings": {
    "max_videos_per_session": 50,
    "delay_between_videos": 180
  }
}
```

Run with custom config:
```bash
python robo_video_maker.py --auto --config my_config.json
```

## 🏗️ Architecture

### Project Structure

```
testrepo/
├── robo_video_maker.py          # Main automation script
├── random_prompts.py             # Prompt generation engine
├── venice_video_generator.py    # Venice AI integration
├── config.json                   # Configuration file
├── requirements.txt              # Python dependencies
├── .env.example                  # Environment template
├── .env                          # Your API key (create this)
├── VIDEO_GENERATOR_README.md    # This file
└── generated_videos/             # Output directory (auto-created)
    ├── video_001_metadata.json
    ├── video_002_metadata.json
    └── session_log_*.json
```

### Component Overview

1. **RoboVideoMaker** (`robo_video_maker.py`)
   - Main orchestrator
   - Handles automation and user interaction
   - Manages session tracking and logging

2. **RandomPromptGenerator** (`random_prompts.py`)
   - Generates creative prompts
   - Manages categories
   - Enhances prompts with cinematic details

3. **VeniceVideoGenerator** (`venice_video_generator.py`)
   - Interfaces with Venice AI API
   - Handles video generation
   - Tracks statistics and metadata

## 📊 Output Files

### Metadata Files

Each generated video creates a metadata JSON file:

```json
{
  "success": true,
  "prompt": "A majestic eagle soaring through clouds...",
  "model": "sora-2",
  "duration": 8,
  "aspect_ratio": "16:9",
  "generation_time": 45.2,
  "timestamp": "2025-11-13T10:30:45.123456"
}
```

### Session Logs

Each session creates a comprehensive log:

```json
{
  "session_start": "2025-11-13T10:00:00",
  "session_end": "2025-11-13T11:30:00",
  "videos": [...],
  "statistics": {
    "videos_generated": 10,
    "videos_failed": 0,
    "success_rate": 100,
    "average_generation_time": 42.5
  }
}
```

### Application Log

Runtime logs are saved to `robo_video_maker.log`:

```
2025-11-13 10:00:00 - INFO - Initializing Robotic Video Maker...
2025-11-13 10:00:01 - INFO - Venice AI client initialized successfully
2025-11-13 10:00:05 - INFO - Generating video with model: sora-2
2025-11-13 10:00:50 - INFO - ✓ Video generated successfully in 45.2s
```

## 🔧 Troubleshooting

### API Key Issues

**Problem**: `Venice AI client not initialized`

**Solution**:
1. Verify `.env` file exists
2. Check `VENICE_API_KEY` is set correctly
3. Ensure no extra spaces in the key

### Import Errors

**Problem**: `ModuleNotFoundError: No module named 'venice_ai'`

**Solution**:
```bash
pip install venice-ai
```

### Configuration Issues

**Problem**: `Error loading config`

**Solution**:
1. Verify `config.json` is valid JSON
2. Check file permissions
3. Restore from default if corrupted

### Rate Limiting

**Problem**: API rate limit exceeded

**Solution**:
- Increase `delay_between_videos` in config
- Reduce `max_videos_per_session`
- Check your Venice AI account limits

### Permission Errors

**Problem**: Cannot create output directory

**Solution**:
```bash
mkdir generated_videos
chmod 755 generated_videos
```

## 🎯 Best Practices

### For Best Results

1. **Prompt Quality**: Use descriptive, detailed prompts
2. **Model Selection**: Choose appropriate model for content type
3. **Duration**: Start with 8 seconds for testing
4. **Delays**: Use 60-120 second delays to avoid rate limits
5. **Monitoring**: Check logs regularly in automated mode

### Performance Tips

- Use `sora-2` for faster generation
- Use `kling-2.5-turbo` for highest quality
- Start with shorter durations (4-8s) for testing
- Monitor your Venice AI credits usage

### Security

- Never commit `.env` to version control
- Keep API keys secure
- Rotate keys periodically
- Monitor API usage for unauthorized access

## 📝 Advanced Usage

### Programmatic Usage

You can import and use the components in your own Python scripts:

```python
from random_prompts import RandomPromptGenerator
from venice_video_generator import VeniceVideoGenerator

# Initialize
prompt_gen = RandomPromptGenerator()
video_gen = VeniceVideoGenerator()

# Generate prompt
category, prompt = prompt_gen.get_random_prompt("nature")
enhanced = prompt_gen.enhance_prompt(prompt)

# Generate video
result = video_gen.generate_video(
    prompt=enhanced,
    model="sora-2",
    duration=8
)

# Check result
if result and result['success']:
    print(f"Video generated: {result['video_id']}")
```

### Custom Workflows

Create your own automation scripts by combining components:

```python
from robo_video_maker import RoboVideoMaker

robot = RoboVideoMaker()

# Generate videos from specific categories only
categories = ['nature', 'fantasy', 'sci-fi']
for category in categories:
    robot.generate_single_video(category=category)
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Add more prompt categories
2. Improve prompt enhancement algorithms
3. Add support for more Venice AI features
4. Improve error handling and logging
5. Add unit tests

## 📄 License

This project is licensed under the MIT License.

## 🙏 Credits

- **Venice AI**: For providing the powerful video generation API
- **Python Community**: For excellent libraries and tools

## 📞 Support

For issues and questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review Venice AI documentation: https://docs.venice.ai
3. Check application logs: `robo_video_maker.log`

## 🔮 Future Enhancements

Planned features:
- [ ] Video downloading and storage
- [ ] Web interface for easier control
- [ ] Batch prompt import from CSV
- [ ] Advanced scheduling system
- [ ] Integration with other AI models
- [ ] Video quality comparison tools
- [ ] Cost tracking and optimization
- [ ] Multi-language prompt support

---

**Made with ❤️ for AI video enthusiasts!**

🚀 Start generating amazing videos with Venice AI today!
