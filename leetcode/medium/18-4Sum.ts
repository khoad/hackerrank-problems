function fourSum(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b)
    const results: number[][] = []
    let abSet = new Set()
    for (let a = 0; a < nums.length - 3; a++) {
        for (let b = a + 1; b < nums.length - 2; b++) {
            if (abSet.has(`${nums[a]},${nums[b]}`)) {
                continue
            }
            abSet.add(`${nums[a]},${nums[b]}`)
            let c = b + 1
            let d = nums.length - 1
            let prevC = -1
            while (c < d) {
                if (nums[c] == nums[prevC]) {
                    prevC = c
                    c++
                    continue
                }
                let sum = nums[a] + nums[b] + nums[c] + nums[d]
                if (sum == target) {
                    results.push([nums[a], nums[b], nums[c], nums[d]])
                    prevC = c
                    c++
                } else if (sum < target) {
                    prevC = c
                    c++
                } else {
                    d--
                }
            }
        }
    }
    return results
};
