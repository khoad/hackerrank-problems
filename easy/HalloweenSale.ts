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
 * Complete the 'howManyGames' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER p
 *  2. INTEGER d
 *  3. INTEGER m
 *  4. INTEGER s
 */

function howManyGames(p: number, d: number, m: number, s: number): number {
    // Return the number of games you can buy
    let curPrice = p
    let games = 0
    while (s - curPrice >= 0) {
        s -= curPrice
        if (curPrice - d > m) {
            curPrice -= d
        } else {
            curPrice = m
        }
        games++
    }
    return games
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const p: number = parseInt(firstMultipleInput[0], 10);

    const d: number = parseInt(firstMultipleInput[1], 10);

    const m: number = parseInt(firstMultipleInput[2], 10);

    const s: number = parseInt(firstMultipleInput[3], 10);

    const answer: number = howManyGames(p, d, m, s);

    ws.write(answer + '\n');

    ws.end();
}
