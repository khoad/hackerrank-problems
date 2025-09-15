// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function numberOfDiscIntersections(A: number[]): number {
    const events: Array<{position: number, type: 'start' | 'end'}> = []

    for (let i = 0; i < A.length; i++) {
        const start = i - A[i]
        const end = i + A[i]
        events.push({position: start, type: 'start'})
        events.push({position: end, type: 'end'})
    }

    events.sort((a, b) => a.position != b.position ? a.position - b.position : a.type == 'start' ? -1 : 1)

    let activeDiscs = 0
    let intersections = 0

    for (const event of events) {
        if (event.type == 'start') {
            intersections += activeDiscs
            activeDiscs++
            if (intersections > 1e7) {
                return -1
            }
        } else {
            activeDiscs--
        }
    }

    return intersections;
}

// Test cases
assert.equal(numberOfDiscIntersections([1, 5, 2, 1, 4, 0]), 11);

console.log("All tests passed!");
