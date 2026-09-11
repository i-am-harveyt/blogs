---
title: Function
sidebar_position: 7
---

# Function

Let's revisit what happened at the end of the previous section:

```javascript
let harvey = {
    sayHiToConsole() {
        console.log("Hi");
    }
}
console.log(typeof harvey.sayHiToConsole); // function
```

We can see that `sayHiToConsole` in the `harvey` object is a `function`. What does that mean?

Where have you encountered functions before? If you have taken high-school mathematics, _trigonometric functions_ might come to mind.

That may not be a pleasant memory, but let's extract a few abstract ideas:

- Give it some inputs, and it returns an output.
- Each combination of inputs corresponds to a single output.

You might also be thinking of $x$ and $f(x)$. Good: that is a useful way to understand it.

These are idealized conditions, though. Meeting them exactly requires some assumptions.

More generally, _a `function` takes some input, performs some processing, and provides output_.

## Structure

Let's look at a typical example:

```javascript
function addTwoNumbers(a, b) {
    return a + b;
}
```

We can use this example to introduce the parts of a function:

1. The `function` keyword tells us we are _defining_ a function.
2. `addTwoNumbers` is the function's name.
3. `(a, b)` declares two input parameters.
4. `{}` encloses the JS statements that make up the function's work.
5. The `return` keyword is _optional_: not every function explicitly returns a value, as with our earlier `harvey.sayHiToConsole`.

## Function? Method?

You may now be wondering:

:::info What is the difference between a method and a function?
Both are essentially sequences of instructions.

When those instructions are _associated with an object_, such as `sayHiToConsole` with `harvey`, we call it a method. Otherwise, we call it a function.
:::

## First-class

Time to revisit an earlier point: JS functions can be used as values!

```javascript
function addTwoNumbers(a, b) {
    return a + b;
}
const add = addTwoNumbers; // function as variable/constant
console.log(add(2, 3)); // 5
```

You can even pass them as arguments:

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
