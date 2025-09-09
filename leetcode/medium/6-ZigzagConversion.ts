function convert(s: string, numRows: number): string {
    if (numRows == 1) {
        return s
    }
    let matrix: string[][] = new Array(numRows).fill(0).map(() => new Array(Math.floor(s.length/numRows)).fill(""))
    let i = 0;
    let j = 0;
    let down = false
    for (let k = 0; k < s.length; k++) {
        matrix[i][j] = s[k]
        if (i == 0 || i == numRows - 1) {
            down = !down
        }
        if (down) {
            i++
        } else {
            i--
            j++
        }
    }
    return matrix.map(row => row.join("")).join("")
};