# DBMS TA Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ pnpm install
```

### Local Development

```
$ pnpm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ pnpm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Languages and translations

Traditional Chinese (`zh-Hant`) is the default language at `/blogs`; English is
available at `/blogs/en`. The language menu switches between corresponding pages.

- Original tutorials live in `docs/`; English copies live in
  `i18n/en/docusaurus-plugin-content-docs/current/`.
- Original posts live in `blog/`; English copies live in
  `i18n/en/docusaurus-plugin-content-blog/`.
- Keep translated filenames, document IDs, slugs, and sidebar positions aligned
  with the originals. English posts specify the original publication date so
  translating a post does not change its date or ordering.
- React text uses `@docusaurus/Translate`, with messages in each locale's
  `code.json`. Navigation and sidebar messages use the corresponding plugin JSON files.

Preview English with `pnpm start --locale en` or Chinese with
`pnpm start --locale zh-Hant`. Development serves one locale at a time; run
`pnpm build` followed by `pnpm serve` to check both languages and the language menu.

After adding translatable UI text, run `pnpm write-translations --locale en`
and review the generated messages. Translate new articles separately: this command
extracts UI messages but does not translate Markdown content. Missing English
articles fall back to the original content.

### Deployment

Using SSH:

```
$ USE_SSH=true pnpm run deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> pnpm deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
