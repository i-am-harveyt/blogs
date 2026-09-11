---
date: 2026-01-07T10:34:47
title: PNPM Package Override
description: How to upgrade a transitive dependency with pnpm overrides.
slug: pnpm-package-override
tags: [javascript, package-manager]
hide_table_of_contents: false
---

There is nothing particularly sensitive about this project, so let's document this little adventure openly!

Today I finally looked at the [vulnerability alert](https://github.com/i-am-harveyt/blogs/security/dependabot/24) GitHub sent me.

In short, a package named `qs` had a security issue.

GitHub's alert was clear: upgrade `qs` from `6.13.x` to `^6.14.1`.

<!-- truncate -->

## Problem

An upgrade sounds straightforward. Wouldn't `pnpm update qs` work? As it turns out, no.

My project **does not depend directly** on `qs`. It is a **transitive dependency**: a package I depend on, such as Docusaurus, depends on other packages that eventually depend on `qs`.

An ordinary update command does not solve this situation.

What else can I do?

## Solution 1 -- Upgrade Upstream Dependency

Ideally, I could upgrade Docusaurus. If its maintainers had already updated the dependencies beneath it, that would solve the problem.

Worth a try! First, let's see which packages depend on `qs`:

```shell
$ pnpm why qs
...

dependencies:
@docusaurus/core 3.9.2
└─┬ webpack-dev-server 5.2.2
  └─┬ express 4.21.2
    ├─┬ body-parser 1.20.3
    │ └── qs 6.13.0
    └── qs 6.13.0
@docusaurus/preset-classic 3.9.2
├─┬ @docusaurus/core 3.9.2
│ └─┬ webpack-dev-server 5.2.2
│   └─┬ express 4.21.2
│     ├─┬ body-parser 1.20.3
│     │ └── qs 6.13.0
│     └── qs 6.13.0
├─┬ @docusaurus/plugin-content-blog 3.9.2
│ ├─┬ @docusaurus/core 3.9.2
│ │ └─┬ webpack-dev-server 5.2.2
│ │   └─┬ express 4.21.2
│ │     ├─┬ body-parser 1.20.3
│ │     │ └── qs 6.13.0
│ │     └── qs 6.13.0
│ └─┬ @docusaurus/plugin-content-docs 3.9.2 peer
│   └─┬ @docusaurus/core 3.9.2
│     └─┬ webpack-dev-server 5.2.2
│       └─┬ express 4.21.2
│         ├─┬ body-parser 1.20.3
│         │ └── qs 6.13.0
│         └── qs 6.13.0
└─┬ @docusaurus/plugin-content-docs 3.9.2
  └─┬ @docusaurus/core 3.9.2
    └─┬ webpack-dev-server 5.2.2
      └─┬ express 4.21.2
        ├─┬ body-parser 1.20.3
        │ └── qs 6.13.0
        └── qs 6.13.0
```

We can see that `@docusaurus/core` brings in `qs` through its dependency on `express`.

Let's try:

```shell
$ pnpm upgrade @docusaurus/core
```

You may notice that nothing changed. The reason is simple: Docusaurus was already at the latest version when I tried this.

So we need a more direct approach: override the dependency version.

## Solution 2: Override the Dependency

Fortunately, this does not require much manual work.

If you read the discussion of pnpm's internals in [this post](./package-managers2.md), you know it maintains and consults `pnpm-lock.yaml` when resolving and downloading packages.

The good news is that we do not need to edit that enormous lockfile ourselves. Pnpm provides a configuration mechanism. Open `package.json`:

```json
{
  "name": "dbms-113-2",
  "version": "0.0.0",
  "private": true,
  "pnpm": { /* Add this block */
	  "overrides": {
      "qs": "^6.14.1"
    }
  },
  // ...the rest stays the same
}
```

The block simply tells pnpm:

"Whenever anything in the dependency tree requests `qs`, use version `6.14.1` or a compatible newer version."

After adding it, run:

```shell
$ pnpm install
Lockfile is up to date, resolution step is skipped
Packages: +3 -1
+++-
Progress: resolved 3, reused 3, downloaded 0, added 1, done
Done in 275ms using pnpm v10.27.0
```

You can see that some changes occurred.

## Result

Let's inspect the result:

```shell
$ pnpm why qs
...

dependencies:
@docusaurus/core 3.9.2
└─┬ webpack-dev-server 5.2.2
  └─┬ express 4.21.2
    ├─┬ body-parser 1.20.3
    │ └── qs 6.14.1
    └── qs 6.14.1
@docusaurus/preset-classic 3.9.2
├─┬ @docusaurus/core 3.9.2
│ └─┬ webpack-dev-server 5.2.2
│   └─┬ express 4.21.2
│     ├─┬ body-parser 1.20.3
│     │ └── qs 6.14.1
│     └── qs 6.14.1
├─┬ @docusaurus/plugin-content-blog 3.9.2
│ ├─┬ @docusaurus/core 3.9.2
│ │ └─┬ webpack-dev-server 5.2.2
│ │   └─┬ express 4.21.2
│ │     ├─┬ body-parser 1.20.3
│ │     │ └── qs 6.14.1
│ │     └── qs 6.14.1
│ └─┬ @docusaurus/plugin-content-docs 3.9.2 peer
│   └─┬ @docusaurus/core 3.9.2
│     └─┬ webpack-dev-server 5.2.2
│       └─┬ express 4.21.2
│         ├─┬ body-parser 1.20.3
│         │ └── qs 6.14.1
│         └── qs 6.14.1
└─┬ @docusaurus/plugin-content-docs 3.9.2
  └─┬ @docusaurus/core 3.9.2
    └─┬ webpack-dev-server 5.2.2
      └─┬ express 4.21.2
        ├─┬ body-parser 1.20.3
        │ └── qs 6.14.1
        └── qs 6.14.1
```

The version has been upgraded! Do not forget to `git commit` and `git push`.
