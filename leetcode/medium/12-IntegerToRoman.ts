function intToRomanAI(num: number): string {
    // Use arrays instead of Map for better performance
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

    const result: string[] = [];

    for (let i = 0; i < values.length && num > 0; i++) {
        const count = Math.floor(num / values[i]);
        if (count > 0) {
            // Use repeat() for better performance than loops
            result.push(symbols[i].repeat(count));
            num %= values[i];
        }
    }

    return result.join('');
};

// Original solution kept for comparison
function intToRomanOriginal(num: number): string {
    const map = new Map<number, string>([
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I'],
    ])

    let result = ''

    for (let value of map.keys()) {
        const quotient = Math.floor(num / value)
        num %= value
        result += map.get(value)!.repeat(quotient)
    }

    return result
};
