---
title: Class
sidebar_position: 12
---

# Class

雖然前面才說不想在這裡深挖 OO，但 class 好像又是個避不了的坑。

但在這裡先聲明：JS 裡面的 class 不是真 class，而只是個語法糖。Ref: [MDN Doc](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain#class-based_vs._prototype-based_languages)

`class` 可以用來定義物件的屬性及方法模板，所以可以透過 class 做出很多個相似的東西。

我們把前面的 `harvey` 抽象化成一個 `Person` 吧：

```javascript
class Person {
  name = undefined;
  age = undefined;

  sayHi() {
    console.log("Hi, my name is", this.name.join(" "));
  }
}
```

:::info
`class` 用來表示一個抽象化的概念，而不是實體。
實體是 `object`。
:::

我們從 Person 創造一個實體(instance)，叫做 `harvey`:

```javascript
let harvey = new Person(); // use `new` to create object
harvey.name = ["Harvey", "Tung"];
harvey.age = 24;
harvey.sayHi();
console.log(harvey instanceof Person); // true
```
