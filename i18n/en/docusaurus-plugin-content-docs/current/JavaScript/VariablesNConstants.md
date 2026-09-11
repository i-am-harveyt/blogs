---
title: Variables & Constants
sidebar_position: 5
---

# Variables & Constants

What if our code needs to use the same piece of information repeatedly?
Most programming languages provide ways to store data, including variables and constants.

The difference is mutability: a variable can be reassigned, while a constant cannot.

:::tip Constants sound inconvenient!
That was my first reaction too.
With more experience, though, my opinion completely reversed: _**constants are incredibly useful**_.
Constants reduce _variation_ during execution, making a program's behavior easier to predict.
:::

Let's see how to use variables and constants in JS.

## Using Variables & Constants

Storing data in a variable or constant is simple. Take a look at this snippet:

```javascript
// main.js
let greetingVar = "Hello World"; // variable
const greetingConst = "Hello World"; // constant
```
The `let` keyword declares a variable, while `const` declares a constant.

From this point on, both `greetingVar` and `greetingConst` refer to `"Hello World"`. Let's print them:

```javascript
...
console.log(greetingVar);
console.log(greetingConst);
```

Run it:

```bash
$ node main.js
Hello World
Hello World
```

See?

Now let's add some more code to experience the difference:

```javascript
greetingVar = "Hi There";
console.log(greetingVar);

greetingConst = "Hi There"; // This line can cause an Error!
```

The result is:

```shell
$ node main.js
Hello World
Hello World
Hi There
/tmp/main.js:10
greetingConst = "Hi There"; // This line can cause an Error!
              ^

TypeError: Assignment to constant variable.
...
```

See what happened? Reassigning a constant causes an error.

So, from the moment of declaration:

- `greetingVar` is `"Hello World"` _until it is changed_.
- `greetingConst` remains `"Hello World"` throughout.

## Naming

### Rule

Can we give variables and constants any name we want? Of course not. Here are some invalid examples:

- Reserved [keywords](https://www.w3schools.com/JS/js_reserved.asp)
- A name beginning with a digit, such as `01student`
- A name beginning with an invalid symbol, such as `#harvey`

:::tip
Memorizing every keyword is hard. As a starting point, avoid names that begin with digits or arbitrary symbols.

If you run into a keyword conflict, you can rename the variable then.
:::

### Convention

Code follows naming and formatting conventions to keep it consistent and readable. A common JS convention is camelCase for variables and constants, such as `bestTaInDbms`.
