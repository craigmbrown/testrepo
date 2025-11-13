#!/usr/bin/env python3
"""
Quadratic Equation Solver
Solves: 2(x+4)² + 44 = 46
"""

import math

def solve_quadratic():
    """
    Solve the equation 2(x+4)² + 44 = 46

    Steps:
    1. 2(x+4)² = 2
    2. (x+4)² = 1
    3. x+4 = ±1
    4. x = -4 ± 1
    """
    print("Solving: 2(x+4)² + 44 = 46")
    print("-" * 40)

    # Step 1: Subtract 44 from both sides
    print("\nStep 1: Subtract 44 from both sides")
    print("2(x+4)² = 46 - 44")
    print("2(x+4)² = 2")

    # Step 2: Divide both sides by 2
    print("\nStep 2: Divide both sides by 2")
    print("(x+4)² = 2/2")
    print("(x+4)² = 1")

    # Step 3: Take square root
    print("\nStep 3: Take square root of both sides")
    sqrt_value = math.sqrt(1)
    print(f"x + 4 = ±{sqrt_value}")

    # Step 4: Solve for x
    print("\nStep 4: Solve for x")
    print(f"x = -4 ± {sqrt_value}")

    # Calculate both solutions
    solution1 = -4 + sqrt_value
    solution2 = -4 - sqrt_value

    print("\n" + "=" * 40)
    print("SOLUTIONS:")
    print(f"x₁ = -4 + {sqrt_value} = {solution1}")
    print(f"x₂ = -4 - {sqrt_value} = {solution2}")
    print("=" * 40)

    # Verify solutions
    print("\nVERIFICATION:")
    print("-" * 40)

    for i, x in enumerate([solution1, solution2], 1):
        result = 2 * (x + 4)**2 + 44
        print(f"\nFor x = {x}:")
        print(f"  2({x} + 4)² + 44")
        print(f"  = 2({x + 4})² + 44")
        print(f"  = 2 × {(x + 4)**2} + 44")
        print(f"  = {2 * (x + 4)**2} + 44")
        print(f"  = {result}")
        print(f"  ✓ Correct!" if abs(result - 46) < 0.0001 else "  ✗ Incorrect")

    return solution1, solution2

if __name__ == "__main__":
    solutions = solve_quadratic()
    print(f"\n\nFinal Answer: x = {solutions[0]} or x = {solutions[1]}")
