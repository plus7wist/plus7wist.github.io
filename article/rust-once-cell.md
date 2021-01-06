---
title: "Rust 包 once-cell：只初始化一次"
date: 2020-09-17T10:33:00+08:00
draft: false
---

once-cell 包基本上是为了使得程序获得使用静态生存周期的变量的能力。Rust 有能力让第三方库实现这种特性，所以语言没有内建。C++ 中常有用 static 变量来实现单例模式的情况：

    Singleton *GetSingleTon() {
      static Singleton *singleton = CreateSingleton();
      return singleton;
    }

这个实现还有两个典型的局限性：线程安全问题和析构顺序问题，Rust 都能提供很好的方案。后者本身在 Rust 空间里是不存在的，前者可以充分利用 Send 和 Sync 机制来解决。单例往往没有在线程之间发送的必要，所以需求分野就处在 Sync 特质上。我们需要一种类型构造子：

1. 生命周期是静态的；
2. 只在第一次使用的时候初始化；
3. 有实现了 Sync 的版本，可以在多线程中共享借用；
4. 有没实现 Sync 的版本，无法让其他线程访问。

于是 once_cell 提供了 once_cell::sync::OnceCell 和 once_cell:unsync::OnceCell。注意，跟 Arc/Mutex 的关系类似，once_cell::sync::OnceCell 只顾分享，而保证多个线程之间读者和写者之间的同步管理不归它管：需要修改时就使用 OnceCell<Mutex<T>>。
