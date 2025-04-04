---
title: Variables & Constants
sidebar_position: 5
---

# Variables & Constants

先來想想，如果今天我們的程式碼裡面有東西要被反覆地用到怎麼辦？
絕大多數的程式語言有提供我們儲存資料的方法，包含變數 (Variables) 與常數 (Constants)。

他們的差別在可變性 (mutability)，變數內容可變更，而常數不行。

:::tip 常數也太難用了吧！
我一開始也是這麼想。
不過隨著經驗累積，我的意見變得恰好相反：_**常數超好用超好用超好用**_。
因為常數大大降低了程式運行時的許多 _變異性_ ，讓運行情況變得更容易預期。
:::

我們來看看在 JS 中怎麼使用變數與常數。

## Using Variables & Constants

將資料存進變數與常數的方法很簡單，我們來看看下面的程式碼片段：

```javascript
// main.js
let greetingVar = "Hello World"; // variable
const greetingConst = "Hello World"; // constant
```
透過 `let` 關鍵字(keyword) 宣告的是變數，而 `const` 宣告的是常數。

從此以後，`greetingVar` 跟 `greetingConst` 指的都是 `"Hello World"`。我們來把它們印出來看看：

```javascript
...
console.log(greetingVar);
console.log(greetingConst);
```

執行：

```bash
$ node main.js
Hello World
Hello World
```

對吧？

現在我們來感受一下他們的差別，我們繼續加更多程式碼：

```javascript
greetingVar = "Hi There";
console.log(greetingVar);

greetingConst = "Hi There"; // This line can cause an Error!
```

執行結果會是：

```shell
$ node main.js
Hello World
Hello World
Hi There
/tmp/tmp.js:10
greetingConst = "Hi There"; // This line can cause an Error!
              ^

TypeError: Assignment to constant variable.
...
```

看到了吧？對常數動手腳可是會出包的。

所以說，自宣告起

- `greetingVar` _在被修改前_ 都會是 `"Hello World"`
- `greetingConst` 自始至終都會是 `"Hello World"`

## Naming

### Rule

我們想給變數和常數命什麼名字都可以嗎？答案當然是不行。我來舉幾個例子：

- [Keywords](https://www.w3schools.com/JS/js_reserved.asp) 中的各種詞
- 數字開頭 `01student`
- 符號開頭 `#harvey`

:::tip
要把所有 keywords 倒背如流是很難的，所以我建議記得不要拿數字跟符號開頭就好。

Keyword 什麼的，遇到出狀況了再改就好。
:::

### Convention

為了程式碼的風格統一好讀，程式碼有各種命名或排版上的慣例。JS 有些命名上的慣例。我這邊舉個常見的：變數常數用 camelCase 命名，如 `bestTaInDbms`。