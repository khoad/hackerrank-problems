function longestPalindrome(s: string): string {
    let maxSubString = s[0]

    if (s.length == 1 || s.length == 2 && s[0] != s[1]) {
        return maxSubString
    }

    let allSame = true
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] != s[i+1]) {
            allSame = false
            break
        }
    }

    if (allSame) {
        return s
    }

    for (let i = 0; i < s.length-1; i++) {
        let oddSubString = ''
        let evenSubString = ''

        if (i-1 >= 0 && s[i-1] == s[i+1]) {
            let jBackup = 0
            for (let j = 1; j < s.length; j++) {
                if (i - j >= 0 && i + j < s.length && s[i-j] == s[i+j]) {
                    jBackup = j
                } else {
                    break
                }
            }

            oddSubString = s.substring(i-jBackup, i+jBackup+1)
        }

        if (s[i] == s[i+1]) {
            let jBackup = 0
            for (let j = 1; j < s.length - 1; j++) {
                if (i - j >= 0 && i + j + 1 < s.length && s[i-j] == s[i+j+1]) {
                    jBackup = j
                } else {
                    break
                }
            }

            evenSubString = s.substring(i-jBackup, i+jBackup+2)
        }

        if (oddSubString.length > maxSubString.length) {
            maxSubString = oddSubString
        }

        if (evenSubString.length > maxSubString.length) {
            maxSubString = evenSubString
        }
    }

    return maxSubString
};