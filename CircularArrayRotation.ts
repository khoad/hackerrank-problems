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
 * Complete the 'circularArrayRotation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER k
 *  3. INTEGER_ARRAY queries
 */

function circularArrayRotation(a: number[], k: number, queries: number[]): number[] {
    // Write your code here
    a = rotateRight(a, k)
    let results: number[] = []
    for (let q of queries) {
        results.push(a[q])
    }
    return results
}

function rotateRight(a: number[], k: number): number[] {
    if (k > a.length) {
        k = k % a.length
    }
    let backupArray: number[] = []    
    for (let i = 0; i < k; i++) {
        backupArray.unshift(a.pop()!)
    }
    a.unshift(...backupArray)
    return a
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    const q: number = parseInt(firstMultipleInput[2], 10);

    const a: number[] = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    let queries: number[] = [];

    for (let i: number = 0; i < q; i++) {
        const queriesItem: number = parseInt(readLine().trim(), 10);

        queries.push(queriesItem);
    }

    const result: number[] = circularArrayRotation(a, k, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
