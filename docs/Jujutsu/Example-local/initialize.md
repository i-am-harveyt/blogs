---
sidebar_position: 1
---

# Initialize a a Repo

我們可以透過終端機指令初始化 Jujutsu Repo:

```shell
pwd: example
$ jj git init .
Initialized repo in "."
Hint: Running `git clean -xdf` will remove `.jj/`!
```

這樣就初始化好了！

我們來看一下目前的狀態：

```shell
pwd: example
 $ jj
Hint: Use `jj -h` for a list of available commands.
Run `jj config set --user ui.default-command log` to disable this message.
@  qylwtzrl haotingtong30@gmail.com 2026-02-08 11:02:06 d240a1e6
│  (empty) (no description set)
◆  zzzzzzzz root() 00000000
```

可以看到有一行：

> Run `jj config set --user ui.default-command log` to disable this message.

他是說，下了這行指令後，從此你打 `jj` 就等於 `jj log`，我是覺得挺方便的，所以我也會這麼設定。

這邊我們可以看一下，log 裡面有哪些資訊呢？

首先，我們有一個 root

> `◆  zzzzzzzz root() 00000000`

代表的就是這個 repo 的初始狀態。再來，他也顯示出了目前的狀態：

> @  qylwtzrl haotingtong30@gmail.com 2026-02-08 11:02:06 d240a1e6

- `@` 符號顯示出“你現在在這個 working-copy”的標記
- `haotingtong30@gmail.com` 是我的信箱。如果覺得我的 blog 有寫不好的地方，歡迎投書
- `2026-02-08 11:02:06` 是這個 snapshot 的時間點
- `qylwtzrl` 是 snapshot 的編號，即便你怎麼對 repo 內容作改動，他都是不會變的。
- `d240a1e6` 是 hash ，是 commit 的編號，是根據你的內容算出來的，所以有作更動就會變。
- `(empty)` 代表你現在還沒做任何更動

我們的初始化到此完成。

