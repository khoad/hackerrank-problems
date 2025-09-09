function climbStairs(n: number): number {
    if (n <= 1) {
        return n
    }

    let prevPrev = 1
    let prev = 1
    let curr
    for (let i = 1; i < n; i++) {
        curr = prev + prevPrev
        prevPrev = prev
        prev = curr
    }
    return curr
};