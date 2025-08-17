'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'kaprekarNumbers' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER p
 *  2. INTEGER q
 */

function kaprekarNumbers(p: number, q: number): void {
    // Write your code here
    let goodRange = false

    for (let i = p; i <= q; i++) {
        if (i === 1 || isKaprekar(i)) {
            process.stdout.write(`${i} `)
            goodRange = true
        }
    }

    if (!goodRange) {
        console.log('INVALID RANGE')
    }
}

function isKaprekar(n: number): boolean {
    const sq = n * n
    const s = sq.toString()
    const halfLength = Math.floor(s.length / 2)
    const l = s.substring(0, halfLength)
    const r = s.substring(halfLength)
    const sum = parseInt(l) + parseInt(r)
    return n === sum
}

function main() {
    const p: number = parseInt(readLine().trim(), 10);

    const q: number = parseInt(readLine().trim(), 10);

    kaprekarNumbers(p, q);
}
