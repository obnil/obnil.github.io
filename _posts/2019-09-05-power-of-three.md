---
layout: post
title:  "326. Power of Three"
description: "326. Power of Three"
categories: leetcode
date:   2019-09-05 09:40:42 +0800
---

Given an integer, write a function to determine if it is a power of three.

**Example 1:**

```
Input: 27
Output: true
```

**Example 2:**

```
Input: 0
Output: false
```

**Example 3:**

```
Input: 9
Output: true
```

**Example 4:**

```
Input: 45
Output: false
```

**Follow up:**
Could you do it without using any loop / recursion?

### 解答

输入一个整数，判断是否是3的幂（首先判断是否是正数，然后不断除以3，判断结果能否除尽）

```java
class Solution {
    public boolean isPowerOfThree(int n) {
        if(n<=0){
            return false;
        }
        while(n!=1){
            if(n%3!=0){
                return false;
            }
            n=n/3;
        }
        return true;
    }
}
```

### 运行结果

Success

[Details ](https://leetcode.com/submissions/detail/257977269/)

Runtime: 11 ms, faster than 76.95% of Java online submissions for Power of Three.

Memory Usage: 35.5 MB, less than 6.25% of Java online submissions for Power of Three.

Next challenges:

[Range Addition II](https://leetcode.com/problems/range-addition-ii/)[Solve the Equation](https://leetcode.com/problems/solve-the-equation/)[Split Array With Same Average](https://leetcode.com/problems/split-array-with-same-average/)

Show off your acceptance:

| Time Submitted    | Status                                                       | Runtime | Memory  | Language |
| :---------------- | :----------------------------------------------------------- | :------ | :------ | :------- |
| a few seconds ago | [Accepted](https://leetcode.com/submissions/detail/257977269/) | 11 ms   | 35.5 MB | java     |

### 最优解

给一个鬼才的方案，只需要一行代码而且不使用循环

```java
public class Solution {
    public boolean isPowerOfThree(int n) {
        // 1162261467 is 3^19,  3^20 is bigger than int  
        return ( n>0 &&  1162261467%n==0);
    }
}
```