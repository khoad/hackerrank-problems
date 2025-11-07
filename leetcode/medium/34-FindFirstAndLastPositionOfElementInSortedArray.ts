function searchRange(nums: number[], target: number): number[] {
    let left = 0
    let right = nums.length - 1
    while (left <= right) {
        let mid = Math.floor((left + right) / 2)

        if (target == nums[mid]) {
            left = mid
            right = mid
            while (nums[left] >= target) {
                left--
            }
            while (nums[right] <= target) {
                right++
            }
            return [left + 1, right - 1]
        }

        if (target <= nums[mid]) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return [-1, -1]
};
