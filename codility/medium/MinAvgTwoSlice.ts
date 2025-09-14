// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function minAvgTwoSlice(A: number[]): number {
    // The key insight: minimum average slice will always be of length 2 or 3
    // This is because any slice of length 4+ can be divided into smaller slices
    // and at least one of them will have average <= the original slice's average

    let minAvg = Number.MAX_SAFE_INTEGER;
    let result = 0;

    // Check all slices of length 2
    for (let i = 0; i < A.length - 1; i++) {
        const avg = (A[i] + A[i + 1]) / 2;
        if (avg < minAvg) {
            minAvg = avg;
            result = i;
        }
    }

    // Check all slices of length 3
    for (let i = 0; i < A.length - 2; i++) {
        const avg = (A[i] + A[i + 1] + A[i + 2]) / 3;
        if (avg < minAvg) {
            minAvg = avg;
            result = i;
        }
    }

    return result;
}

// Test cases
assert.equal(minAvgTwoSlice([4, 2, 2, 5, 1, 5, 8]), 1);
assert.equal(minAvgTwoSlice([-3, -5, -8, -4, -10]), 2);
assert.equal(minAvgTwoSlice([1, 2, 3, 4, 5]), 0);
assert.equal(minAvgTwoSlice([5, 4, 3, 2, 1]), 3);
assert.equal(minAvgTwoSlice([1, 1, 1, 1, 1]), 0);

console.log("All tests passed!");
