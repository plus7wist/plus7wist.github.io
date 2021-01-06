---
title: "rm 的小故事"
date: 2020-03-17T10:59:03+08:00
draft: false
---

当在一个空目录做这样的事情：

    touch ./-i a b c
    rm *

基本上，`rm` 会交互式的命令确认删除。这是因为 `*` 扩展把 `-i`（文件名）扩展到了
`rm` 的选项里面。而 `-i` 对 `rm` 来说，是打开交互式确认的选项。

所以 bash 脚本里面不应该直接使用 `*` 来扩展文件名，至少要使用 `./*`。

这应该归咎于命令行工具对参数完全不做类型区分，广义上归属于进程之间消息传递的框架缺失。如果 `rm` 是一个函数，那么它的设计十分糟糕。它有八九个选项，选项之间有非常细微的区别。这就好像这样的函数声明：

    def rm(*file_list, **options):
        do_remove_file(file_list, options)

对于这种函数的重构，基本上是采取包装办法，将常用的选项组合提取出一组函数来，然后弃用 `rm`，这个过程中，既能淘汰不常用甚至本身无意义的参数组合，也能指导进一步重构。

    def rm_file(file_path):
        rm(file_path)

    def rm_recursive(file_or_dir):
        rm(file_or_dir, recursive=True)

    def rm_interactive(file_or_dir):
        rm(file_or_dir, interactive=True)

但是我们对这些函数都有 `-f` 的要求，还能要求它们能组合多个文件。这时候我们就需要重新抽象：`-f` 是应用在被删除对象上的，其它选项也类似。所以我们的做法可能是：

    class DeleteTarget:
        def __init__(self, target):
            self.target = target
            self.interactive_ = False
            self.force_ = False
            self.recursive_ = False

        def interactive(self, interactive):
            self.interactive_ = interactive
            return self
        
        def force(self, force):
            self.force_ = force
            return self
        
        def recursive(self, recursive):
            self.recursive_ = recursive
            return self

    def rm_target_list(*delete_target_list):
        for x in delete_target_list:
          rm_target(x)

    def rm_target(delete_target):
        options = dict(
          force=delete_target.force_,
            recursive=delete_target.recursive_,
            interactive=delete_target.interactive_,
        )
        rm(delete_target.target, **options)

这在 shell 的世界里大概需要解析一种属性协议。比如我们用等号风格的命令行参数：

    rm_target =path1 f=path2 ir=path3
    # rm path1
    # rm -f path2
    # rm -ir path3

这样无论 `path` 里有什么奇怪的字符，都不会导致我们的工作意义不明。
