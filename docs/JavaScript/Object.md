---
title: Object
sidebar_position: 11
---

# Object

JS 具有「物件導向(Object-oriented, OO)」的概念。
其中 JS 有許多的東西都以物件的樣貌出現，包含字串、瀏覽器的 API 等等。

:::info
物件導向程式設計 (Object-oriented Programming, OOP) 是一個很宏大的議題。
我們這部分以語法及使用觀念為主旨，故暫且不討論。
:::

## 基礎概念

Object 是由若干有邏輯關聯性的屬性(properties) 及方法(method) 的集合。
我們快速地看一下以下的案例

```javascript
let harvey = {
  // properties
  name: ["Harvey", "Tung"],
  age: 24,
  department: "MIS",

  // methods
  sayHi() {
    console.log(
      "Hello, my name is",
      this.name[0], // dot notation
      this["name"][1], // bracket notation
    );
  },
};

console.log(harvey.name); // [ 'Harvey', 'Tung' ]
harvey.sayHi(); // Hello, my name is Harvey Tung
```

這邊有個變數叫做 `harvey`，裡面

- 有三個屬性(properties)，分別是
  - `name` 是 array of string
  - `age` 是 number
  - `department`。 是 string
- 有一個方法(method) 叫做 `sayHi`

從範例可以看出：

- Properties 可以有各種類別
- 在 method 中取用自己的屬性要用 `this` 接 properties
  - dot notation: `this.name`
  - bracket notation: `this["name"]`

屬性跟方法是可以覆寫的，如下：

```javascript
harvey.height = 182;

console.log("Height of", harvey.name.join(" "), "is", harvey.height);
// Height of Harvey Tung is 182

harvey.sayHi = function () {
  console.log("Hi!");
};
harvey.sayHi(); // Hi!
```

也許你這時候在想，我真的有在用 object 嗎？
有這個疑問的話或許是因為沒停下來看第一段，但現在我來告訴你這些東西其實都是 object：

```javascript
console.log(typeof console); // object
console.log(typeof ["Harvey Tung"]); // object
console.log(typeof document); // paste this in browser, also "object"!
```

其實還有許多東西，甚至這還可以開出一個新的議題叫做 JSON。

這其實也很重要，因為是當今前後端交互傳輸資料的主要格式之一。

但我相信這部分的 [MDN Doc](https://developer.mozilla.org/zh-TW/docs/Learn_web_development/Core/Scripting/JSON) 很好懂，可以自己讀看看。
