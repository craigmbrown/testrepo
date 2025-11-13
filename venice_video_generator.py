"""
Venice AI Video Generator
Interfaces with Venice AI API to generate videos from text prompts.
"""

import os
import json
import time
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, Optional, List
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class VeniceVideoGenerator:
    """Handles video generation using Venice AI API."""

    def __init__(self, config_path: str = "config.json"):
        """
        Initialize the Venice AI video generator.

        Args:
            config_path: Path to configuration file
        """
        # Load environment variables
        load_dotenv()

        # Load configuration
        self.config = self._load_config(config_path)
        self.video_settings = self.config.get("video_settings", {})
        self.generation_settings = self.config.get("generation_settings", {})

        # Set up API key
        self.api_key = os.getenv("VENICE_API_KEY")
        if not self.api_key:
            logger.warning("VENICE_API_KEY not found in environment variables")

        # Create output directory
        self.output_dir = Path(self.generation_settings.get("output_directory", "generated_videos"))
        self.output_dir.mkdir(exist_ok=True)

        # Initialize Venice AI client (will be imported when needed)
        self.client = None
        self._init_client()

        # Statistics
        self.stats = {
            "videos_generated": 0,
            "videos_failed": 0,
            "total_generation_time": 0
        }

    def _load_config(self, config_path: str) -> Dict:
        """Load configuration from JSON file."""
        try:
            with open(config_path, 'r') as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Error loading config: {e}")
            return {}

    def _init_client(self):
        """Initialize Venice AI client."""
        try:
            import venice_ai
            if self.api_key:
                self.client = venice_ai.VeniceClient(api_key=self.api_key)
                logger.info("Venice AI client initialized successfully")
            else:
                logger.warning("Cannot initialize Venice AI client without API key")
        except ImportError:
            logger.warning("venice_ai package not installed. Install with: pip install venice-ai")
        except Exception as e:
            logger.error(f"Error initializing Venice AI client: {e}")

    def generate_video(
        self,
        prompt: str,
        model: Optional[str] = None,
        duration: Optional[int] = None,
        aspect_ratio: Optional[str] = None
    ) -> Optional[Dict]:
        """
        Generate a video using Venice AI.

        Args:
            prompt: Text description of the video to generate
            model: Video generation model (e.g., 'sora-2', 'veo-3.1', 'kling-2.5-turbo')
            duration: Video duration in seconds (4, 8, or 12)
            aspect_ratio: Video aspect ratio (e.g., '16:9', '9:16', '1:1')

        Returns:
            Dictionary with video information or None if failed
        """
        if not self.client:
            logger.error("Venice AI client not initialized. Check your API key.")
            return None

        # Use defaults from config if not specified
        model = model or self.video_settings.get("default_model", "sora-2")
        duration = duration or self.video_settings.get("default_duration", 8)
        aspect_ratio = aspect_ratio or self.video_settings.get("default_aspect_ratio", "16:9")

        logger.info(f"Generating video with model: {model}")
        logger.info(f"Prompt: {prompt}")
        logger.info(f"Duration: {duration}s, Aspect Ratio: {aspect_ratio}")

        start_time = time.time()

        try:
            # Note: The actual API call may differ based on venice_ai library implementation
            # This is a generic implementation that should be adapted to the actual API

            # For demonstration purposes, we'll simulate the API call structure
            # Actual implementation would use: response = self.client.video.generate(...)

            response = self._call_venice_api(
                prompt=prompt,
                model=model,
                duration=duration,
                aspect_ratio=aspect_ratio
            )

            generation_time = time.time() - start_time

            if response:
                self.stats["videos_generated"] += 1
                self.stats["total_generation_time"] += generation_time

                result = {
                    "success": True,
                    "prompt": prompt,
                    "model": model,
                    "duration": duration,
                    "aspect_ratio": aspect_ratio,
                    "generation_time": generation_time,
                    "timestamp": datetime.now().isoformat(),
                    "response": response
                }

                logger.info(f"Video generated successfully in {generation_time:.2f}s")
                return result
            else:
                raise Exception("No response from API")

        except Exception as e:
            self.stats["videos_failed"] += 1
            logger.error(f"Error generating video: {e}")
            return {
                "success": False,
                "error": str(e),
                "prompt": prompt,
                "timestamp": datetime.now().isoformat()
            }

    def _call_venice_api(
        self,
        prompt: str,
        model: str,
        duration: int,
        aspect_ratio: str
    ) -> Optional[Dict]:
        """
        Call Venice AI API to generate video.

        Note: This is a placeholder implementation.
        Actual implementation depends on the venice_ai library's API structure.

        Args:
            prompt: Video description
            model: Model name
            duration: Video duration
            aspect_ratio: Aspect ratio

        Returns:
            API response or None
        """
        try:
            # Placeholder for actual API call
            # The real implementation would be something like:
            # response = self.client.video.generate(
            #     prompt=prompt,
            #     model=model,
            #     duration=duration,
            #     aspect_ratio=aspect_ratio
            # )

            # For now, we'll return a simulated response
            logger.info("Simulating Venice AI API call...")
            logger.info("To use real API, ensure venice-ai package is installed and API key is set")

            return {
                "video_id": f"sim_{int(time.time())}",
                "status": "simulated",
                "url": "https://example.com/video.mp4",
                "note": "This is a simulated response. Install venice-ai and set API key for real generation."
            }

        except Exception as e:
            logger.error(f"API call failed: {e}")
            return None

    def save_metadata(self, video_info: Dict, filename: str = None):
        """
        Save video generation metadata to JSON file.

        Args:
            video_info: Video information dictionary
            filename: Optional custom filename
        """
        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"video_metadata_{timestamp}.json"

        filepath = self.output_dir / filename

        try:
            with open(filepath, 'w') as f:
                json.dump(video_info, f, indent=2)
            logger.info(f"Metadata saved to {filepath}")
        except Exception as e:
            logger.error(f"Error saving metadata: {e}")

    def get_statistics(self) -> Dict:
        """Get generation statistics."""
        avg_time = (
            self.stats["total_generation_time"] / self.stats["videos_generated"]
            if self.stats["videos_generated"] > 0
            else 0
        )

        return {
            **self.stats,
            "average_generation_time": avg_time,
            "success_rate": (
                self.stats["videos_generated"] /
                (self.stats["videos_generated"] + self.stats["videos_failed"])
                if (self.stats["videos_generated"] + self.stats["videos_failed"]) > 0
                else 0
            ) * 100
        }

    def list_available_models(self) -> List[str]:
        """Get list of available video generation models."""
        return self.video_settings.get("models", ["sora-2", "veo-3.1", "kling-2.5-turbo"])


def main():
    """Example usage of VeniceVideoGenerator."""
    print("=" * 60)
    print("VENICE AI VIDEO GENERATOR TEST")
    print("=" * 60)

    generator = VeniceVideoGenerator()

    print("\nAvailable Models:")
    for model in generator.list_available_models():
        print(f"  - {model}")

    print("\n" + "=" * 60)
    print("GENERATING TEST VIDEO")
    print("=" * 60)

    test_prompt = "A majestic eagle soaring through clouds at sunset, cinematic lighting, 4K quality"

    result = generator.generate_video(
        prompt=test_prompt,
        model="sora-2",
        duration=8,
        aspect_ratio="16:9"
    )

    if result and result.get("success"):
        print("\n✓ Video generated successfully!")
        print(f"  Prompt: {result['prompt']}")
        print(f"  Generation time: {result['generation_time']:.2f}s")

        # Save metadata
        generator.save_metadata(result)
    else:
        print("\n✗ Video generation failed")
        if result:
            print(f"  Error: {result.get('error', 'Unknown error')}")

    print("\n" + "=" * 60)
    print("STATISTICS")
    print("=" * 60)

    stats = generator.get_statistics()
    print(f"Videos generated: {stats['videos_generated']}")
    print(f"Videos failed: {stats['videos_failed']}")
    print(f"Success rate: {stats['success_rate']:.1f}%")
    print(f"Average generation time: {stats['average_generation_time']:.2f}s")


if __name__ == "__main__":
    main()
