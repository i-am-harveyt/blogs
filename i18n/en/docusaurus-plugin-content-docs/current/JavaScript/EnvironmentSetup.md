---
title: Environmant Setup
sidebar_position: 2
---

# Environment Setup

Let's briefly cover setting up the environment. We will use fnm to set up Node.js.

## [fnm](https://github.com/Schniz/fnm)

fnm is a Node.js version manager. You can use it to download and switch between versions to suit your projects.

Follow the [installation instructions](https://github.com/Schniz/fnm?tab=readme-ov-file#installation) to install it.

## Node.js

Let's install Node.js v22. Enter these commands in a bash/zsh terminal:

```bash
$ fnm install 22
$ fnm use 22
```

Finally, run `node --version` to check that Node.js was installed and selected successfully:

```shell
$ node --version
v22.14.0
```

## Write Some Code!

Let's write some code! The customary first example is Hello World. Create a file named `main.js` in a folder of your choice:

```javascript
// in main.js
console.log("Hello World!");
```

Then enter `node main.js` in your terminal to run it:

```bash
$ node main.js
Hello World!
```

That is it! Welcome to the world of JS!
