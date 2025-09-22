function romanToInt(s: string): number {
    const map = new Map([
        ['I', 1],
        ['V', 5],
        ['X', 10],
        ['L', 50],
        ['C', 100],
        ['D', 500],
        ['M', 1000],
    ])

    let sum = 0
    for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) == 'I' && (s.charAt(i + 1) == 'V' || s.charAt(i + 1) == 'X') ||
            s.charAt(i) == 'X' && (s.charAt(i + 1) == 'L' || s.charAt(i + 1) == 'C') ||
            s.charAt(i) == 'C' && (s.charAt(i + 1) == 'D' || s.charAt(i + 1) == 'M')) {
            sum -= map.get(s.charAt(i)) ?? 0
        } else {
            sum += map.get(s.charAt(i)) ?? 0
        }
    }
    return sum
};
