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
 * Complete the 'palindromeIndex' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function palindromeIndex(s: string): number {
    // console.log(s)
    // Write your code here
    if (isPalindrome(s, -1)) {
        return -1
    }
    for (let i = 0; i < s.length; i++) {
        if (isPalindrome(s, i)) {
            if (i + 1 < s.length && s[i] == s[i + 1]) {
                return i + 1
            }
            return i
        }
    }
    return -1
}

function isPalindrome(s: string, i: number): boolean {
    let start = 0
    let end = s.length - 1
    while (start <= end) {
        if (start == i) {
            start++
        }
        if (end == i) {
            end--
        }
        if (s[start] != s[end]) {
            return false
        }
        start++
        end--
    }
    return true
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const s: string = readLine();

        const result: number = palindromeIndex(s);

        ws.write(result + '\n');
    }

    ws.end();
}
