---
title: "用 Hugo 生成静态站点"
date: 2019-12-24T17:24:05+08:00
draft: false
---

## 安装 hugo

ArchLinux 或者 manjaro 用户可以选择用 pacman 安装。

否则选择用源代码编译安装。gitee 有镜像：

    git clone https://gitee.com/mirrors/Hugo-Go hugo

进入代码树里检出一个最新的 tag，用 go install 安装它。记得要先配置好 golang 的代理。

## 生成站点

生成站点模板：

    hugo new site plus7wist-hugo

主要修改 `config.toml`。

    baseURL = "https://plus7wist.github.io/"
    languageCode = "zh-cn"
    title = "plus7wist's blog"

此外需要修改的配置多是主题相关的，需要先选择一款主题。我现在的选择是<https://github.com/heyeshuang/hugo-theme-tokiwa>。

这个颜色比较清爽，而且 params.useChineseFonts = true 的话，会打包中文字体到生成结果上。这样多端体验就都比较好。

想要修改主题其他配置或者使用其他主题，则需要参考对应主题的文档。

## 写文章

生成文章：

    hugo new posts/journal.md

写完文章：

    hugo server # 开启本地博客服务
    hugo server -D # 开启本地博客服务，把 draft 也显示出来
    hugo # 在 public/ 生成站点

## 发布站点

我们需要一个托管网站，如果没有自己的服务器，可以选择 github 或者 gitee 提供的 pages 服务。

github 会在推送的时候自动部署，但是时常会有网络问题。gitee 的缺点则是不能自动部署，需要在项目管理页手动部署，除非是课金用户。

也许 Gitee 的 hugo 版本太低，常常有部署失败的情况，多方询问没有结果，我还是换回了直接将生成产物提交到仓库里的办法。

我检出了一个叫做 branch-publich 的分支，里面只有 public/ 文件夹和简单的 README。并且在工作区的根目录克隆自己到 public-repo，并且将 public-repo/public 链接到 public。并且在 gitee 项目页开启 pages 服务，选择 branch-public 分支的 public 目录。

这样一来，发布文章的流程就是：

1. 写文章，draft 改成 false。
1. 用 hugo 生成文章。
1. 进入 public-repo，提交，推送修改。
1. 到 gitee 点击重新部署。
