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

`pnpm run lint` uses Oxlint's type-aware API and reports TypeScript compiler
diagnostics in the same process. The shared TypeScript Program avoids parsing
and analyzing the project again in a separate `tsc` process. CI uses this
command. `lint:check` keeps the fast syntax-only check for local iteration, and
`lint:fix` is explicit so checks do not modify the working tree.
`pnpm run typecheck` remains available as a standalone compiler check for
troubleshooting and parity verification.

The type-aware rules that were not part of the previous lint contract remain
disabled. This keeps the migration focused on shared type checking without
adding hundreds of unrelated warnings. They can be enabled individually as
the existing findings are resolved.

The `typescript` package name aliases `@typescript/typescript6` for build tools
that use the JavaScript compiler API, including Father, Dumi, and Prettier's
organize-imports plugin. Repository type checks and published-type fixture
checks use TypeScript 7's native `tsc` from the `@typescript/native` alias.
Oxlint's type-aware integration uses `oxlint-tsgolint`, which tracks the same
TypeScript 7 compiler line.

## Performance

Warm local runs on Windows with Node.js 22 measured the complete `lint` script:

| Implementation                              | Average |
| ------------------------------------------- | ------: |
| Separate `oxlint` and `tsc --noEmit`        | 3387 ms |
| Shared Oxlint type-aware TypeScript Program | 3036 ms |

The shared Program reduced the measured lint time by about 10%. Measuring the
two underlying commands directly produced 3682 ms for separate processes and
3020 ms for the shared Program. Results vary by machine, so compare several
warm runs and keep compiler output redirected when repeating the benchmark.

TypeScript 7 removes `baseUrl` and the legacy `node` module resolution mode.
The root configuration therefore uses `moduleResolution: "bundler"` and
explicit relative targets in `paths`.
