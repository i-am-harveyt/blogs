---
sidebar_position: 1
---

# What is Jujutsu?

Jujutsu(jj) 是一個由 Google 的 VCS 工程師發起的開源專案。

既然是 VCS，那就得面對一個問題：

> 為什麼今天已經有 Git 了，我們仍需要一個不一樣的版本控制系統呢？

Jujutsu 的創造者 Martin von Zweigbergk 在遷移原用 Mercuril 控制的 monorepo 專案時，
他認為其實「暫存區 (Staging Area)」其實是可以被自動化的。

他就想「那如果我去做一個可以自動化處理快照的工具會怎樣？」，
這一個簡單（？）的問題就是 jj 的起點。

再者，他注意到一個 Git 的痛點是，一旦發生衝突 (conflict) 就幾乎卡死所有工作流。
幾乎是必須在處理完衝突之後，才有辦法進行其他操作。

如果你對於 Git 的某些繁瑣操作，或者 conflict 卡人等等的痛點感到頭疼，也許 jj 能幫你解決這些煩躁。

# Jujutsu's Workflow Philosiphy

- No Staging：從此不用 `git add`，只管 commit ，jj 會幫你管理好快照
- Conflict as Data：衝突不會中斷你的後續操作，把它當成程式碼的一部份就好
- Simple & Powerful Rebase：單純又強大的 rebase 能力，脫離 git 的繁雜 rebasing 操作

如果你對這樣的操作哲學感興趣，那我們就來下載下來玩玩看吧！
