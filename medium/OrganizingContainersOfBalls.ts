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
 * Complete the 'organizingContainers' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts 2D_INTEGER_ARRAY container as parameter.
 */

function organizingContainers(container: number[][]): string {
    const n = container.length;
    
    // Calculate container capacities (sum of each row)
    const containerCapacities: number[] = [];
    for (let i = 0; i < n; i++) {
        let capacity = 0;
        for (let j = 0; j < n; j++) {
            capacity += container[i][j];
        }
        containerCapacities.push(capacity);
    }
    
    // Calculate ball type quantities (sum of each column)
    const ballTypeQuantities: number[] = [];
    for (let j = 0; j < n; j++) {
        let quantity = 0;
        for (let i = 0; i < n; i++) {
            quantity += container[i][j];
        }
        ballTypeQuantities.push(quantity);
    }
    
    // Sort both arrays
    containerCapacities.sort((a, b) => a - b);
    ballTypeQuantities.sort((a, b) => a - b);
    
    // Check if sorted arrays are equal
    for (let i = 0; i < n; i++) {
        if (containerCapacities[i] !== ballTypeQuantities[i]) {
            return 'Impossible';
        }
    }
    
    return 'Possible';
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        let container: number[][] = Array(n);

        for (let i: number = 0; i < n; i++) {
            container[i] = readLine().replace(/\s+$/g, '').split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        const result: string = organizingContainers(container);

        ws.write(result + '\n');
    }

    ws.end();
}
