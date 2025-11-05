function divide(dividend: number, divisor: number): number {
    let quotient = 0
    let absDividend = Math.abs(dividend)
    let absDivisor = Math.abs(divisor)

    // Use exponential search (bit manipulation approach)
    while (absDividend >= absDivisor) {
        let tempDivisor = absDivisor
        let multiplier = 1

        // Double the divisor until we can't subtract it anymore
        // "tempDivisor << 1 > 0" part is to make sure the bitwise shifting
        //      operator doesn't overlow to negative numbers
        while (absDividend >= tempDivisor << 1 && tempDivisor << 1 > 0) {
            tempDivisor <<= 1
            multiplier <<= 1
        }

        // Subtract the largest multiplier we can
        absDividend -= tempDivisor
        quotient += multiplier
    }

    // Determine sign of result
    const result = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0) ? quotient : -quotient

    // Clamp result to 32-bit signed integer range
    const upperBound = 2147483647
    const lowerBound = -2147483648
    if (result > upperBound) {
        return upperBound
    } else if (result < lowerBound) {
        return lowerBound
    }
    return result
};
