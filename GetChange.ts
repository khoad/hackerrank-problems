import assert from "assert"

// Implement a change returning algorithm for a vending machine
// M is the money put in
// P is the cost of the item
function getChange(M: number, P: number): number[] {
    let result:number[] = []
    let changeTotal = M - P
    let dollar: number
    [dollar, changeTotal] = changeFor(changeTotal, 1)
    result.unshift(dollar)
    // console.log('$1', dollar, changeTotal)

    let fifty: number
    [fifty, changeTotal] = changeFor(changeTotal, 0.5)
    result.unshift(fifty)
    // console.log('50c', fifty, changeTotal)

    let twentyFive: number
    [twentyFive, changeTotal] = changeFor(changeTotal, 0.25)
    result.unshift(twentyFive)
    // console.log('25c', twentyFive, changeTotal)

    let ten: number
    [ten, changeTotal] = changeFor(changeTotal, 0.1)
    result.unshift(ten)
    // console.log('10c', ten, changeTotal)

    let five: number
    [five, changeTotal] = changeFor(changeTotal, 0.05)
    result.unshift(five)
    // console.log('5c', five, changeTotal)

    let one = Number((changeTotal * 100).toFixed(0))
    result.unshift(one)
    // console.log('1c', one, changeTotal)

    return result
    // return [one, five, ten, twentyFive, fifty, dollar]
}

function changeFor(changeTotal: number, coin: number): [number, number] {
    let coins = Math.floor(changeTotal / coin)
    changeTotal %= coin
    changeTotal = Number(changeTotal.toFixed(2))
    return [coins, changeTotal]
}

console.log(getChange(5, 0.99))
console.log(getChange(3.14, 1.99))
console.log(getChange(3, 0.01))
console.log(getChange(4, 3.14))
console.log(getChange(0.45, 0.34))