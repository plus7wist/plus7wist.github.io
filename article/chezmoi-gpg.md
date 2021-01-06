---
title: "Chezmoi 与 Gpg"
date: 2020-04-10T11:41:25+08:00
draft: false
---

## Chezmoi

Chezmoi 可以在机器之间管理配置文件。我有一份镜像在：<http://gitee.com/plus7wist/go-chezmoi>。Ubuntu Linux 里可以用 snap 安装一个比较好的版本。

它需要配合一个 git 库，放在 ~/.local/share/chezmoi。用 ~/.config/chezmoi/chezmoi.toml 配置 chezmoi 的行为。当需要用 chezmoi 管理 ssh 密钥等比较私密的内容时，就需要联合一种加密工具，而我用的是 gpg。根据 chezmoi 的文档，我需要在 ~/.config/chezmoi/chezmoi.toml 配置 gpg 接受者的公钥：

    [gpg]
        recipient = "plus7wist <gu_castle@163.com>"

这样一来，用 chezmoi add --encrypt 添加的文件，就会以加密文件的形式存放在 ~/.local/share/chezmoi 里，配置仓库就可以放心的公开分享了。

## Gpg

gpg 的私钥需要妥善管理。一般都存放到一个独立的 U 盘上。用下面的命令导出密钥：

    gpg --armor --output secret.txt --export-secret-keys

而下面的命令导出公钥：

    gpg --armor --output public.txt --export

可以将公钥用邮件或者公钥服务器等方法分享出去。

或者，如果你的备份是直接保存 /home 分区，那么在有私钥的家目录中的 .gnupg 文件夹里有对应的密钥。用 --homedir 指定这个备份位置，就可以导出密钥了：

    gpg --homedir /mnt/backup-data/home/user/.gnupg \
      --armor --output public.txt --export-secret-keys

导入密钥对之后，它处于一种不被信任的状态，需要用 gpg --edit-key KEY_ID 来把私钥标记成可信的。这个命令进入 gpg 的交互命令行，输入 trust，弹出菜单，选择完全（fully）信任或者基本（ultimately）信任即可。
