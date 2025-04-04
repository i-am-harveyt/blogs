---
title: Data Types
sidebar_position: 6
---

# Data Types

電腦根據資料型別的判定，會對資料的內容有不同的處理方式。在 JS 中有七種型別，而其中六種為基礎(primary)資料型別

## Primary Type 01: Boolean

Boolean 是一種邏輯判斷的型別，他僅有兩種值: `true` 及 `false`

```javascript
const booleanTrue = true;
const booleanFalse = false;
```

## Primary Type 02: null

null 代表的是某個不存在的東西。

```javascript
const constNull = null;
```

如果今天做了什麼操作但沒拿回東西的話，可以用這個。

## Primary Type 03: undefind

undefined 是未定義的意思，尤其是在變數宣告上，可以後續再給值。
常數是強迫宣告時就要給他值的。

```javascript
let varUndefined;
console.log(varUndefined); // undefined

const constUndefined; // Error!
```

## Primary Type 04: Number

顧名思義，各種數字在 JS 裡面都統稱 Number。

```javascript
let integer = 3;
let pi = 3.14;
```

## Primary Type 05: String

String 是字串，就是一連串的字符(character)。譬如我們之前用的便是：

```javascript
let stringVar = "Hello World";
```

## Primary Type 06: Symbol

保證獨特(unique)且不可變(immutable)的資料。但我其實還沒找到使用它的時機：

```javascript
const symbol01 = Symbol("symbol1");
```

## (Not Primary!) Type 07: Object

Object 是物件，經常用於影射現實中存在的實體的邏輯。裡面定義了一些資料 (field) 以及相關的方法 (method)：
- `field` 代表這些資料是跟著這個 object 的，譬如個體資訊 (e.g. name)。
- `method` 代表這個 object 可能會做的事情 (e.g. walk, sayHi)

我們以我為例：

```javascript
let harvey = {
    name: "Harvey",
    department: "MIS",
    sayHiToConsole() {
        console.log("Hi!");
    }
}
console.log(harvey.name); // Harvey
harvey.sayHiToConsole(); // Hi!
```

## What Is The Type of `x`?

但我們要怎麼知道一個東西的 type 呢？我們可以利用一個好東西叫 `typeof`

我們把 `harvey` 那段程式碼底下再加上幾行

```javascript
...
console.log(typeof harvey); // object
console.log(typeof harvey.name); // string
console.log(typeof harvey.sayHiToConsole); // function
```

誒？什麼是 function？我們下一小節提吧！