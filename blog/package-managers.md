---
title: JS Package Managers -- pnpm (I)
description: Realizing I should get to know how they work while upgrading dependencies of this blogging website. I'll investigate how pnpm and bun work.
slug: js-package-managers
tags: [javascript, package-manager]
hide_table_of_contents: false
---

# JS Package Managers

在更新這個部落格的依賴套件時，發現我還是對這些 JS 開發基礎建設的認識太少了。

雖然我目前還不具備鑽研底層 runtime 的能力與時間，但學習一下 package manager 的原理應該還是可以的。

出於個人偏好，我將會調查一下 [pnpm](https://pnpm.io/) 以及 [bun](https://bun.com/) 的設計思路以及一些程式碼片段，希望可以有一些初步的理解。

<!-- truncate -->

寫到一半的時候發現雖然有刪減過了，但還是有夠多，因此會分成兩篇文發。

本篇是第一篇，將會簡介一下 pnpm，並且討論我 trace pnpm 的過程以及一些簡單的小記。版本是 [6b18b79](https://github.com/pnpm/pnpm/tree/6b18b795b7d4e1b9c780aaf0c49c68da0502a0b2)

## PNPM

### Motivateion & Features

#### 1. Saving Disk Space

pnpm 不會在每一次下載時把整個 package 下載到 `node_modules/` 裡面。而是下載*一份存在 local 的 Content-addressable store (CAS)上* ，然後 _hardlink_ 過去。

同時，如果有不同版本的相同 package，也不會下載一份全新的，_僅下載有更動的部分，其他部分重複使用_。

那，怎麼判斷他們是不是新的呢？答案就是對 hash，因為如果是同一份，那 hash 就該是一樣的。

#### 2. Boosting Installation Speed

如果我們從傳統意義上來說，100 個 package 要下載一百次，然後一一寫入到 `node_modules/`。

但 pnpm 會預先算好 `node_modules/` 的結構（利用 _symlink_ 串起來），再安排下載與寫入。

結構上來說，像是：`node_modules/react` (Symlink) -> `.pnpm/react@version/node_modules/react` (Hard link) -> Global Store (實體檔案)

最後，配合第一點，利用 link 避免重複下載，建立 link 的寫入成本也比寫入一整個 package 來得小。

以上造就了 pnpm 更快的下載速度。

:::note symlink & hard link

|         | symlink                            | hard link                         |
| ------- | ---------------------------------- | --------------------------------- |
| Content | 是一個小文件，記錄了本體的路徑資訊 | 直接指向物件本身（嚴格來說，Inode |

:::

#### 3. Creating a Non-flat node_modules Directory

若是利用 npm 或是 yarn，你將會在 `node_modules/` 中看到所有的 dependencies，這稱為 `flat node_modules`。

在 pnpm 中，`node_modules/` 裡面只會看到*直接的依賴*，其他東西都會用 symlink 來實現。

### Implementation

#### Start

我們來逐步考察，首先我們先找到 `pnpm add <package-name>` 這個指令的進入點。

通常指令會被集中管控，我們進到 `pnpm/src/cmd/index.ts` 中尋找，可以發現 `add` 在眾多的 `import` 中。

`add` 這個指令的上游在 `pkg-manager/plugin-commands-installation/src/add.ts` 中，同時，我們可以把重心放在 `handler` 這個函數中。

我們可以注意到，`handler` 這個函數除了拋出的 error 以外，他的回傳是 `installDeps`。接著繼續 trace 這個函數。

#### `installDeps`

`installDeps` 做了什麼呢？顧名思義，他應該要準備處理 dependencies 了。

我們可以看到他有兩個參數，分別是 `opts` 跟 `params`。
我們掃過 `opts`，可以發現裡面是一堆參數設定，我們先略過，這對核心流程的影響應該不大。
接著看 `params`，是用來儲存我們想要下載的 packages 的 array。

我們關心的下載大致上是從 `if (params?.length)` 開始的，這裏如果我們有要下載東西，那 `params` 應該就會是有內容的陣列。

`mutatedProject` 裡面有許多東西，我們先注意到 `params` 被夾帶在 `dependencySelectors` 中就好。

然後這個東西被呼叫了，`mutateModulesInSingleProject`，我們先不要考慮裡面做了什麼事情，先專注在回傳了什麼？

- `updatedCatalogs`：看起來最重要
- `updatedProject`：看起來像 project 的 metadata
- `ignoredBuilds`：一個 array of string，看起來是幫後面省事用的

#### `mutateModulesInSingleProject`

我們現在來觀察一下 `mutateModulesInSingleProject`，可以看到幾乎只做了一件事情。

```javascript
const result = await mutateModules(
  [
    {
      ...project,
      update: maybeOpts.update,
      updateToLatest: maybeOpts.updateToLatest,
      updateMatching: maybeOpts.updateMatching,
      updatePackageManifest: maybeOpts.updatePackageManifest,
    } as MutatedProject,
  ],
  {
    ...maybeOpts,
    allProjects: [{
      buildIndex: 0,
      ...project,
    }],
  }
)
```

所以真正的主角還是 `mutateModules`。

#### `mutateModules`

到這裡可能會有個疑問，為什麼不要直接單純的做 install？
我想是因為 pnpm 會使用到的場景，有可能是橫跨多個 workspace 或 module 的，因此多拉出一層來 handle 這個問題。

回到函數本身，我認為可以直接跳到 `await _install()`，因為上面大多都是確認 `opt` 的內容再加以 handle 的。

#### `_install`

`_install` 這邊就會開始做我在 [這裏](#2-boosting-installation-speed) 說的，掌管下載的生命週期。

我們先跳過 `frozenInstall`，他是比較高效的下載方式，但是是有條件性的。我們可以先從一般的開始認識起。

可以看到 `installInContext` 中：

1. 判讀是否要直接使用 lockfile 或是重新讀取 dependencies context
2. 篩選出 `wantedDependencies` 後併入 `newProject`
3. 用 recursion 的方式往下鑽
4. `headlessInstall` 真正的開始下載

## 結語

本篇是第一篇，並還沒開始探討到在技術跟效能上最核心的部分。但就已經寫了好多好多了...

因為不是以寫教材給學生看為目標，所以蠻多東西，我都是用「自己能看懂」為標準下去寫的，然後讓 AI 幫我稍微檢查一下這樣。

如果有哪些地方講得不清楚，再煩請指教，我再來把內容加強一下！
