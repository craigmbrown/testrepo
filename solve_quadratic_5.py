#!/usr/bin/env python3
"""
Quadratic Equation Solver
Solves: (x-1)² - 12 = 26
"""

import math

def solve_quadratic():
    """
    Solve the equation (x-1)² - 12 = 26

    Steps:
    1. (x-1)² = 38
    2. x-1 = ±√38
    3. x = 1 ± √38
    """
    print("Solving: (x-1)² - 12 = 26")
    print("-" * 40)

    # Step 1: Add 12 to both sides
    print("\nStep 1: Add 12 to both sides")
    print("(x-1)² = 26 + 12")
    print("(x-1)² = 38")

    # Step 2: Take square root
    print("\nStep 2: Take square root of both sides")
    sqrt_value = math.sqrt(38)
    print(f"x - 1 = ±√38")
    print(f"x - 1 = ±{sqrt_value:.6f}")

    # Step 3: Solve for x
    print("\nStep 3: Solve for x")
    print(f"x = 1 ± √38")

    # Calculate both solutions
    solution1 = 1 + sqrt_value
    solution2 = 1 - sqrt_value

    print("\n" + "=" * 40)
    print("SOLUTIONS:")
    print(f"x₁ = 1 + √38 ≈ {solution1:.6f}")
    print(f"x₂ = 1 - √38 ≈ {solution2:.6f}")
    print("=" * 40)

    # Verify solutions
    print("\nVERIFICATION:")
    print("-" * 40)

    for i, x in enumerate([solution1, solution2], 1):
        result = (x - 1)**2 - 12
        print(f"\nFor x = {x:.6f}:")
        print(f"  ({x:.6f} - 1)² - 12")
        print(f"  = ({x - 1:.6f})² - 12")
        print(f"  = {(x - 1)**2:.6f} - 12")
        print(f"  = {result:.6f}")
        print(f"  ✓ Correct!" if abs(result - 26) < 0.0001 else "  ✗ Incorrect")

    print("\n" + "=" * 40)
    print("EXACT SOLUTIONS IN SIMPLEST FORM:")
    print("x = 1 + √38  or  x = 1 - √38")
    print("=" * 40)

    return solution1, solution2

if __name__ == "__main__":
    solutions = solve_quadratic()
    print(f"\n\nFinal Answer (decimal): x ≈ {solutions[0]:.6f} or x ≈ {solutions[1]:.6f}")
    print(f"Final Answer (exact): x = 1 + √38 or x = 1 - √38")
