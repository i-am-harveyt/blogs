---
title: Data Types
sidebar_position: 6
---

# Data Types

A computer handles data differently depending on its type. This introduction covers seven JavaScript types, six of which are primitive types.

## Primary Type 01: Boolean

Boolean is a logical type with only two values: `true` and `false`.

```javascript
const booleanTrue = true;
const booleanFalse = false;
```

## Primary Type 02: null

`null` represents the absence of a value.

```javascript
const constNull = null;
```

You can use it when an operation has no value to return.

## Primary Type 03: undefind

`undefined` means a value has not been defined. For example, you can declare a variable and assign a value later.
A constant must be given a value when it is declared.

```javascript
let varUndefined;
console.log(varUndefined); // undefined

const constUndefined; // Error!
```

## Primary Type 04: Number

As the name suggests, ordinary numeric values in JS use the Number type.

```javascript
let integer = 3;
let pi = 3.14;
```

## Primary Type 05: String

A String is a sequence of characters. We have already used one:

```javascript
let stringVar = "Hello World";
```

## Primary Type 06: Symbol

A Symbol is a unique, immutable primitive value. I have not yet found an occasion to use one myself:

```javascript
const symbol01 = Symbol("symbol1");
```

## (Not Primary!) Type 07: Object

An Object often models a real-world entity. It defines some data (fields) and related operations (methods):
- A `field` holds data belonging to the object, such as personal information (e.g. a name).
- A `method` describes something the object can do (e.g. walk or sayHi).

Let's use me as an example:

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

How do we find out the type of something? We can use a handy operator called `typeof`.

Let's add a few lines below the `harvey` example:

```javascript
...
console.log(typeof harvey); // object
console.log(typeof harvey.name); // string
console.log(typeof harvey.sayHiToConsole); // function
```

Wait, what is a function? We will cover that in the next section!
