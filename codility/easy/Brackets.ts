// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

import assert from "assert"

function brackets(S: string): number {
    // Implement your solution here
    let stack = []
    let map = new Map([
        ['}', '{'],
        [')', '('],
        [']', '['],
    ])
    for (const c of S) {
        if (c == '{' || c == '(' || c == '[') {
            stack.push(c)
        } else if (map.get(c) == stack[stack.length - 1]) {
            stack.pop()
        }
    }
    return stack.length == 0 ? 1 : 0
}


assert.equal(brackets('{[()()]}'), 1)
assert.equal(brackets('([)()]'), 0)

console.log("All tests passed!");
