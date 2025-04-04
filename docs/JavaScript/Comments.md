---
title: Comments
sidebar_position: 4
---

# Comments

誒？不來真的寫程式嗎？對，在那之前先把這個東西講好，才不會持續嚇到大家。

程式碼能夠表達的事情是有限的。想像一下，程式語言這種被高度結構化的語言，其詞彙量難道能比自然語言多嗎？不會吧！

偷渡一點哲學的東西，我覺得這句話非常發人深省：

> The limits of my language means the limits of my world.
> 我的語言的邊界就是我的世界的邊界。
>
> Ludwig Wittgenstein, Tractatus logigo-philosphicus, 1922

所以說，程式碼就那麼幾個字，能表達的事情應該是蠻有限的。
要能更完整的傳達自己寫出的程式碼在做什麼，得靠一點自然語言作為筆記。
所以我們需要 _註解 (comment)_。

寫註解 _不光是為了要跟共事者溝通，也是跟未來的自己溝通_。~不然就會跟我一樣，花一堆時間思考什麼自己在寫什麼東西~

JS 中註解大致分兩種 —— _單行註解_ 跟 _多行註解_：

- 單行註解：`// ...`
- 多行註解：`/* ... */`

範例如下：

```javascript
// single line comment
// another line of comment
// yet another line here

/*
 * Multi-line comment:
 * We can write
 * a lot of
 * lines here
 */
```

其實我們過去的範例已經默默的偷渡單行註解了，有發現嗎？

```javascript
// main.js
console.log("Hello World!");
```

第一行就是一個單行註解！
