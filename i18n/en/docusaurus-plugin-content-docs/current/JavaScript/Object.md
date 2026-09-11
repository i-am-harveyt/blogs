---
title: Object
sidebar_position: 11
---

# Object

JS supports object-oriented (OO) concepts.
Many things in JS expose an object-style interface, including strings and browser APIs.

:::info
Object-oriented programming (OOP) is a very large topic.
This section focuses on syntax and practical usage, so we will leave that broader discussion aside.
:::

## Basic Concepts

An object is a collection of logically related properties and methods.
Let's take a quick look at this example:

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

Here we have a variable named `harvey`, containing:

- Three properties:
  - `name`, an array of strings
  - `age`, a number
  - `department`, a string
- One method named `sayHi`

From the example, we can see that:

- Properties can hold values of different types.
- Inside a method, use `this` followed by the property name to access the object's own properties.
  - dot notation: `this.name`
  - bracket notation: `this["name"]`

Properties and methods can be overwritten:

```javascript
harvey.height = 182;

console.log("Height of", harvey.name.join(" "), "is", harvey.height);
// Height of Harvey Tung is 182

harvey.sayHi = function () {
  console.log("Hi!");
};
harvey.sayHi(); // Hi!
```

You may be wondering whether you have actually been using objects.
If so, perhaps you skimmed the first paragraph. These are all objects:

```javascript
console.log(typeof console); // object
console.log(typeof ["Harvey Tung"]); // object
console.log(typeof document); // paste this in browser, also "object"!
```

There are many more examples. This also leads to another topic: JSON.

JSON is important because it is one of the main formats used to exchange data between frontends and backends.

I think the [MDN docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) explain it clearly, so give them a read.
