function isValidSudoku(board: string[][]): boolean {
    // All rows
    for (let i = 0; i < board.length; i++) {
        let count = new Array(10).fill(0)
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] == '.') {
                continue
            }
            let idx = parseInt(board[i][j])
            if (++count[idx] >= 2) {
                return false
            }
        }
    }

    // All columns
    for (let j = 0; j < board.length; j++) {
        let count = new Array(10).fill(0)
        for (let i = 0; i < board.length; i++) {
            if (board[i][j] == '.') {
                continue
            }
            let idx = parseInt(board[i][j])
            if (++count[idx] >= 2) {
                return false
            }
        }
    }

    // All 3 x 3
    // diff is 3 each time for each 3 x 3
    for (let iplus = 0; iplus <= 6; iplus += 3) {
        for (let jplus = 0; jplus <= 6; jplus += 3) {

            let count = new Array(10).fill(0)
            for (let i = iplus; i < 3 + iplus; i++) {
                for (let j = jplus; j < 3 + jplus; j++) {
                    if (board[i][j] == '.') {
                        continue
                    }
                    let idx = parseInt(board[i][j])
                    if (++count[idx] >= 2) {
                        return false
                    }
                }
            }
        }
    }

    return true
};

function isValidSudokuAI(board: string[][]): boolean {
    const rows = Array.from({ length: 9 }, () => new Set<string>())
    const cols = Array.from({ length: 9 }, () => new Set<string>())
    const boxes = Array.from({ length: 9 }, () => new Set<string>())

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            const cell = board[i][j]

            if (cell == '.') {
                continue
            }

            const idx = Math.floor(i / 3) * 3 + Math.floor(j / 3)
            if (rows[i].has(cell) || cols[j].has(cell) || boxes[idx].has(cell)) {
                return false
            }

            rows[i].add(cell)
            cols[j].add(cell)
            boxes[idx].add(cell)
        }
    }

    return true
};
