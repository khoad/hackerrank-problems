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

function generateBaseMagicSquare(): number[][] {
    // Generate the fundamental 3x3 magic square using mathematical derivation
    // Key insights for 3x3 magic square with numbers 1-9:
    // 1. Magic sum = 15 (sum of any row/column/diagonal)
    // 2. Center must be 5 (the median of 1-9)
    // 3. Opposite corners sum to 10 (since corner + center + opposite_corner = 15)
    // 4. Each edge position can be determined systematically
    
    const square: number[][] = Array(3).fill(null).map(() => Array(3).fill(0));
    
    // Step 1: Place 5 in the center (mathematical necessity)
    square[1][1] = 5;
    
    // Step 2: Place corner pairs that sum to 10
    // Available pairs that sum to 10: (1,9), (2,8), (3,7), (4,6)
    // For corners, we'll use pairs (2,8) and (4,6)
    // Note: (1,9) and (3,7) will be used for edges later
    square[0][0] = 2; square[2][2] = 8; // diagonal pair using (2,8)
    square[0][2] = 6; square[2][0] = 4; // anti-diagonal pair using (4,6)
    
    // Step 3: Fill remaining positions to complete magic square
    // Top row: need 15 - 2 - 6 = 7 in middle
    square[0][1] = 7;
    
    // Bottom row: need 15 - 4 - 8 = 3 in middle  
    square[2][1] = 3;
    
    // Left column: need 15 - 2 - 4 = 9 in middle
    square[1][0] = 9;
    
    // Right column: need 15 - 6 - 8 = 1 in middle
    square[1][2] = 1;
    
    // Verify our magic square is valid (optional - for learning)
    // All rows, columns, and diagonals should sum to 15
    
    return square;
}

function rotateMatrix90(matrix: number[][]): number[][] {
    // Rotate matrix 90 degrees clockwise
    const n = matrix.length;
    const rotated: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            rotated[j][n - 1 - i] = matrix[i][j];
        }
    }
    
    return rotated;
}

function reflectMatrixHorizontal(matrix: number[][]): number[][] {
    // Reflect matrix horizontally (flip left-right)
    return matrix.map(row => [...row].reverse());
}

function generateAllMagicSquares(): number[][][] {
    const base = generateBaseMagicSquare();
    const magicSquares: number[][][] = [];
    
    // Generate 4 rotations of the base
    let current = base;
    for (let i = 0; i < 4; i++) {
        magicSquares.push(current.map(row => [...row])); // deep copy
        current = rotateMatrix90(current);
    }
    
    // Generate 4 rotations of the horizontally reflected base
    let reflected = reflectMatrixHorizontal(base);
    for (let i = 0; i < 4; i++) {
        magicSquares.push(reflected.map(row => [...row])); // deep copy
        reflected = rotateMatrix90(reflected);
    }
    
    return magicSquares;
}

function formingMagicSquare(s: number[][]): number {
    // Generate all 8 possible magic squares dynamically
    // [
    //     [2, 7, 6],
    //     [9, 5, 1],
    //     [4, 3, 8]
    // ],
    // [
    //     [4, 9, 2],
    //     [3, 5, 7],
    //     [8, 1, 6]
    // ],
    // [
    //     [8, 3, 4],
    //     [1, 5, 9],
    //     [6, 7, 2]
    // ],
    // [
    //     [6, 1, 8],
    //     [7, 5, 3],
    //     [2, 9, 4]
    // ],
    // [
    //     [6, 7, 2],
    //     [1, 5, 9],
    //     [8, 3, 4]
    // ],
    // [
    //     [8, 1, 6],
    //     [3, 5, 7],
    //     [4, 9, 2]
    // ],
    // [
    //     [4, 3, 8],
    //     [9, 5, 1],
    //     [2, 7, 6]
    // ]
    // [
    //     [2, 9, 4],
    //     [7, 5, 3],
    //     [6, 1, 8]
    // ],
    const magicSquares = generateAllMagicSquares();
    
    let minCost = Number.MAX_SAFE_INTEGER;
    
    // Try each magic square and find the one with minimum transformation cost
    for (const magicSquare of magicSquares) {
        let currentCost = 0;
        
        // Calculate cost to transform s into this magic square
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                currentCost += Math.abs(s[i][j] - magicSquare[i][j]);
            }
        }
        
        minCost = Math.min(minCost, currentCost);
    }
    
    return minCost;
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
