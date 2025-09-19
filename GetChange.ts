import assert from "assert"

// Implement a change returning algorithm for a vending machine
// M is the money put in
// P is the cost of the item
function getChange(M: number, P: number): number[] {
    let remaining = M * 100 - P * 100 // Get rid of rounding problem
    const result:number[] = []

    for (let coinValue of [100, 50, 25, 10, 5, 1]) {
        let coins = Math.floor(remaining / coinValue)
        remaining %= coinValue
        result.unshift(coins)
    }

    return result
}

assert.equal(JSON.stringify(getChange(5, 0.99)), JSON.stringify([ 1, 0, 0, 0, 0, 4 ]))
assert.equal(JSON.stringify(getChange(3.14, 1.99)), JSON.stringify([ 0, 1, 1, 0, 0, 1 ]))
assert.equal(JSON.stringify(getChange(3, 0.01)), JSON.stringify([ 4, 0, 2, 1, 1, 2 ]))
assert.equal(JSON.stringify(getChange(4, 3.14)), JSON.stringify([ 1, 0, 1, 1, 1, 0 ]))
assert.equal(JSON.stringify(getChange(0.45, 0.34)), JSON.stringify([ 1, 0, 1, 0, 0, 0 ]))

console.log('All tests passed!')
