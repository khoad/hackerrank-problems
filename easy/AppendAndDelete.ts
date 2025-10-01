'use strict';

import { WriteStream, createWriteStream } from "fs";
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
 * Complete the 'appendAndDelete' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. STRING t
 *  3. INTEGER k
 */

function appendAndDelete(s: string, t: string, k: number): string {
    // Write your code here
    if (k >= s.length + t.length) {
        return 'Yes'
    }
    let wrongPrecending = false
    let firstCharDiff = s[0] !== t[0]
    for (let i = 0; i < Math.max(s.length, t.length); i++) {
        if (s[i] === undefined || t[i] === undefined) {
            k -= 1
        } else if (s[i] !== t[i] || wrongPrecending) {
            k -= 2
            wrongPrecending = true
        }
    }
    if (k < 0) {
        return 'No'
    } else if (k % 2 == 0) {
        return 'Yes'
    } else if (firstCharDiff) {
        return 'Yes'
    } else {
        return 'No'
    }
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const t: string = readLine();

    const k: number = parseInt(readLine().trim(), 10);

    const result: string = appendAndDelete(s, t, k);

    ws.write(result + '\n');

    ws.end();
}
