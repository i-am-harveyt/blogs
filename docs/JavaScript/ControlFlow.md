---
title: Control Flow
sidebar_position: 9
---

# Control Flow

大家可以想一下，程式每一次做的事情都會是一樣的嗎？不一定吧！雖然說我們目前的程式都只是在印出東西，還真的都一樣就是了。

更實際的情況是 _充滿邏輯判斷_ ，譬如「當xxx就xxx，不然就xxx」。我們舉個簡單的範例：

我們今天有一個數字 `n`，如果

- $n < 5$ 就印出 `Smaller than 5`
- $5 \le n \le 10$ 就印出 `Between 5 & 10`
- $10 < n$ 就印出 `Larger than 10`

條件判斷的語法叫做 `if (condition) { do something }`，但也可以視情況擴寫，以下是個範例。

```javascript
const n = 3;

if (n < 5) {
  // if n < 5, do things here
  console.log("Smaller than 5");
} else if (5 <= n && n <= 10) {
  // if 5 <= n <= 10, do things here
  console.log("Between 5 & 10");
} else {
  // 10 < n, but we can skip the calculation
  console.log("Larger than 10");
}
```

因為 $n < 5$ 及 $5 \le n \le 10$ 都不成立的話，$10 < n$ 必定成立，所以我們也可以直接寫 `else` 而省略判斷。

不過如果你的大括號之間只有一行語句，也可以考慮這麼寫：

```javascript
const n = 3;

if (n < 5) console.log("Smaller than 5");
else if (5 <= n && n <= 10) console.log("Between 5 & 10");
else console.log("Larger than 10");
```

通常會用到 `if-else if-...else` 的情況是 _如果他們之間是互斥(mutual exclusive)的_ 。
如果他們之間並不互斥，你可能就會想分開來寫。

可以注意到，condition 就是一串邏輯運算的結果。
上一小節討論的 Logical & Comparison Operators 最常見的使用場景就是在這邊。
另一個常見的地方是在 loop，也就是我們下一小節將討論的內容。
