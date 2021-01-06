# Vue Reactive 的笔记

这是某门课程，介绍 Vue3.0 的 reactive 的笔记。

## Proxy

对对象进行包装，重新定义对对象的操作。可以看作是使用组合而不是接口来实现动态分发的途径。

## effect 接口

effect 以一个回调函数，和被此函数捕获的 reactive 对象为参数。当被捕获的 reactive 对象发生改变，触发回调函数。

实际上被回调函数绑定的对象不易也无法直接传递给 effect 函数：因为 Javascript 的函数是分享调用的。所以实际上 effect 会在注册阶段调用一次回调函数，从而获取被他捕获的 reactive 对象的列表。

reactive 对象实际上是为了满足 effect 需要而对对象进行的 Proxy 包装。

人们常把 effect 视作对 reactive 对象的值的意义的定义，在这当中用赋值模拟绑定。所以 effect 注册阶段的莫名其妙的调用也就变成了初始绑定：即要求被绑定的 reactive 的初始值存活不仅存活在回调函数之前，也要存活在 effect 之前。

## effect 的共享

effect 没有任何形式上的通信，所以通信是通过共享发生的。但要注意它同时却是一个纯函数，可以进行记忆化。

按照上一节的解析，effect 的职责主要是获取被回调函数绑定的 reactive，并且进行绑定。

1. 回调函数需要通知 effect，它捕获了哪些 reactive。

2. effect 需要通知每个被回调函数捕获的 reactive，当后者执行 set 操作时需要执行的回调函数是什么，reactive 就可以利用 Proxy 代理调用这些函数。

这样就实现了 effect 和 reactive。
