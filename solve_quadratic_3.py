#!/usr/bin/env python3
"""
Quadratic Equation Solver
Solves: 2(x+6)² = 18
"""

import math

def solve_quadratic():
    """
    Solve the equation 2(x+6)² = 18

    Steps:
    1. (x+6)² = 9
    2. x+6 = ±3
    3. x = -6 ± 3
    """
    print("Solving: 2(x+6)² = 18")
    print("-" * 40)

    # Step 1: Divide both sides by 2
    print("\nStep 1: Divide both sides by 2")
    print("(x+6)² = 18/2")
    print("(x+6)² = 9")

    # Step 2: Take square root
    print("\nStep 2: Take square root of both sides")
    sqrt_value = math.sqrt(9)
    print(f"x + 6 = ±{sqrt_value}")

    # Step 3: Solve for x
    print("\nStep 3: Solve for x")
    print(f"x = -6 ± {sqrt_value}")

    # Calculate both solutions
    solution1 = -6 + sqrt_value
    solution2 = -6 - sqrt_value

    print("\n" + "=" * 40)
    print("SOLUTIONS:")
    print(f"x₁ = -6 + {sqrt_value} = {solution1}")
    print(f"x₂ = -6 - {sqrt_value} = {solution2}")
    print("=" * 40)

    # Verify solutions
    print("\nVERIFICATION:")
    print("-" * 40)

    for i, x in enumerate([solution1, solution2], 1):
        result = 2 * (x + 6)**2
        print(f"\nFor x = {x}:")
        print(f"  2({x} + 6)²")
        print(f"  = 2({x + 6})²")
        print(f"  = 2 × {(x + 6)**2}")
        print(f"  = {result}")
        print(f"  ✓ Correct!" if abs(result - 18) < 0.0001 else "  ✗ Incorrect")

    return solution1, solution2

if __name__ == "__main__":
    solutions = solve_quadratic()
    print(f"\n\nFinal Answer: x = {solutions[0]} or x = {solutions[1]}")
