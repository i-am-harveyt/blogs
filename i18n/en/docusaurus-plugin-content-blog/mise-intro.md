---
date: 2026-01-13T07:50:08
title: Mise -- Intro to a Modern Dev Env Tool
description: Manage programming language and development tool versions with mise.
slug: mise-intro
tags: [cli, dev-tool]
hide_table_of_contents: false
---

If you have read the [tutorial](/docs/JavaScript/EnvironmentSetup), you have probably seen [fnm](https://github.com/Schniz/fnm).

fnm is a tool specifically for managing Node.js versions.
It works well, but if you use many languages like I do—JavaScript, Python, Rust, Zig, and so on—
you may find it tedious to maintain a different version manager for each one.

[mise](https://github.com/jdx/mise) is an integrated tool.
It can manage versions of many programming languages and development tools.
I even use it to manage my editor, Neovim!

<!-- truncate -->

## Mise -- The Front-end to Your Dev Env

### Why Mise?

As mentioned above, mise brings environment management into a single tool.
For someone like me who writes JS, Python, Rust, Zig, and more,
do I really want to manage all of these separately:
[fnm](https://github.com/Schniz/fnm),
[pyenv](https://github.com/pyenv/pyenv),
[rustup](https://github.com/rust-lang/rustup),
[zigup](https://github.com/marler8997/zigup)
Each has its own environment variables and commands!
And because I use Neovim, I might need to maintain [bob](https://github.com/MordechaiHadad/bob) as well.

:::tip
Of course, one integrated manager is convenient, but if its open-source maintainers abandon it, you may face a major migration.

Whether to spread that risk across several tools or choose the convenience of one integrated tool is a personal decision.
:::

Being lazy, I am happy to use such a convenient tool!
Besides managing development environments,
mise can also act as a [task runner](https://mise.jdx.dev/tasks/), although we will not cover that today.

Today, I will show how to manage Node.js versions with mise.

### Installation

The official installation guide is [here](https://mise.jdx.dev/getting-started.html). I will demonstrate installation on a Mac.

Let's call on our old friend [Homebrew](https://brew.sh/):

```shell
$ brew install mise
$ exec $SHELL # restart your terminal
$ mise --version
```

You should see ASCII art resembling this:

```
              _                                        __
   ____ ___  (_)_______        ___  ____        ____  / /___ _________
  / __ `__ \/ / ___/ _ \______/ _ \/ __ \______/ __ \/ / __ `/ ___/ _ \
 / / / / / / (__  )  __/_____/  __/ / / /_____/ /_/ / / /_/ / /__/  __/
/_/ /_/ /_/_/____/\___/      \___/_/ /_/     / .___/_/\__,_/\___/\___/
                                            /_/                 by @jdx
2026.1.1 macos-arm64 (2026-01-08)
```

That means the installation is complete.

There is one more step: configure your shell to load environments managed by mise automatically.


```shell
# zsh (by default using mac)
$ echo 'eval "$(mise activate zsh)"' >> ~/.zshrc

# bash
$ echo 'eval "$(mise activate bash)"' >> ~/.bashrc

# fish
# do nothing
```

Now it is ready whenever you open a terminal!

### Usage

Let's try a simple Node.js command:

```shell
$ mise exec node@24 -- node -v
v24.11.1
```

The first time you run it, mise should download Node.js. Wait for the download to finish; it will run the command and display the version automatically.

But we probably do not want to type `mise exec...` every time. That would be inconvenient!

Mise also supports global settings, letting you choose a default version:

```shell
$ mise use -g node@24
```

Now `node` automatically resolves to `24.x.x`!
Here is my example of switching from `22.21.1` to `24.11.1`:

```shell
$ node -v
v22.21.1

$ mise use -g node@24
mise ~/.config/mise/config.toml tools: node@24.11.1

$ node -v
v24.11.1
```

### If You Want to Use Neovim Nightly

If you try `mise use neovim@nightly`, you may get an error.
Mise needs additional configuration to recognize the `nightly` tag, so first run:

```shell
$ mise plugins add neovim
```

Then it should work!
