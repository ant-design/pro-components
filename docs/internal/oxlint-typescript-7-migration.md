# Oxlint and native TypeScript toolchain

The repository uses native tooling for linting and project type checks:

- `oxlint` replaces ESLint and its React, React Hooks, TypeScript, and Unicorn
  plugin packages.
- `@typescript/native` aliases the stable Go based TypeScript 7 package and
  provides its `tsc` executable.

## Commands

```powershell
pnpm run lint
pnpm run lint:check
pnpm run lint:fix
pnpm run typecheck
pnpm run check:published-types
```

`pnpm run lint` runs Oxlint followed by the native type checker. CI uses this
command. `lint:fix` is explicit so CI and read-only checks do not modify the
working tree.

The `typescript` package name aliases `@typescript/typescript6` for build tools
that use the JavaScript compiler API, including Father, Dumi, and Prettier's
organize-imports plugin. Repository type checks and published-type fixture
checks use TypeScript 7's native `tsc` from the `@typescript/native` alias.

TypeScript 7 removes `baseUrl` and the legacy `node` module resolution mode.
The root configuration therefore uses `moduleResolution: "bundler"` and
explicit relative targets in `paths`.
