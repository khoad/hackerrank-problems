function combinationSum(candidates: number[], target: number): number[][] {
    let result: number[][] = []
    backtrack(candidates, target, [], 0, 0, result)
    return result
}

function backtrack(candidates: number[], target: number, round: number[],
                   start: number, sum: number, result: number[][]) {
    if (sum == target) {
        result.push([...round])
        return
    }

    if (sum > target) {
        return
    }

    for (let i = start; i < candidates.length; i++) {
        round.push(candidates[i])
        // recursively adding the current candidate until it's too much
        backtrack(candidates, target, round, i, sum + candidates[i], result)
        // if it reaches here, it means sum >= target
        // either case, remove the last element
        round.pop()
        // after this, continute to try the next candidate
    }
}
