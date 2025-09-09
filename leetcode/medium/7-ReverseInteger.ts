function reverse(x: number): number {
    if (x < 10 && x > -10) {
        return x
    }
    let negative = false
    if (x < 0) {
        negative = true
    }
    let n = 0
    while (true) {
        let r = x % 10
        x = Math.trunc(x / 10)
        n += r
        if (Math.abs(x) < 1) {
            break
        }
        n *= 10
    }
    n += x % 10
    if (Math.abs(n) >= 2**31) {
        return 0
    }
    return n
};