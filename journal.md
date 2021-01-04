## 2021年 01月 04日 星期一 11:04:08 CST

我的 Ubuntu 用 snap 安装的 typora 出现了奇怪的问题。今天我还是改成用 apt 的 ppa 来安装了。

## 2020年 07月 20日 星期二

实在是对 Markdown 恼火到一定境界了。

## 2020年 07月 20日 星期一 17:47:45 CST

我想实现一个 `MapInto` trait，为所有可能的情况实现 `iterator.map_into()`，相当于 `iterator.map(|item| item.into())`，但是因为我的实现里 into 的结果类型不受泛型约束，所以没有成功。之后再考虑考虑怎么做。

昨天的 `&&str` 调用 `ToString` 导致迂回调用的问题，让我想起我已知的，将 `&str` 转换成 `String` 的方法有三种：

- `s.to_string()`
- `s.to_owned()`
- `s.into()`

我之前用第三种最多，因为打字少一点……现在看来，后两种都不太会产生第一种会出现的问题。

## 2020年 07月 19日 星期日 15:06:36 CST

Rust 的 `&str` 实现了 `ToString`，`str` 也实现了 `ToString`，但前者是因为下面这一串实现。

```rust
impl Display for str {}
impl<'_, T> Display for &'_ T where T: Display + ?Sized {}
impl<T> ToString for T where T: Display + ?Sized {}
```

也就是最后依赖为 str 实现的 Display::fmt 来创造字符串的。相比较而言后者的效率自然会更高。

例如 `s` 是 `&&str`，那么 `s.to_string()` 会调用 `&str` 的实现。写成 `(*s).to_string()`，调用 `str` 的实现更好一些。`cargo clippy` 可以找到第一种写法，给出一个警告。

## 2020年 07月 18日 星期六 19:16:54 CST

tmux 的默认 shell 受配置文件控制。例如要使用 fish，需要以下配置：

```
set -g default-command /usr/local/bin/fish
set -g default-shell /usr/local/bin/fish
```

注意，修改配置之后，需要关闭所有会话，新的配置才能起效。如果不在意其他会话的工作的话，可以用 tmux kill-server 杀死所有会话。

## 2020年 07月 18日 星期六 17:54:03 CST

date 工具的默认格式受 locale 影响。例如当前主要语言设置的是 C，想要输出简体中文日期时，首先编辑 `/etc/locale.gen`，打开 zh_CN.UTF-8 的开关。再运行 locale-gen 工具，最后用 LANG 环境变量控制 date。

```
env LANG=zh_CN.UTF-8 date
```

## 2020年 07月 17日 星期五 19:54:24 CST

npm 项目的 `dev-dependencies` 的依赖不会用在打包中，但会用在功能测试、示例和基准测试里。

```
[dev-dependencies]
tempdir = "0.3"
```

## 2020年 07月 17日 星期五 17:54:14 CST

```
        Vec<T>      &[T]    Box<[T]>
Vec<T>              &x[..]  x.into_boxed_slice()
&[T]    x.to_vec()          Box::new(*x)
Box<T>  x.to_vec()  &*x
```

## 2020年 07月 17日 星期五 16:32:29 CST

```rust
impl<T> Vec<T> {
    /// Shortens the vector, keeping the first len elements and dropping the
    /// rest.
    /// Note that this method has no effect on the allocated capacity of the
    /// vector.
    pub fn truncate(&mut self, len: usize)
}
```

## 2020年 07月 17日 星期五 15:01:11 CST

从 `&[u32]` 中复制最后一个元素，得到 `Option<u32>`。

```rust
fn slice_last(slice: &[u32]) -> Option<u32> {
    slice.last().copied()
}
```

用到的方法是：

```rust
impl<T> for <T> {
    pub fn last(&self) -> Option<&T>
}

impl <'_, T> Option<&'_ T> where T: Copy {
    pub fn copied(self) -> Option<T>
}
```
