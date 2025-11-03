/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function swapPairs(head: ListNode | null): ListNode | null {
    if (!head || !head.next) {
        return head
    }

    // 1 -> 2 -> 3 -> 4
    let prev: ListNode | null = null
    let cur: ListNode | null = head
    // head = 2
    head = cur.next
    while (cur && cur.next) {
        // cur = 1, next = 2
        let next = cur.next
        // cur (1) -> 3, and next (2) -> 3
        cur.next = cur.next.next
        // next (2) -> cur (1)
        next.next = cur

        // prev -> 2 if prev exists
        if (prev) {
            prev.next = next
        }

        // Move forward
        // 2 -> 1 -> 3 -> 4
        prev = cur // prev = 1
        cur = cur.next // cur = 3
    }
    return head
};
