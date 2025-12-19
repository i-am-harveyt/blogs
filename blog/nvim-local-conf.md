---
title: Neovim Local Config
description: If you find out DX in specific project differs a lot from VS code, you may want to check this out
slug: nvim-local-conf
tags: [neovim, dx]
hide_table_of_contents: false
---

在試圖追 bun 的程式碼時，
發現用平常用的 neovim 怎麼用怎麼不順。

在 Visual Studio Code(VS Code) 就可以簡單的 jump to definition 的東西，
在 neovim 卻跳不動。

為什麼？可能是因為 project-level 的設定不一致而導致。

<!-- truncate -->

## Intro

每個專案可能都會有一些各自設定上的小巧思，
譬如縮排要縮多少或是 lib 應該要優先從哪裡讀，
或是編譯器優先採用哪一份等等。

若論縮排，
有的專案縮排縮四格，有的縮兩格，
這樣每次都改編輯器的設定不煩嗎？超煩的吧。
利用 project-level config，你就可以在跳轉不同專案間自動切換了。

如果說讀取 lib，就拿 zig 來說，
可能就要設定 `zig.path`, 或是 `zig.zls.zigLibPath`。

如果這兩個都不設定會發生什麼事呢？
就會像前面所說的，lsp 會找不到參考的 lib 或是 zig executable。

那在 VS Code 中，這個設定會在 `.vscode/` 裡面。
我們以 `.vscode/settings.json` 的片段為例：

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

Neovim 在預設的情況下，可不會自己跑去讀 vs code 的設定檔。
況且就算讀了，可能也不會讀懂。

在 neovim 中，要做到讀取 project-level 的 config，
一個方法是使用 folke 大神所寫的
[neoconf.nvim](https://github.com/folke/neoconf.nvim)，
或是土法煉鋼地，像我這次使用 `exrc` 功能。

### `exrc`

`exrc` 選項可以提供你自動讀取路徑中的 `.nvim.lua` 檔案，
並且執行其中的程式碼。
[docs](https://neovim.io/doc/user/options.html#auto-setting)

### How to Use?

要怎麼啟用這個東西呢？我們需要在 `init.lua` 裡面加入

```lua
vim.o.exrc = true       -- 允許讀取專案下的設定檔
vim.o.secure = true     -- 安全模式（避免惡意程式碼自動執行）
```

這樣就開啟設定了。
接下來我們去專案中，
就拿我這次想看 [bun](https://github.com/oven-sh/bun) 的 code 為例。

`.vscode/settings.json` 中有針對 zig 設定的片段(跟上面的範例是一樣的)：

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

這裡面我們需要什麼呢？

- `zig.path` 是用來指定編譯器 executable 的
- `zig.zls.zigLibPath` 是用來提示標準庫的路徑

還記得我一開始遇到的問題嗎？是跟 goto definition 相關的問題。

這個問題其實不是「編輯器」的鍋，
而是 Language Server 對你的專案沒有背景資訊。

因此，現在要針對設定的對象是 LSP (Language Server Protocol)。

以下範例僅留比較必要的部分：

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

`zls` 是 zig language server 的名字。

`zls_config.settings` 裡面的參數要去參考各 language server 的設定。

設定完成後重新啟動 neovim，他就變得「懂」你的專案啦！
