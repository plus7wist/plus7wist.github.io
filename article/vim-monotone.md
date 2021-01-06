---
title: "黑白代码高亮"
date: 2020-09-18T11:06:44+08:00
draft: false
---

代码编辑器五颜六色的高亮配色让我厌烦。过多的颜色让我难以专注，过多色彩信息造成的光污染让我大脑疲劳。多数配色方案都过于强调关键字和类型，但它们只是有时候比较重要。所以有人喜欢黑客帝国式的绿色文字配色，例如 vim 内置的 murphy 配色，就不奇怪了。

但我是个神经不那么坚强的人，起初我很喜欢著名的 solarized 配色，它的对比度比较低，让我眼睛比较舒服。但是后来我就发现，看着舒服不等于阅读舒服。对比度低的情况下，眼睛受到的刺激更少，但是相应的看清就更难了。当然我如果是自信到极致的程序员，写完了代码再也不用看，那这就太好了。

所以我现在的选择是黑白配色。会有粗体和斜体来标识关键字，但在我阅读之前没有什么会刺激我的色彩。可能这类配色比较小众，我之前用的那些配色插件会有些 BUG，我现在用的是：<https://github.com/Lokaltog/vim-monotone>，目前看起来表现不错。

![vim-monotone](/images/vim-monotone.png)

这个配色是在：<https://vimcolorschemes.com> 发现的。

我还发现了一个 repo，罗列了一些类似的主题：<https://github.com/mcchrish/vim-no-color-collections>。

## 2020/09/24

我又换成了 'fxn/vim-monochrome'，它也基本上是黑白的配色，但是显得更鲜亮一点，也有少数几种不那么恼人的颜色。

经过这段时间的体验，我觉得我喜欢的配色方案是：

- 并非缤纷绚烂。
- 对比度不那么低。
- 适度的提醒关键字和特别的语法单元。
- 不会让人任何时候都清楚的意思到我在用一种配色方案。

我记得《落第骑士英雄谭》里，表现黑铁一辉的绝技“一刀修罗”的时候，就有舍弃色彩这个描述。这是为了表现“一刀修罗”使用过程中一辉超常的集中能力。反过来说，用了黑白配色的我，感觉自己在使用“一刀修罗”写代码一样（笑）。
