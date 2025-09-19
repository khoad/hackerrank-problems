// Implement a change returning algorithm for a vending machine
// M is the money put in
// P is the cost of the item
function getChange(M: number, P: number): number[] {
    let remaining = M - P
    const result:number[] = []

    for (let coinValue of [1, 0.5, 0.25, 0.1, 0.05, 0.01]) {
        let coinChange: number
        [coinChange, remaining] = changeFor(remaining, coinValue)
        result.unshift(coinChange)
    }

    return result
}

function changeFor(changeTotal: number, coinValue: number): [number, number] {
    let coins = Math.floor(changeTotal / coinValue)
    changeTotal %= coinValue
    changeTotal = Number(changeTotal.toFixed(2))
    return [coins, changeTotal]
}

console.log(getChange(5, 0.99))
console.log(getChange(3.14, 1.99))
console.log(getChange(3, 0.01))
console.log(getChange(4, 3.14))
console.log(getChange(0.45, 0.34))