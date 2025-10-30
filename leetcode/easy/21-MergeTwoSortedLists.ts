/**
 * Definition for singly-linked list.
 */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 == null) {
        return list2
    }
    if (list2 == null) {
        return list1
    }
    let cur = new ListNode(0, null)
    let head = cur
    while (list1 != null || list2 != null) {
        if (!list2 || list1 && list1.val < list2.val) {
            cur.next = new ListNode(list1!.val, null)
            list1 = list1!.next
        } else {
            cur.next = new ListNode(list2.val, null)
            list2 = list2.next
        }
        cur = cur.next
    }
    return head.next
};
