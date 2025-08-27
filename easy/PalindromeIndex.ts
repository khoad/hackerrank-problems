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
    // If already a palindrome, return -1
    if (isPalindrome(s)) {
        return -1;
    }

    let left = 0;
    let right = s.length - 1;

    // Find the first mismatch from both ends
    while (left < right && s[left] === s[right]) {
        left++;
        right--;
    }

    // If we found a mismatch, test removing each character
    if (left < right) {
        // Test removing the left character
        if (isPalindrome(s.substring(0, left) + s.substring(left + 1))) {
            return left;
        }
        // Test removing the right character
        if (isPalindrome(s.substring(0, right) + s.substring(right + 1))) {
            return right;
        }
    }

    return -1;
}

function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
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
