---
date: 2025-12-13T08:29:18
title: JS Package Managers -- pnpm (II)
description: A closer look at pnpm's dependency graph, package fetching, and linking process.
slug: js-package-managers-pnpm
tags: [javascript, package-manager]
hide_table_of_contents: false
---

While updating this blog's dependencies, I realized how little I still knew about JavaScript development infrastructure.

I do not yet have the time or expertise to dig deeply into runtimes, but learning how package managers work seems manageable.

Out of personal interest, I will explore the design of [pnpm](https://pnpm.io/) and [Bun](https://bun.com/), along with some code, to build an initial understanding.

This is the second post. For background and prerequisites, see the [previous post](./package-managers.md).

<!-- truncate -->

## PNPM, after `headlessInstall`

Let's continue: what happens inside `headlessInstall`, and what follows it?

### `headlessInstall`

First, why is it called `headless`?

According to the [official documentation](https://pnpm.io/settings#preferfrozenlockfile):

> preferFrozenLockfile
>
> - Default: true
> - Type: Boolean
>
> When set to true and the available pnpm-lock.yaml satisfies the package.json dependencies directive, a headless installation is performed.
> A headless installation skips all dependency resolution as it does not need to modify the lockfile.

If a suitable lockfile already exists and we are *not adding, removing, or updating packages*,
installation can proceed *directly from the lockfile*, without additional dependency resolution.

With that clarified, let's return to the code.

We will inspect the installation step by step.

First:

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

This shows that installation uses `wantedLockfile` from `opts`, or reads it from `lockfileDir`. It throws an error if there is no lockfile.

Why do we need the lockfile? To turn it into a dependency graph:

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

:::warning What if dependencies are not determined first?

- Duplicate downloads: we cannot reliably identify which packages are already available.
- Phantom dependencies: a project may use packages it did not declare in package.json.
- Missing dependencies: required packages may not all be in place.
- Version conflicts: multiple packages may require different versions of the same library.

:::

Let's look inside `lockfileToDepGraph`:

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

Then inside `buildGraphFromPackages`:

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

Fetching starts around here. *Pnpm has already begun fetching package files at this point.*
Since downloads take time, pnpm can *calculate and build the dependency graph* after initiating them:

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

This connects to the links discussed in the earlier [design overview](./package-managers.md#motivateion--features).
Specifically:

- `linkAllPkgs` imports package files from the global store, using _hard links_ where applicable.
- `linkAllModules` creates _symlinks_ between modules.

Finally, record the changes in the lockfile:

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

Since fetching runs asynchronously alongside this work, the installation must wait for the actual downloads to finish before completing:

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

That brings the installation process to its conclusion.

## Afterword

This wraps up my initial exploration of pnpm.

There is still a small gap: how exactly is the data stored? What do the hashes and comparisons across package versions look like, and how does pnpm store only changed files?
I may return to fill in that gap later. For now, this series focuses on differences in package manager design, so I am moving on to Bun.

Stay tuned!
