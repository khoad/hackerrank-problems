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
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */
function biggerIsGreater(w: string): string {
    // Write your code here
    let pivotIdx = -1
    for (let i = w.length - 1; i - 1 >= 0; i--) {
        if (w[i - 1] < w[i]) {
            pivotIdx = i - 1
            break
        }
    }
    
    if (pivotIdx == -1) {
        // This covers all the short circus cases:
        // 1. One char
        // 2. All same char
        // 3. Sorted descending order (left to right)
        return 'no answer'
    }
    
    let charArray = Array.from(w)
    
    // When we're going from right to left, they are all from ascending order (going up)
    // unil we hit pivot, so the first value that is > pivot is the smallest that is > pivot
    // so we break when we find it
    let successorIdx = -1 // min that is > than pivot
    for (let i = w.length - 1; i > pivotIdx; i--) {
        if (w[i] > w[pivotIdx]) {
            successorIdx = i
            break
        }
    }
    
    // swap (Other languages)
    // const temp = charArray[pivotIdx]
    // charArray[pivotIdx] = charArray[successorIdx]
    // charArray[successorIdx] = temp
    
    // typescript swap
    [charArray[pivotIdx], charArray[successorIdx]] = [charArray[successorIdx], charArray[pivotIdx]]
    
    // Again, when we're going from right to left, they are all from ascending order (going up)
    // So doing a reverse here on the suffix is the same thing as sorting, but more efficient
    return charArray.slice(0, pivotIdx + 1).join('') + charArray.slice(pivotIdx + 1).reverse().join('')
}

function biggerIsGreaterAI(w: string): string {
    // Convert string to array for easier manipulation
    const arr: string[] = w.split('');
    const n: number = arr.length;
    
    // Step 1: Find the pivot (rightmost character that is smaller than its right neighbor)
    let pivot: number = -1;
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] < arr[i + 1]) {
            pivot = i;
            break;
        }
    }
    
    // If no pivot found, this is the highest permutation
    if (pivot === -1) {
        return "no answer";
    }
    
    // Step 2: Find the successor (smallest character greater than pivot, from the right)
    let successor: number = -1;
    for (let i = n - 1; i > pivot; i--) {
        if (arr[i] > arr[pivot]) {
            successor = i;
            break;
        }
    }
    
    // Step 3: Swap pivot and successor
    [arr[pivot], arr[successor]] = [arr[successor], arr[pivot]];
    
    // Step 4: Reverse the suffix (everything after the pivot position)
    let left: number = pivot + 1;
    let right: number = n - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr.join('');
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const T: number = parseInt(readLine().trim(), 10);

    for (let TItr: number = 0; TItr < T; TItr++) {
        const w: string = readLine();

        const result: string = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}
