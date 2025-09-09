function twoSum(nums: number[], target: number): number[] {
    var map = new Map()
    for (let i = 0; i < nums.length; i++) {
        const toFind = target - nums[i]

        const found = map.get(toFind)

        if (found !== undefined && i !== found) {
            return [found, i]
        }

        map.set(nums[i], i)
    }
    return []
};