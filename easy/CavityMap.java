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
     * Complete the 'cavityMap' function below.
     *
     * The function is expected to return a STRING_ARRAY.
     * The function accepts STRING_ARRAY grid as parameter.
     */

    public static List<String> cavityMap(List<String> grid) {
        // Write your code here
        var n = grid.size();
        var matrix = new char[n][n];

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                var row = grid.get(i);
                matrix[i][j] = row.toCharArray()[j];
            }
        }

        var result = new ArrayList<String>();

        for (var i = 0; i < n; i++) {
            var sb = new StringBuilder();
            for (var j = 0; j < n; j++) {
                if (i == 0 || j == 0 || i == n - 1 || j == n - 1) {
                    sb.append(matrix[i][j]);
                    continue;
                }
                var cur = Integer.parseInt(String.valueOf(matrix[i][j]));
                var top = Integer.parseInt(String.valueOf(matrix[i - 1][j]));
                var bottom = Integer.parseInt(String.valueOf(matrix[i + 1][j]));
                var left = Integer.parseInt(String.valueOf(matrix[i][j - 1]));
                var right = Integer.parseInt(String.valueOf(matrix[i][j + 1]));
                if (top < cur && bottom < cur && left < cur && right < cur) {
                    sb.append('X');
                } else {
                    sb.append(matrix[i][j]);
                }
            }
            result.add(sb.toString());
        }

        return result;
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int n = Integer.parseInt(bufferedReader.readLine().trim());

        List<String> grid = IntStream.range(0, n).mapToObj(i -> {
            try {
                return bufferedReader.readLine();
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        })
            .collect(toList());

        List<String> result = Result.cavityMap(grid);

        bufferedWriter.write(
            result.stream()
                .collect(joining("\n"))
            + "\n"
        );

        bufferedReader.close();
        bufferedWriter.close();
    }
}
