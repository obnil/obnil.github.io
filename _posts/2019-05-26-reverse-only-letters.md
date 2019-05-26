---
layout: post
title:  "917. Reverse Only Letters"
description: "917. Reverse Only Letters"
categories: leetcode
date:   2019-05-26 09:40:42 +0800
---

Given a string `S`, return the "reversed" string where all characters that are not a letter stay in the same place, and all letters reverse their positions.

 



**Example 1:**

```
Input: "ab-cd"
Output: "dc-ba"
```

**Example 2:**

```
Input: "a-bC-dEf-ghIj"
Output: "j-Ih-gfE-dCba"
```

**Example 3:**

```
Input: "Test1ng-Leet=code-Q!"
Output: "Qedo1ct-eeLg=ntse-T!"
```

 

**Note:**

1. `S.length <= 100`
2. `33 <= S[i].ASCIIcode <= 122` 
3. `S` doesn't contain `\` or `"`

### 解答

将一个字符串里的字母逆序输出

```java
class Solution {
    public String reverseOnlyLetters(String S) {
        StringBuffer sb = new StringBuffer();
        for(int i=0,j=S.length()-1;i<S.length();){
            if(isLetters(S.charAt(i))){
                if(isLetters(S.charAt(j))){
                    sb.append(S.charAt(j));
                    i++;
                    j--;
                }else{
                    j--;
                }
            }else{
                sb.append(S.charAt(i));
                i++;
            }
        }
        return sb.toString();
    }
    
    private boolean isLetters(char letter){
        if((letter<='z'&&letter>='a')||(letter<='Z'&&letter>='A')){
            return true;
        }else{
            return false;
        }
    }
}
```

### 运行结果

| Time Submitted    | Status                                                       | Runtime | Memory  | Language |
| :---------------- | :----------------------------------------------------------- | :------ | :------ | :------- |
| a few seconds ago | [Accepted](https://leetcode.com/submissions/detail/231492578/) | 1 ms    | 33.7 MB | java     |