/**
 * Codility GenomicRangeQuery Problem
 *
 * Problem Description:
 * A DNA sequence can be represented as a string consisting of the letters A, C, G and T,
 * which correspond to the types of successive nucleotides in the sequence. Each nucleotide
 * has an impact factor, which is an integer. Nucleotides of types A, C, G and T have
 * impact factors of 1, 2, 3 and 4, respectively.
 *
 * You are given a non-empty string S consisting of N characters and two non-empty arrays
 * P and Q consisting of M integers. These arrays represent queries about minimal impact
 * factors of nucleotides contained in the particular part of the DNA sequence.
 *
 * For each query, you need to find the minimal impact factor of nucleotides contained
 * in the DNA sequence between positions P[K] and Q[K] (inclusive).
 *
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */

function genomicRangeQuery(S: string, P: number[], Q: number[]): number[] {
    // Implement your solution here
    const N = S.length

    let prefixSums = new Map<string, number[]>([
        ['A', new Array(N + 1).fill(0)],
        ['C', new Array(N + 1).fill(0)],
        ['G', new Array(N + 1).fill(0)],
        ['T', new Array(N + 1).fill(0)],
    ])

    for (let i = 0; i < N; i++) {
        for (const char of ['A', 'C', 'G', 'T']) {
            prefixSums.get(char)![i + 1] = prefixSums.get(char)![i] + (char == S.charAt(i) ? 1 : 0)
        }
    }

    let map = new Map<string, number>([ ['A', 1], ['C', 2], ['G', 3], ['T', 4], ])
    let result:number[] = []
    for (let i = 0; i < P.length; i++) {
        for (const char of ['A', 'C', 'G', 'T']) {
            if (total(prefixSums.get(char)!, P[i], Q[i]) > 0) {
                result.push(map.get(char)!)
                break
            }
        }
    }
    return result
}

function total(prefixSum: number[], start: number, end: number) {
    return prefixSum[end + 1] - prefixSum[start]
}

/**
 * Solution using prefix sums technique
 * @param S - DNA sequence string (A, C, G, T)
 * @param P - Array of start positions for queries
 * @param Q - Array of end positions for queries
 * @returns Array of minimal impact factors for each query
 */
function genomicRangeQueryAI(S: string, P: number[], Q: number[]): number[] {
    const N = S.length;
    const M = P.length;

    // Impact factors for each nucleotide
    const impactFactors = { 'A': 1, 'C': 2, 'G': 3, 'T': 4 };

    // Create prefix sum arrays for each nucleotide
    // prefixSums[nucleotide][i] = count of nucleotide from 0 to i-1
    const prefixSums: { [key: string]: number[] } = {
        'A': new Array(N + 1).fill(0),
        'C': new Array(N + 1).fill(0),
        'G': new Array(N + 1).fill(0),
        'T': new Array(N + 1).fill(0)
    };

    // Build prefix sum arrays
    for (let i = 0; i < N; i++) {
        // Copy previous counts
        prefixSums['A'][i + 1] = prefixSums['A'][i];
        prefixSums['C'][i + 1] = prefixSums['C'][i];
        prefixSums['G'][i + 1] = prefixSums['G'][i];
        prefixSums['T'][i + 1] = prefixSums['T'][i];

        // Increment count for current nucleotide
        const nucleotide = S[i];
        prefixSums[nucleotide][i + 1]++;
    }

    const result: number[] = [];

    // Process each query
    for (let k = 0; k < M; k++) {
        const start = P[k];
        const end = Q[k] + 1; // +1 because prefixSums is 1-indexed

        // Check nucleotides in order of impact factor (A=1, C=2, G=3, T=4)
        // The first nucleotide found in the range gives the minimal impact factor
        const nucleotides = ['A', 'C', 'G', 'T'] as const;

        for (const nucleotide of nucleotides) {
            // Check if nucleotide exists in range [start, end)
            const count = prefixSums[nucleotide][end] - prefixSums[nucleotide][start];
            if (count > 0) {
                result.push(impactFactors[nucleotide]);
                break;
            }
        }
    }

    return result;
}

/**
 * Alternative solution using a more compact approach
 * @param S - DNA sequence string
 * @param P - Array of start positions
 * @param Q - Array of end positions
 * @returns Array of minimal impact factors
 */
function genomicRangeQueryCompactAI(S: string, P: number[], Q: number[]): number[] {
    const N = S.length;
    const M = P.length;

    // Create prefix sum arrays for A, C, G, T
    const prefixA = new Array(N + 1).fill(0);
    const prefixC = new Array(N + 1).fill(0);
    const prefixG = new Array(N + 1).fill(0);
    const prefixT = new Array(N + 1).fill(0);

    // Build prefix sums
    for (let i = 0; i < N; i++) {
        prefixA[i + 1] = prefixA[i] + (S[i] === 'A' ? 1 : 0);
        prefixC[i + 1] = prefixC[i] + (S[i] === 'C' ? 1 : 0);
        prefixG[i + 1] = prefixG[i] + (S[i] === 'G' ? 1 : 0);
        prefixT[i + 1] = prefixT[i] + (S[i] === 'T' ? 1 : 0);
    }

    const result: number[] = [];

    // Process queries
    for (let k = 0; k < M; k++) {
        const start = P[k];
        const end = Q[k] + 1;

        // Check in order of impact factor
        if (prefixA[end] - prefixA[start] > 0) {
            result.push(1);
        } else if (prefixC[end] - prefixC[start] > 0) {
            result.push(2);
        } else if (prefixG[end] - prefixG[start] > 0) {
            result.push(3);
        } else {
            result.push(4);
        }
    }

    return result;
}

// Example usage and test cases
function runTests() {
    console.log("=== GenomicRangeQuery Tests ===");

    // Test case 1: Example from Codility
    const S1 = "CAGCCTA";
    const P1 = [2, 5, 0];
    const Q1 = [4, 5, 6];
    const result1 = genomicRangeQuery(S1, P1, Q1);
    console.log(`Test 1: S="${S1}", P=[${P1}], Q=[${Q1}]`);
    console.log(`Result: [${result1}]`); // Expected: [2, 4, 1]
    console.log(`Expected: [2, 4, 1]`);
    console.log(`Correct: ${JSON.stringify(result1) === JSON.stringify([2, 4, 1])}`);
    console.log();

    // Test case 2: All same nucleotide
    const S2 = "AAAAAA";
    const P2 = [0, 1, 2];
    const Q2 = [2, 3, 5];
    const result2 = genomicRangeQuery(S2, P2, Q2);
    console.log(`Test 2: S="${S2}", P=[${P2}], Q=[${Q2}]`);
    console.log(`Result: [${result2}]`); // Expected: [1, 1, 1]
    console.log(`Expected: [1, 1, 1]`);
    console.log(`Correct: ${JSON.stringify(result2) === JSON.stringify([1, 1, 1])}`);
    console.log();

    // Test case 3: Single character
    const S3 = "T";
    const P3 = [0];
    const Q3 = [0];
    const result3 = genomicRangeQuery(S3, P3, Q3);
    console.log(`Test 3: S="${S3}", P=[${P3}], Q=[${Q3}]`);
    console.log(`Result: [${result3}]`); // Expected: [4]
    console.log(`Expected: [4]`);
    console.log(`Correct: ${JSON.stringify(result3) === JSON.stringify([4])}`);
    console.log();

    // Test case 4: Mixed sequence
    const S4 = "ACGTACGT";
    const P4 = [0, 1, 2, 3, 4, 5, 6, 7];
    const Q4 = [0, 1, 2, 3, 4, 5, 6, 7];
    const result4 = genomicRangeQuery(S4, P4, Q4);
    console.log(`Test 4: S="${S4}", P=[${P4}], Q=[${Q4}]`);
    console.log(`Result: [${result4}]`); // Expected: [1, 2, 3, 4, 1, 2, 3, 4]
    console.log(`Expected: [1, 2, 3, 4, 1, 2, 3, 4]`);
    console.log(`Correct: ${JSON.stringify(result4) === JSON.stringify([1, 2, 3, 4, 1, 2, 3, 4])}`);
    console.log();

    // Performance test
    console.log("=== Performance Test ===");
    const largeS = "ACGT".repeat(25000); // 100,000 characters
    const largeP = Array.from({length: 50000}, (_, i) => i % 50000);
    const largeQ = Array.from({length: 50000}, (_, i) => Math.min(i + 10, 99999));

    const startTime = Date.now();
    const largeResult = genomicRangeQuery(largeS, largeP, largeQ);
    const endTime = Date.now();

    console.log(`Large test: ${largeS.length} chars, ${largeP.length} queries`);
    console.log(`Time taken: ${endTime - startTime}ms`);
    console.log(`First 10 results: [${largeResult.slice(0, 10).join(', ')}]`);
}

// Export the solution function
export { genomicRangeQuery, runTests };

// Run tests if this file is executed directly
runTests();
