---
title: JS Package Managers -- pnpm (II)
description: The second post of package manager exploration, continuing the pnpm part
slug: js-package-managers-pnpm
tags: [javascript, package-manager]
hide_table_of_contents: false
---

在更新這個部落格的依賴套件時，發現我還是對這些 JS 開發基礎建設的認識太少了。

雖然我目前還不具備鑽研底層 runtime 的能力與時間，但學習一下 package manager 的原理應該還是可以的。

出於個人偏好，我將會調查一下 [pnpm](https://pnpm.io/) 以及 [bun](https://bun.com/) 的設計思路以及一些程式碼片段，希望可以有一些初步的理解。

本篇是第二篇，有關一些背景及前置知識，歡迎查閱[上一篇](js-package-managers)

<!-- truncate -->

## PNPM, after `headlessInstall`

我們接續著看看，`headlessInstall` 裡面到底做了什麼？後面又做了什麼呢？

### `headlessInstall`

這邊補充一下，為什麼特別說 `headless`？

我們根據[官方文檔](https://pnpm.io/settings#preferfrozenlockfile)，可以看到：

> preferFrozenLockfile
>
> - Default: true
> - Type: Boolean
>
> When set to true and the available pnpm-lock.yaml satisfies the package.json dependencies directive, a headless installation is performed.
> A headless installation skips all dependency resolution as it does not need to modify the lockfile.

所以如果今天已經有一個既成的 Lockfile，並且*沒有下達增減更新 package 的指令*，
那就是*純純的根據 lockfile 下載下來*，不用做額外的事情。

好，補充完了，我們開始繼續追程式碼。

那我們一步一步看到底在 install 什麼。

首先，

```javascript
const lockfileDir = opts.lockfileDir;
const wantedLockfile =
  opts.wantedLockfile ??
  (await readWantedLockfile(lockfileDir, {
    ignoreIncompatible: false,
    useGitBranchLockfile: opts.useGitBranchLockfile,
    // mergeGitBranchLockfiles is intentionally not supported in headless
    mergeGitBranchLockfiles: false,
  }));

if (wantedLockfile == null) {
  throw new Error(`Headless installation requires a ${WANTED_LOCKFILE} file`);
}
```

這顯示出，下載是根據已經包在 `opts` 中的 `wantedLockfile` 或是 `lockfileDir` 來啟動，並且如果沒有 Lockfile 會出錯。

那為什麼需要 lockfile 呢？要利用它轉化成 packages 間的依賴關係圖：

```javascript
const {
  directDependenciesByImporterId,
  graph,
  hierarchy,
  hoistedLocations,
  pkgLocationsByDepPath,
  prevGraph,
  symlinkedDirectDependenciesByImporterId,
} = await (opts.nodeLinker === "hoisted"
  ? lockfileToHoistedDepGraph(
      filteredLockfile,
      currentLockfile,
      lockfileToDepGraphOpts,
    )
  : lockfileToDepGraph(
      filteredLockfile,
      opts.force ? null : currentLockfile,
      lockfileToDepGraphOpts,
    ));
```

:::warning 依賴關係沒事先確定會怎樣？

- 重複下載：無法得知哪些套件已存在。
- 幽靈依賴 (Phantom Dependencies)：專案使用了未在 package.json 定義的套件。
- 依賴缺失：無法確保所有需要的套件都已就位。
- 版本衝突：多個套件依賴不同版本的同一個庫。

:::

這裏我們深入看 `lockfileToDepGraph`:

```javascript
export async function lockfileToDepGraph (
  lockfile: LockfileObject,
  currentLockfile: LockfileObject | null,
  opts: LockfileToDepGraphOptions
): Promise<LockfileToDepGraphResult> {
  const {
    graph,
    locationByDepPath,
  } = await buildGraphFromPackages(lockfile, currentLockfile, opts)
...
}
```

再看進 `buildGraphFromPackages`:

```javascript
async function buildGraphFromPackages (
  lockfile: LockfileObject,
  currentLockfile: LockfileObject | null,
  opts: LockfileToDepGraphOptions
): Promise<{
    graph: DependenciesGraph
    locationByDepPath: Record<string, string>
  }> {
...

          fetchResponse = await opts.storeController.fetchPackage({
            force: false,
            lockfileDir: opts.lockfileDir,
            ignoreScripts: opts.ignoreScripts,
            pkg: { name: pkgName, version: pkgVersion, id: packageId, resolution },
            supportedArchitectures: opts.supportedArchitectures,
          })
...
}
```

可以看到抓東西大概是在這個地方。因此 *pnpm 在此時就已經開始抓套件的檔案*了。
由於下載可能需要若干時間，所以在發起下載後，pnpm 會*開始計算與建立依賴關係*（圖）：

```javascript
const depNodes = Object.values(graph);
...
if (opts.nodeLinker === 'hoisted' && hierarchy && prevGraph) {
  ...
} else if (opts.enableModulesDir !== false) {
  await Promise.all(depNodes.map(async (depNode) => fs.mkdir(depNode.modules, { recursive: true })))
  await Promise.all([
    opts.symlink === false
      ? Promise.resolve()
      : linkAllModules(depNodes, {
        optional: opts.include.optionalDependencies,
      }),
    linkAllPkgs(opts.storeController, depNodes, {
      allowBuild,
      force: opts.force,
      disableRelinkLocalDirDeps: opts.disableRelinkLocalDirDeps,
      depGraph: graph,
      depsStateCache,
      ignoreScripts: opts.ignoreScripts,
      lockfileDir: opts.lockfileDir,
      sideEffectsCacheRead: opts.sideEffectsCacheRead,
    }),
  ])
  ...
}
...
```

這裏呼應到[原理](js-package-managers#motivateion--features)中的 link。
其中

- `linkAllPkgs` 連起了跟 global store 的 _hardlink_
- `linkAllModules` 連起了 module 間得 _symlink_

最後，把更動記錄下來，寫進 Lockfile

```javascript
...
    if (opts.useLockfile) {
      // We need to write the wanted lockfile as well.
      // Even though it will only be changed if the workspace will have new projects with no dependencies.
      await writeLockfiles({
        wantedLockfileDir: opts.lockfileDir,
        currentLockfileDir,
        wantedLockfile,
        currentLockfile: filteredLockfile,
      })
    } else {
      await writeCurrentLockfile(currentLockfileDir, filteredLockfile)
    }
  }
...
```

因為跟這些寫入並不是同步的，所以在整個下載流程結束前，要等待並確保實際的「下載」完成：

```javascript
// waiting till package requests are finished
...
await Promise.all(
  depNodes.map(async ({ fetching }) => {
    try {
      await fetching?.();
    } catch {}
  }),
);
...
```

至此，下載就在這裡告一段落。

## 後記

pnpm 的探查至此告一段落。

這邊留下一段小小的空白：資料具體是怎麼存？之前說的 hash 跟在套件更新時比較，並只存有變動的檔案又是什麼意思呢？
也許我之後會再繼續寫文把這段空白補上，但目前這個系列的主旨是探究 package manager 的設計差異，所以我準備要往 bun 去了。

敬請期待！
