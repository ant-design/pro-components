# Contributing to pro-components

## Set up

Install dev deps after git clone the repo.

```bash
$ yarn
```

run start

```bash
$ yarn start
```

## Build

Transform with babel and rollup.

```bash
$ yarn build

# Build and monitor file changes
$ yarn build --watch

# Build specified package only
$ PACKAGE=plugin-antd yarn build --watch
```

## Test

Run test.

```bash
$ yarn test

# Test specified file and watch
$ yarn test getMockData.test.js -w

# Test specified package
$ yarn test --package core

# Generate coverage
$ yarn test --coverage
```

## Release

```bash
$ npm run release
$ npm run release -- --publish-only
$ npm run release -- --skip-git-status-check
$ npm run release -- --skip-build
$ npm run release -- --conventional-graduate
$ npm run release -- --conventional-graduate preset-react,plugin-dva
```

## Create new package

Such as creating package `foo`.

```bash
$ mkdir -p packages/foo
$ yarn bootstrap
```

Then you will find the `README.md` and `package.json` is generated in `packages/foo`.

```bash
$ tree packages/foo
packages/foo
├── README.md
└── package.json
```

change the `authors` in package.json
