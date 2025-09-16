// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function nesting(S: string): number {
    // Implement your solution here
    let stack = []
    let map = new Map([
        [')', '('],
    ])
    for (const c of S) {
        // console.log(stack, map.get(c), stack[stack.length - 1], map.get(c) == stack[stack.length - 1])
        if (c == '(') {
            stack.push(c)
        } else if (map.get(c) == stack[stack.length - 1]) {
            stack.pop()
        } else if (stack.length == 0) {
            return 0
        }
    }
    return stack.length == 0 ? 1 : 0
}


assert.equal(nesting('(()(())())'), 1)
assert.equal(nesting('())'), 0)

console.log("All tests passed!");
