// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function maxProductOfThree(A: number[]): number {
    // Implement your solution here
    let max = 0
    let l = A.length
    A.sort((a, b) => a - b)
    max = Math.max(max, A[l - 1] * A[l - 2] * A[l - 3])
    max = Math.max(max, A[0] * A[1] * A[l - 1])
    return max
}

assert.equal(maxProductOfThree([-3, 1, 2, -2, 5, 6]), 60)
assert.equal(maxProductOfThree([-5, 5, -5, 4]), 125)
