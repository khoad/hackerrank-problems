function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a - b)
    let stack:number[] = []
    let minDis = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < nums.length - 2; i++) {
        let j = i + 1
        let k = nums.length - 1
        while (j < k) {
            let sum = nums[i] + nums[j] + nums[k]
            let abs = Math.abs(sum - target)
            if (abs < minDis) {
                stack.push(sum)
                minDis = abs
            }
            if (sum == target) {
                return sum
            } else if (sum < target) {
                j++
            } else {
                k--
            }
        }
    }
    return stack[stack.length - 1]
};
