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
 * Complete the 'acmTeam' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING_ARRAY topic as parameter.
 */

function acmTeam(topic: string[]): number[] {
    // Write your code here
    let maxTopics = 0
    let teams = 0
    for (let i = 0; i < topic.length - 1; i++) {
        for (let j = i + 1; j < topic.length; j++) {
            const currKnownTopics = knownTopics(topic[i], topic[j])
            if (maxTopics < currKnownTopics) {
                maxTopics = currKnownTopics
                teams = 1
            } else if (maxTopics == currKnownTopics) {
                teams++
            }
        }
    }
    return [maxTopics, teams]
}

function knownTopics(topicsA: string, topicsB: string) {
    let count = 0
    for (let i = 0; i < topicsA.length; i++) {
        if (topicsA[i] === '1' || topicsB[i] === '1') {
            count++
        }
    }
    return count
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const m: number = parseInt(firstMultipleInput[1], 10);

    let topic: string[] = [];

    for (let i: number = 0; i < n; i++) {
        const topicItem: string = readLine();
        topic.push(topicItem);
    }

    const result: number[] = acmTeam(topic);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
