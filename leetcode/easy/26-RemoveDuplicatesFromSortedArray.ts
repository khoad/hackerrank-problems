function removeDuplicates(nums: number[]): number {
    let set = new Set<number>()
    let i = 0
    for (const n of nums) {
        if (!set.has(n)) {
            set.add(n)
            nums[i] = n
            i++
        }
    }
    return set.size
};
