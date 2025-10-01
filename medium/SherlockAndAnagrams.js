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
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function sherlockAndAnagrams(s) {
    // Write your code here
    let anagrams = 0
    for (let l = 1; l < s.length; l++) { // l = 1
        for (let i = 0; i < s.length; i++) { // i = 0
            const s1 = s.substring(i, i+l) // 0 -> 1 (s1 = a)
            for (let j = 1; j <= s.length - l; j++) { // j = 1
                const s2 = s.substring(i+j, i+j+l) // 1 -> 2 (s2 = b)
                if (areAnagrams(s1, s2)) {
                    anagrams++
                }   
            }
        }
    }
    return anagrams
}

function areAnagrams(s1, s2) {
    if (s1 === s2) {
        return true
    }

    if (s1.length !== s2.length) {
        return false
    }
    
    const map1 = new Map()
    for (const c of s1) {
        let count = map1.get(c) ?? 0
        map1.set(c, count+1)
    }
    
    const map2 = new Map()
    for (const c of s2) {
        let count = map2.get(c) ?? 0
        map2.set(c, count+1)
    }
    
    for (const [k, v] of map1) {
        if (v !== map2.get(k)) {
            return false
        }
    }
    
    return true
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = sherlockAndAnagrams(s);

        // ws.write(result + '\n');
        console.log(result)
    }

    // ws.end();
}
