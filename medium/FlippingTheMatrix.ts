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
 * Complete the 'flippingMatrix' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */

function flippingMatrix(matrix: number[][]): number {
    const size = matrix.length; // This is 2n
    const n = size / 2;
    let maxSum = 0;
    
    // For each position (i,j) in the upper-left n×n quadrant,
    // find the maximum value that can be placed there
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Four possible values for position (i,j):
            const topLeft = matrix[i][j];                    // Original
            const topRight = matrix[i][size - 1 - j];       // Column flipped
            const bottomLeft = matrix[size - 1 - i][j];     // Row flipped  
            const bottomRight = matrix[size - 1 - i][size - 1 - j]; // Both flipped
            
            // Choose the maximum of these four values
            const maxValue = Math.max(topLeft, topRight, bottomLeft, bottomRight);
            maxSum += maxValue;
        }
    }
    
    return maxSum;
}



// Test function to demonstrate scalability
function testFlippingMatrix() {
    console.log("Testing n=1 (2x2 matrix):");
    const matrix1 = [[1, 2], [3, 4]];
    console.log("Result:", flippingMatrix(matrix1)); // Should be 4 (max of each quadrant)
    
    console.log("\nTesting n=2 (4x4 matrix):");
    const matrix2 = [
        [112, 42, 83, 119],
        [56, 125, 56, 49],
        [15, 78, 101, 43],
        [62, 98, 114, 108]
    ];
    console.log("Result:", flippingMatrix(matrix2)); // Should be 414
    
    console.log("\nTesting n=3 (6x6 matrix):");
    const matrix3 = [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36]
    ];
    console.log("Result:", flippingMatrix(matrix3)); // Should be 261
}

function main() {
    // const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        let matrix: number[][] = Array(2 * n);

        for (let i: number = 0; i < 2 * n; i++) {
            matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
        }

        const result: number = flippingMatrix(matrix);

        // ws.write(result + '\n');
        console.log(result)
    }

    // ws.end();
}

/*
Example 1: n = 2 (4x4 matrix)
112  42  83 119
 56 125  56  49
 15  78 101  43
 62  98 114 108

For each position in upper-left 2x2 quadrant:
Position (0,0): max(112, 119, 62, 108) = 119
Position (0,1): max(42, 83, 98, 114) = 114  
Position (1,0): max(56, 49, 15, 43) = 56
Position (1,1): max(125, 56, 78, 101) = 125
Maximum sum: 119 + 114 + 56 + 125 = 414

Example 2: n = 3 (6x6 matrix)
1  2  3  4  5  6
7  8  9 10 11 12
13 14 15 16 17 18
19 20 21 22 23 24
25 26 27 28 29 30
31 32 33 34 35 36

For upper-left 3x3 quadrant, we choose:
Position (0,0): max(1, 6, 31, 36) = 36
Position (0,1): max(2, 5, 32, 35) = 35  
Position (0,2): max(3, 4, 33, 34) = 34
Position (1,0): max(7, 12, 25, 30) = 30
Position (1,1): max(8, 11, 26, 29) = 29
Position (1,2): max(9, 10, 27, 28) = 28
Position (2,0): max(13, 18, 19, 24) = 24
Position (2,1): max(14, 17, 20, 23) = 23
Position (2,2): max(15, 16, 21, 22) = 22
Maximum sum: 36+35+34+30+29+28+24+23+22 = 261
*/