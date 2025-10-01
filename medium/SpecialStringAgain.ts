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
 * Complete the 'substrCount' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING s
 */

function substrCount(n: number, s: string): number {
    let specials = 0
    let previousSpecial = false
    for (let i = 0; i < n; i++) {
        for (let l = 1; l <= n - i; l++) {
            let subString = s.substring(i, i+l)
            // console.log('i', i, 'l', l, 'subString', subString)
            let nowSpecial = isStringSpecial(subString, previousSpecial)
            if (nowSpecial) {
                specials++
            }
            previousSpecial = nowSpecial
        }
    }
    return specials
}

function isStringSpecial(s: string, previousSpecial: boolean): boolean {
    let isOdd = s.length % 2 == 1
    if (previousSpecial && !isOdd) {
        return s[s.length-1] == s[s.length-2]
    }
    let middleIndex = Math.trunc(s.length / 2)
    let firstChar = s[0]
    for (let i = 1; i < s.length; i++) {
        if (isOdd && i == middleIndex) {
            continue
        } else if (s[i] != firstChar) {
            return false
        }        
    }
    return true
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const s: string = readLine();

    const result: number = substrCount(n, s);

    ws.write(result + '\n');

    ws.end();
}
