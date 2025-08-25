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
     * Complete the 'happyLadybugs' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts STRING b as parameter.
     */

    public static String happyLadybugs(String b) {
        // Write your code here
        var hasEmpty = false;
        var map = new HashMap<Character, Integer>();
        for (char c: b.toCharArray()) {
            if (c == '_') {
                hasEmpty = true;
            } else {
                map.put(c, map.getOrDefault(c, 0) + 1);
            }
        }
        // If no empty cells, check if ladybugs are already happy
        if (!hasEmpty) {
            for (var i = 1; i < b.length() - 1; i++) {
                char current = b.charAt(i);
                if (b.charAt(i - 1) != current && b.charAt(i + 1) != current) {
                    return "NO";
                }
            }
        }
        // Single ladybugs can't be happy
        return map.containsValue(1) ? "NO" : "YES";
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int g = Integer.parseInt(bufferedReader.readLine().trim());

        IntStream.range(0, g).forEach(gItr -> {
            try {
                int n = Integer.parseInt(bufferedReader.readLine().trim());

                String b = bufferedReader.readLine();

                String result = Result.happyLadybugs(b);

                bufferedWriter.write(result);
                bufferedWriter.newLine();
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

        bufferedReader.close();
        bufferedWriter.close();
    }
}
