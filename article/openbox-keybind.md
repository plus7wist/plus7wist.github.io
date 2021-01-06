---
title: "Openbox 按键绑定"
date: 2020-10-10T10:13:33+08:00
draft: false
---

我的 Arch 桌面系统是 lxde，窗口管理器是 Openbox，按键绑定在 ~/.config/openbox/ 里的 lxde-rc.xml。

我主要加了：

    <!--keybindings for LXTerminal -->
    <keybind key="W-t">
      <action name="Execute">
        <command>lxterminal</command>
      </action>
    </keybind>

和：

    <keybind key="W-Up">
      <action name="ToggleMaximizeFull" />
    </keybind>

后来发现 A-F11 切换全屏也不错。
