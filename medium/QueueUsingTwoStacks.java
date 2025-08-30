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
        Stack<Integer> enqueueStack = new Stack<>();
        Stack<Integer> dequeueStack = new Stack<>();

        // When dequeueStack is not empty, it already has all the elements from
        //   enqueueStack earlier, in the correct order. So we can just push to
        //   enqueueStack, and keep popping dequeueStack until it's empty,
        //   then we can move elements from enqueueStack to dequeueStack.

        for (List<Integer> query : queries) {
            int type = query.get(0);

            if (type == 1) {
                // Enqueue - just push to enqueue stack
                enqueueStack.push(query.get(1));
            } else if (type == 2) {
                // Dequeue - move elements only when dequeue stack is empty
                if (dequeueStack.isEmpty()) {
                    while (!enqueueStack.isEmpty()) {
                        dequeueStack.push(enqueueStack.pop());
                    }
                }
                dequeueStack.pop();
            } else {
                // Print front - move elements only when dequeue stack is empty
                if (dequeueStack.isEmpty()) {
                    while (!enqueueStack.isEmpty()) {
                        dequeueStack.push(enqueueStack.pop());
                    }
                }
                System.out.println(dequeueStack.peek());
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
