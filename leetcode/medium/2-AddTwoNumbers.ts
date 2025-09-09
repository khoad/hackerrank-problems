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

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let num1:bigint = getNumber(l1)
    let num2:bigint = getNumber(l2)

    let num3:bigint = num1 + num2
    // console.log(num1, num2, num3)

    let l3 = new ListNode()
    let head = l3
    while (true) {
        const rem = num3 % BigInt(10)
        l3.val = Number(rem)
        if (num3 / BigInt(10) < 1) {
            break
        }
        l3.next = new ListNode()
        l3 = l3.next
        num3 = (num3 - rem) / BigInt(10)
    }

    // console.log(head)
    return head
};

function getNumber(l: ListNode | null): bigint {
    if (l == null) {
        return BigInt(0)
    }
    let num:bigint = BigInt(l.val)
    let i = 1
    while (l.next) {
        l = l.next
        num += BigInt(l.val) * (BigInt(10) ** BigInt(i))
        i++
    }
    return num
}