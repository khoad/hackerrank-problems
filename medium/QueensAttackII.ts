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
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n: number, k: number, r_q: number, c_q: number, obstacles: number[][]): number {
    // Write your code here
    let [i_q, j_q] = convertIndex(r_q, c_q, n)
    
    // // upperLeft (from Queen)
    // let [uLi, uLj] = [i_q - 1, j_q - 1]
    // // upperRight
    // let [uRi, uRj] = [i_q - 1, j_q + 1]
    // // lowerRight
    // let [lRi, lRj] = [i_q + 1, j_q + 1]
    // // lowerLeft
    // let [lLi, lLj] = [i_q + 1, j_q - 1]
    
    // // up
    // let [ui, uj] = [i_q - 1, j_q]
    // // down
    // let [di, dj] = [i_q + 1, j_q]
    // // left
    // let [li, lj] = [i_q, j_q - 1]
    // // right
    // let [ri, rj] = [i_q, j_q + 1]
    
    obstacles = obstacles.map(([r, c]) => convertIndex(r, c, n))
   
    let count = 0
    
    // filter <->    
    let horizontalObstacles = obstacles.filter(([i, j]) => i == i_q)

    // ->
    let rightObstacles = horizontalObstacles.filter(([i, j]) => j > j_q)    
    let rightMinJ = Math.min(...rightObstacles.map(([i, j]) => j))
    count += Math.min(rightMinJ - 1 - j_q, n - 1 - j_q)
    
    // <-    
    let leftObstacles = horizontalObstacles.filter(([i, j]) => j < j_q)
    let leftMaxJ = Math.max(...leftObstacles.map(([i, j]) => j))
    count += Math.min(j_q - 1 - leftMaxJ, j_q)
    
    // filter up down
    let vertialObstacles = obstacles.filter(([i, j]) => j == j_q)
    let upObstacles = vertialObstacles.filter(([i, j]) => i < i_q)
    let downObstacles = vertialObstacles.filter(([i, j]) => i > i_q)
    
    // down
    let downMinI = Math.min(...downObstacles.map(([i, j]) => i))
    count += Math.min(downMinI - 1 - i_q, n - 1 - i_q)
    
    // up
    let upMaxI = Math.max(...upObstacles.map(([i, j]) => i))
    count += Math.min(i_q - 1 - upMaxI, i_q)

    // filter for main diagonal
    let mainDiagonal = obstacles.filter(([i, j]) => i - i_q == j - j_q)    
    // down and right
    let downRightObstacles = mainDiagonal.filter(([i, j]) => i > i_q)
    let upLeftObstacles = mainDiagonal.filter(([i, j]) => i < i_q)
    
    let downRightMinI = Math.min(...downRightObstacles.map(([i, j]) => i))
    count += Math.min(downRightMinI - 1 - i_q, n - 1 - Math.max(i_q, j_q))
    
    // up and left
    let upLeftMaxI = Math.max(...upLeftObstacles.map(([i, j]) => i))
    count += Math.min(i_q - 1 - upLeftMaxI, Math.min(i_q, j_q))
    
    // filter for counter diagonal
    let counterDiagonal = obstacles.filter(([i, j]) => i - i_q == j_q - j)
    let upRightObstacles = counterDiagonal.filter(([i, j]) => j > j_q)
    let downLeftObstacles = counterDiagonal.filter(([i, j]) => j < j_q)
    
    // up and right
    let upRightMinJ = Math.min(...upRightObstacles.map(([i, j]) => j))
    count += Math.min(upRightMinJ - 1 - j_q, n - 1 - Math.max(n - 1 - i_q, j_q))
    
    // down and left
    let downLeftMinI = Math.min(...downLeftObstacles.map(([i, j]) => i))
    count += Math.min(downLeftMinI - 1 - i_q, n - 1 - Math.max(i_q, n - 1 - j_q))
    
    return count
}

function queensAttack_optimized(n: number, k: number, r_q: number, c_q: number, obstacles: number[][]): number {
    // 8 directions: N, NE, E, SE, S, SW, W, NW
    const directions = [
        [0,1],
        [0,-1],
        [1,0],
        [-1,0],
        [1,1],
        [-1,-1],
        [-1,1],
        [1,-1],
    ];
    
    // Create a set of obstacles for O(1) lookup
    const obstacleSet = new Set<string>();
    for (const [r, c] of obstacles) {
        obstacleSet.add(`${r},${c}`);
    }
    
    let totalMoves = 0;
    
    // For each direction, count how many squares the queen can attack
    for (const [dr, dc] of directions) {
        let r = r_q + dr
        let c = c_q + dc
        
        // Keep moving in this direction until we hit a boundary or obstacle
        while (
            r >= 1 && r <= n &&  // Within board vertically
            c >= 1 && c <= n &&  // Within board horizontally
            !obstacleSet.has(`${r},${c}`)  // No obstacle
        ) {
            r += dr
            c += dc
            totalMoves++
        }
        
    }
    
    return totalMoves;
}

function convertIndex(r: number, c: number, size: number): [number, number] {
    return [size-r, c-1]
}

function includes(obstacles: number[][], [i, j]: number[]): boolean {
    return obstacles.some(([r, c]) => r == i && c == j)
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const n: number = parseInt(firstMultipleInput[0], 10);

    const k: number = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

    const r_q: number = parseInt(secondMultipleInput[0], 10);

    const c_q: number = parseInt(secondMultipleInput[1], 10);

    let obstacles: number[][] = Array(k);

    for (let i: number = 0; i < k; i++) {
        obstacles[i] = readLine().replace(/\s+$/g, '').split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    const result: number = queensAttack_optimized(n, k, r_q, c_q, obstacles);

    ws.write(result + '\n');

    ws.end();
}
