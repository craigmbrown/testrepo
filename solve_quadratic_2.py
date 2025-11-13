#!/usr/bin/env python3
"""
Quadratic Equation Solver
Solves: 5(x² - 4) - 5 = -5
"""

import math

def solve_quadratic():
    """
    Solve the equation 5(x² - 4) - 5 = -5

    Steps:
    1. 5(x² - 4) = 0
    2. x² - 4 = 0
    3. x² = 4
    4. x = ±2
    """
    print("Solving: 5(x² - 4) - 5 = -5")
    print("-" * 40)

    # Step 1: Add 5 to both sides
    print("\nStep 1: Add 5 to both sides")
    print("5(x² - 4) = 0")

    # Step 2: Divide by 5
    print("\nStep 2: Divide both sides by 5")
    print("x² - 4 = 0")

    # Step 3: Add 4 to both sides
    print("\nStep 3: Add 4 to both sides")
    print("x² = 4")

    # Step 4: Take square root
    print("\nStep 4: Take square root of both sides")
    sqrt_value = math.sqrt(4)
    print(f"x = ±{sqrt_value}")

    # Calculate both solutions
    solution1 = sqrt_value
    solution2 = -sqrt_value

    print("\n" + "=" * 40)
    print("SOLUTIONS:")
    print(f"x₁ = {solution1}")
    print(f"x₂ = {solution2}")
    print("=" * 40)

    # Verify solutions
    print("\nVERIFICATION:")
    print("-" * 40)

    for i, x in enumerate([solution1, solution2], 1):
        result = 5 * (x**2 - 4) - 5
        print(f"\nFor x = {x}:")
        print(f"  5({x}² - 4) - 5")
        print(f"  = 5({x**2} - 4) - 5")
        print(f"  = 5({x**2 - 4}) - 5")
        print(f"  = {5 * (x**2 - 4)} - 5")
        print(f"  = {result}")
        print(f"  ✓ Correct!" if abs(result - (-5)) < 0.0001 else "  ✗ Incorrect")

    return solution1, solution2

if __name__ == "__main__":
    solutions = solve_quadratic()
    print(f"\n\nFinal Answer: x = {solutions[0]} or x = {solutions[1]}")
