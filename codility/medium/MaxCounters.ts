// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function maxCounters(N: number, A: number[]): number[] {
    // Implement your solution here
    let counter = new Array(N).fill(0)
    let maxCounter = 0,
        minCounter = 0
    for (const n of A) {
        if (n <= N) {
            counter[n - 1] = Math.max(counter[n - 1], minCounter)
            maxCounter = Math.max(maxCounter, ++counter[n - 1])
        } else {
            minCounter = maxCounter
        }
    }
    for (let i = 0; i < counter.length; i++) {
        counter[i] = Math.max(counter[i], minCounter)
    }
    return counter
}

assert.equal(
    JSON.stringify(maxCounters(5, [3, 4, 4, 6, 1, 4, 4])),
    JSON.stringify([3, 2, 2, 4, 2])
)
