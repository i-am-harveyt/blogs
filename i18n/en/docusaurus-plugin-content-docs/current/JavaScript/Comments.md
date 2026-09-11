---
title: Comments
sidebar_position: 4
---

# Comments

Wait, aren't we going to write some actual code? Yes, but let's explain this first so it does not keep surprising you.

Code can only express so much. Think about it: could a highly structured programming language have a larger vocabulary than a natural language? Probably not!

Let me sneak in a little philosophy. I find this thought particularly striking:

> The limits of my language means the limits of my world.
> The limits of my language mean the limits of my world.
>
> Ludwig Wittgenstein, Tractatus logigo-philosphicus, 1922

With such a small vocabulary, code has limited ways to express what we mean.
To explain more fully what our code does, we need notes in a natural language.
That is why we need _comments_.

Writing comments is _a way to communicate with both your collaborators and your future self_. ~Otherwise, you might end up like me, spending ages trying to understand what you wrote.~

JS has two main kinds of comments: _single-line comments_ and _multi-line comments_:

- Single-line comments: `// ...`
- Multi-line comments: `/* ... */`

For example:

```javascript
// single line comment
// another line of comment
// yet another line here

/*
 * Multi-line comment:
 * We can write
 * a lot of
 * lines here
 */
```

We have actually been sneaking single-line comments into our examples already. Did you notice?

```javascript
// main.js
console.log("Hello World!");
```

The first line is a single-line comment!
