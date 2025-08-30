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
import static java.util.stream.Collectors.toList;;


class Result {

    public static void queueUsingTwoStacks(List<List<Integer>> queries) {
        // Write your code here
        var a = new Stack<Integer>();
        var b = new Stack<Integer>();
        for (var query: queries) {
            if (query.get(0) == 1) {
                // Enqueue
                while (!b.isEmpty()) {
                    a.push(b.pop());
                }
                a.push(query.get(1));
            } else if (query.get(0) == 2) {
                // Dequeue
                while (!a.isEmpty()) {
                    b.push(a.pop());
                }
                b.pop();
            } else {
                // Print front
                while (!a.isEmpty()) {
                    b.push(a.pop());
                }
                System.out.println(b.peek());
            }
        }
    }

}


public class Solution {
    
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));

        int q = Integer.parseInt(bufferedReader.readLine().trim());

        List<List<Integer>> queries = new ArrayList<>();

        IntStream.range(0, q).forEach(i -> {
            try {
                queries.add(
                    Stream.of(bufferedReader.readLine().replaceAll("\\s+$", "").split(" "))
                        .map(Integer::parseInt)
                        .collect(toList())
                );
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

        Result.queueUsingTwoStacks(queries);

        bufferedReader.close();
    }
}
