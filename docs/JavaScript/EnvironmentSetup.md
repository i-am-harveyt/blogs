---
title: Environmant Setup
sidebar_position: 2
---

# 環境安裝

這邊簡單討論一下環境的安裝，我們將會透過 fnm 設定 Node.js 環境。

## [fnm](https://github.com/Schniz/fnm)

fnm 是 Node.js 的版本控制工具，可以透過他下載與切換各種版本的 Node.js 以迎合專案需要。

請參照[Installation](https://github.com/Schniz/fnm?tab=readme-ov-file#installation)下載。

## Node.js

我們來下載 v22 的 Node.js。請在 bash/zsh 終端機中輸入指令如下：

```bash
$ fnm install 22
$ fnm use 22
```

最後用 `node --version` 確認一下是否下載及使用成功就可以了：

```shell
$ node --version
v22.14.0
```

## Write Some Code!

我們來寫點程式碼吧！我們的慣例是 Hello World! 請到你的某個資料夾內新增一個檔案 `main.js`:

```javascript
// in main.js
console.log("Hello World!");
```

然後在終端機中輸入 `node main.js` 就可以運行了：

```bash
$ node main.js
Hello World!
```

這樣便完成了！歡迎進入 JS 的世界！
