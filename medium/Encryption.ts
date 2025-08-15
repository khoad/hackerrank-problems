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
 * Complete the 'encryption' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function encryption(s: string): string {
    // Write your code here
    const sqrt = Math.sqrt(s.length)
    let numOfRows = Math.floor(sqrt)
    const numOfColumns = Math.ceil(sqrt)
    
    if (numOfRows * numOfColumns < s.length) {
        numOfRows++   
    }
    
    const matrix: string[] = []
    
    for (let i = 0; i < s.length; i += numOfColumns) {
        matrix.push(s.slice(i, i + numOfColumns))
    }
    
    let result = ''
    for (let j = 0; j < numOfColumns; j++) {
        let word = ''
        for (let i = 0; i < numOfRows; i++) {
            word = word.concat(matrix[i][j] ? matrix[i][j] : '')
        }
        result = result.concat(word + ' ')
    }
    
    return result.substring(0, result.length - 1)
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = encryption(s);

    ws.write(result + '\n');

    ws.end();
}
