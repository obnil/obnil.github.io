---
title: Android高级进阶
permalink: /android/
---

## 自定义View

- 屏幕适配

- UI绘制流程及其原理

  - View源码分析
  - View布局
  - xml布局到屏幕绘制流程原理

- 事件传递机制

- 绘图及其高级特效

  - Paint方法使用技巧
  - 高级渲染
  - Xfermode
  - 滤镜效果
  - 颜色通道过滤
  - Canvas画板高级技能
  - Canvas图层与状态方法使用技巧
  - 超强辅助英雄-Path工具类的使用

- 自定义控件开发

  - Scroller详解及源码分析
  - ViewDragHelper详解及源码分析
  - 自定义View触摸工具类解析
  - 大量自定义控件实践

- 高级动画特效

  - 属性动画源码分析
  - MaterialDesign动画
  - Reveal effect（揭露效果）
  - Activity转换效果
  - Curved motion（曲线运动）
  - Animate Vector Drawables（矢量动画）
  - GIF动画引擎框架分析
* Meterial Design设计思想与原理分析

  * NavigationView+DrawerLayout主流侧滑实现
  * Meterial Design控件详解及源码分析
  * 手写Meterial Design最核心控件CoordinatorLayout

## Linux和Git

 * Linux常用命令ls，grep，find，vim，time，netstat，ssh
 * Git常用命令diff，log，clean，reset，cherry-pick，blame

## Android系统源码 

- Handler源码分析
- Message链表原理与重用机制
- Binder核心原理与架构设计
- PackageManagerService架构设计与Activity跨进程跳转
- App启动流程

## 事件总线框架EventBus

## 网易云换肤核心技术

## 组件化框架

- 阿里巴巴ARouter原理
- 组件化配置
- 手写组件化路由(重定向，跳转预处理，多类型参数从拿地，多Moudle跳转)

## 插件化框架

## 数据库框架GreenDao

## 网络访问框架OKHttp

- 网络七层模型及其原理(TCP IP握手)
- OkHttp源码分析
- HTTP协议结构，重用， 缓存，安全传输（HTTPS握手机制）
- 序列化协议 （Protocol Buffer
- Socket连接池复用机制
- 拦截器责任链模式
- 使用泛型完成可扩展OkHttp框架支持高并发，请求队列

## 图片加载框架Glide

- Glide源码分析
- 手写Glide图片加载框架
- LruCache和DiskLruCache解析

## RxJava响应式编程框架

- RxJava源码分析
- 手写RxJava响应式架构(链式调度，事件变换，线程切换)
- 深入递归式实现RxJava订阅链(观察者变种)

## IOC框架

- 运行时框架XUtils3.0源码分析
- 编译时框架ButterKnife源码分析
- 注入式框架Dagger2源码分析

## Android中的设计模式

- 观察者模式
- 单例模式
- 适配器模式
- 工厂模式
- 代理模式

## 性能优化

- 发生OOM条件分析
- 分析和定位卡顿问题
- 优化复杂布局的卡顿问题
- 避免内存泄漏
- 优化工具的使用Lint，MAT，LeakCanary，Memory Monitor，TraceView，HierarchyViewer布局检测工具
- 安装包性能优化
- 后台服务双进程守护
- 多线程及线程间通讯
- 线程同步和锁

## 数据结构

- 数据结构

  - 逻辑结构（集合，线性，树形，图形）
  - 存储结构（顺序，链式）

- 线性表详解

  - 链表
  - 队列

- HashMap实现原理与手写实现

  - hash算法为什么能解决高并发 高数据量下实现精确查找
  - 扩容机制为什么能使HashMap无限容量
  - 索引机制如何增加查找性能
  - 手写实现高性能HashMap

- 二叉树的详解

  - 二叉树的存储

  - 二叉树的遍历

## 算法

- 常见算法及复杂度
  - 排序
  - 二分
  - 递归
  - 哈希
- 分治法
- 动态规划法