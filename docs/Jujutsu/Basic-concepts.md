---
sidebar_position: 3
---

# Basic Concepts

我們在 Git 可能會需要知道：

1. Status of File
2. Branch

但在 jujutsu，我們需要知道的是：

1. Working Copy
2. Bookmarks

這裡我先不假設大家對 git 有概念，
我們來把它當成一個全新的東西，
最後我再來把他們的概念做比較。

## Working Copy

如果你先看過官方文件，那會看到一行很玄的定義：

> The working copy is where the current working-copy commit's files are written so you can interact with them.

好樣的，自己定義自己是吧？

我是這樣理解的：jj 關注的是 repo 目前的 "狀態(state)"。
你的每一次更動、新增／移除檔案，他就把 state 更新過去。
現在把 "state" 抽換成 "working-copy"，是不是就變得好懂了呢？

最後，如果真的有些不想被追蹤的檔案，就寫進 `.gitignore` 裡面吧！
這樣 jj 就不會追蹤他們了。

## Bookmarks

Bookmark 顧名思義就是書籤。你可以為你的 commit 打上書籤，
標示出這個 commit 該視為在哪段編輯歷史中。
如果熟悉 git 的朋友，他就是 git 中的 branch。

## Comparison

|          | Git                      | JJ                                  |
| -------- | ------------------------ | ----------------------------------- |
| 檔案操作 | 手動：add + commit       | 自動：snapshotting + manual commit  |
| 流程管理 | 在 git branch 間移動指針 | Commit 是獨立物件，用 bookmark 標記 |

可以發現他們兩個的基本思路有很大的不一樣。

在 Git 中，要明確的操作每個檔案，經過兩段操作把他們加入編輯歷史。
且要確保 branch 跟 base 都狀態良好，否則最後要合併的時候就會出大問題。

但在 jj 中，
