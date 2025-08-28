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
     * Complete the 'superDigit' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts following parameters:
     *  1. STRING n
     *  2. INTEGER k
     */
    public static int superDigitInefficient(String n, int k) {
        // Write your code here
        if (n.length() == 1) {
            return Integer.parseInt(n);
        }
        long sum = 0;
        for (var c: n.toCharArray()) {
            sum += Integer.parseInt(String.valueOf(c));
        }
        return superDigit(String.valueOf(sum * k), 1);
    }

    public static int superDigit(String n, int k) {
        // Calculate sum of digits in n
        long sum = 0;
        for (char c : n.toCharArray()) {
            sum += c - '0';
        }

        // Multiply by k
        sum *= k;

        // Use mathematical property: digital root = n % 9 (except when n % 9 == 0, then it's 9)
        // This avoids the loop and is much more efficient
        return sum % 9 == 0 ? 9 : (int) (sum % 9);
    }

}

public class RecursiveDigitSum {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        String[] firstMultipleInput = bufferedReader.readLine().replaceAll("\\s+$", "").split(" ");

        String n = firstMultipleInput[0];

        int k = Integer.parseInt(firstMultipleInput[1]);

        int result = Result.superDigit(n, k);

        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
    }
}
