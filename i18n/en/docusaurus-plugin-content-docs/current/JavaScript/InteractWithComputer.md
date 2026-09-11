---
title: Interact With Computer
sidebar_position: 3
---

# Interact With Computer

Let's first discuss how people interact with computers.

At the time of writing (April 4, 2025), computers generally do not take the initiative to communicate. We usually give them instructions, and they respond.
A programmer's job is to give instructions in a language the computer understands, then check whether it completed the intended task.

That language is a programming language; in this course, it is JS.

:::info
We will leave aside why computers can understand JS and accept that for now.
:::

How can we check that the computer did what we asked? The most intuitive approach is to display the result on the screen.

In JS, one way to display results is `console.log`. Remember our earlier example?

```javascript
// main.js
console.log("Hello World!");
```

Running it produces:

```bash
$ node main.js
Hello World!
```

As you can see, `console.log` *displays the contents inside its parentheses on the screen*. From now on, we will simply call this "printing."

Let's expand the example a little:

```javascript
// main.js
...
console.log("1");
console.log("2");
console.log("3");
```

What will it print? This:

```bash
$ node main.js
Hello World!
1
2
3
```
