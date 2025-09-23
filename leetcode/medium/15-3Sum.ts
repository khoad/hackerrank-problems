function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b)
    let result:any[] = []
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] == nums[i-1]) {
            continue
        }
        let j = i + 1
        let k = nums.length - 1
        let prevJ = -1
        while (j < k) {
            if (nums[j] == nums[prevJ]) {
                prevJ = j
                j++
                continue
            }
            let sum = nums[i] + nums[j] + nums[k]
            if (sum == 0) {
                result.push([nums[i], nums[j], nums[k]])
                prevJ = j
                j++
            } else if (sum < 0) {
                prevJ = j
                j++
            } else {
                k--
            }
        }
    }
    return result
};
