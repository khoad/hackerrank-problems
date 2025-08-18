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
 * Complete the 'formingMagicSquare' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY s as parameter.
 */

function formingMagicSquare(s: number[][]): number {
    // Write your code here

    // Generate all 8 squares
    let magicSquares: number[][][] = []

    let currSquare = baseSquare()
    
    for (let i = 0; i < 4; i++) {
        magicSquares.push(currSquare)
        currSquare = rotate90Degrees(currSquare)
    }
    
    let mirroredSquare = mirrorSquare(currSquare)

    for (let i = 0; i < 4; i++) {
        magicSquares.push(mirroredSquare)
        mirroredSquare = rotate90Degrees(mirroredSquare)
    }
    
    // Compare
    let n = 3
    let minCost = Number.MAX_SAFE_INTEGER
    for (let magicSquare of magicSquares) {
        let cost = 0
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                cost += Math.abs(magicSquare[i][j] - s[i][j])
            }
        }
        minCost = Math.min(minCost, cost)
    }
    return minCost
}

function baseSquare(): number[][] {
    return [
        [4, 3, 8],
        [9, 5, 1],
        [2, 7, 6]
    ]
}

function mirrorSquare(s: number[][]): number[][] {
    return s.map(row => [...row].reverse())
}

function rotate90Degrees(s: number[][]): number[][] {
    let n = 3
    let newSquare = new Array(n).fill(null).map(() => new Array(n).fill(null))
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            newSquare[j][n - 1 - i] = s[i][j]
        }
    }
    return newSquare
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    let s: number[][] = Array(3);

    for (let i: number = 0; i < 3; i++) {
        s[i] = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result: number = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}
