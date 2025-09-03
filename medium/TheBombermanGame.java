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

    public static List<String> bomberManMine(int n, List<String> grid) {
        // Write your code here
        int numOfRows = grid.size();
        int numOfColumns = grid.get(0).length();

        if (n == 1) {
            return grid;
        }

        var result = new ArrayList<String>();
        if (n % 2 == 0) {
            for (int i = 0; i < numOfRows; i++) {
                var sb = new StringBuilder();
                for (int j = 0; j < numOfColumns; j++) {
                    sb.append('O');
                }
                result.add(sb.toString());
            }
            return result;
        }

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
        // Pattern repeats every 4 seconds:
        //   if n % 4 == 1, it will look like at 5s
        //   if n % 4 == 3, it will look like at 3s
        for (int sec = 2; sec <= (n % 4 == 1 ? 5 : n % 4); sec++) {
            plant = !plant;

            for (int i = 0; i < numOfRows; i++) {
                for (int j = 0; j < numOfColumns; j++) {
                    if (plant && matrix[i][j] == -1) {
                        if (matrix[i][j] == -1) {
                            matrix[i][j] = 4; // Add 1 extra second for count down
                        }
                    }

                    if (matrix[i][j] == 1) {
                        matrix[i][j] = -1; // will become -1, aka a '.'

                        if (i + 1 < numOfRows && matrix[i + 1][j] > 1) {
                            matrix[i + 1][j] = -1; // becomes a '.', no explosion
                        }

                        if (i - 1 >= 0 && matrix[i - 1][j] > 1) {
                            matrix[i - 1][j] = -1;
                        }

                        if (j + 1 < numOfColumns && matrix[i][j + 1] > 1) {
                            matrix[i][j + 1] = -1;
                        }

                        if (j - 1 >= 0 && matrix[i][j - 1] > 1) {
                            matrix[i][j - 1] = -1;
                        }
                    } else if (matrix[i][j] > 1) {
                        // Decrease the time for bombs
                        matrix[i][j]--;
                    }
                }
            }
        }
        return matrixToGrid(matrix);
    }

    public static List<String> matrixToGrid(int[][] matrix) {
        var list = new ArrayList<String>();
        for (int i = 0; i < matrix.length; i++) {
            var sb = new StringBuilder();
            for (int j = 0; j < matrix[0].length; j++) {
                sb.append(matrix[i][j] <= 0 ? '.' : 'O');
            }
            list.add(sb.toString());
        }
        return list;
    }

    public static List<String> bomberMan(int n, List<String> grid) {
        int r = grid.size();
        int c = grid.get(0).length();

        // If n is 1, return the original grid
        if (n == 1) {
            return grid;
        }

        // If n is even, the grid will be completely filled with bombs
        if (n % 2 == 0) {
            List<String> result = new ArrayList<>();
            for (int i = 0; i < r; i++) {
                StringBuilder row = new StringBuilder();
                for (int j = 0; j < c; j++) {
                    row.append('O');
                }
                result.add(row.toString());
            }
            return result;
        }

        // For odd n, we need to simulate the explosions
        // The pattern repeats every 4 seconds after the first explosion
        int effectiveN = n % 4;

        // Convert grid to 2D char array for easier manipulation
        char[][] gridArray = new char[r][c];
        for (int i = 0; i < r; i++) {
            gridArray[i] = grid.get(i).toCharArray();
        }

        // Possible values are 3 or 1 (0 or 2 are covered in the n % 2 == 0 case)
        if (effectiveN == 3) {
            // First explosion happens
            gridArray = explode(gridArray, r, c);
        } else if (effectiveN == 1) {
            // Second explosion happens
            gridArray = explode(gridArray, r, c);
            gridArray = explode(gridArray, r, c);
        }

        // Convert back to List<String>
        List<String> result = new ArrayList<>();
        for (int i = 0; i < r; i++) {
            result.add(new String(gridArray[i]));
        }

        return result;
    }

    private static char[][] explode(char[][] grid, int r, int c) {
        char[][] newGrid = new char[r][c];

        // Initialize new grid with bombs
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                newGrid[i][j] = 'O';
            }
        }

        // Explode existing bombs
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (grid[i][j] == 'O') {
                    // Clear the bomb and adjacent cells
                    newGrid[i][j] = '.';
                    if (i > 0) newGrid[i-1][j] = '.';
                    if (i < r-1) newGrid[i+1][j] = '.';
                    if (j > 0) newGrid[i][j-1] = '.';
                    if (j < c-1) newGrid[i][j+1] = '.';
                }
            }
        }

        return newGrid;
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
