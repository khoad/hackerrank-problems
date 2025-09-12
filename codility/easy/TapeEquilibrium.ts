// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function tapeEquilibrium(A: number[]): number {
    // Implement your solution here
    let left = 0
    let right = 0
    for (const n of A) {
        right += n
    }

    let minDiff = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < A.length - 1; i++) {
        left += A[i]
        right -= A[i]
        let diff = Math.abs(left - right)
        console.log(diff)
        minDiff = Math.min(minDiff, diff)
    }
    return minDiff
}

console.log(tapeEquilibrium([-1000, 1000]))