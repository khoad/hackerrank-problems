function maxArea(height: number[]): number {
    let maxArea = 0
    let left = 0
    let right = height.length - 1
    while (left < right) {
        let d = right - left
        let h = Math.min(height[right], height[left])
        let area = d * h
        maxArea = Math.max(maxArea, area)
        if (height[left] < height[right]) {
            left++
        } else {
            right--
        }
    }
    return maxArea
};