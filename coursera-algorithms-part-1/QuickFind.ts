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

let id: number[];

// To solve the dynamic connectivity problem
function union(matrix: number[][]): void {
    // Write your code here
    for (const pair of matrix) {
        const p = pair[0];
        const q = pair[1];

        // We use the "array" to store the values of all numbers
        // The index in the array is the number, the value represents
        //   which group/component it belongs to
        // Change the first number's group to the second number's group
        const pid = id[p];
        const qid = id[q];
        for (let i = 0; i < id.length; i++) {
            if (id[i] == pid) {
                id[i] = qid
            }
        }
    }
}

function connected(p: number, q: number): boolean {
    // Quick Find algorithm
    return id[p] == id[q];
}

function main() {
    const [n, unionN] = readLine().replace(/\s+$/g, '').split(' ').map(num => parseInt(num, 10));

    id = new Array(n);
    for (let i = 0; i < n; i++) {
        id[i] = i;
    }

    let matrix: number[][] = Array(unionN);

    for (let i: number = 0; i < unionN; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    union(matrix);

    const queries: number = parseInt(readLine().trim(), 10);

    let queryMatrix = Array(queries);
    for (let i = 0; i < queries; i++) {
        queryMatrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    console.log(id);

    for (const pair of queryMatrix) {
        const p = pair[0];
        const q = pair[1];
        console.log(connected(p, q));
    }
}
