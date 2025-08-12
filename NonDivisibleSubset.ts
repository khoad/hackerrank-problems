/**
 * Non-Divisible Subset Problem
 * 
 * Given an array of integers and a positive integer k, determine the maximum number of elements
 * in the array that can be selected such that no two elements have a sum divisible by k.
 * 
 * Problem Analysis:
 * - For two numbers a and b, if (a + b) % k = 0, then they cannot both be in the subset
 * - We can group numbers by their remainder when divided by k
 * - For remainders r and (k-r), we can only choose from one group
 * 
 * Time Complexity: O(n + k)
 * Space Complexity: O(k)
 */

function nonDivisibleSubset(k: number, s: number[]): number {
    // Count frequency of each remainder
    const remainderCount: number[] = new Array(k).fill(0);
    
    // Group numbers by their remainder when divided by k
    for (const num of s) {
        remainderCount[num % k]++;
    }
    
    let maxSubsetSize = 0;
    
    // Case 1: Remainder 0
    // Numbers with remainder 0 sum to a multiple of k with any other number with remainder 0
    // So we can include at most 1 number with remainder 0
    if (remainderCount[0] > 0) {
        maxSubsetSize += 1;
    }
    
    // Case 2: For remainders 1 to k/2
    // For each remainder r, we have a complementary remainder (k-r)
    // Numbers with remainder r and remainder (k-r) sum to k (divisible by k)
    // So we can choose all numbers from either group r OR group (k-r), but not both
    for (let r = 1; r <= Math.floor(k / 2); r++) {
        const complement = k - r;
        
        if (r === complement) {
            // Special case: when k is even and r = k/2
            // Numbers with remainder k/2 sum to k with other numbers having remainder k/2
            // So we can include at most 1 number with remainder k/2
            if (remainderCount[r] > 0) {
                maxSubsetSize += 1;
            }
        } else {
            // Choose the larger group between remainder r and remainder (k-r)
            maxSubsetSize += Math.max(remainderCount[r], remainderCount[complement]);
        }
    }
    
    return maxSubsetSize;
}

// Test cases
function testNonDivisibleSubset(): void {
    console.log("Testing Non-Divisible Subset...\n");
    
    // Test case 1
    const s1 = [1, 7, 2, 4];
    const k1 = 3;
    const result1 = nonDivisibleSubset(k1, s1);
    console.log(`Input: s = [${s1.join(', ')}], k = ${k1}`);
    console.log(`Expected: 3, Got: ${result1}`);
    console.log(`Explanation: We can choose [1, 7, 4]. Their remainders are [1, 1, 1] mod 3.`);
    console.log(`No two elements sum to a multiple of 3.\n`);
    
    // Test case 2
    const s2 = [278, 576, 496, 727, 410, 124, 338, 149, 209, 702, 282, 718, 771, 575, 436];
    const k2 = 7;
    const result2 = nonDivisibleSubset(k2, s2);
    console.log(`Input: s = [${s2.join(', ')}], k = ${k2}`);
    console.log(`Expected: 11, Got: ${result2}\n`);
    
    // Test case 3: Edge case with k = 2
    const s3 = [1, 2, 3, 4, 5, 6];
    const k3 = 2;
    const result3 = nonDivisibleSubset(k3, s3);
    console.log(`Input: s = [${s3.join(', ')}], k = ${k3}`);
    console.log(`Expected: 3, Got: ${result3}`);
    console.log(`Explanation: We can choose either all odd numbers [1, 3, 5] or all even numbers [2, 4, 6].\n`);
}

// Alternative solution with detailed step-by-step explanation
function nonDivisibleSubsetDetailed(k: number, s: number[]): number {
    console.log(`\nSolving for k = ${k}, array = [${s.join(', ')}]`);
    
    // Step 1: Group by remainders
    const groups: number[][] = Array.from({ length: k }, () => []);
    
    for (const num of s) {
        const remainder = num % k;
        groups[remainder].push(num);
    }
    
    console.log("Groups by remainder:");
    for (let i = 0; i < k; i++) {
        if (groups[i].length > 0) {
            console.log(`  Remainder ${i}: [${groups[i].join(', ')}] (count: ${groups[i].length})`);
        }
    }
    
    let result = 0;
    
    // Step 2: Handle remainder 0
    if (groups[0].length > 0) {
        result += 1;
        console.log(`Added 1 element from remainder 0 group`);
    }
    
    // Step 3: Handle pairs of complementary remainders
    for (let r = 1; r <= Math.floor(k / 2); r++) {
        const complement = k - r;
        
        if (r === complement) {
            // Special case: r = k/2 (only when k is even)
            if (groups[r].length > 0) {
                result += 1;
                console.log(`Added 1 element from remainder ${r} group (self-complementary)`);
            }
        } else {
            const chosen = Math.max(groups[r].length, groups[complement].length);
            result += chosen;
            console.log(`Between remainder ${r} (${groups[r].length}) and ${complement} (${groups[complement].length}), chose ${chosen}`);
        }
    }
    
    console.log(`Total subset size: ${result}\n`);
    return result;
}

// Export for use in other files
export { nonDivisibleSubset, nonDivisibleSubsetDetailed, testNonDivisibleSubset };

// Run tests if this file is executed directly
if (require.main === module) {
    testNonDivisibleSubset();
}
