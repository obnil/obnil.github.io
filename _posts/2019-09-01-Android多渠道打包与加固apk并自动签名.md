---
layout: post
title:  "Android多渠道打包与加固apk并自动签名"
description: "上架应用市场流程是怎么样的？为什么要加固，如何加固，如何多渠道打包，如何签名"
categories: android
date:   2019-09-02 09:40:42 +0800
---

# 前言

为了统计App在各渠道的日活和下载量等运营数据，对每一个渠道比如华为，小米，OPPO，VIVO等都需要添加渠道信息，除了方便运营统计，还可以应用在版本的在线更新上，比如华为渠道的App只能更新华为渠道的最新包。

上架应用市场的时候除了需要添加渠道信息、提供软著还经常会提示需要给App进行加固才允许上架比如360。那么上架应用市场流程是怎么样的？为什么要加固，如何加固，如何多渠道打包，如何签名，下面将给出答案。

### 为什么要加固

#### 防逆向

多重指令转换VMP虚拟机保护技术，对关键代码、核心逻辑进行加密保护，避免通过IDA，Readelf等逆向工具分析获取源码

#### 防篡改

对APP应用每个文件分配唯一识别指纹，替换任何一个文件会导致无法运行，防止广告病毒植入、二次打包、功能屏蔽等恶意破解

#### 防调试

多重加密技术防止代码注入，防止JAVA层/C层动态调试，可有效抵挡动态调试、内存DUMP、代码注入、HOOK等恶意攻击

#### 数据保护

提供安全键盘、通讯协议加密、数据存储加密、异常进程动态跟踪等功能技术，在各个环节有效阻止数据被捕获、劫持和篡改

### 如何加固

目前市场上有两种流行的加固方案360加固和腾讯的乐固，很多人反馈360加固后增加了3个服务，热修复失败等各种问题。

![image-20190901214020747](../../screenshots/image-20190901214020747.png)

所以我们只介绍腾讯的乐固加固方案。

打release包

![image-20190902133719565](../../screenshots/image-20190902133719565.png)

把release包上传到乐固进行加固

![image-20190902140037309](../../screenshots/image-20190902140037309.png)

然后选择下一步，加固

![image-20190902141637479](../../screenshots/image-20190902141637479.png)

加固完成后会输出加固的apk路径

![image-20190902142015113](../../screenshots/image-20190902142015113.png)

### 如何多渠道打包

![image-20190902140157772](../../screenshots/image-20190902140157772.png)

然后选择辅助工具进行多渠道打包

![image-20190902142700385](../../screenshots/image-20190902142700385.png)

这个TD_CHANNEL_ID对应AndroidManifest.xml中的meta-data字段，相当于动态的将渠道名称写入value

```xml
<meta-data
    android:name="TD_CHANNEL_ID"
    android:value="" />
```

### 如何获取渠道名称

在App内获取渠道名称的方法其实就是获取TD_CHANNEL_ID对应的value值

```java
private static String getChannelId() {
    String appKey = null;
    try {
        ApplicationInfo applicationInfo = mContext.getPackageManager().getApplicationInfo(mContext.getPackageName(), PackageManager.GET_META_DATA);
        if (applicationInfo != null) {
            appKey = applicationInfo.metaData.getString("TD_CHANNEL_ID");
        }
        if (TextUtils.isEmpty(appKey)) {
            throw new IllegalArgumentException("can't find TD_CHANNEL_ID in AndroidManifest.xml.");
        }

    } catch (PackageManager.NameNotFoundException e) {
        e.printStackTrace();
        throw new ExceptionInInitializerError("can't find packageName!");
    }
    return appKey;
}
```
这样就可以根据渠道名称来获取对应渠道的在线升级包

最后对所有渠道进行统一签名，建议对多渠道包建一个目录channel，签名包建一个目录signed，这样上传应用市场的时候就不会弄混了

![image-20190902142336964](../../screenshots/image-20190902142336964.png)

### 如何签名

一般加固后需要二次签名，使用辅助工具里面的签名APK

![image-20190902143021205](../../screenshots/image-20190902143021205.png)

这样加固后的多渠道包就可以上传应用市场啦