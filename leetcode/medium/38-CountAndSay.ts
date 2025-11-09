// Recursive version - less efficient due to call stack depth O(n)
function countAndSayRecursive(n: number): string {
    if (n <= 1) {
        return "1"
    }

    return RLE(countAndSayRecursive(n - 1))
};

// Improved iterative version - O(1) space (only stores current and next)
function countAndSayIterative(n: number): string {
    if (n === 1) return "1";

    let current = "1";

    for (let i = 2; i <= n; i++) {
        current = RLE(current);
    }

    return current;
};

// Optimized RLE - uses array for efficient string building
function RLE(s: string): string {
    const result: string[] = [];
    let count = 1;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            result.push(`${count}${s[i - 1]}`);
            count = 1;
        }
    }
    // Append the last group
    result.push(`${count}${s[s.length - 1]}`);

    return result.join('');
}
