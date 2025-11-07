/**
 Do not return anything, modify nums in-place instead.
 */
 function nextPermutation(nums: number[]): void {
    // We want to find a larger number, but not too large - just the next larger one =>
    // We want to avoid chaning the number in the left - it will increase the number too much =>
    // Example: 432513 -> we can only change the last two numbers and have 432531
    // What if it was 432531 in the first place? 31 cannot be increased.
    // Lets try 531 - still no
    // 2531 - this can be incrased - the smallest number that can be used to incrase the 2 is 3. so for now we have 3521.
    // Next we want to minimize 3521 - thats easier - just sort the numbers to the right of 3 - 3125. So the unswer is 433125

    // Strategy: going from right to left, find one (nums[i]) that is less than its right neighbor (nums[i + 1])
    // On the right, find the smallest number that is greater than nums[i]
    // swap it with nums[i]
    // then sort the rest on the right
    let ii = -1
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            ii = i
            break
        }
    }

    if (ii == -1) {
        // if it reaches here, it means the array is sorted desc
        // so next permutation is the asc sorted version
        nums.sort((a, b) => a - b)
        return
    }

    let smallestGreater = 100
    let jj = 0
    for (let j = ii; j < nums.length; j++) {
        if (nums[ii] < nums[j] && nums[j] < smallestGreater) {
            smallestGreater = nums[j]
            jj = j
        }
    }

    // swap
    let temp = nums[ii]
    nums[ii] = nums[jj]
    nums[jj] = temp


    // sort the rest
    // slice the subarray
    let subArray = nums.slice(ii + 1)


    // sort the sub
    subArray.sort((a, b) => a - b)


    // re-insert
    nums.splice(ii + 1, subArray.length, ...subArray)
};
