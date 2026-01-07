---
title: PNPM Package Override
description: Sometimes, you may need to upgrade specific package, how to do it with pnpm?
slug: pnpm-package-override
tags: [javascript, package-manager]
hide_table_of_contents: false
---

這個專案沒什麼好顧慮的，就大膽地把這次踩坑記錄下來吧！

今天筆者終於來看了 Github 發給我的 [Vulnerability Alerts](https://github.com/i-am-harveyt/blogs/security/dependabot/24)。

簡單來說，是一個名為 `qs` 的套件爆出了安全疑慮。

GitHub 的警告非常明瞭：解決方案就是「升版」，必須將 `qs` 從 `6.13.x` 升級到 `^6.14.1`。

<!-- truncate -->

## Problem

升版聽起來就也挺直覺的，`pnpm update qs` 不行嗎？誒，還真的不行。

因為我的專案**並沒有直接依賴（Direct Dependency）**於 `qs`。它是所謂的**間接依賴（Transitive Dependency）**——是我依賴的套件（如 Docusaurus）又依賴了其他套件，最後才轉手依賴了 `qs`。

在這種情況下，普通的升級指令是不會起作用的。

那我還可以怎麼辦呢？

## Solution 1 -- Upgrade Upstream Dependency

最理想的狀況是：我直接升級 Docusaurus，如果 Docusaurus 的維護者已經更新了他們底下的依賴版本，那問題就解決了。

誒，還真的有機會！那我們先來看看到底是哪些 package 依賴了 `qs`：

```shell
$ pnpm why qs
...

dependencies:
@docusaurus/core 3.9.2
└─┬ webpack-dev-server 5.2.2
  └─┬ express 4.21.2
    ├─┬ body-parser 1.20.3
    │ └── qs 6.13.0
    └── qs 6.13.0
@docusaurus/preset-classic 3.9.2
├─┬ @docusaurus/core 3.9.2
│ └─┬ webpack-dev-server 5.2.2
│   └─┬ express 4.21.2
│     ├─┬ body-parser 1.20.3
│     │ └── qs 6.13.0
│     └── qs 6.13.0
├─┬ @docusaurus/plugin-content-blog 3.9.2
│ ├─┬ @docusaurus/core 3.9.2
│ │ └─┬ webpack-dev-server 5.2.2
│ │   └─┬ express 4.21.2
│ │     ├─┬ body-parser 1.20.3
│ │     │ └── qs 6.13.0
│ │     └── qs 6.13.0
│ └─┬ @docusaurus/plugin-content-docs 3.9.2 peer
│   └─┬ @docusaurus/core 3.9.2
│     └─┬ webpack-dev-server 5.2.2
│       └─┬ express 4.21.2
│         ├─┬ body-parser 1.20.3
│         │ └── qs 6.13.0
│         └── qs 6.13.0
└─┬ @docusaurus/plugin-content-docs 3.9.2
  └─┬ @docusaurus/core 3.9.2
    └─┬ webpack-dev-server 5.2.2
      └─┬ express 4.21.2
        ├─┬ body-parser 1.20.3
        │ └── qs 6.13.0
        └── qs 6.13.0
```

可以看到，引用了 `qs` 的 package 是 `@docusaurus/core`，因為他引用的 `express` 用到了 `qs`。

好，那就試試看：

```shell
$ pnpm upgrade @docusaurus/core
```

但你可能發現，什麼事都沒發生。原因很簡單，因為 docusaurus 已經是最新版了。

所以我們要使用更粗暴的方案，讓我們稍微弄髒一下手：強制改依賴。

## Solution 2: Overridden

雖然說弄髒，但也沒弄多髒。

如果你看過[這篇文](js-package-managers-pnpm)中討論的 pnpm 運作機制，就會知道 pnpm 解析下載 package 的時候會去維護＆參考 `pnpm-lock.yaml`。

好消息是我們不用真的下去動手改這包超大的 lockfile ，因為 pnpm 是有提供我們 config 修改方案的，到你的 `package.json`：

```json
{
  "name": "dbms-113-2",
  "version": "0.0.0",
  "private": true,
  "pnpm": { /* 新增這個 block */
	  "overrides": {
      "qs": "^6.14.1"
    }
  },
  // ...照舊
}
```

大家應該可以看出來，這個 block 做的事情很簡單。就是跟 pnpm 說：

「無論依賴是中的誰引用到 `qs`，都請用到 `6.14.1` 版本或更新的」

加完這個 block 之後可以下指令：

```shell
$ pnpm install
Lockfile is up to date, resolution step is skipped
Packages: +3 -1
+++-
Progress: resolved 3, reused 3, downloaded 0, added 1, done
Done in 275ms using pnpm v10.27.0
```

可以看到有些更動發生了吧？

## Result

我們來看一下成果：

```shell
$ pnpm why qs
...

dependencies:
@docusaurus/core 3.9.2
└─┬ webpack-dev-server 5.2.2
  └─┬ express 4.21.2
    ├─┬ body-parser 1.20.3
    │ └── qs 6.14.1
    └── qs 6.14.1
@docusaurus/preset-classic 3.9.2
├─┬ @docusaurus/core 3.9.2
│ └─┬ webpack-dev-server 5.2.2
│   └─┬ express 4.21.2
│     ├─┬ body-parser 1.20.3
│     │ └── qs 6.14.1
│     └── qs 6.14.1
├─┬ @docusaurus/plugin-content-blog 3.9.2
│ ├─┬ @docusaurus/core 3.9.2
│ │ └─┬ webpack-dev-server 5.2.2
│ │   └─┬ express 4.21.2
│ │     ├─┬ body-parser 1.20.3
│ │     │ └── qs 6.14.1
│ │     └── qs 6.14.1
│ └─┬ @docusaurus/plugin-content-docs 3.9.2 peer
│   └─┬ @docusaurus/core 3.9.2
│     └─┬ webpack-dev-server 5.2.2
│       └─┬ express 4.21.2
│         ├─┬ body-parser 1.20.3
│         │ └── qs 6.14.1
│         └── qs 6.14.1
└─┬ @docusaurus/plugin-content-docs 3.9.2
  └─┬ @docusaurus/core 3.9.2
    └─┬ webpack-dev-server 5.2.2
      └─┬ express 4.21.2
        ├─┬ body-parser 1.20.3
        │ └── qs 6.14.1
        └── qs 6.14.1
```

這樣版本就升上去啦！別忘記 `git commit` 跟 `git push`！
