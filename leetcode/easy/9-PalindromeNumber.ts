function isPalindrome(x: number): boolean {
    if (x < 0) {
        return false
    }

    // String reverse solution
    // var s = x.toString()
    // var c2 = [...s].reverse().join('')
    // return s == c2

    // Integer division solution
    let m = 0
    let xCopy = x
    while (x > 0) {
        m *= 10
        m += x % 10
        x = Math.trunc(x / 10)
    }
    return xCopy == m
};