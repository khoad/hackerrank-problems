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
     * Complete the 'textEditor' function below.
     *
     * The function accepts following parameters:
     *  1. INTEGER q - number of operations
     *  2. STRING_ARRAY operations - list of operations
     */
    public static void textEditorInefficient(List<String> operations) {
        // Write your code here
        var s = "";
        var stack = new ArrayDeque<String>();
        for (var op: operations) {
            var split = op.split(" ");
            var type = split[0];
            String arg = null;
            if (split.length == 2) {
                arg = split[1];
            }
            switch (type) {
                case "1":
                    stack.push(s);
                    s += arg;
                    break;
                case "2":
                    stack.push(s);
                    s = s.substring(0, s.length() - Integer.parseInt(arg));
                    break;
                case "3":
                    System.out.println(s.charAt(Integer.parseInt(arg) - 1));
                    break;
                case "4":
                    s = stack.pop();
                    break;
            }
        }
    }

    public static void textEditor(List<String> operations) {
        StringBuilder s = new StringBuilder();
        Stack<Operation> undoStack = new Stack<>();

        for (String op : operations) {
            String[] parts = op.split(" ");
            int type = Integer.parseInt(parts[0]);

            switch (type) {
                case 1: // append
                    String appendStr = parts[1];
                    s.append(appendStr);
                    undoStack.push(new Operation(2, appendStr.length())); // store delete operation
                    break;

                case 2: // delete
                    int deleteCount = Integer.parseInt(parts[1]);
                    String deletedStr = s.substring(s.length() - deleteCount);
                    s.setLength(s.length() - deleteCount);
                    undoStack.push(new Operation(1, deletedStr)); // store append operation
                    break;

                case 3: // print
                    int printIndex = Integer.parseInt(parts[1]) - 1;
                    System.out.println(s.charAt(printIndex));
                    break;

                case 4: // undo
                    if (!undoStack.isEmpty()) {
                        Operation lastOp = undoStack.pop();
                        if (lastOp.type == 1) { // was append, now delete
                            s.append(lastOp.arg);
                        } else { // was delete, now append
                            s.setLength(s.length() - lastOp.count);
                        }
                    }
                    break;
            }
        }
    }

    static class Operation {
        int type; // 1 for append, 2 for delete
        String arg; // for append operations
        int count; // for delete operations

        Operation(int type, String arg) {
            this.type = type;
            this.arg = arg;
        }

        Operation(int type, int count) {
            this.type = type;
            this.count = count;
        }
    }

}

public class Solution {

    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));

        int q = Integer.parseInt(bufferedReader.readLine().trim());

        List<String> operations = new ArrayList<>();

        IntStream.range(0, q).forEach(i -> {
            try {
                operations.add(bufferedReader.readLine());
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

        Result.textEditor(operations);

        bufferedReader.close();
    }
}
