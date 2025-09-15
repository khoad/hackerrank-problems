// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function fish(A: number[], B: number[]): number {
    // Implement your solution here
    const stack: Array<{direction: number, size: number}> = []

    for (let i = 0; i < A.length; i++) {
        const direction = B[i]
        const size = A[i]

        if (stack.length == 0) {
            stack.push({direction, size})
            continue
        }

        const top = stack[stack.length - 1]

        if (top.direction == 0 || direction == 1) {
            // no eating
            stack.push({direction, size})
        } else if (top.size < size) {
            // right eats left
            stack.pop()
            stack.push({direction, size})
        }
    }

    return stack.length
}

assert.equal(fish([4, 3, 2, 1, 5], [0, 1, 0, 0, 0]), 2)

console.log("All tests passed!");
