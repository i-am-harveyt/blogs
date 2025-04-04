---
title: Expressions & Operators
sidebar_position: 8
---

# Expressions & Operators

我這邊挑著講一些，
完整內容可以上[MDN doc](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)詳讀。

## Operators

Operators 中文稱作「運算子」，簡單來說就是像加減乘除那樣的運算符號。不過程式語言中經常不只有加減乘除而有很多花樣，我這邊挑一些介紹。

### Arithmetic Operators

```javascript
console.log(3 + 2); // 5
console.log(3 - 2); // 1
console.log(3 * 2); // 6
console.log(3 / 2); // 1.5
console.log(3 % 2); // 1, because 3/2 = 1...*1*
```

### Logical Operators

- Logical OR (||)
- Logical AND (&&)
- Nullish coalescing (?? 這我不常用，但好像其實挺方便的)
- Not (!)

```javascript
console.log(true || false); // true (at least 1 true => true)
console.log(true && false); // false (all true => true)
console.log(null??1); // 1 (if lhs is null or undefined, return rhs)
console.log(!false); // true, not false => true
```

:::info
可以注意到邏輯運算的最終結果常常是 boolean，這件事情之後會用到。
:::

### Comparison Operators

比較運算子裡面有分兩種：不嚴格(strict)跟嚴格

#### non-strict

只考慮 operand，不考慮 type。

```javascript
console.log('1' == 1); // true
console.log('1' != 1); // false
console.log('1' >= 1); // true
console.log('1' > 1); // false
console.log('1' <= 1); // true
console.log('1' < 1); // false
```

#### strict

考慮 operand 又考慮 type

```javascript
console.log('1' === 1); // false
console.log('1' !== 1); // true
```

:::info
可以注意到比較運算的最終結果常常是 boolean，這件事情之後會用到。
:::

### String Operators

在 JS 中，合併字串可以直接透過 `+` 完成：

```javascript
console.log("Hello" + " " + "World") // Hello World
```

### Unary Operators

也就是說這些運算符只有一邊有值：

```javascript
let n = 5; // this is assignment operator, just initialize here

// Pretty useful in loops, which we'll discuss later
n++; // plus 1
console.log(n); // 6
n--; // minus 1
console.log(n); // 5

typeof n; // number
```

### Assignment Operators

```javascript
let n = 5
n += 1; // equals to n = n + 1
n -= 1; // equals to n = n - 1
n *= 2; // equals to n = n * 2
n /= 2; // equals to n = n / 2
n %= 2; // equals to n = n % 2
```

### Grouping

可以像數學運算那樣用 `()` 分群：

```javascript
console.log((3 + 2) * (5 + 1)); // 30
```
