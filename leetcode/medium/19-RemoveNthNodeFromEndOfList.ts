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

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    let current = head
    let count = 1
    while (current!.next != null) {
        current = current!.next
        count++
    }
    let m = count - n

    if (m == 0) {
        // remove head
        return head!.next
    }

    current = head
    let count2 = 1
    while (count2 < m) {
        current = current!.next
        count2++
    }

    // drop the node after current
    current!.next = current!.next!.next

    return head
};
