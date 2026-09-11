---
title: Class
sidebar_position: 12
---

# Class

Although I said we would not dig into OOP here, classes seem hard to avoid.

First, a clarification: JavaScript classes are syntactic sugar over its prototype-based inheritance model. See the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain#class-based_vs._prototype-based_languages).

A `class` defines a template for an object's properties and methods, allowing us to create many similar objects.

Let's generalize our earlier `harvey` object into a `Person`:

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
A `class` represents an abstract concept, rather than a particular instance.
The instance is an `object`.
:::

Let's create an instance of Person called `harvey`:

```javascript
let harvey = new Person(); // use `new` to create object
harvey.name = ["Harvey", "Tung"];
harvey.age = 24;
harvey.sayHi();
console.log(harvey instanceof Person); // true
```
