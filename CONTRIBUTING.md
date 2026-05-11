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

## Build

Transform with babel and rollup.

```bash
$ pnpm build

# Build and monitor file changes
$ pnpm build --watch

# Build specified package only
$ PACKAGE=plugin-antd pnpm build --watch
```

## Test

Run test.

```bash
$ pnpm test

# Test specified file and watch
$ pnpm test getMockData.test.js -w

# Test specified package
$ pnpm test --package core

# Generate coverage
$ pnpm test --coverage
```

## Release

Maintainers (needs GitHub token and repo permissions):

```bash
$ pnpm changelog
$ pnpm createRelease
```

This repository ships a single package (`@ant-design/pro-components`); there is no multi-package `packages/` workspace or `pnpm bootstrap` step.
