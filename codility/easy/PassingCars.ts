// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function passingCars(A: number[]): number {
    // Implement your solution here
    let ones = 0
    for (const n of A) {
        if (n == 1) {
            ones++
        }
    }
    let sum = 0
    for (const n of A) {
        if (n == 0) {
            sum += ones
            if (sum > 1e9) {
                return -1
            }
        } else {
            ones--
        }
    }
    return sum
}

assert.equal(passingCars([0, 1, 0, 1, 1]), 5)
