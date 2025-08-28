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
     * Complete the 'strangeCounter' function below.
     *
     * The function is expected to return a LONG_INTEGER.
     * The function accepts LONG_INTEGER t as parameter.
     */

    public static long strangeCounterInefficient(long t) {
        // Write your code here
        long initial = 3;
        long maxTime = 3;
        while(maxTime < t) {
            initial *= 2; // 6, 12
            maxTime = initial + maxTime; // 6 + 3 = 9, 12 + 9 = 21
        }
        return maxTime + 1 - t;
    }

    public static long strangeCounterO1(long t) {
        // O(1) solution using mathematical formula

        // Each cycle n starts at time: 3 * (2^n - 1) + 1
        // We need to find n such that: 3 * (2^n - 1) + 1 <= t < 3 * (2^(n+1) - 1) + 1

        // Solving: 3 * (2^n - 1) + 1 <= t
        // 3 * 2^n - 3 + 1 <= t
        // 3 * 2^n - 2 <= t
        // 2^n <= (t + 2) / 3
        // n <= log2((t + 2) / 3)

        // So cycle = floor(log2((t + 2) / 3))
        long cycle = (long) Math.floor(Math.log((t + 2.0) / 3.0) / Math.log(2));

        // Calculate cycle start time
        long cycleStart = 3 * ((1L << cycle) - 1) + 1;

        // Calculate initial value for this cycle
        long initialValue = 3 * (1L << cycle);

        // Calculate position within cycle
        long position = t - cycleStart;

        return initialValue - position;
    }

}

public class StrangeCounter {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        long t = Long.parseLong(bufferedReader.readLine().trim());

        long result = Result.strangeCounterO1(t);

        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
    }
}
