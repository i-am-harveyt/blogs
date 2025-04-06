---
title: Loops
sidebar_position: 10
---

# Loops

我們來想一個現實中不太會發生的例子，如果今天我要你從 1 印到 100，要怎麼做？
寫 100 行 `console.log` ？太麻煩了吧！懶惰的工程師怎麼可能放任這種事情發生。

Loop 就是用來在程式中反覆執行任務的主要工具之一。根據使用情境或語意上的不同，Loop 也有各種用法，這邊先介紹三種 loop:

1. `for`
2. `while`
3. `do-while`

## for

```javascript
for (initialization; condition; executed - after - an - iteration) {
  // things to do in this iteration
}
```

我們來將程式碼填進去，這是一個簡單的 for-loop:

```javascript
for (let i = 1; i <= 100; i++) {
  console.log(i);
}
```

要怎麼理解這段程式碼？我們就執行順序逐步分解：

1. 有一個 `i` 被初始化為 0。註：初始化(initialization)是指初次設定值
2. 在 `i < 100` 為 `true` 的前提下
3. 做 `console.log(i)`
4. 然後 `i++`

:::tip Practice
想一下，如果今天把 `i = 0` 改成 `i = 100`，這個 for-loop 還會做事嗎？實驗一下看你想通了沒有！
:::

for 迴圈有一個特點，就是那個 `i` 並不會帶到外頭，例如下面的程式碼就是不被允許的：

```javascript
for (let i = 1; i <= 100; i++) {
  console.log(i);
}
console.log(i); // Error! i is not defined!
```

`for` 迴圈也可以各種改寫，譬如以下的迴圈在語法上也是合乎規則的：

```javascript
let i = 1;
for (; i <= 100; ) {
  console.log(i);
  i++;
}
```

這個寫法省略了初始化，並且把一次執行後的處理移到了迭代的處理之中。

其實上面的這個寫法，就等於把 for loop 變成 while loop 囉！

## while

```javascript
while (condition) {
  // do something if condition==true
}
```

我們的範例用 while loop 寫的話就會變成下面這樣：

```javascript
let i = 1;
while (i <= 100) {
  console.log(i);
  i++;
}
```

跟上面變形了的 for loop 長得很像吧！

用 while loop 的時候要比較注意，一定要讓判定的條件有盡頭，否則很容易不小心變出無限迴圈(infinity loop)。

## do-while

```javascript
do {
  // must do once
  // if condition == true, repeat this block
} while (condition);
```

do-while 比較奇特的地方在，他必定會先做一遍，才去判斷要不要反覆繼續做下去。

所以說，即便 condition 是 false，事情還是會被做一遍。這是需要注意的地方。

所以說，雖然執行結果一樣，但以下的程式碼跟前面幾個迴圈並不是等價的：

```javascript
let i = 1;
do {
  console.log(i);
} while (i <= 100);
```

## Summary

哪個迴圈好？據我所知應該沒有標準答案，這是靠需求跟語意決定的。

不過以下是我根據各自特長與自身使用經驗的總結：

- for 用於 _「知道終點在哪裡」_ ，且 _「希望變數不要帶到迴圈外頭」_ 的情況
- while _不確定終點在哪裡_ ，且 _數字本身沒什麼意義_ 。如果讀者之後學到了鏈結列表(linked list) 就會很清楚我在說什麼了
- do-while 我比較常用在撰寫終端機應用程式的時候用來渲染介面，畢竟無論如何一定要先渲染個主畫面，後面使用者有沒有退出就是另一回事了。

有趣的是，並不是所有語言都有這三個迴圈： go 語言就設定要你用一個 for loop 做到所有事情。雖然一開始我也覺得很奇怪，但用習慣了反而覺得這樣蠻簡潔整齊的。
