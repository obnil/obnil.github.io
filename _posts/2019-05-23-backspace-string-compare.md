---
layout: post
title:  "844. Backspace String Compare"
description: "844. Backspace String Compare"
categories: leetcode
date:   2019-05-23 09:40:42 +0800
---
Given two strings `S` and `T`, return if they are equal when both are typed into empty text editors. `#` means a backspace character.

**Example 1:**

```
Input: S = "ab#c", T = "ad#c"
Output: true
Explanation: Both S and T become "ac".
```

**Example 2:**

```
Input: S = "ab##", T = "c#d#"
Output: true
Explanation: Both S and T become "".
```

**Example 3:**

```
Input: S = "a##c", T = "#a#c"
Output: true
Explanation: Both S and T become "c".
```

**Example 4:**

```
Input: S = "a#c", T = "b"
Output: false
Explanation: S becomes "c" while T becomes "b".
```

**Note**:

1. `1 <= S.length <= 200`
2. `1 <= T.length <= 200`
3. `S` and `T` only contain lowercase letters and `'#'` characters.

**Follow up:**

- Can you solve it in `O(N)` time and `O(1)` space?

### 解答

给两个字符串S和T，如果点击回退键（出现`#`）后得到最后的字符串完全相同则返回true

```java
class Solution {
    public boolean backspaceCompare(String S, String T) {
        return backspace(S).equals(backspace(T));
    }
    
    private String backspace(String S){
        StringBuffer sb = new StringBuffer();
        int count=0;
        for(int i=S.length()-1;i>=0;i--){
            if('#'==S.charAt(i)){
                count++;
                continue;
            }else{
                if(count>0){
                    count--;
                }else{
                    sb.append(S.charAt(i));
                }
            }
        }
        return sb.toString();
    }
}
```

| Time Submitted    | Status                                                       | Runtime | Memory  | Language |
| :---------------- | :----------------------------------------------------------- | :------ | :------ | :------- |
| a few seconds ago | [Accepted](https://leetcode.com/submissions/detail/230739705/) | 0 ms    | 33.4 MB | java     |