---
title: Mise -- Intro to a Modern Dev Env Tool
description: An introduction to a solution toward managing your dev envs
slug: mise-intro
tags: [cli, dev-tool]
hide_table_of_contents: false
---

如果你有看過 [tutorial](/docs/JavaScript/EnvironmentSetup) 的話，應該見過 [fnm](https://github.com/Schniz/fnm) 了吧？

fnm 是一個專門用來管理 node 版本的工具。
雖說確實是好用，但若你跟筆者一樣，會用許多不同的語言(JavaScript, Python, Rust, Zig...)做事，
可能也會覺得版本管理工具東一個西一個，維護起來很麻煩吧？

[mise](https://github.com/jdx/mise) 就是一個集成工具。
你可以用它來管理許多程式語言，甚至開發工具的版本。
筆者甚至連編輯器(neovim)都用它來管理呢！

<!-- truncate -->

## Mise -- The Front-end to Your Dev Env

### Why Mise?

如前言所說，mise 是一個可以將各種環境集成管理的工具。
譬如像筆者這樣，寫 JS, Python, Rust, Zig 等等等的人，
難道我要分別管理
[fnm](https://github.com/Schniz/fnm),
[pyenv](https://github.com/pyenv/pyenv),
[rustup](https://github.com/rust-lang/rustup),
[zigup](https://github.com/marler8997/zigup)
嗎？他們可是每個都有各自的環境變數跟指令集呀！
更不用說，因為用了 neovim，可能還要另外維護一個 [bob](https://github.com/MordechaiHadad/bob)。

:::tip
當然，使用單一集成式的管理固然方便，但要是遇到開源維護者們棄坑，就可能要面臨「大遷徙」。

究竟要使用許多工具來分攤風險，還是要使用集成工具圖個方便，就看個人衡量囉。
:::

懶人如我，有這種方便的集成工具當然是不用白不用！
況且 mise 不光可以管理不同的開發環境，
更可以作為 [task runner](https://mise.jdx.dev/tasks/) 使用，不過我們今天不會去到那邊。

今天來分享一下，如何用 mise 管理 node 的版本。

### Installation

官方的安裝流程[在這](https://mise.jdx.dev/getting-started.html)，這邊分享 Mac 的安裝方式。

一樣呼叫我們的老朋友[Homebrew](https://brew.sh/)：

```shell
$ brew install mise
$ exec $SHELL # restart your terminal
$ mise --version
```

你應該可以看到類似這樣的 ASCII Art：

```
              _                                        __
   ____ ___  (_)_______        ___  ____        ____  / /___ _________
  / __ `__ \/ / ___/ _ \______/ _ \/ __ \______/ __ \/ / __ `/ ___/ _ \
 / / / / / / (__  )  __/_____/  __/ / / /_____/ /_/ / / /_/ / /__/  __/
/_/ /_/ /_/_/____/\___/      \___/_/ /_/     / .___/_/\__,_/\___/\___/
                                            /_/                 by @jdx
2026.1.1 macos-arm64 (2026-01-08)
```

就代表下載完成。

下載完後，還要做一件事情：讓你的終端機自動讀到 mise 管理的環境：


```shell
# zsh (by default using mac)
$ echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

# bash
$ echo 'eval "$(mise activate bash)"' >> ~/.bashrc

# fish
# do nothing
```

這樣就可以隨開隨用囉！

### Usage

我們先簡單的嘗試一下 node：

```shell
$ mise exec node@24 -- node -v
v24.11.1
```

在第一次執行時，你應該會發現它開始下載 node。等他靜靜下載完會自動執行，就能看到版本號囉。

不過，通常我們應該不會想每次做事都要打一串 `mise exec...` 吧？這樣多不方便！

Mise 也有提供全局(global)設定的方式，這樣就會讓你預設就使用指定的版本囉：

```shell
$ mise use -g node@24
```

這樣一來，只要使用 node 就會自動指向 `24.x.x` 了！
以下是我從原本的版本 `22.21.1` 改指向 `24.11.1` 的範例：

```shell
$ node -v
v22.21.1

$ mise use -g node@24
mise ~/.config/mise/config.toml tools: node@24.11.1

$ node -v
v24.11.1
```

### If You Want to Use Neovim Nightly

如果你想用 `mise use neovim@nightly`，應該會報錯。
因為 mise 並沒有辦法直接讀懂 `nightly` 這個標籤，所以要先

```shell
$ mise plugins add neovim
```

才可以呦！
