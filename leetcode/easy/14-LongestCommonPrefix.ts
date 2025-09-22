function longestCommonPrefix(strs: string[]): string {
    // Mine
    // let i = 0
    // let done = false
    // let result = ''
    // while (true) {
    //     for (let j = 0; j < strs.length; j++) {
    //         if (!strs[j].charAt(i) || strs[j].charAt(i) != strs[0].charAt(i)) {
    //             done = true
    //             break
    //         }
    //     }
    //     if (done) {
    //         break
    //     }
    //     result += strs[0].charAt(i)
    //     i++
    // }
    // return result

    // Best
    let pref = strs[0];
    let prefLen = pref.length;

    for (let i = 1; i < strs.length; i++) {
        let s = strs[i];
        while (pref !== s.substring(0, prefLen)) {
            prefLen--;
            if (prefLen === 0) {
                return "";
            }
            pref = pref.substring(0, prefLen);
        }
    }

    return pref;
};
