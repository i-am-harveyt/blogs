---
title: Control Flow
sidebar_position: 9
---

# Control Flow

Does a program always do exactly the same thing each time it runs? Not necessarily! Although our examples so far only print things, so they really have behaved the same way.

Real programs are _full of conditional decisions_: "If this happens, do that; otherwise, do something else." Here is a simple example:

Suppose we have a number `n`. If

- $n < 5$, print `Smaller than 5`
- $5 \le n \le 10$, print `Between 5 & 10`
- $10 < n$, print `Larger than 10`

The syntax for a conditional is `if (condition) { do something }`. We can extend it as needed, as in this example.

```javascript
const n = 3;

if (n < 5) {
  // if n < 5, do things here
  console.log("Smaller than 5");
} else if (5 <= n && n <= 10) {
  // if 5 <= n <= 10, do things here
  console.log("Between 5 & 10");
} else {
  // 10 < n, but we can skip the calculation
  console.log("Larger than 10");
}
```

If neither $n < 5$ nor $5 \le n \le 10$ holds, then $10 < n$ must hold for our number, so we can use `else` without another condition.

If there is only one statement inside the braces, you can also write it this way:

```javascript
const n = 3;

if (n < 5) console.log("Smaller than 5");
else if (5 <= n && n <= 10) console.log("Between 5 & 10");
else console.log("Larger than 10");
```

We usually use `if-else if-...else` when the cases are _mutually exclusive_.
If they are not mutually exclusive, you may want separate conditions.

Notice that a condition is the result of a logical expression.
This is one of the most common uses of the logical and comparison operators from the previous section.
Another common use is in loops, which we will discuss next.
