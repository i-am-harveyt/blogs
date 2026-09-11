---
date: 2025-12-06T12:43:27
title: JS Package Managers -- pnpm (I)
description: An exploration of pnpm and Bun, starting with pnpm's design and installation flow.
slug: js-package-managers
tags: [javascript, package-manager]
hide_table_of_contents: false
---

# JS Package Managers

While updating this blog's dependencies, I realized how little I still knew about JavaScript development infrastructure.

I do not yet have the time or expertise to dig deeply into runtimes, but learning how package managers work seems manageable.

Out of personal interest, I will explore the design of [pnpm](https://pnpm.io/) and [Bun](https://bun.com/), along with some code, to build an initial understanding.

<!-- truncate -->

Halfway through writing, I realized that even after cutting things down, there was still a lot to cover. I will split it into two posts.

This first post briefly introduces pnpm and records my path through its code. The revision examined is [6b18b79](https://github.com/pnpm/pnpm/tree/6b18b795b7d4e1b9c780aaf0c49c68da0502a0b2).

## PNPM

### Motivation & Features {#motivateion--features}

#### 1. Saving Disk Space

Pnpm does not download a separate copy of every package into each project's `node_modules/`. Instead, it keeps *one copy in a local content-addressable store (CAS)* and _hard-links_ files into the project.

When versions of a package share files, those files can be reused: _only changed content needs new storage_.

How does it identify identical content? By comparing hashes. Identical content should have the same hash.

#### 2. Boosting Installation Speed

In a traditional model, installing 100 packages means downloading them and writing each into `node_modules/`.

Pnpm plans the `node_modules/` structure, connecting dependencies with _symlinks_, while coordinating downloads and writes.

The structure looks like this: `node_modules/react` (symlink) -> `.pnpm/react@version/node_modules/react` (hard-linked files) -> global store (stored content).

Together with the store described above, links avoid duplicating content, and creating a link costs less than writing an entire package.

These choices contribute to pnpm's installation speed.

:::note symlink & hard link

|         | symlink                            | hard link                         |
| ------- | ---------------------------------- | --------------------------------- |
| Content | A small file containing a path to the target | A reference to the same underlying inode |

:::

#### 3. Creating a Non-flat node_modules Directory

With a conventional npm or Yarn installation, many dependencies appear at the top level of `node_modules/`. This is called a flat `node_modules` layout.

With pnpm's isolated layout, the top level exposes *direct dependencies*, while symlinks connect the rest of the dependency structure.

### Implementation

#### Start

Let's investigate step by step, starting with the entry point for `pnpm add <package-name>`.

Commands are usually registered centrally. In `pnpm/src/cmd/index.ts`, we can find `add` among the imports.

Its implementation is in `pkg-manager/plugin-commands-installation/src/add.ts`. We can focus on the `handler` function.

Aside from throwing errors, `handler` returns the result of `installDeps`. Let's follow that function.

#### `installDeps`

What does `installDeps` do? As the name suggests, it prepares to handle dependencies.

It takes two parameters: `opts` and `params`.
A quick scan shows that `opts` holds configuration options. We will skip those to focus on the main flow.
`params` is an array containing the packages we want to install.

The path we care about starts around `if (params?.length)`: when packages were requested, `params` should be a nonempty array.

`mutatedProject` contains many fields. For now, note that `params` is passed through as `dependencySelectors`.

Next, `mutateModulesInSingleProject` is called. Before inspecting its implementation, let's look at what comes back:

- `updatedCatalogs`: appears particularly relevant
- `updatedProject`: appears to contain project metadata
- `ignoredBuilds`: an array of strings used by later processing

#### `mutateModulesInSingleProject`

Now inspect `mutateModulesInSingleProject`. It essentially does one thing:

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

So the real work is in `mutateModules`.

#### `mutateModules`

You might wonder why this is not simply a direct install operation.
My interpretation is that pnpm needs to handle multiple workspaces or modules, so an additional layer coordinates those cases.

Back in the function, I think we can jump to `await _install()`, since much of the preceding code checks and handles options.

#### `_install`

`_install` begins coordinating the installation lifecycle described [earlier](#2-boosting-installation-speed).

We will skip `frozenInstall` for now. It is a more efficient path available under certain conditions; let's understand the general case first.

In `installInContext`, we can see these steps:

1. Decide whether to reuse the lockfile or resolve the dependency context again.
2. Select `wantedDependencies` and include them in `newProject`.
3. Recurse into further processing.
4. Perform the installation through `headlessInstall`.

## Closing Thoughts

This is only the first post, and we have not reached the most important technical and performance details yet. Still, it is already quite long...

Unlike my teaching materials, these notes were written mainly to make sense to me, with a little help from AI to review them.

If anything is unclear, please let me know so I can improve the explanation!
