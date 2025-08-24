import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

class Result {

    /*
     * Complete the 'stones' function below.
     *
     * The function is expected to return an INTEGER_ARRAY.
     * The function accepts following parameters:
     *  1. INTEGER n
     *  2. INTEGER a
     *  3. INTEGER b
     */

     /*
        Q: How can you come to this conclusion so fast. I was trying to calculate all permutations of (a,b) in the number of n-1 slots

        Great question — and it's a very natural initial instinct to think of all permutations of a and b in n-1 slots, because it sounds like a problem about combinations or permutations.

        But here’s why we don’t need to generate all permutations, and how we arrive at a faster, simpler approach:

        🔹 Let's break it down:

        You start with a value of 0 and make n - 1 jumps.
        Each jump can be of size a or size b.

        So your final value is simply:

        final_value = (number_of_a_jumps * a) + (number_of_b_jumps * b)


        And since:

        number_of_a_jumps + number_of_b_jumps = n - 1


        You can rewrite the equation as:

        final_value = i * a + (n - 1 - i) * b   where i = 0 to n - 1


        So all you're doing is looping i from 0 to n-1, which represents all possible counts of how many times you chose a, and the rest are b. This covers all distinct combinations, not permutations.

        🔸 Why permutations aren't needed

        Imagine:

        n = 4 (so 3 steps),

        a = 10, b = 100

        The permutations of a and b across 3 steps would include:

        a a a → 30
        a a b → 120
        a b a → 120
        b a a → 120
        ...


        But look: even though there are multiple permutations, they all lead to the same final value — because the order doesn't matter, just the count of how many times a and b were used.

        This is the key realization:

        ❗ Only the number of times each step value is used matters, not the order.

        🔹 So the approach becomes:

        Just loop over how many times a is chosen (from 0 to n - 1), calculate the total for that combination, and store it in a set to avoid duplicates (in case a == b).

        🔹 Summary of insights:
        Approach	Time Complexity	Reason it's not needed
        All permutations	O(2^(n-1))	Explodes quickly, redundant results
        All combinations (counts)	O(n)	Fast, gives all unique outcomes
        Optimal logic	O(n log n)	(with sort), efficient and simple

        Let me know if you’d like a visualization or a version of this in Python, C++, or any other language.
     */

    public static List<Integer> stones(int n, int a, int b) {
        // Write your code here
        // [a, a, b] and [a, b, a] and [b, a, a] are the same
        // So we don't need to calculate all the permutations
        // As the number of a increases, the number of b decreases
        // value = aSteps * a + bSteps * b
        // aSteps + bSteps = n - 1
        // Max is n - 1, so 0 <= i <= n - 1
        var set = new HashSet<Integer>();
        for (var i = 0; i < n; i++) {
            var sum = i * a + (n - 1 - i) * b;
            set.add(sum);
        }
        var result = new ArrayList<>(set);
        Collections.sort(result);
        return result;
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int T = Integer.parseInt(bufferedReader.readLine().trim());

        IntStream.range(0, T).forEach(TItr -> {
            try {
                int n = Integer.parseInt(bufferedReader.readLine().trim());

                int a = Integer.parseInt(bufferedReader.readLine().trim());

                int b = Integer.parseInt(bufferedReader.readLine().trim());

                List<Integer> result = Result.stones(n, a, b);

                bufferedWriter.write(
                    result.stream()
                        .map(Object::toString)
                        .collect(joining(" "))
                    + "\n"
                );
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

        bufferedReader.close();
        bufferedWriter.close();
    }
}
