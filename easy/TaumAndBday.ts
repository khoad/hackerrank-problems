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
 * Complete the 'taumBday' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER b
 *  2. INTEGER w
 *  3. INTEGER bc
 *  4. INTEGER wc
 *  5. INTEGER z
 */

function taumBday(b: number, w: number, bc: number, wc: number, z: number): bigint {
    // Write your code here
    bc = Math.min(bc, wc + z)
    wc = Math.min(wc, bc + z)
    return BigInt(b) * BigInt(bc) + BigInt(w) * BigInt(wc)
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

        const b: number = parseInt(firstMultipleInput[0], 10);

        const w: number = parseInt(firstMultipleInput[1], 10);

        const secondMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

        const bc: number = parseInt(secondMultipleInput[0], 10);

        const wc: number = parseInt(secondMultipleInput[1], 10);

        const z: number = parseInt(secondMultipleInput[2], 10);

        const result: bigint = taumBday(b, w, bc, wc, z);

        ws.write(result + '\n');
    }

    ws.end();
}
