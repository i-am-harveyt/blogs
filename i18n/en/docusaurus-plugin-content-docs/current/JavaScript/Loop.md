---
title: Loops
sidebar_position: 10
---

# Loops

Consider an unlikely real-world task: what if I asked you to print the numbers from 1 to 100?
Would you write 100 `console.log` statements? Too much work! Lazy engineers would never put up with that.

Loops are a primary tool for repeating tasks in a program. Different forms suit different situations and intentions. We will introduce three kinds here:

1. `for`
2. `while`
3. `do-while`

## for

```javascript
for (initialization; condition; executed - after - an - iteration) {
  // things to do in this iteration
}
```

Let's fill in the code. Here is a simple for-loop:

```javascript
for (let i = 1; i <= 100; i++) {
  console.log(i);
}
```

How should we read this code? Let's break it down in execution order:

1. A variable `i` is initialized to 0. Initialization means assigning its first value.
2. As long as `i < 100` is `true`,
3. Run `console.log(i)`.
4. Then run `i++`.

:::tip Practice
What happens if you change `i = 0` to `i = 100`? Will the loop still do anything? Try it and check your understanding!
:::

One feature of this loop is that `i` is not available outside it. For example, the following is not allowed:

```javascript
for (let i = 1; i <= 100; i++) {
  console.log(i);
}
console.log(i); // Error! i is not defined!
```

You can rewrite a `for` loop in various ways. The following is also valid syntax:

```javascript
let i = 1;
for (; i <= 100; ) {
  console.log(i);
  i++;
}
```

This version omits initialization in the loop header and moves the update into the loop body.

In fact, this rewrite effectively turns the for-loop into a while-loop!

## while

```javascript
while (condition) {
  // do something if condition==true
}
```

Our example would look like this as a while-loop:

```javascript
let i = 1;
while (i <= 100) {
  console.log(i);
  i++;
}
```

It looks very similar to the modified for-loop above!

When using a while-loop, make sure the condition will eventually become false. Otherwise, you can accidentally create an infinite loop.

## do-while

```javascript
do {
  // must do once
  // if condition == true, repeat this block
} while (condition);
```

The distinctive feature of do-while is that it runs the body once before checking whether to repeat it.

Even if the condition is false, the body still runs once. Keep that in mind.

So although the output is the same here, the following code is not generally equivalent to the preceding loops:

```javascript
let i = 1;
do {
  console.log(i);
} while (i <= 100);
```

## Summary

Which loop is best? As far as I know, there is no universal answer. It depends on your needs and what you want to express.

Here is my summary of their strengths and my own experience:

- Use for when you _know the endpoint_ and _want the loop variable to stay inside the loop_.
- Use while when the _endpoint is uncertain_ and _the number itself is not meaningful_. This will make more sense if you later learn about linked lists.
- I often use do-while to render terminal application interfaces: the main screen must appear at least once, and whether the user exits afterward is a separate matter.

Interestingly, not every language has all three forms. Go uses a single for-loop construct for everything. I found that strange at first, but once I got used to it, it felt quite clean and consistent.
