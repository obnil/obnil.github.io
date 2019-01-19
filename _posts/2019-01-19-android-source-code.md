---
layout: post
title:  "如何查看Android 5.0系统源码"
description: "由于Android开发艺术探索的所有内容都是基于Android 5.0系统，为了将这本书吃透，所以以后发布的Android文章也都是基于Android 5.0源码"
tags: [android]
date:   2019-01-19 12:09:42 +0800
---
由于[Android开发艺术探索](https://item.jd.com/11760209.html)的所有内容都是基于Android 5.0系统，为了将这本书吃透，所以以后发布的Android文章也都是基于Android 5.0源码。好了废话不多说

首先进入[AndroidXRef](http://androidxref.com/)网址，选择[Lollipop - 5.0.0_r2](http://androidxref.com/5.0.0_r2/)箭头所指方向

![image-20190119112259853](https://ws2.sinaimg.cn/large/006tNc79gy1fzbq9peptvj31120qgqaj.jpg)

进入后界面是这样子，想看应用层源码的可以选择packages，一般框架层源码都在frameworks里面

![image-20190119112522982](https://ws3.sinaimg.cn/large/006tNc79gy1fzbqcujoh9j311k0f6419.jpg)

可以看到左侧有5个输入框

## Full Search

> 进行全文搜索，会匹配所有的单词、字符串、标识符以及数字等，和`grep "LinearLayout" . -rns`一样可以查找所有包含该内容的路径

![image-20190119114145807](https://ws4.sinaimg.cn/large/006tNc79gy1fzbqtvyn0vj30ze0u0tfz.jpg)

## Definition

> 搜索符号定义相关的代码，例如搜索 ViewGroup 的定义

![image-20190119114532339](https://ws4.sinaimg.cn/large/006tNc79gy1fzbqxtf7jsj30u00vwtkc.jpg)

## Symbol

> 搜索符号，例如可以搜索类中的成员变量等

![image-20190119115348790](https://ws3.sinaimg.cn/large/006tNc79gy1fzbr6f9y00j311o0rugrp.jpg)

## File Path

> 和`find . -name ’*LinearLayout*‘`一样可以查找所有包含该文件名的路径

![image-20190119115512773](https://ws1.sinaimg.cn/large/006tNc79gy1fzbr7vshg2j311o0sqdlr.jpg)

## History

> 和`git log |grep "startService" -rns`一样可以查看所有包含该内容的历史提交记录

![image-20190119120317438](https://ws1.sinaimg.cn/large/006tNc79gy1fzbrgabfknj30u00v6qaq.jpg)

## 结语

很多Android大佬说不把Android开发艺术探索通读3遍，根本没有信心去找面试。实际上确实是这样的，我经常面试一些Android候选人，有些内容就是出自这本书，我们不仅要了解Api还要了解背后的原理，这样才能在工作中独当一面。