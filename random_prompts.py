"""
Random Prompt Generator for Venice AI Video Creation
Generates creative and diverse video prompts from various categories.
"""

import random
import json
from typing import Dict, List, Tuple


class RandomPromptGenerator:
    """Generates random video prompts for AI video generation."""

    def __init__(self, config_path: str = "config.json"):
        """
        Initialize the prompt generator with configuration.

        Args:
            config_path: Path to the configuration JSON file
        """
        self.config = self._load_config(config_path)
        self.categories = self.config.get("prompt_categories", {})
        self.category_names = list(self.categories.keys())

    def _load_config(self, config_path: str) -> Dict:
        """Load configuration from JSON file."""
        try:
            with open(config_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Warning: Config file {config_path} not found. Using defaults.")
            return {"prompt_categories": {}}
        except json.JSONDecodeError as e:
            print(f"Warning: Error parsing config file: {e}. Using defaults.")
            return {"prompt_categories": {}}

    def get_random_prompt(self, category: str = None) -> Tuple[str, str]:
        """
        Get a random prompt from specified category or any category.

        Args:
            category: Specific category to choose from, or None for random

        Returns:
            Tuple of (category_name, prompt_text)
        """
        if not self.categories:
            return ("default", "A beautiful cinematic scene")

        if category and category in self.categories:
            selected_category = category
        else:
            selected_category = random.choice(self.category_names)

        prompts = self.categories[selected_category]
        if not prompts:
            return (selected_category, "A beautiful cinematic scene")

        prompt = random.choice(prompts)
        return (selected_category, prompt)

    def get_random_prompts(self, count: int = 5) -> List[Tuple[str, str]]:
        """
        Get multiple random prompts.

        Args:
            count: Number of prompts to generate

        Returns:
            List of tuples (category_name, prompt_text)
        """
        return [self.get_random_prompt() for _ in range(count)]

    def get_category_prompt(self, category: str) -> Tuple[str, str]:
        """
        Get a random prompt from a specific category.

        Args:
            category: Category name

        Returns:
            Tuple of (category_name, prompt_text)
        """
        return self.get_random_prompt(category)

    def list_categories(self) -> List[str]:
        """Return list of available categories."""
        return self.category_names

    def add_custom_prompt(self, category: str, prompt: str) -> None:
        """
        Add a custom prompt to a category.

        Args:
            category: Category name (will be created if doesn't exist)
            prompt: Prompt text to add
        """
        if category not in self.categories:
            self.categories[category] = []
            self.category_names.append(category)

        if prompt not in self.categories[category]:
            self.categories[category].append(prompt)

    def enhance_prompt(self, base_prompt: str) -> str:
        """
        Enhance a prompt with cinematic details.

        Args:
            base_prompt: Basic prompt text

        Returns:
            Enhanced prompt with additional details
        """
        enhancements = [
            "cinematic lighting",
            "4K quality",
            "dramatic camera movement",
            "vibrant colors",
            "highly detailed",
            "professional cinematography",
            "smooth motion",
            "epic composition"
        ]

        camera_movements = [
            "slow pan",
            "smooth tracking shot",
            "sweeping aerial view",
            "dolly zoom",
            "crane shot",
            "steady cam movement"
        ]

        selected_enhancements = random.sample(enhancements, k=random.randint(2, 3))
        camera_movement = random.choice(camera_movements)

        enhanced = f"{base_prompt}, {camera_movement}, {', '.join(selected_enhancements)}"
        return enhanced

    def generate_mixed_prompt(self) -> Tuple[str, str]:
        """
        Generate a creative prompt mixing elements from different categories.

        Returns:
            Tuple of (category_name, prompt_text)
        """
        if len(self.category_names) < 2:
            return self.get_random_prompt()

        # Mix two random categories
        cat1, cat2 = random.sample(self.category_names, 2)
        _, prompt1 = self.get_random_prompt(cat1)
        _, prompt2 = self.get_random_prompt(cat2)

        # Extract key elements
        elements1 = prompt1.split(" with ")[0] if " with " in prompt1 else prompt1
        elements2 = prompt2.split(" in ")[-1] if " in " in prompt2 else prompt2

        mixed_prompt = f"{elements1} in {elements2}"
        return ("mixed", self.enhance_prompt(mixed_prompt))


def main():
    """Example usage of the RandomPromptGenerator."""
    generator = RandomPromptGenerator()

    print("=" * 60)
    print("RANDOM VIDEO PROMPT GENERATOR")
    print("=" * 60)

    print("\nAvailable Categories:")
    for i, category in enumerate(generator.list_categories(), 1):
        print(f"  {i}. {category.capitalize()}")

    print("\n" + "=" * 60)
    print("GENERATING 5 RANDOM PROMPTS")
    print("=" * 60)

    prompts = generator.get_random_prompts(5)
    for i, (category, prompt) in enumerate(prompts, 1):
        print(f"\n{i}. Category: {category.upper()}")
        print(f"   Prompt: {prompt}")

    print("\n" + "=" * 60)
    print("ENHANCED PROMPTS")
    print("=" * 60)

    for i in range(3):
        category, prompt = generator.get_random_prompt()
        enhanced = generator.enhance_prompt(prompt)
        print(f"\n{i+1}. Original: {prompt}")
        print(f"   Enhanced: {enhanced}")

    print("\n" + "=" * 60)
    print("MIXED CATEGORY PROMPTS")
    print("=" * 60)

    for i in range(3):
        category, mixed = generator.generate_mixed_prompt()
        print(f"\n{i+1}. {mixed}")


if __name__ == "__main__":
    main()
