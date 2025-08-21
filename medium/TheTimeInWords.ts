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
 * Complete the 'timeInWords' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER h
 *  2. INTEGER m
 */

function timeInWords(h: number, m: number): string {
    // Write your code here
    let map = new Map([
        [1, 'one'],
        [2, 'two'],
        [3, 'three'],
        [4, 'four'],
        [5, 'five'],
        [6, 'six'],
        [7, 'seven'],
        [8, 'eight'],
        [9, 'nine'],
        [10, 'ten'],
        [11, 'eleven'],
        [12, 'twelve'],
        [13, 'thirteen'],
        [14, 'fourteen'],
        [15, 'fifteen'],
        [16, 'sixteen'],
        [17, 'seventeen'],
        [18, 'eighteen'],
        [19, 'nineteen'],
        [20, 'twenty']
    ])

    function getNumber(n: number) {
        return n <= 20 ? map.get(n) : `twenty ${map.get(n - 20)}`
    }
    
    if (m == 0) {
        return `${getNumber(h)} o' clock`
    } else if (m == 15) {
        return `quarter past ${getNumber(h)}`
    } else if (m == 30) {
        return `half past ${getNumber(h)}`
    } else if (m == 45) {
        return `quarter to ${getNumber(h + 1)}`
    } else if (m < 30) {
        return `${getNumber(m)} minute${m == 1 ? '' : 's'} past ${getNumber(h)}`
    } else {
        return `${getNumber(60 - m)} minutes to ${getNumber(h + 1)}`
    }
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const h: number = parseInt(readLine().trim(), 10);

    const m: number = parseInt(readLine().trim(), 10);

    const result: string = timeInWords(h, m);

    ws.write(result + '\n');

    ws.end();
}
