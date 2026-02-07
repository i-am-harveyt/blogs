---
sidebar_position: 2
---

# Installation

這邊一樣示範 Mac 的做法：

```shell
$ brew install jujutsu
```

下載完後，可以直接呼叫。我們來看看他的版本：

```shell
$ jj version
jj 0.38.0
```

如果你記得 git 下載下來後都要設定一下使用者，那很好，因為 jj 也要：

```shell
$ jj config set --user user.name "Your Name"

$ jj config set --user user.email "Your Email"

$ jj config list # to checkout your settings!

operation.hostname = "******"
operation.username = "******"
ui.editor = "Your TUI Editor"
user.name = "Your Name"
user.email = "Your Email"
```

你就能看到類似上面的結果，這樣就設定完畢了。
