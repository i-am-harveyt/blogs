---
sidebar_position: 2
---

# First Commit

一般來說，我們要做一點編輯才有 commit 的必要。

## Edit File

這邊就不做一些浮誇的編輯，我們就純粹用指令就好，這樣也比較方便大家複製貼上操作。

來給 `README.md` 上一條 hello world:

```shell
pwd: example
 $ echo 'Hello World' > README.md
```

## Log

然後我們來看一下 log:

```shell
pwd: example[?]
 $ jj
@  qylwtzrl haotingtong30@gmail.com 2026-02-08 13:29:49 91c3d694
│  (no description set)
◆  zzzzzzzz root() 00000000
```

來看一下當前的 snapshot:

> @  qylwtzrl haotingtong30@gmail.com 2026-02-08 13:29:49 91c3d694

對比一下剛初始化玩的那一個快照：

> @  qylwtzrl haotingtong30@gmail.com 2026-02-08 11:02:06 d240a1e6

差異如下：

- 時間戳：對，我隔了很久才回來繼續寫這個系列文
- hash：這是因為內容變更的緣故，這就是 auto-snapshotting 做的

## Add Description

可以試著想像一下，為什麼我們需要對自己的東西持續做記錄呢？

首先，當然是因為要備份，才可以幫助我們改壞的時候弄回去。

但就算要弄回去，在更動許多東西的情況下，要回到哪個時間點依然很不明確對吧？

所以說，要有習慣寫出明確的 description，我們現在就是要做這件事情。

```shell
pwd: example[!]
 $ jj desc
```

`jj desc` 就是準備開始改動 description 的意思

```


JJ: Change ID: qylwtzrl
JJ: This commit contains the following changes:
JJ:     A README.md
JJ:
JJ: Lines starting with "JJ:" (like this one) will be removed.
```

會看到一個類似這樣的編輯畫面。

直接開始打字就好，目標是簡潔有力不要太多字，若很多話想說就換到下一行詳述，第一行有點類似標題，保持乾淨俐落好懂。

我寫了一下，像這樣：

```
Add: file.

This is an example README.
I write a "Hello World" inside.

JJ: Change ID: qylwtzrl
JJ: This commit contains the following changes:
JJ:     A README.md
JJ:
JJ: Lines starting with "JJ:" (like this one) will be removed.
```

然後我突然想起，寫個 file 好像一點幫助都沒有呀！我應該要描述一下是什麼檔案。那就：

```shell
pwd: example[!]
 $ jj desc
```

就可以改囉！

## New Working Copy

到此，我們這個階段的任務就完成了，準備開啟下一個 working-copy:

```shell
pwd: example[!]
 $ jj new
Working copy  (@) now at: trunpqpu 9c62eca7 (empty) (no description set)
Parent commit (@-)      : qylwtzrl a09d871e Add: README.md
````

`jj new` 就是進入下一個 working-copy 的意思。

:::info What is `jj commit`?
你也許會看到一個指令叫做 `jj commit`，這邊我不加以示範，但操作上可以理解成 `jj desc` + `jj new`。

不過我個人認為，使用 `jj new` 會比較能體現把「編輯內容」跟「整理紀錄」解綁的哲學。

這在 operation log 會有差，等等說到 operation log 的時候再寫出來吧！
:::

## Outro

現在，讓我們再看一次 log 吧：

```shell
pwd: example2[]
 $ jj
@  ynquryyn haotingtong30@gmail.com 2026-02-08 13:53:58 f97f249a
│  (empty) (no description set)
○  qylwtzrl haotingtong30@gmail.com 2026-02-08 13:53:56 5743d381
│  Add: README.md
◆  zzzzzzzz root() 00000000
```

可以看到一個新的 working copy，並且 `@` 移動到上頭了:

> @  ynquryyn haotingtong30@gmail.com 2026-02-08 13:53:58 f97f249a

- 你現在有了一個新的 working-copy, id: `ynquryyn`。
- `@` 在此，所以接下來的編輯都會作用在這個新的 working-copy 上頭

反觀一下我們舊的：

> ○  qylwtzrl haotingtong30@gmail.com 2026-02-08 13:53:56 5743d381

- working copy id 依然是 `qylwtzrl`，並不會因為我們開了新的 working-copy 後而變化。
- hash 變成了 `5743d381`

以上就是我們的第一個 commit！
