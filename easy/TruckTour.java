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
     * Complete the 'truckTour' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts 2D_INTEGER_ARRAY petrolpumps as parameter.
     */
    public static int truckTourInefficient(List<List<Integer>> petrolpumps) {
        // Write your code here
        for (int i = 0; i < petrolpumps.size(); i++) {
            int j = i;
            int distanceLeft = 0;
            while (j != i - 1 && distanceLeft >= 0) {
                distanceLeft +=  petrolpumps.get(j).get(0);
                distanceLeft -=  petrolpumps.get(j).get(1);
                j++;
                if (j == petrolpumps.size()) {
                    j = 0;
                }
            }
            if (distanceLeft >= 0) {
                return i;
            }
        }
        return 0;
    }

    public static int truckTour(List<List<Integer>> petrolpumps) {
        // Write your code here
        int n = petrolpumps.size();
        int totalPetrol = 0;
        int totalDistance = 0;
        int start = 0;
        int currentPetrol = 0;

        for (int i = 0; i < n; i++) {
            int petrol = petrolpumps.get(i).get(0);
            int distance = petrolpumps.get(i).get(1);

            totalPetrol += petrol;
            totalDistance += distance;
            currentPetrol += petrol - distance;

            // If we can't reach the next station from current position
            if (currentPetrol < 0) {
                // Reset starting point to next station
                start = i + 1;
                currentPetrol = 0;
            }
        }

        // If total petrol is less than total distance, no solution exists
        if (totalPetrol < totalDistance) {
            return -1;
        }

        return start;
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int n = Integer.parseInt(bufferedReader.readLine().trim());

        List<List<Integer>> petrolpumps = new ArrayList<>();

        IntStream.range(0, n).forEach(i -> {
            try {
                petrolpumps.add(
                    Stream.of(bufferedReader.readLine().replaceAll("\\s+$", "").split(" "))
                        .map(Integer::parseInt)
                        .collect(toList())
                );
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

        int result = Result.truckTour(petrolpumps);

        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
    }
}
