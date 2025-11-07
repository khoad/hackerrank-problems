/**
 * O(log n) solution using modified binary search
 *
 * Key insight: In a rotated sorted array, when we split at mid,
 * at least one half (left or right) will always be properly sorted.
 *
 * Why check the sorted half first?
 * - The sorted half gives us DEFINITE boundaries: we can check if
 *   target is in [nums[left], nums[mid]] using simple comparisons
 * - If target is in the sorted range, it MUST be in that half
 * - If target is NOT in the sorted range, it MUST be in the other half
 * - The unsorted half doesn't give us clear boundaries, so we use
 *   elimination logic: "if not in sorted half, must be in unsorted half"
 *
 * Algorithm:
 * 1. Check which half is sorted by comparing nums[left] with nums[mid]
 * 2. If left half is sorted:
 *    - If target is in [nums[left], nums[mid]], search left half
 *    - Otherwise, search right half (by elimination)
 * 3. If right half is sorted:
 *    - If target is in [nums[mid], nums[right]], search right half
 *    - Otherwise, search left half (by elimination)
 */
function search(nums: number[], target: number): number {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Found the target
        if (nums[mid] === target) {
            return mid;
        }

        // Check if left half is sorted (nums[left] <= nums[mid])
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            // Check if target is in the left half
            if (nums[left] <= target && target < nums[mid]) {
                // Target is in the sorted left half
                right = mid - 1;
            } else {
                // Target is in the right half (which may be rotated)
                left = mid + 1;
            }
        } else {
            // Right half is sorted (nums[mid] < nums[right])
            // Check if target is in the right half
            if (nums[mid] < target && target <= nums[right]) {
                // Target is in the sorted right half
                left = mid + 1;
            } else {
                // Target is in the left half (which may be rotated)
                right = mid - 1;
            }
        }
    }

    // Target not found
    return -1;
};
