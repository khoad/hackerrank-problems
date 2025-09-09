function myAtoi(s: string): number {
    var builder = ''
    var acceptableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    var startParsing = false
    for (let i = 0; i < s.length; i++) {
        if (!startParsing && (s[i] == ' ' || s[i] == '+')) {
            if (s[i] == '+') {
                startParsing = true
            }
            continue
        }

        if (!startParsing && s[i] == '-') {
            builder += s[i]
            startParsing = true
            continue
        }

        if (acceptableChars.includes(s[i])) {
            startParsing = true
            builder += s[i]
        } else {
            break
        }
    }
    if (builder == '' || builder == '-') {
        return 0
    }
    var n = parseInt(builder)
    var min = 2**31 * -1
    var max = 2**31 - 1
    return n < min ? min : n > max ? max : n
};