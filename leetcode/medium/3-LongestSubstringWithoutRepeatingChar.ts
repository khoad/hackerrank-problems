function lengthOfLongestSubstring(s: string): number {
    let maxLength = 0
    let lastSeen = new Map()
    let left = 0

    for (let right = 0; right < s.length; right++) {
        let char = s[right]

        if (lastSeen.get(char) >= left) {
            left = lastSeen.get(char) + 1
        }

        maxLength = Math.max(maxLength, right - left + 1)

        lastSeen.set(char, right)
    }

    return maxLength
};