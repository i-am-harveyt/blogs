---
title: Expressions & Operators
sidebar_position: 8
---

# Expressions & Operators

I will cover a selection of topics here.
For the full details, see the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators).

## Operators

Operators are symbols for operations, such as addition, subtraction, multiplication, and division. Programming languages offer many more, so let's introduce a few of them.

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
- Nullish coalescing (??; I do not use this often, but it seems quite handy)
- Not (!)

```javascript
console.log(true || false); // true (at least 1 true => true)
console.log(true && false); // false (all true => true)
console.log(null??1); // 1 (if lhs is null or undefined, return rhs)
console.log(!false); // true, not false => true
```

:::info
Notice that logical operations often produce a boolean. We will use this later.
:::

### Comparison Operators

Comparison operators include loose and strict equality checks.

#### non-strict

Compares values without requiring the same type.

```javascript
console.log('1' == 1); // true
console.log('1' != 1); // false
console.log('1' >= 1); // true
console.log('1' > 1); // false
console.log('1' <= 1); // true
console.log('1' < 1); // false
```

#### strict

Compares both value and type.

```javascript
console.log('1' === 1); // false
console.log('1' !== 1); // true
```

:::info
Notice that comparisons produce a boolean. We will use this later.
:::

### String Operators

In JS, you can concatenate strings directly with `+`:

```javascript
console.log("Hello" + " " + "World") // Hello World
```

### Unary Operators

These operators take just one operand:

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

You can group expressions with `()`, just as in mathematics:

```javascript
console.log((3 + 2) * (5 + 1)); // 30
```
