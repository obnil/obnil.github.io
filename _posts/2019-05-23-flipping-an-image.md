---
layout: post
title:  "832. Flipping an Image"
description: "832. Flipping an Image"
categories: leetcode
date:   2019-05-23 09:40:42 +0800
---
- Given a binary matrix `A`, we want to flip the image horizontally, then invert it, and return the resulting image.

  To flip an image horizontally means that each row of the image is reversed.  For example, flipping `[1, 1, 0]` horizontally results in `[0, 1, 1]`.

  To invert an image means that each `0` is replaced by `1`, and each `1` is replaced by `0`. For example, inverting `[0, 1, 1]` results in `[1, 0, 0]`.

  **Example 1:**

  ```
  Input: [[1,1,0],[1,0,1],[0,0,0]]
  Output: [[1,0,0],[0,1,0],[1,1,1]]
  Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
  Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]
  ```

  **Example 2:**

  ```
  Input: [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
  Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
  Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
  Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
  ```

  **Notes:**

  - `1 <= A.length = A[0].length <= 20`
  - `0 <= A[i][j] <= 1`

### 解答

将一个二维数组水平翻转，并对每一位数字取反

```java
class Solution {
    public int[][] flipAndInvertImage(int[][] A) {
        for(int i=0;i<A.length;i++){
            for(int j=0;j<A[i].length/2;j++){
                A[i][j]=A[i][j]+A[i][A[i].length-j-1];
                A[i][A[i].length-j-1]=A[i][j]-A[i][A[i].length-j-1];
                A[i][j]=1-(A[i][j]-A[i][A[i].length-j-1]);
                A[i][A[i].length-j-1]=1-(A[i][A[i].length-j-1]);
            }
            //如果每一行的个数为奇数，对中间的数字进行取反
            if(A[i].length%2!=0){
                    A[i][A[i].length/2]=1-A[i][A[i].length/2];
            }
        }
        return A;
    }
}
```

### 运行结果

| Time Submitted | Status                                                       | Runtime | Memory  | Language |
| :------------- | :----------------------------------------------------------- | :------ | :------ | :------- |
| 7 hours ago    | [Accepted](https://leetcode.com/submissions/detail/230732583/) | 1 ms    | 40.3 MB | java     |