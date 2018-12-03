---
layout: post
title:  "西墨M360门口机接口说明"
date:   2018-12-03 18:00:42 +0800
categories: M360
---
### 是否在线（get请求）
`url: http://47.97.173.58:8059/dmserver/dev_monitor?monitor_device=4113572025`
判断返回值`"online": "online"`,`online` 就是在线，否则离线

### 一键开门（post请求）
* `url: http://47.97.173.58:8059/dmserver/controlDevice`
*  参数`{"access_token":"","operate":1,"data":{"devSn":"4113572025"}}`

### 蓝牙开门
* `Sn: 411352025`
* `mac: 3F:49:F5:30:20:B9`
* `eKey: 1729128a2ce5441b22d4b1c9961cbdfc908032977010000000000036445450831000`

### 密码开门（post请求）
* `url: http://120.79.243.165:9092/hmfsocialmanage/device/vetifyDevice`
* 参数`{"validData":"258369","devSn":"4113572025"}`


### 磁卡开门（无）

