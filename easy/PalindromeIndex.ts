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
    // Write your code here
    if (isPalindrome(s)) {
        return -1
    }
    for (let i = 0; i < s.length; i++) {
        let charArr = s.split("")
        charArr.splice(i, 1)
        let subString = charArr.join("")
        if (isPalindrome(subString)) {
            return i
        }
    }
    return -1
}

function isPalindrome(s: string): boolean {
    return s == s.split("").reverse().join("")
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
