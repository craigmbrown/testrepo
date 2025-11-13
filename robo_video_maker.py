#!/usr/bin/env python3
"""
Robotic Random Video Maker
Automated video generation system using Venice AI

This program continuously generates random videos using Venice AI's video generation API.
It can run in automated mode or interactive mode.
"""

import sys
import time
import json
import logging
import argparse
from datetime import datetime
from pathlib import Path
from typing import Optional

from random_prompts import RandomPromptGenerator
from venice_video_generator import VeniceVideoGenerator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('robo_video_maker.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class RoboVideoMaker:
    """Automated random video generation system."""

    def __init__(self, config_path: str = "config.json"):
        """
        Initialize the robotic video maker.

        Args:
            config_path: Path to configuration file
        """
        logger.info("Initializing Robotic Video Maker...")

        self.prompt_generator = RandomPromptGenerator(config_path)
        self.video_generator = VeniceVideoGenerator(config_path)

        # Load settings
        with open(config_path, 'r') as f:
            config = json.load(f)

        self.settings = config.get("generation_settings", {})
        self.auto_mode = self.settings.get("auto_mode", True)
        self.delay = self.settings.get("delay_between_videos", 60)
        self.max_videos = self.settings.get("max_videos_per_session", 10)

        # Session tracking
        self.session_start = datetime.now()
        self.videos_this_session = 0
        self.session_log = []

        logger.info(f"Auto mode: {self.auto_mode}")
        logger.info(f"Delay between videos: {self.delay}s")
        logger.info(f"Max videos per session: {self.max_videos}")

    def generate_single_video(
        self,
        category: Optional[str] = None,
        enhance: bool = True
    ) -> dict:
        """
        Generate a single random video.

        Args:
            category: Optional category to use, None for random
            enhance: Whether to enhance the prompt

        Returns:
            Video generation result
        """
        # Get random prompt
        cat, prompt = self.prompt_generator.get_random_prompt(category)

        if enhance:
            prompt = self.prompt_generator.enhance_prompt(prompt)

        logger.info(f"Category: {cat}")
        logger.info(f"Prompt: {prompt}")

        # Generate video
        result = self.video_generator.generate_video(prompt)

        # Track session
        self.videos_this_session += 1
        self.session_log.append({
            "number": self.videos_this_session,
            "category": cat,
            "prompt": prompt,
            "result": result,
            "timestamp": datetime.now().isoformat()
        })

        # Save metadata
        if result and result.get("success"):
            filename = f"video_{self.videos_this_session:03d}_metadata.json"
            self.video_generator.save_metadata(result, filename)

        return result

    def run_automated(self, max_videos: Optional[int] = None):
        """
        Run in automated mode, continuously generating videos.

        Args:
            max_videos: Maximum number of videos to generate (overrides config)
        """
        max_vids = max_videos or self.max_videos

        logger.info("=" * 60)
        logger.info("STARTING AUTOMATED VIDEO GENERATION")
        logger.info("=" * 60)
        logger.info(f"Target: {max_vids} videos")
        logger.info(f"Delay between videos: {self.delay}s")
        logger.info("")

        try:
            while self.videos_this_session < max_vids:
                video_num = self.videos_this_session + 1

                logger.info("=" * 60)
                logger.info(f"GENERATING VIDEO {video_num}/{max_vids}")
                logger.info("=" * 60)

                result = self.generate_single_video()

                if result and result.get("success"):
                    logger.info(f"✓ Video {video_num} generated successfully")
                else:
                    logger.error(f"✗ Video {video_num} generation failed")

                # Check if we should continue
                if self.videos_this_session < max_vids:
                    logger.info(f"\nWaiting {self.delay} seconds before next generation...")
                    logger.info(f"Progress: {self.videos_this_session}/{max_vids} videos\n")
                    time.sleep(self.delay)

        except KeyboardInterrupt:
            logger.info("\n\nAutomated generation interrupted by user")

        finally:
            self._print_session_summary()

    def run_interactive(self):
        """Run in interactive mode with user prompts."""
        logger.info("=" * 60)
        logger.info("INTERACTIVE MODE")
        logger.info("=" * 60)

        categories = self.prompt_generator.list_categories()

        while True:
            print("\n" + "=" * 60)
            print("OPTIONS:")
            print("  1. Generate random video (any category)")
            print("  2. Choose category")
            print("  3. Enter custom prompt")
            print("  4. View statistics")
            print("  5. List categories")
            print("  6. Exit")
            print("=" * 60)

            choice = input("\nEnter your choice (1-6): ").strip()

            if choice == "1":
                print("\nGenerating random video...")
                result = self.generate_single_video()
                self._print_result(result)

            elif choice == "2":
                print("\nAvailable categories:")
                for i, cat in enumerate(categories, 1):
                    print(f"  {i}. {cat.capitalize()}")

                cat_choice = input("\nEnter category number: ").strip()
                try:
                    cat_idx = int(cat_choice) - 1
                    if 0 <= cat_idx < len(categories):
                        category = categories[cat_idx]
                        print(f"\nGenerating video from category: {category}")
                        result = self.generate_single_video(category=category)
                        self._print_result(result)
                    else:
                        print("Invalid category number")
                except ValueError:
                    print("Invalid input")

            elif choice == "3":
                prompt = input("\nEnter your custom prompt: ").strip()
                if prompt:
                    print("\nGenerating video...")
                    result = self.video_generator.generate_video(prompt)
                    self._print_result(result)
                else:
                    print("Prompt cannot be empty")

            elif choice == "4":
                self._print_statistics()

            elif choice == "5":
                print("\nAvailable categories:")
                for i, cat in enumerate(categories, 1):
                    print(f"  {i}. {cat.capitalize()}")

            elif choice == "6":
                print("\nExiting...")
                self._print_session_summary()
                break

            else:
                print("Invalid choice. Please enter 1-6.")

    def _print_result(self, result: dict):
        """Print video generation result."""
        print("\n" + "-" * 60)
        if result and result.get("success"):
            print("✓ VIDEO GENERATED SUCCESSFULLY")
            print(f"  Prompt: {result.get('prompt', 'N/A')}")
            print(f"  Model: {result.get('model', 'N/A')}")
            print(f"  Duration: {result.get('duration', 'N/A')}s")
            print(f"  Generation time: {result.get('generation_time', 0):.2f}s")
        else:
            print("✗ VIDEO GENERATION FAILED")
            if result:
                print(f"  Error: {result.get('error', 'Unknown error')}")
        print("-" * 60)

    def _print_statistics(self):
        """Print current session statistics."""
        stats = self.video_generator.get_statistics()

        print("\n" + "=" * 60)
        print("SESSION STATISTICS")
        print("=" * 60)
        print(f"Session start: {self.session_start.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Duration: {datetime.now() - self.session_start}")
        print(f"Videos generated: {stats['videos_generated']}")
        print(f"Videos failed: {stats['videos_failed']}")
        print(f"Success rate: {stats['success_rate']:.1f}%")
        print(f"Average generation time: {stats['average_generation_time']:.2f}s")
        print("=" * 60)

    def _print_session_summary(self):
        """Print session summary and save log."""
        print("\n" + "=" * 60)
        print("SESSION SUMMARY")
        print("=" * 60)

        self._print_statistics()

        # Save session log
        log_filename = f"session_log_{self.session_start.strftime('%Y%m%d_%H%M%S')}.json"
        log_path = Path(self.settings.get("output_directory", "generated_videos")) / log_filename

        try:
            with open(log_path, 'w') as f:
                json.dump({
                    "session_start": self.session_start.isoformat(),
                    "session_end": datetime.now().isoformat(),
                    "videos": self.session_log,
                    "statistics": self.video_generator.get_statistics()
                }, f, indent=2)
            print(f"\nSession log saved to: {log_path}")
        except Exception as e:
            logger.error(f"Error saving session log: {e}")


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Robotic Random Video Maker - Automated Venice AI video generation",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Run in automated mode (default settings)
  python robo_video_maker.py --auto

  # Generate 5 videos with 30 second delay
  python robo_video_maker.py --auto --count 5 --delay 30

  # Run in interactive mode
  python robo_video_maker.py --interactive

  # Generate a single video and exit
  python robo_video_maker.py --single

  # Use custom config file
  python robo_video_maker.py --config my_config.json
        """
    )

    parser.add_argument(
        "--auto",
        action="store_true",
        help="Run in automated mode"
    )

    parser.add_argument(
        "--interactive",
        action="store_true",
        help="Run in interactive mode"
    )

    parser.add_argument(
        "--single",
        action="store_true",
        help="Generate a single video and exit"
    )

    parser.add_argument(
        "--count",
        type=int,
        help="Number of videos to generate in auto mode"
    )

    parser.add_argument(
        "--delay",
        type=int,
        help="Delay between videos in seconds (auto mode)"
    )

    parser.add_argument(
        "--config",
        default="config.json",
        help="Path to configuration file (default: config.json)"
    )

    parser.add_argument(
        "--category",
        help="Category for single video generation"
    )

    args = parser.parse_args()

    # Create robot instance
    robot = RoboVideoMaker(config_path=args.config)

    # Override settings if specified
    if args.delay:
        robot.delay = args.delay
    if args.count:
        robot.max_videos = args.count

    # Determine mode
    if args.single:
        logger.info("Generating single video...")
        result = robot.generate_single_video(category=args.category)
        robot._print_result(result)
        robot._print_session_summary()

    elif args.interactive:
        robot.run_interactive()

    elif args.auto:
        robot.run_automated()

    else:
        # Default: show help
        print("\n" + "=" * 60)
        print("ROBOTIC RANDOM VIDEO MAKER")
        print("Powered by Venice AI")
        print("=" * 60)
        print("\nPlease specify a mode:")
        print("  --auto        : Automated generation")
        print("  --interactive : Interactive mode")
        print("  --single      : Generate one video")
        print("\nUse --help for more options")
        print("=" * 60 + "\n")


if __name__ == "__main__":
    main()
