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
 * Complete the 'activityNotifications' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY expenditure
 *  2. INTEGER d
 */

function activityNotifications(expenditure: number[], d: number): number {
    // Write your code here
    let warnings = 0
    let count = new Array(201).fill(0)
    
    for (let i = 0; i < d; i++) {
        count[expenditure[i]]++
    }
    
    for (let i = d; i < expenditure.length; i++) {
        const median = findMedian(count, d)
        if (expenditure[i] >= median * 2) {
            warnings++
        }
        // Sliding window, remove oldest, add newest
        count[expenditure[i-d]]--
        count[expenditure[i]]++
    }
    
    return warnings
}

function findMedian(count: number[], d: number) {
    let isOdd = d % 2 == 1
    let halfD = d / 2
    let floor = Math.floor(halfD)
    let ceil = Math.ceil(halfD)
    
    let firstMedian = -1
    let secondMedian = -1
    
    let counter = 0
    let median = 0
    for (let i = 0; i < count.length; i++) {        
        let found: boolean = false
        for (let j = 0; j < count[i]; j++) {
            counter++
            if (isOdd && counter >= halfD) {
                median = i
                // console.log('median is', median)
                found = true
                break
            } else if (!isOdd && firstMedian == -1 && counter >= floor) {
                firstMedian = i
                // console.log('first median is', firstMedian)
            } else if (!isOdd && counter >= ceil) {
                secondMedian = i
                // console.log('second median is', secondMedian)
                found = true
                break
            }
        }
        if (found) {
            break
        }
    }
    return isOdd ? median : ((firstMedian + secondMedian) / 2)
}

// function activityNotifications(expenditure: number[], d: number): number {
//     let warnings = 0;
    
//     // Use counting sort approach since expenditure values are typically small (0-200)
//     const maxExpenditure = 200; // Typical constraint in HackerRank problems
//     let count = new Array(maxExpenditure + 1).fill(0);
    
//     // Initialize the counting array for the first d days
//     for (let i = 0; i < d; i++) {
//         count[expenditure[i]]++;
//     }
    
//     // Process each day starting from day d
//     for (let i = d; i < expenditure.length; i++) {
//         const median = findMedianFromCount(count, d);
        
//         if (expenditure[i] >= median * 2) {
//             warnings++;
//         }
        
//         // Slide the window: remove the oldest day, add the current day
//         count[expenditure[i - d]]--; // Remove oldest
//         count[expenditure[i]]++;     // Add current
//     }
    
//     return warnings;
// }

// function findMedianFromCount(count: number[], d: number): number {
//     const isEven = d % 2 === 0;
//     const mid1 = Math.floor((d - 1) / 2);
//     const mid2 = Math.floor(d / 2);
    
//     let cumulativeCount = 0;
//     let firstMedian = -1;
//     let secondMedian = -1;
    
//     for (let expenditure = 0; expenditure < count.length; expenditure++) {
//         cumulativeCount += count[expenditure];
        
//         if (firstMedian === -1 && cumulativeCount > mid1) {
//             firstMedian = expenditure;
//         }
        
//         if (cumulativeCount > mid2) {
//             secondMedian = expenditure;
//             break;
//         }
//     }
    
//     return isEven ? (firstMedian + secondMedian) / 2 : secondMedian;
// }

function main() {
    // const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const d: number = parseInt(firstMultipleInput[1], 10);

    const expenditure: number[] = readLine().replace(/\s+$/g, '').split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    const result: number = activityNotifications(expenditure, d);

    // ws.write(result + '\n');

    // ws.end();

    console.log(result)
}
