# Contributing to pro-components

## Set up

Install dev deps after git clone the repo.

```bash
$ pnpm i
```

run start

```bash
$ pnpm start
```

## Docs site

Same toolchain as [dumi](https://d.umijs.org/); `docs` is a thin wrapper.

```bash
$ pnpm docs dev       # local doc dev server (same idea as pnpm start)
$ pnpm docs build
$ pnpm docs preview
$ pnpm docs check     # runs @umijs/doctor publish check (same as pnpm checkPublish)
```

## Build

Library build uses [father](https://github.com/umijs/father) (Babel + bundler).

```bash
$ pnpm build

# Rebuild when files change
$ pnpm build --watch
```

## Test

Uses [Vitest](https://vitest.dev/).

```bash
$ pnpm test

# Single file (examples)
$ pnpm exec vitest run tests/table/index.test.tsx

# Watch mode while developing
$ pnpm exec vitest

# Coverage (Istanbul via Vitest)
$ pnpm test:coverage
```

## Release

Maintainers (needs GitHub token and repo permissions):

```bash
$ pnpm changelog
$ pnpm createRelease
```

This repository ships a single package (`@ant-design/pro-components`); there is no multi-package `packages/` workspace or `pnpm bootstrap` step.
