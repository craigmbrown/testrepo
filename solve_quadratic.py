#!/usr/bin/env python3
"""
Quadratic Equation Solver
Solves: (x+10)² - 14 = 11
"""

import math

def solve_quadratic():
    """
    Solve the equation (x+10)² - 14 = 11

    Steps:
    1. (x+10)² = 25
    2. x+10 = ±5
    3. x = -10 ± 5
    """
    print("Solving: (x+10)² - 14 = 11")
    print("-" * 40)

    # Step 1: Simplify to (x+10)² = 25
    print("\nStep 1: Add 14 to both sides")
    print("(x+10)² = 11 + 14")
    print("(x+10)² = 25")

    # Step 2: Take square root
    print("\nStep 2: Take square root of both sides")
    sqrt_value = math.sqrt(25)
    print(f"x + 10 = ±{sqrt_value}")

    # Step 3: Solve for x
    print("\nStep 3: Solve for x")
    print(f"x = -10 ± {sqrt_value}")

    # Calculate both solutions
    solution1 = -10 + sqrt_value
    solution2 = -10 - sqrt_value

    print("\n" + "=" * 40)
    print("SOLUTIONS:")
    print(f"x₁ = -10 + {sqrt_value} = {solution1}")
    print(f"x₂ = -10 - {sqrt_value} = {solution2}")
    print("=" * 40)

    # Verify solutions
    print("\nVERIFICATION:")
    print("-" * 40)

    for i, x in enumerate([solution1, solution2], 1):
        result = (x + 10)**2 - 14
        print(f"\nFor x = {x}:")
        print(f"  ({x} + 10)² - 14 = {result}")
        print(f"  ✓ Correct!" if abs(result - 11) < 0.0001 else "  ✗ Incorrect")

    return solution1, solution2

if __name__ == "__main__":
    solutions = solve_quadratic()
    print(f"\n\nFinal Answer: x = {solutions[0]} or x = {solutions[1]}")
