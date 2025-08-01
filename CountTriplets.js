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

// Complete the countTriplets function below.
function countTriplets(arr, r) {
    let count = 0;
    
    // Map to track elements seen so far (left side)
    const leftMap = new Map();
    
    // Map to track elements yet to be seen (right side)
    const rightMap = new Map();
    
    // Initialize rightMap with all elements
    for (const num of arr) {
        rightMap.set(num, (rightMap.get(num) || 0) + 1);
    }
    
    // For each potential middle element
    for (let j = 0; j < arr.length; j++) {
        const middle = arr[j];
        const left = middle / r;
        const right = middle * r;
        
        // Remove current element from rightMap first
        const currentCount = rightMap.get(middle);
        if (currentCount === 1) {
            rightMap.delete(middle);
        } else {
            rightMap.set(middle, currentCount - 1);
        }
        
        // Count triplets where arr[j] is the middle element
        const leftCount = leftMap.get(left) || 0;
        const rightCount = rightMap.get(right) || 0;
        count += leftCount * rightCount;
        
        // Add current element to leftMap
        leftMap.set(middle, (leftMap.get(middle) || 0) + 1);
    }
    
    return count;
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nr = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(nr[0], 10);

    const r = parseInt(nr[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const ans = countTriplets(arr, r);

    console.log(ans)
    // ws.write(ans + '\n');

    // ws.end();
}
