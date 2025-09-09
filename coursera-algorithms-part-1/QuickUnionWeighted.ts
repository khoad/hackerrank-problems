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

        // Quick Union algorithm improvements
        // Comparing heights
        // Set p root to be q root
        const [pRoot, pHeight] = root(p)
        const [qRoot, qHeight] = root(q)
        if (pHeight < qHeight) {
            id[pRoot] = qRoot;
        } else {
            id[pRoot] = qRoot;
        }
    }
}

function connected(p: number, q: number): boolean {
    // Quick Union algorithm
    // See if they have the same root
    return root(p)[0] == root(q)[0];
}

function root(num: number): [number, number] {
    let height = 0
    console.log('finding root of', num)
    while (num != id[num]) {
        // Path compression
        // no reason not to do it!
        console.log('num', num, 'id[num]', id[num], 'id[id[num]]', id[id[num]])
        console.log('before', id)
        id[num] = id[id[num]] // <-- only one extra line of code to flatten the tree!
        console.log('after', id)
        num = id[num]
        height++
    }
    return [num, height];
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
