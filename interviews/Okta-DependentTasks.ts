import assert from "assert"

// We have a number of tasks, labelled from 0 to N-1
// And we have an array of arrays, representing the tasks dependencies
// Example: N = 4, [[1, 2], [1, 3]]
// This means that task 1 depends on task 2, and 1 depends on 3
// The goal is to return an array of tasks that need to be done in order
// In this case, we expect [0, 2, 3, 1] or [0, 3, 2, 1]
// Write a function and other test cases that test this function
// Another example: N = 7, [[1, 2], [2, 3], [3, 4], [5, 6]]
// In this case we expect [0, 6, 5, 4, 3, 2, 1], there are more answers as well
// If it's impossible, return an empty array
// Example: N = 4, [[1, 2], [2, 3], [3, 1]]. Expect []
function dependentTasks(N: number, tasks: number[][]): number[] {
    // Build graph using Kahn's algorithm conventions
    // Edge: prereq -> dependent
    const adjacency: number[][] = Array.from({ length: N }, () => [])
    const indegree: number[] = Array.from({ length: N }, () => 0)

    for (const dep of tasks) {
        if (dep.length !== 2) continue
        const [dependent, prerequisite] = dep
        if (dependent < 0 || dependent >= N || prerequisite < 0 || prerequisite >= N) {
            // Invalid reference -> impossible
            return []
        }
        // prerequisite must come before dependent
        adjacency[prerequisite].push(dependent)
        indegree[dependent]++
    }

    // Initialize queue with nodes of zero indegree
    const queue: number[] = []
    for (let task = 0; task < N; task++) {
        if (indegree[task] === 0) queue.push(task)
    }

    const ordered: number[] = []
    while (queue.length != 0) {
        const current = queue.shift()!
        ordered.push(current)
        for (const next of adjacency[current]) {
            indegree[next]--
            if (indegree[next] === 0) queue.push(next)
        }
    }

    // If we scheduled all tasks, return order; else cycle exists
    if (ordered.length === N) return ordered
    return []
}

// Helper to verify order satisfies dependencies
function isValidOrder(N: number, tasks: number[][], order: number[]): boolean {
    if (order.length === 0) {
        // valid only if impossible scenario (detect with cycle) or N === 0 and tasks empty
        // For validation purposes, if not all tasks are present, consider invalid
        return N === 0
    }
    if (order.length !== N) return false
    const position: number[] = Array.from({ length: N }, () => -1)
    for (let i = 0; i < N; i++) {
        const t = order[i]
        if (t < 0 || t >= N) return false
        if (position[t] !== -1) return false
        position[t] = i
    }
    for (const dep of tasks) {
        if (dep.length !== 2) continue
        const [dependent, prerequisite] = dep
        if (dependent < 0 || dependent >= N || prerequisite < 0 || prerequisite >= N) return false
        if (position[prerequisite] > position[dependent]) return false
    }
    return true
}

// Tests
// Basic example from description
{
    const N = 4
    const deps = [[1, 2], [1, 3]]
    const order = dependentTasks(N, deps)
    assert.strictEqual(order.length, N)
    assert.ok(isValidOrder(N, deps, order))
}

// Another example from description
{
    const N = 7
    const deps = [[1, 2], [2, 3], [3, 4], [5, 6]]
    const order = dependentTasks(N, deps)
    assert.strictEqual(order.length, N)
    assert.ok(isValidOrder(N, deps, order))
}

// Cycle example -> impossible
{
    const N = 4
    const deps = [[1, 2], [2, 3], [3, 1]]
    const order = dependentTasks(N, deps)
    assert.deepStrictEqual(order, [])
}

// No dependencies -> any order containing all tasks
{
    const N = 5
    const deps: number[][] = []
    const order = dependentTasks(N, deps)
    assert.strictEqual(order.length, N)
    // Ensure it is a permutation of 0..N-1
    assert.deepStrictEqual(new Set(order).size, N)
}

// Multiple independent chains
{
    const N = 8
    const deps = [[2, 1], [1, 0], [5, 4], [7, 6]]
    const order = dependentTasks(N, deps)
    assert.strictEqual(order.length, N)
    assert.ok(isValidOrder(N, deps, order))
}

// Invalid references should return []
{
    const N = 3
    const deps = [[1, 3]] // 3 is out of range
    const order = dependentTasks(N, deps)
    assert.deepStrictEqual(order, [])
}

console.log('All tests passed!')
