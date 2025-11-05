function removeElement(nums: number[], val: number): number {
    let i = 0,
        k = 0
    for (const n of nums) {
        if (n != val) {
            nums[i] = n
            i++
            k++
        }
    }
    return k
};
