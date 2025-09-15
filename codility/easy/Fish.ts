// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function fish(sizes: number[], directions: number[]): number {
    // Implement your solution here
    const stack: Array<{direction: number, size: number}> = []

    for (let i = 0; i < sizes.length; i++) {
        const direction = directions[i]
        const size = sizes[i]

        if (stack.length == 0) {
            stack.push({direction, size})
            continue
        }

        // Check if current fish and top fish will meet (collision)
        // Fish meet when: top fish is going right (1) and current fish is going left (0)
        if (stack[stack.length - 1].direction === 1 && direction === 0) {
            // Fish will meet - determine who eats whom
            while (stack.length > 0 &&
                   stack[stack.length - 1].direction === 1 &&
                   stack[stack.length - 1].size < size) {
                // Current fish (going left) eats fish going right
                stack.pop()
            }

            // If there are still fish going right that are larger, they eat current fish
            if (stack.length > 0 &&
                stack[stack.length - 1].direction === 1 &&
                stack[stack.length - 1].size > size) {
                // Current fish gets eaten, don't add it to stack
                continue
            }
        }

        // Add current fish to stack (either no collision or it survived)
        stack.push({direction, size})
    }

    return stack.length
}

assert.equal(fish([4, 3, 2, 1, 5], [0, 1, 0, 0, 0]), 2)
assert.equal(fish([4, 3, 2, 1, 5], [0, 1, 1, 0, 0]), 2)

console.log("All tests passed!");
