// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function missingInteger(A: number[]): number {
    // Implement your solution here
    let counter = new Array(A.length + 1)
    for (const n of A) {
        counter[n] = 1
    }
    for (let i = 1; i < counter.length; i++) {
        if (!counter[i]) {
            return i
        }
    }
    return counter.length
}

assert.equal(missingInteger([1, 3, 6, 4, 1, 2]), 5)
assert.equal(missingInteger([1, 2, 3]), 4)
assert.equal(missingInteger([-1, -3]), 1)
