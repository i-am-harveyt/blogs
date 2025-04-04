---
title: Function
sidebar_position: 7
---

# Function

我們回顧一下上一小節最後發生了什麼事：

```javascript
let harvey = {
    sayHiToConsole() {
        console.log("Hi");
    }
}
console.log(typeof harvey.sayHiToConsole); // function
```

可以看到 `harvey` 這個 object 中的 `sayHiToConsole` 是個 `function`。這是什麼？

function 顧名思義就是函數，在過往經歷中有哪些時候碰到函數了？如果讀者已經讀過高中，可能會想到 _三角函數_。

噢，也許這不是一個好的回憶，但我們抽取一點抽象概念出來：

- 給它若干 input，他會返還一個 output。
- 一種 input 組合只會有一種 output 組合。

也許讀者更進一步的想起了 $x$ 與 $f(x)$。很好，確實可以這麼理解。

不過這些是很理想的情況，因為要能完美達成這些條件是有前提的。

我們可以退一步說：_`function` 就是接收一些 input，做些處理，然後送給我 output 的東西_。

## Structure

我們來舉個一般性的範例：

```javascript
function addTwoNumbers(a, b) {
    return a + b;
}
```

我們利用這個範例介紹一下 function 的組成要素：

1. `function` keyword，看到這個 keyword 就代表要來 _定義_ 函數了。
2. `addTwoNumbers` 是這個函數的名字。
3. `(a, b)` 代表這個函數有兩個 input parameters
4. `{}` 包裹了許多 JS 語句(statements)。就是這個函數內做的事情
5. `return` keyword，這 _不是必要的_，因為不是所有函數都會傳東西回來，譬如之前寫的 `harvey.sayHiToConsole`。

## Function? Method?

也許讀者這時心生疑問了：

:::info 所以前面提到過的 method 跟 function 差在哪？
本質上他們都是一連串的指令。

但如果這串指令 _跟 object 綁定_，像 `sayHiToConsole` 跟 `harvey` 綁定，這就叫做 method，否則叫 function。
:::

## First-class

填坑時間～JS 中的函數可以被當成變數使用！

```javascript
function addTwoNumbers(a, b) {
    return a + b;
}
const add = addTwoNumbers; // function as variable/constant
console.log(add(2, 3)); // 5
```

甚至拿來傳參數都可以：

```javascript
function addTwoNumbers(a, b) {
    return a + b;
}
function doSomething(fn, param1, param2) {
    return fn(param1, param2); // call function as usual
}

// function as param
console.log(doSomething(addTwoNumbers, 2, 3)); // 5
```