/**
 * Letter Combinations of a Phone Number
 * 
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations 
 * that the number could represent. Return the answer in any order.
 * 
 * Time Complexity: O(4^n) where n is the length of digits
 * Space Complexity: O(4^n) for the result array + O(n) for recursion stack
 */

function letterCombinationsBruteForce(digits: string): string[] {
    if (digits.length == 0) {
        return []
    }
    const map = new Map<string, string>([
        ['2', 'abc'],
        ['3', 'def'],
        ['4', 'ghi'],
        ['5', 'jkl'],
        ['6', 'mno'],
        ['7', 'pqrs'],
        ['8', 'tuv'],
        ['9', 'wxyz'],
    ])
    if (digits.length == 1) {
        return map.get(digits[0])!.split('')
    }
    const result: string[] = []
    const inputs = digits.split('').map(d => map.get(d))
    if (inputs.length == 2) {
        for (let i = 0; i < inputs[0]!.length; i++) {
            for (let j = 0; j < inputs[1]!.length; j++) {
                result.push(inputs[0]![i] + inputs[1]![j])
            }
        }
    } else if (inputs.length == 3) {
        for (let i = 0; i < inputs[0]!.length; i++) {
            for (let j = 0; j < inputs[1]!.length; j++) {
                for (let k = 0; k < inputs[2]!.length; k++) {
                    result.push(inputs[0]![i] + inputs[1]![j] + inputs[2]![k])
                }
            }
        }
    } else if (inputs.length == 4) {
        for (let i = 0; i < inputs[0]!.length; i++) {
            for (let j = 0; j < inputs[1]!.length; j++) {
                for (let k = 0; k < inputs[2]!.length; k++) {
                    for (let l = 0; l < inputs[3]!.length; l++) {
                        result.push(inputs[0]![i] + inputs[1]![j] + inputs[2]![k] + inputs[3]![l])
                    }
                }
            }
        }
    }
    return result
};

// Optimized solution using backtracking
function letterCombinations(digits: string): string[] {
    if (digits.length === 0) return [];
    
    // Phone keypad mapping
    const keypad: { [key: string]: string } = {
        '2': 'abc',
        '3': 'def', 
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };
    
    const result: string[] = [];
    
    // Backtracking function to build combinations
    function backtrack(index: number, currentCombination: string): void {
        // Base case: if we've processed all digits, add the combination
        if (index === digits.length) {
            result.push(currentCombination);
            return;
        }
        
        // Get the letters for current digit
        const letters = keypad[digits[index]];
        
        // Try each letter for current digit
        for (const letter of letters) {
            backtrack(index + 1, currentCombination + letter);
        }
    }
    
    backtrack(0, '');
    return result;
}

// Alternative iterative solution using queue (BFS approach)
function letterCombinationsIterative(digits: string): string[] {
    if (digits.length === 0) return [];
    
    const keypad: { [key: string]: string } = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };
    
    let queue: string[] = [''];
    
    for (const digit of digits) {
        const letters = keypad[digit];
        const newQueue: string[] = [];
        
        for (const combination of queue) {
            for (const letter of letters) {
                newQueue.push(combination + letter);
            }
        }
        
        queue = newQueue;
    }
    
    return queue;
}

// Export the main function
export { letterCombinations };
