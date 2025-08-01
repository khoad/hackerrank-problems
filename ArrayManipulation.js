'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'arrayManipulation' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY queries
 */

function arrayManipulation(n, queries) {
    // Write your code here
    let main = new Array(n+1).fill(0)
    let max = 0
    for (let i = 0; i < queries.length; i++) {
        const a = queries[i][0]
        const b = queries[i][1]
        const k = queries[i][2]
        
        main[a] += k
        main[b+1] -= k
        console.log('Current main', main)
    }
    let current = 0
    for (let i = 1; i < main.length; i++) {
        current += main[i]
        if (max < current) {
            max = current
        }
    }
    return max
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let queries = Array(m);

    for (let i = 0; i < m; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = arrayManipulation(n, queries);
    console.log(result)

    // ws.write(result + '\n');

    // ws.end();
}
