---
layout: post
title:  "206. Reverse Linked List"
description: "206. Reverse Linked List"
categories: leetcode
date:   2019-05-23 09:40:42 +0800
---

Reverse a singly linked list.

**Example:**

```
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
```

**Follow up:**

A linked list can be reversed either iteratively or recursively. Could you implement both?

### 解答

链表反转

每次p为第一个节点，q为第二个节点，r为第三个节点也就是缓存节点，将p和q节点互换，一直循环到q为空最后p节点就是头结点

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        if(head==null||head.next==null){
            return head;
        }
        ListNode p=head,q=head.next,r=head.next.next;
        head.next = null;
        while(q!=null){
            r=q.next;
            q.next=p;
            p=q;
            q=r;
        }
        head = p;
        return head;
    }
}
```

### 运行结果

| Time Submitted | Status                                                       | Runtime | Memory  | Language |
| :------------- | :----------------------------------------------------------- | :------ | :------ | :------- |
| 2 months ago   | [Accepted](https://leetcode.com/submissions/detail/214457501/) | 0 ms    | 37.9 MB | java     |