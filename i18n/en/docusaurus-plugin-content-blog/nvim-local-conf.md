---
date: 2025-12-19T15:31:02
title: Neovim Local Config
description: Configure Neovim for a specific project to improve language server integration and code navigation.
slug: nvim-local-conf
tags: [neovim, dx]
hide_table_of_contents: false
---

While trying to follow Bun's source code,
I found my usual Neovim setup surprisingly awkward.

Definitions that I could jump to easily in Visual Studio Code (VS Code)
were unreachable in Neovim.

Why? Inconsistent project-level configuration was a likely cause.

<!-- truncate -->

## Intro

Each project may have its own configuration choices,
such as indentation width, where to look for libraries,
or which compiler to use.

Take indentation:
some projects use four spaces, while others use two.
Changing your editor settings every time would be annoying.
Project-level configuration lets those settings change automatically as you move between projects.

For library lookup in Zig, for example,
you may need to configure `zig.path` or `zig.zls.zigLibPath`.

What happens if neither is configured?
As in my case, the language server may fail to find the library or Zig executable it needs.

In VS Code, these settings live under `.vscode/`.
Here is a fragment of `.vscode/settings.json`:

```json
{
...
  "zig.zls.zigLibPath": "${workspaceFolder}/vendor/zig/lib",
  "zig.buildOnSaveArgs": [
    "-Dgenerated-code=./build/debug/codegen",
    "--watch",
    "-fincremental"
  ],
  // "zig.zls.buildOnSaveStep": "check",
  // "zig.zls.enableBuildOnSave": true,
  // "zig.buildOnSave": true,
  // "zig.buildFilePath": "${workspaceFolder}/build.zig",
  "zig.path": "${workspaceFolder}/vendor/zig/zig.exe",
  "zig.zls.path": "${workspaceFolder}/vendor/zig/zls.exe",
  "zig.formattingProvider": "zls",
...
}
```

Neovim does not read VS Code configuration files by default.
Even if it did, it would not necessarily understand them.

One way to load project-level configuration in Neovim
is to use a plugin by the prolific folke:
[neoconf.nvim](https://github.com/folke/neoconf.nvim),
Or you can take the manual approach I used this time: the `exrc` option.

## `exrc`

The `exrc` option allows Neovim to load a `.nvim.lua` file from the project directory
and execute its code.
[docs](https://neovim.io/doc/user/options.html#auto-setting)

### How to Use?

To enable it, add this to `init.lua`:

```lua
vim.o.exrc = true       -- Allow project-local configuration files
vim.o.secure = true     -- Enable restrictions for applicable local configuration commands
```

That enables the option.
Next, go to the project.
I will use the [Bun](https://github.com/oven-sh/bun) source code as my example.

Its `.vscode/settings.json` includes these Zig settings, the same as in the earlier example:

```json
{
...
  "zig.zls.zigLibPath": "${workspaceFolder}/vendor/zig/lib",
  "zig.buildOnSaveArgs": [
    "-Dgenerated-code=./build/debug/codegen",
    "--watch",
    "-fincremental"
  ],
  // "zig.zls.buildOnSaveStep": "check",
  // "zig.zls.enableBuildOnSave": true,
  // "zig.buildOnSave": true,
  // "zig.buildFilePath": "${workspaceFolder}/build.zig",
  "zig.path": "${workspaceFolder}/vendor/zig/zig.exe",
  "zig.zls.path": "${workspaceFolder}/vendor/zig/zls.exe",
  "zig.formattingProvider": "zls",
...
}
```

Which settings do we need?

- `zig.path` specifies the compiler executable.
- `zig.zls.zigLibPath` provides the path to the standard library.

Remember my original issue? It concerned go-to-definition.

The issue was not really with the editor itself,
but with the language server lacking context about the project.

So we need to configure the language server through the editor's LSP integration.

The example below keeps only the essential parts:

```lua
-- in {project root dir}/.nvim.lua
local project_root = vim.fn.getcwd()

local vendor_zig = project_root .. "/vendor/zig/zig"
local vendor_zls = project_root .. "/vendor/zig/zls"
local vendor_lib = project_root .. "/vendor/zig/lib"

local lspconfig = require('lspconfig')
local zls_config = {
  root_dir = function() return project_root end,

  settings = {
    zls = {
      -- using vendor zig executable
      zig_exe_path = vendor_zig,

      -- specify lib path
      zig_lib_path = vendor_lib,

      enable_build_on_save = true,
      build_on_save_step = "check",
    }
  }
}

-- if vendor zls exist, use vendor zls
if vim.fn.executable(vendor_zls) == 1 then
  zls_config.cmd = { vendor_zls }
end

lspconfig.zls.setup(zls_config)
```

`zls` is the Zig language server's name.

Consult each language server's documentation for the settings accepted in `zls_config.settings`.

Restart Neovim after configuring it, and it should understand your project!
