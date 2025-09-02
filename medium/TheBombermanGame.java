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
     * Complete the 'bomberMan' function below.
     *
     * The function is expected to return a STRING_ARRAY.
     * The function accepts following parameters:
     *  1. INTEGER n
     *  2. STRING_ARRAY grid
     */

    public static List<String> bomberMan(int n, List<String> grid) {
        // Write your code here
        int numOfRows = grid.size();
        int numOfColumns = grid.get(0).length();

        // change into matrix
        // -1 == '.'
        // 1 - 3 = number of seconds left
        // 0 = it's exploding
        int[][] matrix = new int[numOfRows][numOfColumns];
        for (int i = 0; i < numOfRows; i++) {
            for (int j = 0; j < numOfColumns; j++) {
                matrix[i][j] = grid.get(i).charAt(j);
                if (matrix[i][j] == 'O') {
                    matrix[i][j] = 2; // skip 1s for 1 time bomberman does nothing
                } else {
                    matrix[i][j] = -1;
                }
            }
        }

        // main logic
        boolean plant = false;
        for (int sec = 2; sec <= n; sec++) {
            plant = !plant;

            if (plant) {
                // Plant bombs in all cells without bombs
                for (int i = 0; i < numOfRows; i++) {
                    for (int j = 0; j < numOfColumns; j++) {
                        if (matrix[i][j] == -1) {
                            matrix[i][j] = 4;
                        }
                    }
                }
            }

            // Decrease the time for bombs
            for (int i = 0; i < numOfRows; i++) {
                for (int j = 0; j < numOfColumns; j++) {
                    if (matrix[i][j] > 0) {
                        matrix[i][j]--;
                    }
                }
            }

            for (int i = 0; i < numOfRows; i++) {
                for (int j = 0; j < numOfColumns; j++) {
                    if (matrix[i][j] == 0) {
                        // System.out.println(getKey(i, j) + " is exploding");
                        matrix[i][j]--; // will become -1, aka a '.'

                        if (i + 1 < numOfRows && matrix[i + 1][j] > 0) {
                            // System.out.println(getKey(i + 1, j) + " (S) becomes .");
                            matrix[i + 1][j] = -1; // becomes a '.', no explosion
                        }

                        if (i - 1 >= 0 && matrix[i - 1][j] > 0) {
                            // System.out.println(getKey(i - 1, j) + " (N) becomes .");
                            matrix[i - 1][j] = -1;
                        }

                        if (j + 1 < numOfColumns && matrix[i][j + 1] > 0) {
                            // System.out.println(getKey(i, j + 1) + " (E) becomes .");
                            matrix[i][j + 1] = -1;
                        }

                        if (j - 1 >= 0 && matrix[i][j - 1] > 0) {
                            // System.out.println(getKey(i, j - 1) + " (W) becomes .");
                            matrix[i][j - 1] = -1;
                        }
                    }
                }
            }
        }
        return matrixToGrid(matrix);
    }

    public static String getKey(int i, int j) {
        return i + "," + j;
    }

    public static List<String> matrixToGrid(int[][] matrix) {
        var list = new ArrayList<String>();
        for (int i = 0; i < matrix.length; i++) {
            var sb = new StringBuilder();
            for (int j = 0; j < matrix[0].length; j++) {
                sb.append(matrix[i][j] <= 0 ? '.' : 'O');
                // System.out.print(matrix[i][j]);
            }
            list.add(sb.toString());
            // System.out.println();
        }
        return list;
    }

}

public class TheBombermanGame {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        String[] firstMultipleInput = bufferedReader.readLine().replaceAll("\\s+$", "").split(" ");

        int r = Integer.parseInt(firstMultipleInput[0]);

        int c = Integer.parseInt(firstMultipleInput[1]);

        int n = Integer.parseInt(firstMultipleInput[2]);

        List<String> grid = IntStream.range(0, r).mapToObj(i -> {
            try {
                return bufferedReader.readLine();
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        })
            .collect(toList());

        List<String> result = Result.bomberMan(n, grid);

        bufferedWriter.write(
            result.stream()
                .collect(joining("\n"))
            + "\n"
        );

        bufferedReader.close();
        bufferedWriter.close();
    }
}
