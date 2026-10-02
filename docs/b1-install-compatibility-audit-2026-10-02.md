# B1 installation and compatibility audit

Snapshot date: 2026-10-02

This batch covers the eight B1 issues and the remaining B3 issue #9628. The
published manifests were checked against the npm registry, and current source
was checked against the v3 package manifest and SSR tests.

## Results

| Issue | Classification                   | Verifiable result                                                                                                                                                                              | Action                                                                                                                                                                             |
| ----- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #9629 | v2/v3 dependency tree mix        | `@ant-design/pro-components@3.1.15-3` declares `antd: ^6.0.0`. The latest standalone packages have no v3 release and still declare antd 4/5 peers.                                             | Correct the migration guide: v3 uses only the monolithic package; upgrade Umi to 4.6.2+ and remove v2 standalone packages.                                                         |
| #9348 | Upstream dependency tree         | The extra packages are introduced when Umi plugins still depend on ProComponents v2 while the app directly installs v3. A forced resolution can break the plugin.                              | Document `pnpm why` diagnostics and require upgrading the dependency that brings in v2.                                                                                            |
| #8931 | Performance enhancement          | Current production source has seven `lodash-es` import sites using `set`, `cloneDeep`, `isEmpty`, `isEqual`, `isObject`, and `merge`. It does not cause installation failure.                  | Move to a measured bundle/performance batch. Replacement requires behavior tests for deep paths, circular values, React nodes, and merge semantics before changing the dependency. |
| #8853 | Historical v2 install            | The v2 packages import `rc-util`; current v3 imports and directly depends on `@rc-component/util` and contains no `rc-util` import.                                                            | Document how to locate the v2 package. Only locked v2 applications should add `rc-util@^5` as a temporary workaround.                                                              |
| #8804 | Unsupported partial upgrade      | `@ant-design/pro-table@2.80.8` installs v1 Form, Field, Card, Utils, and Provider packages. It cannot be upgraded independently into a newer v2 package set.                                   | Document whole-package upgrades and lockfile rollback.                                                                                                                             |
| #8543 | Bundler-sensitive runtime export | The layouts barrel read `ProForm.Group` during module initialization. ESM/RSC bundlers can observe a partially initialized `ProForm`.                                                          | Export `ProFormGroup` directly, cover LoginForm and ProFormGroup in the SSR test, and document the Next.js client boundary and named import.                                       |
| #9034 | Umi 3 build compatibility        | `@ant-design/pro-layout@7.20.1` changed from `path-to-regexp@2.4.0` to v8; the reported Umi 3 build fails while processing that dependency.                                                    | Recommend Umi 4.6.2+ and v3. For a temporary Umi 3 rollback, `pro-layout@7.20.0` is the last v2 release using path-to-regexp 2.4.0.                                                |
| #8204 | Historical broad semver range    | `@ant-design/pro-components@2.4.4` can resolve `@ant-design/pro-field@2.14.6`, whose ColorPicker import is unavailable in antd 4. `@ant-design/pro-components@2.6.42` pins `pro-field@2.14.1`. | Publish the exact compatible v2 baseline in the migration guide; current v3 supports antd 6 only.                                                                                  |
| #9628 | Expected lazy-mount timing       | Passing a `Form.useForm()` instance does not mount Modal children before the first open. Calling it before connection triggers the same antd warning as a native Modal + Form.                 | Add a copyable `forceRender` example and document `initialValues`/`request`, `onInit`, and the v3 built-in-trigger `onOpenChange` timing.                                          |

## Verification

Run the focused checks for this batch:

```text
pnpm test tests/form/ssr.test.tsx tests/form/modalForm.test.tsx
pnpm run tsc
pnpm run build
pnpm run docs:check
```

For a consuming project, verify the resolved dependency tree with:

```text
pnpm why @ant-design/pro-components
pnpm why @ant-design/pro-form
pnpm why @ant-design/pro-layout
pnpm list antd --depth 10
```

An antd 6 project should resolve the v3 monolithic package and no standalone
v2 ProComponents packages. A v2 application should keep the complete package
set from one verified lockfile.
