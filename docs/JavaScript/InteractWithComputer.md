---
title: Interact With Computer
sidebar_position: 3
---

# Interact With Computer

我們先來說說人怎麼跟電腦互動。

在此時此刻(2025.04.04)，電腦不怎麼會主動傳達些什麼。通常是我們交代它事項，它才做對應的事。
Programmer 所做的事情，就是用電腦看得懂的語言 "交代" 它事務，然後檢查它是否完成了預期的任務。

電腦看得懂的語言就是程式語言，在我們這個教材中也就是 JS。

:::info
我們先不展開討論為什麼電腦能看懂 JS，我們先接受這件事情就好。
:::

而我們要怎麼確認電腦有做到呢？最直覺的做法就是把執行結果顯示到螢幕上。

在 JS 中，讓電腦顯示執行結果的其中一種方法叫做 `console.log`，還記得我們先前的範例嗎？

```javascript
// main.js
console.log("Hello World!");
```

執行與結果是

```bash
$ node main.js
Hello World!
```

可以想見，`console.log` 做的事情就是*把後面括弧中的內容顯示在螢幕上*。

我們來稍稍擴展一下這個範例：

```javascript
// main.js
...
console.log("1");
console.log("2");
console.log("3");
```

執行結果會是什麼呢？是

```bash
$ node main.js
Hello World!
1
2
3
```
