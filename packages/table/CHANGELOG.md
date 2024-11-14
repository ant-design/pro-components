# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.18.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.18.1...@ant-design/pro-table@3.18.2) (2024-11-14)

**Note:** Version bump only for package @ant-design/pro-table

## [3.18.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.18.0...@ant-design/pro-table@3.18.1) (2024-10-22)

### Bug Fixes

- **package:** 更新 repository URL 格式为 git+ssh 以确保一致性 ([8882d51](https://github.com/ant-design/pro-components/commit/8882d5164d8b14f8971bf9f34a339d282ac766ba))

# [3.18.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.17.2...@ant-design/pro-table@3.18.0) (2024-10-17)

### Bug Fixes

- replace `lodash-es` imports with `lodash` in CJS builds ([#8754](https://github.com/ant-design/pro-components/issues/8754)) ([3ef9283](https://github.com/ant-design/pro-components/commit/3ef9283a4cf52b8106d049af49f41dc37bb448b1))

### Features

- added exports to support ESM environments such as vitest ([#8738](https://github.com/ant-design/pro-components/issues/8738)) ([71c4be9](https://github.com/ant-design/pro-components/commit/71c4be9c9ca5942154e0473e62be608d784d53fc))

## [3.17.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.17.1...@ant-design/pro-table@3.17.2) (2024-09-12)

**Note:** Version bump only for package @ant-design/pro-table

## [3.17.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.17.0...@ant-design/pro-table@3.17.1) (2024-09-12)

**Note:** Version bump only for package @ant-design/pro-table

# [3.17.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.16.6...@ant-design/pro-table@3.17.0) (2024-09-05)

### Bug Fixes

- columnsState.defaultValue be modified with lodash merge function ([#8659](https://github.com/ant-design/pro-components/issues/8659)) ([9151e33](https://github.com/ant-design/pro-components/commit/9151e33dcbb0ca82e546bf9b930aeed4d73daa85))
- defaultCurrent 搭配 defaultData 一直为 1 的问题修复 ([#8683](https://github.com/ant-design/pro-components/issues/8683)) ([b16568e](https://github.com/ant-design/pro-components/commit/b16568ef127a2c06d724947efa35a1138983bdf7)), closes [#8677](https://github.com/ant-design/pro-components/issues/8677)
- **card:** card padding when hideToolbar ([#8635](https://github.com/ant-design/pro-components/issues/8635)) ([5e77886](https://github.com/ant-design/pro-components/commit/5e778863a69913c1e2f6c1297b53d5ae8fd790d9))

### Features

- **Form:** FormRef support forward nativeElement ([#8632](https://github.com/ant-design/pro-components/issues/8632)) ([d113207](https://github.com/ant-design/pro-components/commit/d1132070c4d7b2df3bfaebe33615faa007ea6ceb))

## [3.16.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.16.5...@ant-design/pro-table@3.16.6) (2024-08-05)

### Bug Fixes

- **table:** don't spread key to children ([#8588](https://github.com/ant-design/pro-components/issues/8588)) ([be5d0ad](https://github.com/ant-design/pro-components/commit/be5d0adf4811d5dc59b53af8100c55187e828ca1))

### Performance Improvements

- lodash => lodash-es ([#8606](https://github.com/ant-design/pro-components/issues/8606)) ([455b4f1](https://github.com/ant-design/pro-components/commit/455b4f1bb1edfd896c04d98c37da6f97fb2428cb))

## [3.16.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.16.4...@ant-design/pro-table@3.16.5) (2024-07-18)

**Note:** Version bump only for package @ant-design/pro-table

## [3.16.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.16.3...@ant-design/pro-table@3.16.4) (2024-07-16)

**Note:** Version bump only for package @ant-design/pro-table

## [3.16.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.16.2...@ant-design/pro-table@3.16.3) (2024-07-15)

### Bug Fixes

- **table:** fix canel editort no work error ([2b60fe5](https://github.com/ant-design/pro-components/commit/2b60fe50d6dd6616c685a85b4b8f0e04927b1940))

## [3.16.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.16.1...@ant-design/pro-table@3.16.2) (2024-06-21)

### Reverts

- Revert "fixed(table): wrap ProTable component with DndContext (#8414)" (#8509) ([f9b5c74](https://github.com/ant-design/pro-components/commit/f9b5c743dd425a5b75c75e6ae043e0c1a56161ca)), closes [#8414](https://github.com/ant-design/pro-components/issues/8414) [#8509](https://github.com/ant-design/pro-components/issues/8509)

## [3.16.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.16.0...@ant-design/pro-table@3.16.1) (2024-06-08)

### Bug Fixes

- 修复 pro-table 文档案例代码里 Dropdown 内元素 key 冲突问题 ([#8469](https://github.com/ant-design/pro-components/issues/8469)) ([1c8714c](https://github.com/ant-design/pro-components/commit/1c8714c021460ee48d93d7ef9ba5b8533e313850))

# [3.16.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.9...@ant-design/pro-table@3.16.0) (2024-05-20)

### Bug Fixes

- **table:** 修 columnsMap 重新赋值时总是使用默认值的问题 ([#8384](https://github.com/ant-design/pro-components/issues/8384)) ([7c57399](https://github.com/ant-design/pro-components/commit/7c573992f89087d349d93fb95c514f146e9a4ac8))

### Features

- **table:** table support RowEditorTable and CellEditorTable ([013877d](https://github.com/ant-design/pro-components/commit/013877d41ab57153b8deb8cfb8f437a9b5a9e419))

## [3.15.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.9...@ant-design/pro-table@3.15.10) (2024-04-21)

**Note:** Version bump only for package @ant-design/pro-table

## [3.15.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.8...@ant-design/pro-table@3.15.9) (2024-04-21)

**Note:** Version bump only for package @ant-design/pro-table

## [3.15.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.7...@ant-design/pro-table@3.15.8) (2024-04-20)

**Note:** Version bump only for package @ant-design/pro-table

## [3.15.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.5...@ant-design/pro-table@3.15.7) (2024-04-20)

**Note:** Version bump only for package @ant-design/pro-table

## [3.15.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.5...@ant-design/pro-table@3.15.6) (2024-04-19)

**Note:** Version bump only for package @ant-design/pro-table

## [3.15.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.4...@ant-design/pro-table@3.15.5) (2024-04-19)

**Note:** Version bump only for package @ant-design/pro-table

## [3.15.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.3...@ant-design/pro-table@3.15.4) (2024-04-17)

**Note:** Version bump only for package @ant-design/pro-table

## [3.15.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.2...@ant-design/pro-table@3.15.3) (2024-04-17)

### Bug Fixes

- **table:** Custom components.body no work error ([#8281](https://github.com/ant-design/pro-components/issues/8281)) ([1dd2379](https://github.com/ant-design/pro-components/commit/1dd2379b94b3c78a99d6e3bfa08877f7c418d579))

## [3.15.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.1...@ant-design/pro-table@3.15.2) (2024-03-27)

### Bug Fixes

- **table:** densityLarger 中文简体和繁体国际化，文案问题修改 ([#8241](https://github.com/ant-design/pro-components/issues/8241)) ([058e087](https://github.com/ant-design/pro-components/commit/058e0876fa532dad85405b21a84787ddfa4ec80d))

## [3.15.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.15.0...@ant-design/pro-table@3.15.1) (2024-03-20)

**Note:** Version bump only for package @ant-design/pro-table

# [3.15.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.14.2...@ant-design/pro-table@3.15.0) (2024-03-15)

### Bug Fixes

- **components:** compatible 5.13.0 border ([ddf0c82](https://github.com/ant-design/pro-components/commit/ddf0c82b5a9e55546c1b864e76972621b501769b))
- **components:** remove deprecated tip props ([85de8a2](https://github.com/ant-design/pro-components/commit/85de8a2bad41a21254719ff7f1df5328e42fd0fb))
- **DragSortTable:** demo 拖动排序后报错 ([#8158](https://github.com/ant-design/pro-components/issues/8158)) ([3920e86](https://github.com/ant-design/pro-components/commit/3920e8631191a0d1e66366abc7cdfd6dcb4a64cf))

### Features

- **table:** add click event for icon element ([#8167](https://github.com/ant-design/pro-components/issues/8167)) ([c89d4b1](https://github.com/ant-design/pro-components/commit/c89d4b19ce9ce3bda5151cd662c86c9d0a050fce))

## [3.14.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.14.1...@ant-design/pro-table@3.14.2) (2024-01-31)

**Note:** Version bump only for package @ant-design/pro-table

## [3.14.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.14.0...@ant-design/pro-table@3.14.1) (2024-01-18)

**Note:** Version bump only for package @ant-design/pro-table

# [3.14.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.14...@ant-design/pro-table@3.14.0) (2024-01-18)

### Features

- **table:** column SettingTitle 内容太长时显示省略&弹出 tooltip ([#8070](https://github.com/ant-design/pro-components/issues/8070)) ([644967d](https://github.com/ant-design/pro-components/commit/644967d20a153b1908034273e9abe4ee6d764922))

## [3.13.14](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.13...@ant-design/pro-table@3.13.14) (2024-01-15)

**Note:** Version bump only for package @ant-design/pro-table

## [3.13.13](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.12...@ant-design/pro-table@3.13.13) (2024-01-15)

### Bug Fixes

- **form:** 修复 dateFormatter 使用 string 类型提示错误 ([#8029](https://github.com/ant-design/pro-components/issues/8029)) ([6d764ad](https://github.com/ant-design/pro-components/commit/6d764ad498405ad59f4fda71db1b0c632d8150a1))
- **table:** Record Creator re-render when props change ([#8018](https://github.com/ant-design/pro-components/issues/8018)) ([c0187d2](https://github.com/ant-design/pro-components/commit/c0187d2160ca72413b4e645023a2849acd9fa725))
- 删除 log 代码 ([#7995](https://github.com/ant-design/pro-components/issues/7995)) ([c867cd2](https://github.com/ant-design/pro-components/commit/c867cd214aa64cbfbe38326061338849850bb6b9))
- **table:** 修复同时使用 defalutValue 和 Storage 存储的情况下，defalutValue 失效的问题 ([#7979](https://github.com/ant-design/pro-components/issues/7979)) ([76bb081](https://github.com/ant-design/pro-components/commit/76bb0811fbc6e14287a05fd863d694d356e3322c))

## [3.13.12](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.11...@ant-design/pro-table@3.13.12) (2023-12-12)

### Bug Fixes

- **layout:** slove DensityIcon setting not work ([#7942](https://github.com/ant-design/pro-components/issues/7942)) ([f51ee6a](https://github.com/ant-design/pro-components/commit/f51ee6a80f2b8b5973261a2f5899fa757a838681))
- **table:** DragSortTable --- Reorder columns by dragging and dropping columns will have issues when the table has fixed columns first ([#7936](https://github.com/ant-design/pro-components/issues/7936)) ([38a5cbc](https://github.com/ant-design/pro-components/commit/38a5cbc930ba70c78f71f60abd8e206f14984f83)), closes [#7631](https://github.com/ant-design/pro-components/issues/7631)
- **table:** remove unless code ([#7954](https://github.com/ant-design/pro-components/issues/7954)) ([c6b6ae3](https://github.com/ant-design/pro-components/commit/c6b6ae3a985ec00cf3e3e1f318425af167187ac6))

## [3.13.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.10...@ant-design/pro-table@3.13.11) (2023-11-22)

**Note:** Version bump only for package @ant-design/pro-table

## [3.13.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.9...@ant-design/pro-table@3.13.10) (2023-11-20)

### Bug Fixes

- **table:** slove editable wrapper by null initvalue ([#7900](https://github.com/ant-design/pro-components/issues/7900)) ([c9cad09](https://github.com/ant-design/pro-components/commit/c9cad091682eeb3b0901f7e7dcbf9f5583ea31dd))

## [3.13.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.8...@ant-design/pro-table@3.13.9) (2023-11-15)

**Note:** Version bump only for package @ant-design/pro-table

## [3.13.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.7...@ant-design/pro-table@3.13.8) (2023-11-15)

**Note:** Version bump only for package @ant-design/pro-table

## [3.13.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.6...@ant-design/pro-table@3.13.7) (2023-11-15)

**Note:** Version bump only for package @ant-design/pro-table

## [3.13.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.5...@ant-design/pro-table@3.13.6) (2023-11-15)

**Note:** Version bump only for package @ant-design/pro-table

## [3.13.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.4...@ant-design/pro-table@3.13.5) (2023-11-15)

**Note:** Version bump only for package @ant-design/pro-table

## [3.13.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.3...@ant-design/pro-table@3.13.4) (2023-11-14)

### Bug Fixes

- **table:** less render function ([b314a37](https://github.com/ant-design/pro-components/commit/b314a37b2c3de7afeba877d07963403b4ebc8a3d))

## [3.13.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.2...@ant-design/pro-table@3.13.3) (2023-11-01)

### Bug Fixes

- **table:** 修复不能单独展示 filter 的问题 ([b77b5d4](https://github.com/ant-design/pro-components/commit/b77b5d4a91aaf6f7e229c80350ea0d6ee656ff30))
- update table.md ([#7818](https://github.com/ant-design/pro-components/issues/7818)) ([fb385c3](https://github.com/ant-design/pro-components/commit/fb385c30d60a35e165ac765ab3dea7534c24aa90))

## [3.13.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.1...@ant-design/pro-table@3.13.2) (2023-10-26)

**Note:** Version bump only for package @ant-design/pro-table

## [3.13.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.13.0...@ant-design/pro-table@3.13.1) (2023-10-26)

**Note:** Version bump only for package @ant-design/pro-table

# [3.13.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.15...@ant-design/pro-table@3.13.0) (2023-10-24)

### Features

- **table:** expose `index` in `onDragSortEnd` ([#7803](https://github.com/ant-design/pro-components/issues/7803)) ([8a0786a](https://github.com/ant-design/pro-components/commit/8a0786a2cfe5c738b4928a0c11db247c1438f945))

## [3.12.15](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.14...@ant-design/pro-table@3.12.15) (2023-10-19)

### Bug Fixes

- **table:** 修复 EditableProTable 实时编辑表格存在 name 属性且有分页的时候，渲染的数据总是为第一页 ([#7794](https://github.com/ant-design/pro-components/issues/7794)) ([eda3b82](https://github.com/ant-design/pro-components/commit/eda3b8263e4889a930a9e5655f75dc9a6fe06a00))

## [3.12.14](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.13...@ant-design/pro-table@3.12.14) (2023-10-13)

**Note:** Version bump only for package @ant-design/pro-table

## [3.12.13](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.12...@ant-design/pro-table@3.12.13) (2023-10-11)

**Note:** Version bump only for package @ant-design/pro-table

## [3.12.12](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.11...@ant-design/pro-table@3.12.12) (2023-09-26)

**Note:** Version bump only for package @ant-design/pro-table

## [3.12.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.10...@ant-design/pro-table@3.12.11) (2023-09-26)

**Note:** Version bump only for package @ant-design/pro-table

## [3.12.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.9...@ant-design/pro-table@3.12.10) (2023-09-26)

**Note:** Version bump only for package @ant-design/pro-table

## [3.12.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.8...@ant-design/pro-table@3.12.9) (2023-09-26)

### Bug Fixes

- **table:** unuse Tab.TabPanel ([#7731](https://github.com/ant-design/pro-components/issues/7731)) ([344729c](https://github.com/ant-design/pro-components/commit/344729c1c2c2d328738bc0a7af899236d5668f41))

## [3.12.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.7...@ant-design/pro-table@3.12.8) (2023-09-25)

### Bug Fixes

- **layout:** 统一 PageContainer 计算到 styles.ts 中 ([#7699](https://github.com/ant-design/pro-components/issues/7699)) ([ed5c61c](https://github.com/ant-design/pro-components/commit/ed5c61ced2bda9e0f6bab22f3c942792eec682b6))
- **table:** 修复 editableFormRef hooks 未正确传递 deps 依赖导致 value 取值不是最新 ([#7707](https://github.com/ant-design/pro-components/issues/7707)) ([f93ebed](https://github.com/ant-design/pro-components/commit/f93ebed9ad8aede82bf854b7cc5afbc7a4373f53))

## [3.12.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.6...@ant-design/pro-table@3.12.7) (2023-09-19)

### Bug Fixes

- **layout:** unuse Tab.TabPanel ([6dd59a2](https://github.com/ant-design/pro-components/commit/6dd59a22b46696aa3d89680b7c2635b75be60aaf))
- **table:** 修复 ColumnSetting Tree 组件 title 过长导致强制换行的问题 ([08ded31](https://github.com/ant-design/pro-components/commit/08ded31326c3139865d5c291745ecb2c7659f67b))

## [3.12.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.5...@ant-design/pro-table@3.12.6) (2023-09-18)

**Note:** Version bump only for package @ant-design/pro-table

## [3.12.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.4...@ant-design/pro-table@3.12.5) (2023-09-18)

### Bug Fixes

- **table:** EditableProTable reset FormItem grid ([c53ecce](https://github.com/ant-design/pro-components/commit/c53ecce5d82553f952b19db22903970f13a586a5))

## [3.12.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.3...@ant-design/pro-table@3.12.4) (2023-09-14)

**Note:** Version bump only for package @ant-design/pro-table

## [3.12.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.2...@ant-design/pro-table@3.12.3) (2023-09-07)

**Note:** Version bump only for package @ant-design/pro-table

## [3.12.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.1...@ant-design/pro-table@3.12.2) (2023-09-06)

### Bug Fixes

- **table:** sortConfig 值为 undefined 时与默认值 {} 不一致，会导致翻页时再次触发 request 请求 ([#7616](https://github.com/ant-design/pro-components/issues/7616)) ([c51be62](https://github.com/ant-design/pro-components/commit/c51be62a7045abdee73467985c9d9a61835751ee))
- remove stringify ([25d2c42](https://github.com/ant-design/pro-components/commit/25d2c42a0bda673a0b40b5ae56bd0a852998ecd1))

## [3.12.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.12.0...@ant-design/pro-table@3.12.1) (2023-08-30)

**Note:** Version bump only for package @ant-design/pro-table

# [3.12.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.11.1...@ant-design/pro-table@3.12.0) (2023-08-29)

### Bug Fixes

- **form:** 解决因 stringify 导致死循环的问题 ([#7599](https://github.com/ant-design/pro-components/issues/7599)) ([d1ab1d1](https://github.com/ant-design/pro-components/commit/d1ab1d1a256cfe41beba7f69abf3588de7dbd446))
- ProColumnGroupType => ProColumns ([#7601](https://github.com/ant-design/pro-components/issues/7601)) ([5aba49e](https://github.com/ant-design/pro-components/commit/5aba49e3bc1d87c844e4f2def5878ae3c8f9e916))

### Features

- **table:** table columns setting add fixable config ([#7586](https://github.com/ant-design/pro-components/issues/7586)) ([b869c7a](https://github.com/ant-design/pro-components/commit/b869c7ac6a3c29e08f6f2621dacaa411f1d901b6))

## [3.11.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.11.0...@ant-design/pro-table@3.11.1) (2023-08-28)

### Bug Fixes

- **form:** fix FormItem name is null，but has data error ([#7583](https://github.com/ant-design/pro-components/issues/7583)) ([f8514e3](https://github.com/ant-design/pro-components/commit/f8514e33e57dd448398a34a2ecd76baf6e0a36d9))

# [3.11.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.10.6...@ant-design/pro-table@3.11.0) (2023-08-17)

### Features

- **table:** custom `toolbar` icon ([#7521](https://github.com/ant-design/pro-components/issues/7521)) ([f3669e0](https://github.com/ant-design/pro-components/commit/f3669e063fda949b130ae432c3c2556ca196349c))

## [3.10.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.10.5...@ant-design/pro-table@3.10.6) (2023-08-10)

### Bug Fixes

- **table:** DragSortTable 每次 render 执行时 Table DOM 会销毁重建新的 DOM ([#7490](https://github.com/ant-design/pro-components/issues/7490)) ([481d7a2](https://github.com/ant-design/pro-components/commit/481d7a2aa1494af787c7cc81a6f074a1bd5068df))

## [3.10.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.10.4...@ant-design/pro-table@3.10.5) (2023-08-04)

### Bug Fixes

- **table:** restrict movement to only the vertical axis. ([5a8f9fb](https://github.com/ant-design/pro-components/commit/5a8f9fb9127cc58972b279fc3577b240b5b8b445))

## [3.10.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.10.3...@ant-design/pro-table@3.10.4) (2023-07-31)

**Note:** Version bump only for package @ant-design/pro-table

## [3.10.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.10.2...@ant-design/pro-table@3.10.3) (2023-07-31)

**Note:** Version bump only for package @ant-design/pro-table

## [3.10.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.10.1...@ant-design/pro-table@3.10.2) (2023-07-24)

**Note:** Version bump only for package @ant-design/pro-table

## [3.10.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.10.0...@ant-design/pro-table@3.10.1) (2023-07-19)

**Note:** Version bump only for package @ant-design/pro-table

# [3.10.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.9.1...@ant-design/pro-table@3.10.0) (2023-07-19)

### Bug Fixes

- **table:** dataSource support string list ([7b81b4c](https://github.com/ant-design/pro-components/commit/7b81b4c8ae247ccc4198ef597a9ae58d83ab697a))
- **table:** fix renderFormItem render twice render time ([c3b8ffd](https://github.com/ant-design/pro-components/commit/c3b8ffd62f2100789e749907b5aef84c6966c528))
- **table:** Fix the columnsSetting styling issue in controlling column state when the table header is too long ([5b746b3](https://github.com/ant-design/pro-components/commit/5b746b3cfef9a2da021d963d8c723e5a9b9b829a))
- **table:** Fix the issue of actionref not being synchronized ([2160fb8](https://github.com/ant-design/pro-components/commit/2160fb846bcfe41809a37dfe6e1cc3fce1d211e7))
- **table:** Fix the issue where align="center" is not working ([db6fc65](https://github.com/ant-design/pro-components/commit/db6fc655b9994826238bb6b63588467ff8c6a6f8))
- **table:** params change awaly reload fetch ([b147a16](https://github.com/ant-design/pro-components/commit/b147a16cd5d15bf6aad383683d9ffecdf1861e1d))
- **table:** Protable support EXPAND_COLUMN and SELECTION_COLUMN ([3454347](https://github.com/ant-design/pro-components/commit/34543475aaf00f7a73b2bcd148021fc7eb13bba9))
- **table:** when checkable=false, no render all select boxs ([5421e41](https://github.com/ant-design/pro-components/commit/5421e41671afc084d6ba6cdb992e5320e72c2f8d))

### Features

- **table:** ProTable support optionsRender ([8b56b6a](https://github.com/ant-design/pro-components/commit/8b56b6ae20aa21d80ad8bb4c17239a5bf9192f0b))

## [3.9.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.9.0...@ant-design/pro-table@3.9.1) (2023-07-14)

### Bug Fixes

- **table:** export edito pro table props ([#7330](https://github.com/ant-design/pro-components/issues/7330)) ([011de57](https://github.com/ant-design/pro-components/commit/011de5789393a6c2dd68d4f970053139f2d5ea40))

# [3.9.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.8.3...@ant-design/pro-table@3.9.0) (2023-07-04)

### Features

- **table:** add support of custom render serch form ([#7307](https://github.com/ant-design/pro-components/issues/7307)) ([7f83ae0](https://github.com/ant-design/pro-components/commit/7f83ae084d0ed48aca9c978b13053dda801c6898))

## [3.8.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.8.2...@ant-design/pro-table@3.8.3) (2023-06-30)

### Bug Fixes

- **form:** fix DigitRange un support theme error ([70ad3bc](https://github.com/ant-design/pro-components/commit/70ad3bc7dc704a8636e696ae088107affeb78423))
- **table:** fix filter and sort is null no trigger change error ([8c444d7](https://github.com/ant-design/pro-components/commit/8c444d79c7c6178047dfa867f9e325f087f9b89f))

## [3.8.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.8.1...@ant-design/pro-table@3.8.2) (2023-06-19)

**Note:** Version bump only for package @ant-design/pro-table

## [3.8.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.8.0...@ant-design/pro-table@3.8.1) (2023-06-19)

**Note:** Version bump only for package @ant-design/pro-table

# [3.8.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.11...@ant-design/pro-table@3.8.0) (2023-06-19)

### Bug Fixes

- **form:** onInit use ProFormInstance ([ad537a5](https://github.com/ant-design/pro-components/commit/ad537a563c1f09dafde29bb2ecff0aa0df24122f))
- **table:** add Form.Item shouldUpdate function ([db3224b](https://github.com/ant-design/pro-components/commit/db3224b041008a1397e91e4b2a5da21991f2de4f))

### Features

- **field:** LightFilter 中使用 ProFormSelect 的两个 bug 修复 ([#7225](https://github.com/ant-design/pro-components/issues/7225)) ([#7233](https://github.com/ant-design/pro-components/issues/7233)) ([b3050e4](https://github.com/ant-design/pro-components/commit/b3050e4e82db6809ce93f6913e3903a9dd05da15))

## [3.7.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.10...@ant-design/pro-table@3.7.11) (2023-06-16)

### Bug Fixes

- **layout:** fix ErrorBoundary types error ([5bb5be1](https://github.com/ant-design/pro-components/commit/5bb5be1b6c289deb4d9a79acd22a5e5c97666ae9))
- **table:** fix editableFormRef no work error ([0cd2e4d](https://github.com/ant-design/pro-components/commit/0cd2e4d1fe2a743c9a9a7d31e894962365f9fec6))

## [3.7.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.9...@ant-design/pro-table@3.7.10) (2023-06-15)

**Note:** Version bump only for package @ant-design/pro-table

## [3.7.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.8...@ant-design/pro-table@3.7.9) (2023-06-14)

### Bug Fixes

- **form:** fix shouldUpdate no work error ([ff8bbef](https://github.com/ant-design/pro-components/commit/ff8bbefc6b67d83925e83f2559f0016014748323))

## [3.7.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.7...@ant-design/pro-table@3.7.8) (2023-06-14)

### Bug Fixes

- **table:** fix key is -1 when rowIndex is bigger to value ([c362ff7](https://github.com/ant-design/pro-components/commit/c362ff7a7053d91c32ea85081559db032a7d9fad))

## [3.7.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.6...@ant-design/pro-table@3.7.7) (2023-06-12)

### Bug Fixes

- **components:** fix useToken no supoort antd\@4 的问题 ([58b96e9](https://github.com/ant-design/pro-components/commit/58b96e91632c0c84c429d5384c13ee6f3146e017))

## [3.7.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.5...@ant-design/pro-table@3.7.6) (2023-06-12)

### Bug Fixes

- **compoents:** gap use token margin ([#7204](https://github.com/ant-design/pro-components/issues/7204)) ([bd62243](https://github.com/ant-design/pro-components/commit/bd62243f4bc6a3ea6e97ad5e0db977c84394426f))
- **components:** remove hashid empty ([b46bb80](https://github.com/ant-design/pro-components/commit/b46bb808db287979fe7d2d5afe115185860422c9))

## [3.7.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.4...@ant-design/pro-table@3.7.5) (2023-06-02)

**Note:** Version bump only for package @ant-design/pro-table

## [3.7.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.3...@ant-design/pro-table@3.7.4) (2023-05-31)

### Bug Fixes

- **table:** fix dragSortHandlerRender 无法拖动的问题 ([5bf3331](https://github.com/ant-design/pro-components/commit/5bf3331304ff430e4cc519a2de05bc7cd69f6bcd))

## [3.7.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.2...@ant-design/pro-table@3.7.3) (2023-05-30)

**Note:** Version bump only for package @ant-design/pro-table

## [3.7.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.1...@ant-design/pro-table@3.7.2) (2023-05-30)

**Note:** Version bump only for package @ant-design/pro-table

## [3.7.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.7.0...@ant-design/pro-table@3.7.1) (2023-05-29)

**Note:** Version bump only for package @ant-design/pro-table

# [3.7.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.11...@ant-design/pro-table@3.7.0) (2023-05-29)

### Bug Fixes

- **form:** use oninit reset formRef ([1deedf2](https://github.com/ant-design/pro-components/commit/1deedf26e0dfb377f883c428f597094353c8c3e3))
- **form:** 解决 ProFormList 多重嵌套 ProFormList 下的表单组件未调用 transform 方法问题 ([#7138](https://github.com/ant-design/pro-components/issues/7138)) ([2e83b18](https://github.com/ant-design/pro-components/commit/2e83b184fae0f68013c0c1db39837981f70d1ec3))
- **list:** `onChange ` prop don't work ([#7129](https://github.com/ant-design/pro-components/issues/7129)) ([96b9ab9](https://github.com/ant-design/pro-components/commit/96b9ab931c3e3d93a5971032b29a9d791263e247))
- **table:** Edit to make defaultValue become higher priority to reset column setting ([#7113](https://github.com/ant-design/pro-components/issues/7113)) ([2515b16](https://github.com/ant-design/pro-components/commit/2515b1669a76664ea44651b18a491bd0392a4095))

### Features

- **table:** use [@dnd-kit](https://github.com/dnd-kit) ([#7131](https://github.com/ant-design/pro-components/issues/7131)) ([26b6aa6](https://github.com/ant-design/pro-components/commit/26b6aa611a0c5d88232cda88ca7cec893ee2160b))

## [3.6.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.10...@ant-design/pro-table@3.6.11) (2023-05-18)

**Note:** Version bump only for package @ant-design/pro-table

## [3.6.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.9...@ant-design/pro-table@3.6.10) (2023-05-15)

**Note:** Version bump only for package @ant-design/pro-table

## [3.6.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.8...@ant-design/pro-table@3.6.9) (2023-05-08)

### Bug Fixes

- **table:** table should support dependencies ([#7019](https://github.com/ant-design/pro-components/issues/7019)) ([7addd50](https://github.com/ant-design/pro-components/commit/7addd5031c68720b809bbdd292e828f7b04bfd04))

## [3.6.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.7...@ant-design/pro-table@3.6.8) (2023-05-04)

**Note:** Version bump only for package @ant-design/pro-table

## [3.6.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.6...@ant-design/pro-table@3.6.7) (2023-05-04)

### Bug Fixes

- **table:** 修复 useLocaleFilter 方法未判断存在 children 的情况 ([#6987](https://github.com/ant-design/pro-components/issues/6987)) ([5990003](https://github.com/ant-design/pro-components/commit/59900031e51592c989c79dd54d40007fe92210ee))

## [3.6.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.5...@ant-design/pro-table@3.6.6) (2023-04-26)

**Note:** Version bump only for package @ant-design/pro-table

## [3.6.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.4...@ant-design/pro-table@3.6.5) (2023-04-26)

**Note:** Version bump only for package @ant-design/pro-table

## [3.6.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.3...@ant-design/pro-table@3.6.4) (2023-04-25)

**Note:** Version bump only for package @ant-design/pro-table

## [3.6.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.2...@ant-design/pro-table@3.6.3) (2023-04-25)

**Note:** Version bump only for package @ant-design/pro-table

## [3.6.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.1...@ant-design/pro-table@3.6.2) (2023-04-25)

### Bug Fixes

- **table:** new fetch function ([#6923](https://github.com/ant-design/pro-components/issues/6923)) ([275e9c1](https://github.com/ant-design/pro-components/commit/275e9c108ec939f13dbea002b5d287a074fce42e))
- **table:** 修复当 loading 为对象时，pro-table 无法接管 loading 状态，必须手动控制的问题 ([#6962](https://github.com/ant-design/pro-components/issues/6962)) ([59bdd1a](https://github.com/ant-design/pro-components/commit/59bdd1ab39b581e8b2ebeedf14943ce35bcd9f9c))

## [3.6.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.6.0...@ant-design/pro-table@3.6.1) (2023-03-27)

**Note:** Version bump only for package @ant-design/pro-table

# [3.6.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.5.2...@ant-design/pro-table@3.6.0) (2023-03-27)

### Bug Fixes

- **from:** solve queryfilter padding problem ([#6797](https://github.com/ant-design/pro-components/issues/6797)) ([fa92aae](https://github.com/ant-design/pro-components/commit/fa92aae5dc7b43e230b540a5215112c967dfb3cd))

### Features

- **table:** ProTable 的 toolbar.tabs 和 toolbar.menu 配置下增加 defaultActiveKey 选项 ([#6818](https://github.com/ant-design/pro-components/issues/6818)) ([f87c0da](https://github.com/ant-design/pro-components/commit/f87c0dafcf8284f1b23674372def4adced6e6d62))

## [3.5.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.5.1...@ant-design/pro-table@3.5.2) (2023-03-14)

### Bug Fixes

- **compoments:** remove .ant-pro dom ([403319f](https://github.com/ant-design/pro-components/commit/403319f2b80489d04101f51d65c3cb4dcbe4595d))
- **form:** fix AdvancedSearch demo no work error ([226fbac](https://github.com/ant-design/pro-components/commit/226fbac4e214a912a84973f69ccdd1183ffd34f0))

## [3.5.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.5.0...@ant-design/pro-table@3.5.1) (2023-03-13)

**Note:** Version bump only for package @ant-design/pro-table

# [3.5.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.4.0...@ant-design/pro-table@3.5.0) (2023-03-09)

### Bug Fixes

- **layout:** fix menu item icon style error ([#6745](https://github.com/ant-design/pro-components/issues/6745)) ([87f9656](https://github.com/ant-design/pro-components/commit/87f965682e81d9ce166d140dd418a37a6020abcf))

# [3.4.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.3.2...@ant-design/pro-table@3.4.0) (2023-03-08)

### Bug Fixes

- **table:** 修复 maxLength 选项配置为 0 时逻辑不符合预期的问题 ([#6719](https://github.com/ant-design/pro-components/issues/6719)) ([6983804](https://github.com/ant-design/pro-components/commit/69838042971b5869b90b01e50cfb2ba85b258050))
- slove toolbar wrap problem ([#6694](https://github.com/ant-design/pro-components/issues/6694)) ([1ffd5bf](https://github.com/ant-design/pro-components/commit/1ffd5bfd11d8e8c2c0f26eeaf0ab88b0539a0a2a))

### Features

- **components:** support antd\@5.4.0 ([#6730](https://github.com/ant-design/pro-components/issues/6730)) ([1ac506f](https://github.com/ant-design/pro-components/commit/1ac506f8e46a30089437cdfe58a5f96447c39f7a))
- **layout:** add ProHelp components ([#6654](https://github.com/ant-design/pro-components/issues/6654)) ([b1a175c](https://github.com/ant-design/pro-components/commit/b1a175c9ecbdf24a26f1cf34e10a92da05ab2b9c)), closes [#6671](https://github.com/ant-design/pro-components/issues/6671) [#6676](https://github.com/ant-design/pro-components/issues/6676)

### Reverts

- Revert "chore: remove useless code (#6690)" (#6701) ([4c6d070](https://github.com/ant-design/pro-components/commit/4c6d0702a4312edac0347d24e5f855435286a0cb)), closes [#6690](https://github.com/ant-design/pro-components/issues/6690) [#6701](https://github.com/ant-design/pro-components/issues/6701)

## [3.3.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.3.1...@ant-design/pro-table@3.3.2) (2023-02-28)

### Bug Fixes

- **table:** ProTable 组件 toolbar menu 属性为 tab 时抖动问题 ([#6584](https://github.com/ant-design/pro-components/issues/6584)) ([#6641](https://github.com/ant-design/pro-components/issues/6641)) ([14301f0](https://github.com/ant-design/pro-components/commit/14301f0200c69fbc1c656105c0e35e5824e0c6c8))
- **table:** selectedRows 拿不到最新的值 ([#6671](https://github.com/ant-design/pro-components/issues/6671)) ([38595ba](https://github.com/ant-design/pro-components/commit/38595ba3a2c34fac8e02ad81535f2b4d026f0184))
- remove debugger ([#6634](https://github.com/ant-design/pro-components/issues/6634)) ([328af05](https://github.com/ant-design/pro-components/commit/328af0593cdef0b5a8c5099d88bba43f829cf4ef))

## [3.3.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.3.0...@ant-design/pro-table@3.3.1) (2023-02-17)

### Bug Fixes

- **components:** src alway use es path ([4a13142](https://github.com/ant-design/pro-components/commit/4a1314225c08a60c5cef9d51f061cdf15a69ca13))

# [3.3.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.14...@ant-design/pro-table@3.3.0) (2023-02-17)

### Bug Fixes

- **components:** fix valuetype no work error ([f6215e9](https://github.com/ant-design/pro-components/commit/f6215e98eaeb46fa979c1ca4ac40ceaa0828f9f3))
- **components:** Thai translation in ProTable ([#6600](https://github.com/ant-design/pro-components/issues/6600)) ([d1fefbd](https://github.com/ant-design/pro-components/commit/d1fefbd88caad944f4837631e89f9c9cf5f7ea22))
- **table:** fix pagination padding style error ([a5e7439](https://github.com/ant-design/pro-components/commit/a5e7439e49286bf832dc20ff3b8af32495e418e8))
- **table:** if toolBarRender,search and headerTitle is null, norender table card dom ([fc59a19](https://github.com/ant-design/pro-components/commit/fc59a1996b2a7670b7cc0f6c731bf04949dfe75e))

### Features

- **components:** remove unstate-next for protable ([f284e66](https://github.com/ant-design/pro-components/commit/f284e6620c0afd818ff8d6f41c5cd83d5e28c7a8))

## [3.2.14](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.13...@ant-design/pro-table@3.2.14) (2023-02-10)

**Note:** Version bump only for package @ant-design/pro-table

## [3.2.13](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.12...@ant-design/pro-table@3.2.13) (2023-02-08)

### Bug Fixes

- **components:** remove useLayoutEffect to useEffect ([19ccf1c](https://github.com/ant-design/pro-components/commit/19ccf1c7ce02d884abd926ecc68e4ac900387326))
- **table:** fix keyframes style no work error ([122484e](https://github.com/ant-design/pro-components/commit/122484e6807269d06cba20ac9240034f628023a0))
- **table:** 列设置里面拖动列改变顺序会导致重新发布按钮出现多次 ([#6565](https://github.com/ant-design/pro-components/issues/6565)) ([69f7cd3](https://github.com/ant-design/pro-components/commit/69f7cd3db7be41bb41a6866dfbbb5506301828bc))
- **table:** 删除 EditableTable 的 console.log ([#6526](https://github.com/ant-design/pro-components/issues/6526)) ([a681407](https://github.com/ant-design/pro-components/commit/a68140777a2a13f24073b1e7f8941673b3963035))
- implement thai translation ([#6535](https://github.com/ant-design/pro-components/issues/6535)) ([5375dd3](https://github.com/ant-design/pro-components/commit/5375dd30081e2ce86769c82e8e074fe90a45940e))

## [3.2.12](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.11...@ant-design/pro-table@3.2.12) (2023-01-10)

### Bug Fixes

- **table:** fix cancelEditable will reset value error ([40fba50](https://github.com/ant-design/pro-components/commit/40fba50d987cfcbf1dd37d0593c88123b04dfbb7))
- **Table:** 列配置子项 disable 时，“固定” 按钮点击无效 ([#6475](https://github.com/ant-design/pro-components/issues/6475)) ([fd6aaed](https://github.com/ant-design/pro-components/commit/fd6aaed341337cd9804235b3a4accab16f4d16a3))
- **Table:** 列配置子项 disable 时，无法拖动调整顺序 ([#6476](https://github.com/ant-design/pro-components/issues/6476)) ([6c4744e](https://github.com/ant-design/pro-components/commit/6c4744ed0249bc5681bf63f3bde42c54b8eb6894))
- **Table:** 列配置点击 “列展示” 全选操作时，顺序排列和 disable 状态异常 ([#6477](https://github.com/ant-design/pro-components/issues/6477)) ([458db48](https://github.com/ant-design/pro-components/commit/458db48df13e742859ba608387740b2acb5890ff))

## [3.2.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.10...@ant-design/pro-table@3.2.11) (2023-01-06)

**Note:** Version bump only for package @ant-design/pro-table

## [3.2.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.9...@ant-design/pro-table@3.2.10) (2023-01-04)

### Bug Fixes

- **table:** fix columnsState.defaultValue no work error ([2b9a283](https://github.com/ant-design/pro-components/commit/2b9a283644d2dcf136f3a5d88034047ec2a752ea))

## [3.2.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.8...@ant-design/pro-table@3.2.9) (2022-12-29)

**Note:** Version bump only for package @ant-design/pro-table

## [3.2.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.7...@ant-design/pro-table@3.2.8) (2022-12-29)

### Bug Fixes

- **card:** slove nested table background color was cover by pro-card ([#6410](https://github.com/ant-design/pro-components/issues/6410)) ([291c1af](https://github.com/ant-design/pro-components/commit/291c1afc559afed5e1723e5d86d9dd29f3cba6df))
- **form:** treeSelect do not default reset to empty string ([387d2d7](https://github.com/ant-design/pro-components/commit/387d2d7108a9e555158e4afc7e7096ff729eeecf))
- **list:** fix card list style error ([#6436](https://github.com/ant-design/pro-components/issues/6436)) ([81bcf52](https://github.com/ant-design/pro-components/commit/81bcf522ea68a2deeebe43fa13734adc43b01141))
- **table:** no render onSearch will SearchProps has onSearch ([a1383e2](https://github.com/ant-design/pro-components/commit/a1383e28dc6ea280325493f8d1177f65aac7d140))
- **table:** use flex replace Space ([#6426](https://github.com/ant-design/pro-components/issues/6426)) ([53699f8](https://github.com/ant-design/pro-components/commit/53699f8a13e152240d46c9a08b5722846c570ac2))

## [3.2.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.6...@ant-design/pro-table@3.2.7) (2022-12-13)

**Note:** Version bump only for package @ant-design/pro-table

## [3.2.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.5...@ant-design/pro-table@3.2.6) (2022-12-09)

**Note:** Version bump only for package @ant-design/pro-table

## [3.2.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.4...@ant-design/pro-table@3.2.5) (2022-12-08)

**Note:** Version bump only for package @ant-design/pro-table

## [3.2.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.3...@ant-design/pro-table@3.2.4) (2022-12-08)

### Bug Fixes

- **layout:** support configprovide darkAlgorithm ([dabf05e](https://github.com/ant-design/pro-components/commit/dabf05edc5f0ef3edd58f69ecdab43981f02e044))
- **table:** fix table extra classname break ([#6334](https://github.com/ant-design/pro-components/issues/6334)) ([ec03182](https://github.com/ant-design/pro-components/commit/ec03182cfe5ca5f58874210cfe0779e123802676))

## [3.2.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.2...@ant-design/pro-table@3.2.3) (2022-12-06)

**Note:** Version bump only for package @ant-design/pro-table

## [3.2.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.1...@ant-design/pro-table@3.2.2) (2022-12-05)

### Bug Fixes

- **table:** 修复 table 使用后端分页时（频繁变化 dataSource 场景）多选功能 selectedRow 缓存丢失 ([#6314](https://github.com/ant-design/pro-components/issues/6314)) ([a7bc3ed](https://github.com/ant-design/pro-components/commit/a7bc3ed67632df3caf0c20e22e99e3a65894297c))

## [3.2.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.2.0...@ant-design/pro-table@3.2.1) (2022-12-01)

### Bug Fixes

- **table:** fix table style error ([3fbfddd](https://github.com/ant-design/pro-components/commit/3fbfddd4dc04090610e90dcbe2bd35cffe3e0644))

# [3.2.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.9...@ant-design/pro-table@3.2.0) (2022-11-30)

### Bug Fixes

- **table:** Sortable 组件提取到外部防止不必要的页面重建 ([#6246](https://github.com/ant-design/pro-components/issues/6246)) ([9247c4a](https://github.com/ant-design/pro-components/commit/9247c4ac76628a84be3d103498b4c20792aad8eb))

### Features

- **layout:** fix dark style no work error ([3e06527](https://github.com/ant-design/pro-components/commit/3e0652738e6993973aba34af118ffd8a9af5815c))

## [3.1.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.8...@ant-design/pro-table@3.1.9) (2022-11-22)

### Bug Fixes

- **form:** 优化 Portable 中未指定 placeholder 字段时的默认显示 ([#6180](https://github.com/ant-design/pro-components/issues/6180)) ([e3327b3](https://github.com/ant-design/pro-components/commit/e3327b3d5b49ef98cb6a71d7c34b163e699a93df))

## [3.1.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.7...@ant-design/pro-table@3.1.8) (2022-11-17)

### Bug Fixes

- **table:** fix nested table style ([#6228](https://github.com/ant-design/pro-components/issues/6228)) ([6cc447d](https://github.com/ant-design/pro-components/commit/6cc447d9eff28244f0aec832166fecd989a8f481))

## [3.1.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.6...@ant-design/pro-table@3.1.7) (2022-11-15)

### Bug Fixes

- **Descriptions:** fix ellipsis type error ([d051be5](https://github.com/ant-design/pro-components/commit/d051be53c40b49cffe7531bd622003dfeda60b10))
- **table:** change css cache error ([a5bc4cb](https://github.com/ant-design/pro-components/commit/a5bc4cb4172fa9468ef70a1672033c34a09de3ba))

## [3.1.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.5...@ant-design/pro-table@3.1.6) (2022-11-14)

**Note:** Version bump only for package @ant-design/pro-table

## [3.1.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.4...@ant-design/pro-table@3.1.5) (2022-11-14)

### Bug Fixes

- fix typescript error ([3f0a26b](https://github.com/ant-design/pro-components/commit/3f0a26b61db768c4caf0f8789fd75e1a9a956a3c))
- **table:** column not working correctly after reset ([#6159](https://github.com/ant-design/pro-components/issues/6159)) ([6ec0307](https://github.com/ant-design/pro-components/commit/6ec0307041a7a439075af56c3a9a80809afb956f))
- **table:** 修复 DragSortTable 的 dataSource 值变更后未生效 ([#6207](https://github.com/ant-design/pro-components/issues/6207)) ([f53d98b](https://github.com/ant-design/pro-components/commit/f53d98bb8c602b263560e8fb648221cff55e6a7f))
- **table:** 修复拖拽排序表格使用数据源时数据源改变后未更新数据问题 ([#6211](https://github.com/ant-design/pro-components/issues/6211)) ([af12810](https://github.com/ant-design/pro-components/commit/af128104879179b938af3e5357b0c3e9e0a6bd98))

## [3.1.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.3...@ant-design/pro-table@3.1.4) (2022-11-08)

### Bug Fixes

- **table:** update table alert style ([1302a90](https://github.com/ant-design/pro-components/commit/1302a9079437c529136c83beb695eb90d4ba929f))

## [3.1.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.2...@ant-design/pro-table@3.1.3) (2022-11-07)

**Note:** Version bump only for package @ant-design/pro-table

## [3.1.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.1...@ant-design/pro-table@3.1.2) (2022-11-03)

**Note:** Version bump only for package @ant-design/pro-table

## [3.1.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.1.0...@ant-design/pro-table@3.1.1) (2022-10-28)

**Note:** Version bump only for package @ant-design/pro-table

# [3.1.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.22...@ant-design/pro-table@3.1.0) (2022-10-27)

### Bug Fixes

- **layout:** better footer animation ([ca73417](https://github.com/ant-design/pro-components/commit/ca73417d52c60e4e6bc8de5edad2226113e5a85e))
- **layout:** fix prefix classname no work error ([67ba351](https://github.com/ant-design/pro-components/commit/67ba351310ef15e8d7599eff58bf01007e6c42c9))
- **layout:** 修复 CSS-in-js 中的 animation 警告 ([#6122](https://github.com/ant-design/pro-components/issues/6122)) ([eb25214](https://github.com/ant-design/pro-components/commit/eb25214465c9a6e705e91b084d1003f4401c88ff))
- **table:** support request function to instead datasource in DragSortTable ([#6133](https://github.com/ant-design/pro-components/issues/6133)) ([200835f](https://github.com/ant-design/pro-components/commit/200835ff5554258adc2f0dd1413d3601e7a645ad))

### Features

- update snapshots ([#6129](https://github.com/ant-design/pro-components/issues/6129)) ([d4eb4cd](https://github.com/ant-design/pro-components/commit/d4eb4cd82f7ad77473e6526bee57401ec4a677ba))

### Reverts

- Revert "feat: update snapshots (#6129)" (#6132) ([8685931](https://github.com/ant-design/pro-components/commit/86859317d8adc3b534f451283509902692696b69)), closes [#6129](https://github.com/ant-design/pro-components/issues/6129) [#6132](https://github.com/ant-design/pro-components/issues/6132)

## [3.0.22](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.21...@ant-design/pro-table@3.0.22) (2022-10-25)

**Note:** Version bump only for package @ant-design/pro-table

## [3.0.21](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.20...@ant-design/pro-table@3.0.21) (2022-10-24)

### Bug Fixes

- **table:** auto open hashid ([#6114](https://github.com/ant-design/pro-components/issues/6114)) ([3f72792](https://github.com/ant-design/pro-components/commit/3f72792762ae1c9d51b34f608352e776b645b3b0))
- **table:** column drag order error when move upward ([#6113](https://github.com/ant-design/pro-components/issues/6113)) ([cd6bfbc](https://github.com/ant-design/pro-components/commit/cd6bfbcb0a8cbf12198205d7a94fe769044ceb87))

## [3.0.20](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.19...@ant-design/pro-table@3.0.20) (2022-10-21)

**Note:** Version bump only for package @ant-design/pro-table

## [3.0.19](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.18...@ant-design/pro-table@3.0.19) (2022-10-21)

### Bug Fixes

- **table:** remove hasid props ([ee4be36](https://github.com/ant-design/pro-components/commit/ee4be365f01222e4ae12f9e1d7a355eea7e7d260))

## [3.0.18](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.17...@ant-design/pro-table@3.0.18) (2022-10-21)

### Bug Fixes

- **layout:** fix listtool bar style error ([820a5b7](https://github.com/ant-design/pro-components/commit/820a5b73d4be5b8e6da31049261c48cd3ff9e54f))
- **table:** fix table select rows style error ([dff31f3](https://github.com/ant-design/pro-components/commit/dff31f3ece935db26e66878bf7786f7d620ec0b7))
- **table:** use ellipsis type exported from antd/rc-table ([#6105](https://github.com/ant-design/pro-components/issues/6105)) ([f21727f](https://github.com/ant-design/pro-components/commit/f21727fa48202d5bdcb528d2ac980a885e04ab04))
- **table:** 修复 inline 类型样式丢失问题 ([#6092](https://github.com/ant-design/pro-components/issues/6092)) ([d2fc667](https://github.com/ant-design/pro-components/commit/d2fc667fe1fe873f078a005b0fbf02dd72fb03e4))

## [3.0.17](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.16...@ant-design/pro-table@3.0.17) (2022-10-19)

### Bug Fixes

- **form:** 金额格式化支持负数形式展示 ([#6080](https://github.com/ant-design/pro-components/issues/6080)) ([b0b153b](https://github.com/ant-design/pro-components/commit/b0b153b7ddf651e99b2ab65faf8288e7ec2831e2))

## [3.0.16](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.15...@ant-design/pro-table@3.0.16) (2022-10-14)

### Bug Fixes

- **table:** table search style fixed ([#6069](https://github.com/ant-design/pro-components/issues/6069)) ([000e804](https://github.com/ant-design/pro-components/commit/000e80452c64e042c41b266627ec237aed5976da))

## [3.0.15](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.14...@ant-design/pro-table@3.0.15) (2022-10-13)

### Bug Fixes

- **table:** card add hashid ([b98c387](https://github.com/ant-design/pro-components/commit/b98c3878bbdc1aa03748bd0051b942085e2b4b88))
- **table:** fix no has key when maxsize call error ([657e971](https://github.com/ant-design/pro-components/commit/657e97144525a9f08cabfcb20957c4ce4fbf38d4))

## [3.0.14](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.13...@ant-design/pro-table@3.0.14) (2022-10-11)

**Note:** Version bump only for package @ant-design/pro-table

## [3.0.13](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.12...@ant-design/pro-table@3.0.13) (2022-10-11)

### Bug Fixes

- toolbar list style fixed ([#6058](https://github.com/ant-design/pro-components/issues/6058)) ([ab2bb3d](https://github.com/ant-design/pro-components/commit/ab2bb3d2a068329027c9ca5444419449ce8ea098))

## [3.0.12](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.11...@ant-design/pro-table@3.0.12) (2022-10-10)

**Note:** Version bump only for package @ant-design/pro-table

## [3.0.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.10...@ant-design/pro-table@3.0.11) (2022-09-28)

### Bug Fixes

- **table:** 解决 CheckCard 与 Table 联用时 CheckCard 样式丢失问题 ([#5980](https://github.com/ant-design/pro-components/issues/5980)) ([bf3fd22](https://github.com/ant-design/pro-components/commit/bf3fd221d18610fd76c02147b72bdce02278ee9c))

## [3.0.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.9...@ant-design/pro-table@3.0.10) (2022-09-22)

### Bug Fixes

- **table:** option button alignment problem ([#5959](https://github.com/ant-design/pro-components/issues/5959)) ([74f5d3a](https://github.com/ant-design/pro-components/commit/74f5d3a9f7884e79427a1d651fa56a67f5c4a34d))

## [3.0.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.8...@ant-design/pro-table@3.0.9) (2022-09-21)

### Bug Fixes

- **table:** use better style import funtion ([8ce8d5a](https://github.com/ant-design/pro-components/commit/8ce8d5a689162fb448f6980f3f3da63934baebcb))

## [3.0.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.7...@ant-design/pro-table@3.0.8) (2022-09-16)

### Bug Fixes

- **from:** update snapshot ([3479278](https://github.com/ant-design/pro-components/commit/3479278eff837e64e33472c845c7451b50e4136e))

## [3.0.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.6...@ant-design/pro-table@3.0.7) (2022-09-14)

### Bug Fixes

- **components:** fix ref error ([c9e1e98](https://github.com/ant-design/pro-components/commit/c9e1e98dab5e2b9004d7c43053291b663f551742))
- **table:** fix ColumnSetting style error ([ec39ccc](https://github.com/ant-design/pro-components/commit/ec39ccc6727c366d0bcee803cb0ace08edffc7c2))
- **table:** fix configuration issues with nested columns ([c2c9d9d](https://github.com/ant-design/pro-components/commit/c2c9d9d0f95ea6b8814060d5d3994a2c8b403c00))

## [3.0.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.5...@ant-design/pro-table@3.0.6) (2022-09-09)

**Note:** Version bump only for package @ant-design/pro-table

## [3.0.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.4...@ant-design/pro-table@3.0.5) (2022-09-08)

### Bug Fixes

- **components:** fix css var error ([bd5d3bf](https://github.com/ant-design/pro-components/commit/bd5d3bf37f3bb89ea62b021a818690ca04994a49))

## [3.0.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.3...@ant-design/pro-table@3.0.4) (2022-09-05)

### Bug Fixes

- **table:** await action?.reload(); ([#5846](https://github.com/ant-design/pro-components/issues/5846)) ([5706603](https://github.com/ant-design/pro-components/commit/5706603da3f4e623d37c8e166d2c359a74b8eccf))

## [3.0.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.2...@ant-design/pro-table@3.0.3) (2022-09-02)

### Bug Fixes

- **table:** import alert style ([f567cf1](https://github.com/ant-design/pro-components/commit/f567cf1eed2c30960e7a4f912731992ebe5ad1fd))

## [3.0.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.80.5...@ant-design/pro-table@3.0.2) (2022-09-02)

**Note:** Version bump only for package @ant-design/pro-table

## [3.0.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.27...@ant-design/pro-table@3.0.1) (2022-09-01)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.27](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.26...@ant-design/pro-table@3.0.0-experimental.27) (2022-08-31)

### Bug Fixes

- **card:** 兼容 antd v4 TabPane 的能力支持 ([#5796](https://github.com/ant-design/pro-components/issues/5796)) ([beda6b1](https://github.com/ant-design/pro-components/commit/beda6b1b93e92825bba90efe9049b4bf6320c882))

# [3.0.0-experimental.26](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.80.4...@ant-design/pro-table@3.0.0-experimental.26) (2022-08-30)

### Bug Fixes

- update snapshot ([4db1605](https://github.com/ant-design/pro-components/commit/4db1605937c3b0cf22d22ad398ef4c11e21883cd))

# [3.0.0-experimental.25](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.24...@ant-design/pro-table@3.0.0-experimental.25) (2022-08-29)

### Bug Fixes

- update snapshot ([4db1605](https://github.com/ant-design/pro-components/commit/4db1605937c3b0cf22d22ad398ef4c11e21883cd))

# [3.0.0-experimental.24](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.80.3...@ant-design/pro-table@3.0.0-experimental.24) (2022-08-26)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.23](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.22...@ant-design/pro-table@3.0.0-experimental.23) (2022-08-25)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.22](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.21...@ant-design/pro-table@3.0.0-experimental.22) (2022-08-25)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.21](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.80.2...@ant-design/pro-table@3.0.0-experimental.21) (2022-08-25)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.20](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.19...@ant-design/pro-table@3.0.0-experimental.20) (2022-08-24)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.19](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.18...@ant-design/pro-table@3.0.0-experimental.19) (2022-08-24)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.18](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.17...@ant-design/pro-table@3.0.0-experimental.18) (2022-08-24)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.17](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.16...@ant-design/pro-table@3.0.0-experimental.17) (2022-08-24)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.16](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@3.0.0-experimental.15...@ant-design/pro-table@3.0.0-experimental.16) (2022-08-23)

**Note:** Version bump only for package @ant-design/pro-table

# [3.0.0-experimental.15](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.80.1...@ant-design/pro-table@3.0.0-experimental.15) (2022-08-23)

**Note:** Version bump only for package @ant-design/pro-table

# [2.79.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.78.3...@ant-design/pro-table@2.79.0) (2022-08-15)

### Bug Fixes

- **form:** 修复在 table 中指定 valueType 为 treeSelect 并使用 options 和自定义字段名时无法筛选的问题 ([#5722](https://github.com/ant-design/pro-components/issues/5722)) ([93dacf3](https://github.com/ant-design/pro-components/commit/93dacf341652a82c4b091201258526ff44cacbad))

### Features

- **form:** support Pro.useFormInstance ([d53eccc](https://github.com/ant-design/pro-components/commit/d53eccca812e477c68f59243b227e3141526ce69))

# [2.79.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.78.3...@ant-design/pro-table@2.79.0) (2022-08-15)

### Bug Fixes

- **table:** useEditableArray fix nested children can not be add when position is not top and expandable.childrenColumnName isundefined ([#5643](https://github.com/ant-design/pro-components/issues/5643)) ([9604686](https://github.com/ant-design/pro-components/commit/960468691a4528aaf0a92bfaf1ce5742c2d24a52))
- **table:** 修复 ProTable 的 ListToolBar 没有 headTitle 时，左侧会有多余的边距 ([#5694](https://github.com/ant-design/pro-components/issues/5694)) ([4bb3e3f](https://github.com/ant-design/pro-components/commit/4bb3e3f7befef1b69c1c7902ddd17c07344e006f))
- **table:** 表格批量操作没有默认值报错 ([#5674](https://github.com/ant-design/pro-components/issues/5674)) ([67b7e76](https://github.com/ant-design/pro-components/commit/67b7e7682cf5f1b47a136ffc2c50d64c9d8d7d6b))

### Features

- **table:** support dynamic columns persistence ([#5645](https://github.com/ant-design/pro-components/issues/5645)) ([ae1ddb0](https://github.com/ant-design/pro-components/commit/ae1ddb07527821a5c9094082b2b9b661ad21bf6e))

## [2.78.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.78.2...@ant-design/pro-table@2.78.3) (2022-08-02)

**Note:** Version bump only for package @ant-design/pro-table

## [2.78.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.78.1...@ant-design/pro-table@2.78.2) (2022-07-22)

**Note:** Version bump only for package @ant-design/pro-table

## [2.78.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.78.0...@ant-design/pro-table@2.78.1) (2022-07-21)

**Note:** Version bump only for package @ant-design/pro-table

# [2.78.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.77.3...@ant-design/pro-table@2.78.0) (2022-07-21)

### Features

- **table:** ProTable columns 的 ellipsis 支持 showTitle ([#5575](https://github.com/ant-design/pro-components/issues/5575)) ([b10229d](https://github.com/ant-design/pro-components/commit/b10229d399d50b5b61ce6d292d36f7b1c5a65a1c))

## [2.77.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.77.2...@ant-design/pro-table@2.77.3) (2022-07-14)

**Note:** Version bump only for package @ant-design/pro-table

## [2.77.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.77.1...@ant-design/pro-table@2.77.2) (2022-07-11)

**Note:** Version bump only for package @ant-design/pro-table

## [2.77.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.77.0...@ant-design/pro-table@2.77.1) (2022-07-06)

### Bug Fixes

- **form:** remove HOC when light=false ([5862557](https://github.com/ant-design/pro-components/commit/586255754db878c0c9efa4755ec7469e5cf0c386))
- **table:** method coverRowKey 关于 at 兼容性问题修复 ([#5473](https://github.com/ant-design/pro-components/issues/5473)) ([154af3e](https://github.com/ant-design/pro-components/commit/154af3ed67baf2eaff45f08289518ae787c3812a))
- ’添加一行数据 ' 国际化问题 ([#5469](https://github.com/ant-design/pro-components/issues/5469)) ([85cc727](https://github.com/ant-design/pro-components/commit/85cc7275bb58e52e84f25594952d9612742102a0))

# [2.77.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.76.4...@ant-design/pro-table@2.77.0) (2022-06-30)

### Bug Fixes

- **form:** fix cascader clear no work error-n ([#5381](https://github.com/ant-design/pro-components/issues/5381)) ([cf51175](https://github.com/ant-design/pro-components/commit/cf511755b738beb5bcb42b5bcf8393d55b83f722))
- **table:** default close revalidateOnFocus ([#5441](https://github.com/ant-design/pro-components/issues/5441)) ([88f0782](https://github.com/ant-design/pro-components/commit/88f07825d125d3af56cc55588dcb1ff3edfccb55))
- **table:** the table header should not be scroll ([#5410](https://github.com/ant-design/pro-components/issues/5410)) ([520246a](https://github.com/ant-design/pro-components/commit/520246a6acf0a13f51dbbe2fbb42bf702952ffbf))

### Features

- **table:** Make ColumnSetting heights editable ([#5449](https://github.com/ant-design/pro-components/issues/5449)) ([9739595](https://github.com/ant-design/pro-components/commit/973959503e994f677554f55db3838e4f1e23d738))

## [2.76.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.76.3...@ant-design/pro-table@2.76.4) (2022-06-16)

**Note:** Version bump only for package @ant-design/pro-table

## [2.76.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.76.2...@ant-design/pro-table@2.76.3) (2022-06-02)

**Note:** Version bump only for package @ant-design/pro-table

## [2.76.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.76.1...@ant-design/pro-table@2.76.2) (2022-06-02)

### Bug Fixes

- **form:** fix Cascader and TreeSelect no has light lable error ([#5310](https://github.com/ant-design/pro-components/issues/5310)) ([2058bf4](https://github.com/ant-design/pro-components/commit/2058bf4179246bd3dd9b2fc7888fb2665e316d30))
- **table:** fix light filter style error ([884ccac](https://github.com/ant-design/pro-components/commit/884ccaccbb7e66c70508daeb18597269e5ec3213))
- **table:** if request is null, no triger change ([dc37fe2](https://github.com/ant-design/pro-components/commit/dc37fe2cec17a2cdb49678784598f4d19a983d63))
- **table:** support dropPosition = 0 ([95d6c29](https://github.com/ant-design/pro-components/commit/95d6c29623040f1afff5faf16ee43a403d62a07c))

## [2.76.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.76.0...@ant-design/pro-table@2.76.1) (2022-05-27)

**Note:** Version bump only for package @ant-design/pro-table

# [2.76.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.75.1...@ant-design/pro-table@2.76.0) (2022-05-26)

### Bug Fixes

- **table:** use ref funtion ([e81cda6](https://github.com/ant-design/pro-components/commit/e81cda680149c9faa021c537bcf1314045e4bac9))
- [#5273](https://github.com/ant-design/pro-components/issues/5273) for pro-table ([#5281](https://github.com/ant-design/pro-components/issues/5281)) ([61df2c1](https://github.com/ant-design/pro-components/commit/61df2c1d202504a0396aa667be7fb180cdc03f19))

### Features

- **table:** renderFormItem support ignoreFormItem ([7aae13d](https://github.com/ant-design/pro-components/commit/7aae13d791452121eedfc38c43676fc9a0f3ba05))

## [2.75.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.75.0...@ant-design/pro-table@2.75.1) (2022-05-20)

**Note:** Version bump only for package @ant-design/pro-table

# [2.75.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.74.4...@ant-design/pro-table@2.75.0) (2022-05-20)

### Bug Fixes

- **table:** default close revalidateOnFocus ([b348468](https://github.com/ant-design/pro-components/commit/b3484688d59f2140da62304aa1d1c01aaf04412a))

### Features

- **components:** add @ant-design/pro-component ([#5258](https://github.com/ant-design/pro-components/issues/5258)) ([a524391](https://github.com/ant-design/pro-components/commit/a524391aca28b09265097bcbf555fd1261e1e757))

## [2.74.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.74.3...@ant-design/pro-table@2.74.4) (2022-05-16)

**Note:** Version bump only for package @ant-design/pro-table

## [2.74.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.74.2...@ant-design/pro-table@2.74.3) (2022-05-12)

**Note:** Version bump only for package @ant-design/pro-table

## [2.74.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.74.1...@ant-design/pro-table@2.74.2) (2022-05-12)

### Bug Fixes

- **table:** fix children table alway rerender all dom ([17e1b58](https://github.com/ant-design/pro-components/commit/17e1b588066d2fcccdd4e501867bdfdf20b517ec))
- **table:** use menu.items render menu.item ([6f32179](https://github.com/ant-design/pro-components/commit/6f32179c6f411ac77fb743294d9d7838fa4bfc04))

## [2.74.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.74.0...@ant-design/pro-table@2.74.1) (2022-05-09)

**Note:** Version bump only for package @ant-design/pro-table

# [2.74.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.72.1...@ant-design/pro-table@2.74.0) (2022-05-07)

### Bug Fixes

- **table:** if table data is null, render empty table ([281b8bd](https://github.com/ant-design/pro-components/commit/281b8bd541a3f93cb0e6ad3c24e21b0bc5f2f104))

### Features

- **form:** collapse support hidden number ([#5116](https://github.com/ant-design/pro-components/issues/5116)) ([eb14e1a](https://github.com/ant-design/pro-components/commit/eb14e1a0e3cb4aab8888b592c612c3a840e65db0))
- **table:** recordCreator must set rowKey ([a30ce30](https://github.com/ant-design/pro-components/commit/a30ce301e649a27277b1ed1482333173f1833091))
- **table:** renderFormIten support action ([5e33e57](https://github.com/ant-design/pro-components/commit/5e33e57fc61deab4668359d74e2cbc45901dd25c))

# [2.73.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.72.1...@ant-design/pro-table@2.73.0) (2022-04-29)

### Bug Fixes

- **table:** if table data is null, render empty table ([281b8bd](https://github.com/ant-design/pro-components/commit/281b8bd541a3f93cb0e6ad3c24e21b0bc5f2f104))

### Features

- **form:** collapse support hidden number ([#5116](https://github.com/ant-design/pro-components/issues/5116)) ([eb14e1a](https://github.com/ant-design/pro-components/commit/eb14e1a0e3cb4aab8888b592c612c3a840e65db0))
- **table:** recordCreator must set rowKey ([a30ce30](https://github.com/ant-design/pro-components/commit/a30ce301e649a27277b1ed1482333173f1833091))

## [2.72.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.72.0...@ant-design/pro-table@2.72.1) (2022-04-25)

**Note:** Version bump only for package @ant-design/pro-table

# [2.72.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.71.7...@ant-design/pro-table@2.72.0) (2022-04-24)

### Bug Fixes

- **table:** extra columns unexpected show in form compo ([#5096](https://github.com/ant-design/pro-components/issues/5096)) ([a28d0b9](https://github.com/ant-design/pro-components/commit/a28d0b956e16b077a5038be96898ce9520b414f0))
- **table:** ts type error ([#5095](https://github.com/ant-design/pro-components/issues/5095)) ([6e14c1f](https://github.com/ant-design/pro-components/commit/6e14c1f1d86a095e4cdc861b045b008a2c6145f2))

### Features

- **form:** 提交表单时，禁用取消按钮和右上角关闭按钮，直到 onFinish 异步回调执行完成 ([#5078](https://github.com/ant-design/pro-components/issues/5078)) ([ff1a4e0](https://github.com/ant-design/pro-components/commit/ff1a4e07df6a42282cf392fb5992d1afa25b7b48))
- **table:** reinitialize umountRef for react\@18 strict mode ([#5085](https://github.com/ant-design/pro-components/issues/5085)) ([8a4652a](https://github.com/ant-design/pro-components/commit/8a4652a143088eee3205195824c7f5720796c020))

## [2.71.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.71.6...@ant-design/pro-table@2.71.7) (2022-04-18)

### Bug Fixes

- **form:** fix revalidateOnFocus alway work error-n ([0ea1618](https://github.com/ant-design/pro-components/commit/0ea1618154634f6e0ac9c64682a71746ab191807))

## [2.71.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.71.5...@ant-design/pro-table@2.71.6) (2022-04-14)

**Note:** Version bump only for package @ant-design/pro-table

## [2.71.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.71.4...@ant-design/pro-table@2.71.5) (2022-04-13)

**Note:** Version bump only for package @ant-design/pro-table

## [2.71.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.71.3...@ant-design/pro-table@2.71.4) (2022-04-13)

### Bug Fixes

- **table:** fix PageInfo.onchange run twice error ([dd2bfed](https://github.com/ant-design/pro-components/commit/dd2bfed8b885b7a851d0114260fe5aa545daf729))
- **table:** fix selectedKeys no support rowkey is function ([8f5b518](https://github.com/ant-design/pro-components/commit/8f5b518387ac60595ed3ac108cc7fc1eb492847c))

## [2.71.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.71.2...@ant-design/pro-table@2.71.3) (2022-04-12)

### Bug Fixes

- **table:** fix position=top, add new line data error problem ([#5023](https://github.com/ant-design/pro-components/issues/5023)) ([19e982c](https://github.com/ant-design/pro-components/commit/19e982c0de71aa24abd5bd8fb867b0fb1851e48d))

## [2.71.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.71.1...@ant-design/pro-table@2.71.2) (2022-04-08)

**Note:** Version bump only for package @ant-design/pro-table

## [2.71.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.71.0...@ant-design/pro-table@2.71.1) (2022-04-07)

### Bug Fixes

- **table:** fix tableExtraRender no work error when dataSource=null ([23e60ae](https://github.com/ant-design/pro-components/commit/23e60aea2d70504ceabc3f184be63a7079c41f83))

# [2.71.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.70.0...@ant-design/pro-table@2.71.0) (2022-04-06)

### Bug Fixes

- **form:** new row uses previous data ([#4987](https://github.com/ant-design/pro-components/issues/4987)) ([a79305e](https://github.com/ant-design/pro-components/commit/a79305e017f01ee3fe4a0bc708fd4480e60610c1))
- **table:** 解决修改轻量筛选条件时覆盖了 table 自带 keywords 过滤的值的问题 ([#4995](https://github.com/ant-design/pro-components/issues/4995)) ([0cb6ada](https://github.com/ant-design/pro-components/commit/0cb6adaddb730813b35b1fea73cc931881ddfb27))
- **table:** fix ts error ([db7e313](https://github.com/ant-design/pro-components/commit/db7e3138faf9ff7b8fcffd8e47a10f0551d1e0d6))

### Features

- **table:** support column setting disable ([#4958](https://github.com/ant-design/pro-components/issues/4958)) ([e2041ed](https://github.com/ant-design/pro-components/commit/e2041ed4e185279b62a87bc7655e18e7720538d7))

# [2.70.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.69.0...@ant-design/pro-table@2.70.0) (2022-03-28)

### Bug Fixes

- **table:** columnsState use index as state name ([#4931](https://github.com/ant-design/pro-components/issues/4931)) ([5316cb6](https://github.com/ant-design/pro-components/commit/5316cb67ae52ac54c58c451fad246d8d1c045bb1))
- **table:** onSave cannot get after editing data ([#4934](https://github.com/ant-design/pro-components/issues/4934)) ([c12321f](https://github.com/ant-design/pro-components/commit/c12321fae15ed37a6edfb6fab9e3c6bf6283c5fa))
- **table:** sort table classnames ([8c4522a](https://github.com/ant-design/pro-components/commit/8c4522a801c2b1aafd79c3d1d62bb74a0c302c79))
- **table:** table search styles overridden ([#4935](https://github.com/ant-design/pro-components/issues/4935)) ([35923f8](https://github.com/ant-design/pro-components/commit/35923f801cf10d9529d78b6f40e2d689dfe0eb44))
- lint warnning for missing deps ([#4924](https://github.com/ant-design/pro-components/issues/4924)) ([7473f3f](https://github.com/ant-design/pro-components/commit/7473f3fd6c4f5ed23317a4a1982c3fb6d5262c0e))

### Features

- **table:** customize columnSetting icon ([#4925](https://github.com/ant-design/pro-components/issues/4925)) ([660b036](https://github.com/ant-design/pro-components/commit/660b036c823519ebdccf1810deb5113478beca74))

# [2.69.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.68.3...@ant-design/pro-table@2.69.0) (2022-03-25)

### Bug Fixes

- **table:** Incorrect value of sub-column when using EditableTable in Form ([#4875](https://github.com/ant-design/pro-components/issues/4875)) ([b572328](https://github.com/ant-design/pro-components/commit/b57232852b18d40531e1bd42406df8eb13cd325c))

### Features

- **table:** support getRows, getRow, setRow ([#4904](https://github.com/ant-design/pro-components/issues/4904)) ([756340e](https://github.com/ant-design/pro-components/commit/756340ee97f13b55e5f51cc875ec6b344e953d24))
- **table:** table search alway use pro-card ([d46edbb](https://github.com/ant-design/pro-components/commit/d46edbbbed5f03e704b2e69acdd3868f83370a7a))

## [2.68.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.68.2...@ant-design/pro-table@2.68.3) (2022-03-22)

**Note:** Version bump only for package @ant-design/pro-table

## [2.68.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.68.1...@ant-design/pro-table@2.68.2) (2022-03-18)

### Bug Fixes

- **table:** fix inlint error render dom ([bfeb81a](https://github.com/ant-design/pro-components/commit/bfeb81afc6bc4305b3d7ef2b84c0afc089dad7a0))
- **table:** support ghost ([7bec0df](https://github.com/ant-design/pro-components/commit/7bec0dfe373884ec18c10e965c1a9f2c1fff9605))

## [2.68.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.68.0...@ant-design/pro-table@2.68.1) (2022-03-16)

**Note:** Version bump only for package @ant-design/pro-table

# [2.68.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.67.1...@ant-design/pro-table@2.68.0) (2022-03-16)

### Features

- **table:** `newRecordType: cache` support parentKey ([#4861](https://github.com/ant-design/pro-components/issues/4861)) ([dfed128](https://github.com/ant-design/pro-components/commit/dfed128c33c3116e44d5315ffa334854ce055f95))

## [2.67.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.67.0...@ant-design/pro-table@2.67.1) (2022-03-15)

**Note:** Version bump only for package @ant-design/pro-table

# [2.67.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.66.4...@ant-design/pro-table@2.67.0) (2022-03-14)

### Bug Fixes

- **table:** mode=edit causes action column not to show ([#4829](https://github.com/ant-design/pro-components/issues/4829)) ([28e86dd](https://github.com/ant-design/pro-components/commit/28e86ddeda810e6df4a80b6a4259f20bbbecb20f))
- **table:** using an EditableTable with a Form causes wranning ([#4839](https://github.com/ant-design/pro-components/issues/4839)) ([f17ab26](https://github.com/ant-design/pro-components/commit/f17ab26a59885e351b00dd782657d33f7a2834a6))
- **table:** use default showSizeChanger change ([83fdff3](https://github.com/ant-design/pro-components/commit/83fdff383306bbe7e5adc94a11a5b46e13ce8902))

### Features

- **table:** improve ErrorBoundary logic ([#4826](https://github.com/ant-design/pro-components/issues/4826)) ([67bf50e](https://github.com/ant-design/pro-components/commit/67bf50ee5f0621265a69708b7896925cdda0512f))
- **table:** Keep the creator button default style. ([#4810](https://github.com/ant-design/pro-components/issues/4810)) ([1ac6ac0](https://github.com/ant-design/pro-components/commit/1ac6ac03d2dc44e5363bd8188d18387756b45151))
- **table:** support custom loading ([#4844](https://github.com/ant-design/pro-components/issues/4844)) ([e31be9f](https://github.com/ant-design/pro-components/commit/e31be9f4cf6b4dc73edbb6b01cbcaa3da7ad61c5))

## [2.66.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.66.3...@ant-design/pro-table@2.66.4) (2022-03-08)

### Bug Fixes

- **table:** fix no fieldProps injected error ([#4787](https://github.com/ant-design/pro-components/issues/4787)) ([c4e835d](https://github.com/ant-design/pro-components/commit/c4e835dd60e56a5ca0ee2399f03c7c0c1c63e971))

## [2.66.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.66.2...@ant-design/pro-table@2.66.3) (2022-03-07)

### Bug Fixes

- **table:** default close table auto focus first input ([a1fe1cb](https://github.com/ant-design/pro-components/commit/a1fe1cb73fbc5e545484acceac7733c0cc0cad57))

## [2.66.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.66.1...@ant-design/pro-table@2.66.2) (2022-03-07)

**Note:** Version bump only for package @ant-design/pro-table

## [2.66.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.66.0...@ant-design/pro-table@2.66.1) (2022-03-04)

**Note:** Version bump only for package @ant-design/pro-table

# [2.66.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.64.1...@ant-design/pro-table@2.66.0) (2022-03-04)

### Bug Fixes

- **table:** fix DragSortTable render is cache error ([d5c716a](https://github.com/ant-design/pro-components/commit/d5c716a640cb517ac5ada6cfb6525e87e72b0f70))
- **table:** ProTable 默认表头可滚动，表格滚动在 antd 中 ([#4729](https://github.com/ant-design/pro-components/issues/4729)) ([8629397](https://github.com/ant-design/pro-components/commit/8629397fb3de0d6148c40eeedddae97dca2cf0e0))
- **Table:** preserve columnState when deselecting ([#4761](https://github.com/ant-design/pro-components/issues/4761)) ([4398a1b](https://github.com/ant-design/pro-components/commit/4398a1bcad33664eedfc240a6c79a010bcd89c84))

### Features

- **table:** support antd Table extra column ([#9604](https://github.com/ant-design/pro-components/issues/9604)) ([#4704](https://github.com/ant-design/pro-components/issues/4704)) ([8a7426e](https://github.com/ant-design/pro-components/commit/8a7426e177cb62a4786e4f5d734ba13d4d64eada))
- **table:** support ErrorBoundary ([#4738](https://github.com/ant-design/pro-components/issues/4738)) ([66f815e](https://github.com/ant-design/pro-components/commit/66f815ef13a0a7e42ee7f2376740634bce1bf513))

# [2.65.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.64.1...@ant-design/pro-table@2.65.0) (2022-03-02)

### Bug Fixes

- **table:** ProTable 默认表头可滚动，表格滚动在 antd 中 ([#4729](https://github.com/ant-design/pro-components/issues/4729)) ([8629397](https://github.com/ant-design/pro-components/commit/8629397fb3de0d6148c40eeedddae97dca2cf0e0))

### Features

- **table:** support antd Table extra column ([#9604](https://github.com/ant-design/pro-components/issues/9604)) ([#4704](https://github.com/ant-design/pro-components/issues/4704)) ([8a7426e](https://github.com/ant-design/pro-components/commit/8a7426e177cb62a4786e4f5d734ba13d4d64eada))
- **table:** support ErrorBoundary ([#4738](https://github.com/ant-design/pro-components/issues/4738)) ([66f815e](https://github.com/ant-design/pro-components/commit/66f815ef13a0a7e42ee7f2376740634bce1bf513))

## [2.64.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.64.0...@ant-design/pro-table@2.64.1) (2022-02-24)

### Bug Fixes

- **table:** fix page=1, no reset pageIndex ([62b3188](https://github.com/ant-design/pro-components/commit/62b31889f179d57e373040151ea02925b0c220b2))
- **table:** fix page=1, no reset pageIndex ([3ae828d](https://github.com/ant-design/pro-components/commit/3ae828d68402bb732f7f161401e7be025cc36d26))

# [2.64.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.63.7...@ant-design/pro-table@2.64.0) (2022-02-21)

### Bug Fixes

- **EditableTable:** onValuesChange is not executed when name is not passed ([#4679](https://github.com/ant-design/pro-components/issues/4679)) ([9565441](https://github.com/ant-design/pro-components/commit/9565441438d6c38bc97004b52b27a1842c62f82c))
- **table:** table 的 param 发生变化时重置分页为 1 ([#4648](https://github.com/ant-design/pro-components/issues/4648)) ([a2487b9](https://github.com/ant-design/pro-components/commit/a2487b93649a6b144904712e0a99b1fa2354be1b))

### Features

- **form,table,utils:** form 和 table 的 dateFormatter 支持函数 ([#4657](https://github.com/ant-design/pro-components/issues/4657)) ([bdbbae4](https://github.com/ant-design/pro-components/commit/bdbbae4212fede8bf230f9577feae853ce6bf287))

## [2.63.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.63.6...@ant-design/pro-table@2.63.7) (2022-02-18)

### Bug Fixes

- **form:** fix ignoreRules no work error ([5586970](https://github.com/ant-design/pro-components/commit/558697094fc0aa39b5ac372064608cdefa239798))
- **table:** EditableProTable 支持在 renderFormItem 中的 record 中返回用户自定义的字段 ([#4644](https://github.com/ant-design/pro-components/issues/4644)) ([488122d](https://github.com/ant-design/pro-components/commit/488122d88f031472ee0786a98b2a3dd017c5cb5b))

## [2.63.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.63.5...@ant-design/pro-table@2.63.6) (2022-02-15)

### Bug Fixes

- **form:** fix renderFormIten render null will show dom error ([8710ee3](https://github.com/ant-design/pro-components/commit/8710ee3c3da4a768d868d5255796786c5aee799f))

## [2.63.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.63.4...@ant-design/pro-table@2.63.5) (2022-02-14)

### Bug Fixes

- **table:** first use propsRef values ([cba7197](https://github.com/ant-design/pro-components/commit/cba7197522211ba5e0f3066095f7deadbe950679))
- **table:** fix table loadingchange no work error ([42495b1](https://github.com/ant-design/pro-components/commit/42495b12cf7854b31f5ef3fa18823934895914ac))

## [2.63.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.63.3...@ant-design/pro-table@2.63.4) (2022-02-14)

### Bug Fixes

- **table:** fix when name=xxx, form is null error ([3d5142d](https://github.com/ant-design/pro-components/commit/3d5142d48168459eecb36747220f72788666ceaf))

## [2.63.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.63.2...@ant-design/pro-table@2.63.3) (2022-02-11)

**Note:** Version bump only for package @ant-design/pro-table

## [2.63.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.63.1...@ant-design/pro-table@2.63.2) (2022-02-10)

**Note:** Version bump only for package @ant-design/pro-table

## [2.63.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.63.0...@ant-design/pro-table@2.63.1) (2022-02-10)

### Bug Fixes

- **utils:** fix merge will change null to {} ([#4590](https://github.com/ant-design/pro-components/issues/4590)) ([001e0eb](https://github.com/ant-design/pro-components/commit/001e0eb6b43e9391fa84ff078ee3f013331221b9)), closes [#4583](https://github.com/ant-design/pro-components/issues/4583)

# [2.63.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.8...@ant-design/pro-table@2.63.0) (2022-02-08)

### Features

- **table:** reduce the dom of the form ([#4565](https://github.com/ant-design/pro-components/issues/4565)) ([38750ea](https://github.com/ant-design/pro-components/commit/38750ea6a1de21702d4285f520e5b7ffb57f8fab))

## [2.62.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.7...@ant-design/pro-table@2.62.8) (2022-01-25)

**Note:** Version bump only for package @ant-design/pro-table

## [2.62.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.6...@ant-design/pro-table@2.62.7) (2022-01-21)

### Bug Fixes

- **form:** 🐛 readonly form will not render the latest value ([#4494](https://github.com/ant-design/pro-components/issues/4494)) ([2c169a8](https://github.com/ant-design/pro-components/commit/2c169a846b72351f9988c22fd5c2ef2b1684b577))
- **table:** modify table document ([#4496](https://github.com/ant-design/pro-components/issues/4496)) ([1f9b4ae](https://github.com/ant-design/pro-components/commit/1f9b4aeb3b38c3dd097d4b960ec52fa07915db44))
- **table:** parameter error when passing function to reload or fullScreen ([#4491](https://github.com/ant-design/pro-components/issues/4491)) ([3648489](https://github.com/ant-design/pro-components/commit/36484895dd040d1c1146b5f413aadcf116d30094))

## [2.62.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.5...@ant-design/pro-table@2.62.6) (2022-01-18)

**Note:** Version bump only for package @ant-design/pro-table

## [2.62.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.4...@ant-design/pro-table@2.62.5) (2022-01-17)

### Bug Fixes

- **form:** default close swr cache ([#4470](https://github.com/ant-design/pro-components/issues/4470)) ([770a0fb](https://github.com/ant-design/pro-components/commit/770a0fb3360b1b0eac67deb3879f563cf9d9071b))
- **table:** 🎸 Support readonly option for EditableTable ([#4466](https://github.com/ant-design/pro-components/issues/4466)) ([542fcd6](https://github.com/ant-design/pro-components/commit/542fcd61ed8858721fba584761f5854513350573))
- **table:** params support function ([#4474](https://github.com/ant-design/pro-components/issues/4474)) ([e7379cc](https://github.com/ant-design/pro-components/commit/e7379cc57a6834d97e211e1237ca005dca9890b7))

## [2.62.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.3...@ant-design/pro-table@2.62.4) (2022-01-12)

**Note:** Version bump only for package @ant-design/pro-table

## [2.62.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.2...@ant-design/pro-table@2.62.3) (2022-01-11)

**Note:** Version bump only for package @ant-design/pro-table

## [2.62.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.1...@ant-design/pro-table@2.62.2) (2022-01-11)

### Bug Fixes

- **table:** fix defaultSelectedRowKeys no work error ([#4432](https://github.com/ant-design/pro-components/issues/4432)) ([4ee5dce](https://github.com/ant-design/pro-components/commit/4ee5dce23550b1175c988995afec8611cb78562a))

## [2.62.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.62.0...@ant-design/pro-table@2.62.1) (2022-01-07)

**Note:** Version bump only for package @ant-design/pro-table

# [2.62.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.9...@ant-design/pro-table@2.62.0) (2022-01-05)

### Bug Fixes

- **table:** fix the param resetPageIndex is invalid in ProTable's method reload. ([#4397](https://github.com/ant-design/pro-components/issues/4397)) ([1169309](https://github.com/ant-design/pro-components/commit/11693090f876de639403bd6a1dfd4e57a4f81d8b))

### Features

- **ProTable:** support disabled setting's operation ([#4394](https://github.com/ant-design/pro-components/issues/4394)) ([89ef39f](https://github.com/ant-design/pro-components/commit/89ef39f1b2da7e43e6b221d289c0f8559d71e94f))

## [2.61.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.8...@ant-design/pro-table@2.61.9) (2021-12-28)

### Bug Fixes

- **table:** fix table no rerender error ([5af32fb](https://github.com/ant-design/pro-components/commit/5af32fbf4bf68d93a7851cb3d10da339e6e26d19))

## [2.61.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.7...@ant-design/pro-table@2.61.8) (2021-12-28)

### Bug Fixes

- **table:** Table 在 column 带有 request 情况下，搜索栏的表单由于没有设置 proFieldKey 导致在页面初始化会发出两个重 复的 request ([#4336](https://github.com/ant-design/pro-components/issues/4336)) ([219248b](https://github.com/ant-design/pro-components/commit/219248bbe80f3a3711524d668eac56626d131e89))

## [2.61.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.6...@ant-design/pro-table@2.61.7) (2021-12-24)

**Note:** Version bump only for package @ant-design/pro-table

## [2.61.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.5...@ant-design/pro-table@2.61.6) (2021-12-23)

**Note:** Version bump only for package @ant-design/pro-table

## [2.61.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.4...@ant-design/pro-table@2.61.5) (2021-12-22)

**Note:** Version bump only for package @ant-design/pro-table

## [2.61.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.3...@ant-design/pro-table@2.61.4) (2021-12-22)

**Note:** Version bump only for package @ant-design/pro-table

## [2.61.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.2...@ant-design/pro-table@2.61.3) (2021-12-22)

**Note:** Version bump only for package @ant-design/pro-table

## [2.61.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.1...@ant-design/pro-table@2.61.2) (2021-12-20)

**Note:** Version bump only for package @ant-design/pro-table

## [2.61.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.61.0...@ant-design/pro-table@2.61.1) (2021-12-20)

**Note:** Version bump only for package @ant-design/pro-table

# [2.61.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.60.1...@ant-design/pro-table@2.61.0) (2021-12-20)

### Bug Fixes

- **table:** if one node, no draggable ([#4310](https://github.com/ant-design/pro-components/issues/4310)) ([819046b](https://github.com/ant-design/pro-components/commit/819046b61469a7707b3a4f3358208c7a277b6f08))

### Features

- **form:** Support ProFormTreeSelect and valueType=treeSelect ([#4237](https://github.com/ant-design/pro-components/issues/4237)) ([31fab85](https://github.com/ant-design/pro-components/commit/31fab85ecc2c3ef873e88b050f26d1c3de4b8f98))

## [2.60.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.60.0...@ant-design/pro-table@2.60.1) (2021-12-17)

**Note:** Version bump only for package @ant-design/pro-table

# [2.60.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.59.7...@ant-design/pro-table@2.60.0) (2021-12-13)

### Features

- **layout:** settingDrawer use new antd new function ([#4042](https://github.com/ant-design/pro-components/issues/4042)) ([8e907d8](https://github.com/ant-design/pro-components/commit/8e907d8bbe48848c37e8ce1d5a584880e181f250))

## [2.59.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.59.6...@ant-design/pro-table@2.59.7) (2021-12-10)

**Note:** Version bump only for package @ant-design/pro-table

## [2.59.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.59.5...@ant-design/pro-table@2.59.6) (2021-12-10)

**Note:** Version bump only for package @ant-design/pro-table

## [2.59.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.59.4...@ant-design/pro-table@2.59.5) (2021-12-09)

### Bug Fixes

- **form:** cascader mode=text error ([#4213](https://github.com/ant-design/pro-components/issues/4213)) ([fdbd1d6](https://github.com/ant-design/pro-components/commit/fdbd1d62757bd9a3ad167290830a8fd050f66fc9))

## [2.59.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.59.3...@ant-design/pro-table@2.59.4) (2021-12-08)

### Bug Fixes

- **table:** fix keywords reset formSearch error ([#4214](https://github.com/ant-design/pro-components/issues/4214)) ([146f1da](https://github.com/ant-design/pro-components/commit/146f1da84d10df0cbb350bd350b17473778bced9))

## [2.59.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.59.2...@ant-design/pro-table@2.59.3) (2021-12-07)

**Note:** Version bump only for package @ant-design/pro-table

## [2.59.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.59.1...@ant-design/pro-table@2.59.2) (2021-12-01)

**Note:** Version bump only for package @ant-design/pro-table

## [2.59.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.59.0...@ant-design/pro-table@2.59.1) (2021-12-01)

### Bug Fixes

- **table:** if form.ignoreRules disable auto reload ([#4158](https://github.com/ant-design/pro-components/issues/4158)) ([8378a19](https://github.com/ant-design/pro-components/commit/8378a199022ba7562d233f9e31ae6f6cdbc3cfa2))

# [2.59.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.58.1...@ant-design/pro-table@2.59.0) (2021-11-30)

### Bug Fixes

- **table:** ProTable 中 配置了 params， 通过改变 params 来重新请求数据时，页码没有从第一页开始 ([#4142](https://github.com/ant-design/pro-components/issues/4142)) ([57ed4fc](https://github.com/ant-design/pro-components/commit/57ed4fcb9c6d93bb50ff8a750c2cd8db4a4a407b))

### Features

- **table:** support revalidateOnFocus ([#4120](https://github.com/ant-design/pro-components/issues/4120)) ([1046109](https://github.com/ant-design/pro-components/commit/104610914eedfecd88ceb2e38d86c47ff8b2fc89))

## [2.58.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.58.0...@ant-design/pro-table@2.58.1) (2021-11-23)

**Note:** Version bump only for package @ant-design/pro-table

# [2.58.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.57.3...@ant-design/pro-table@2.58.0) (2021-11-23)

### Features

- **table:** request add record props ([5ec71f8](https://github.com/ant-design/pro-components/commit/5ec71f823619ccbe798391c446427aa1371208bb))

## [2.57.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.57.2...@ant-design/pro-table@2.57.3) (2021-11-22)

**Note:** Version bump only for package @ant-design/pro-table

## [2.57.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.57.1...@ant-design/pro-table@2.57.2) (2021-11-18)

### Bug Fixes

- **descriptions:** unuse protable ([#4062](https://github.com/ant-design/pro-components/issues/4062)) ([04d6a6c](https://github.com/ant-design/pro-components/commit/04d6a6c94aaf1597ec5bbdb9135fdacbdca9640a))
- **table:** fix table validateFields no work error ([#4058](https://github.com/ant-design/pro-components/issues/4058)) ([0291e08](https://github.com/ant-design/pro-components/commit/0291e085a17d57d654b698695e9a2c31915a07e0))
- **table:** pro table support lightProps ([#4068](https://github.com/ant-design/pro-components/issues/4068)) ([ce15148](https://github.com/ant-design/pro-components/commit/ce151487c7dbd17917a0be0aec09d4e01237ff6a))

## [2.57.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.57.0...@ant-design/pro-table@2.57.1) (2021-11-16)

**Note:** Version bump only for package @ant-design/pro-table

# [2.57.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.9...@ant-design/pro-table@2.57.0) (2021-11-15)

### Features

- **form:** support antd next ([#4038](https://github.com/ant-design/pro-components/issues/4038)) ([96a64c3](https://github.com/ant-design/pro-components/commit/96a64c35d0fc6a359a4ff3d36b96f510f4580c63)), closes [#3770](https://github.com/ant-design/pro-components/issues/3770) [#3863](https://github.com/ant-design/pro-components/issues/3863)
- **table:** add card table ([#4033](https://github.com/ant-design/pro-components/issues/4033)) ([b2a205d](https://github.com/ant-design/pro-components/commit/b2a205d72c2afe1e9cfca6fe0e61dcbf9a1611e5))

## [2.56.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.8...@ant-design/pro-table@2.56.9) (2021-11-12)

### Bug Fixes

- **form:** fix proform.item no support QueryFilter error ([#4011](https://github.com/ant-design/pro-components/issues/4011)) ([5eff600](https://github.com/ant-design/pro-components/commit/5eff600f580d99452f9e1a84b7c36c315e55804f))
- **table:** fix editor table rowkey error ([#4000](https://github.com/ant-design/pro-components/issues/4000)) ([8760aad](https://github.com/ant-design/pro-components/commit/8760aad6d95b514ab57ef857adf74219fe006e99))

## [2.56.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.7...@ant-design/pro-table@2.56.8) (2021-11-08)

**Note:** Version bump only for package @ant-design/pro-table

## [2.56.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.6...@ant-design/pro-table@2.56.7) (2021-11-02)

### Bug Fixes

- **list:** fix list style error ([#3943](https://github.com/ant-design/pro-components/issues/3943)) ([68e0eed](https://github.com/ant-design/pro-components/commit/68e0eede7131932eb9e16734bb5bbb3c8fa0572e))

## [2.56.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.5...@ant-design/pro-table@2.56.6) (2021-10-28)

**Note:** Version bump only for package @ant-design/pro-table

## [2.56.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.4...@ant-design/pro-table@2.56.5) (2021-10-27)

**Note:** Version bump only for package @ant-design/pro-table

## [2.56.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.3...@ant-design/pro-table@2.56.4) (2021-10-26)

### Bug Fixes

- **table:** fix when dataSource=null, no work error ([#3877](https://github.com/ant-design/pro-components/issues/3877)) ([ffb9ccc](https://github.com/ant-design/pro-components/commit/ffb9ccc739acb6226f0c7f0bfb3a7efa24c28b8b))

## [2.56.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.2...@ant-design/pro-table@2.56.3) (2021-10-19)

### Bug Fixes

- **table:** header support ellipsis ([#3855](https://github.com/ant-design/pro-components/issues/3855)) ([0f3501d](https://github.com/ant-design/pro-components/commit/0f3501da23f9f8a1cc596f913fef21e12a570efa))

## [2.56.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.1...@ant-design/pro-table@2.56.2) (2021-10-18)

**Note:** Version bump only for package @ant-design/pro-table

## [2.56.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.56.0...@ant-design/pro-table@2.56.1) (2021-10-15)

**Note:** Version bump only for package @ant-design/pro-table

# [2.56.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.55.0...@ant-design/pro-table@2.56.0) (2021-10-12)

### Features

- 工具栏 - 列设置 - 新增 slot ([#3808](https://github.com/ant-design/pro-components/issues/3808)) ([a08fff3](https://github.com/ant-design/pro-components/commit/a08fff317b516c466aab96027bda4614185ff91c))

# [2.55.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.54.5...@ant-design/pro-table@2.55.0) (2021-10-08)

### Features

- **list:** add cardlist operate ([#3746](https://github.com/ant-design/pro-components/issues/3746)) ([43de757](https://github.com/ant-design/pro-components/commit/43de7577ca46b5b26acdd544cc40ec1e559a3b93))

## [2.54.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.54.4...@ant-design/pro-table@2.54.5) (2021-10-08)

### Bug Fixes

- **field:** timePicker 组件用 moment 解析时间不填入 format 是会直接 Invalid date ([#3745](https://github.com/ant-design/pro-components/issues/3745)) ([31fc899](https://github.com/ant-design/pro-components/commit/31fc8993aa5486281c76691df41ddb80d827074a))

## [2.54.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.54.3...@ant-design/pro-table@2.54.4) (2021-09-26)

**Note:** Version bump only for package @ant-design/pro-table

## [2.54.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.54.2...@ant-design/pro-table@2.54.3) (2021-09-24)

### Bug Fixes

- **table:** fix DragSortTable render problems with multiple renders ([#3705](https://github.com/ant-design/pro-components/issues/3705)) ([ec1a6c1](https://github.com/ant-design/pro-components/commit/ec1a6c150fe4cc4953c172cf7f9583eac1b54e23))
- **table:** optimize style performance ([#3706](https://github.com/ant-design/pro-components/issues/3706)) ([df59f7e](https://github.com/ant-design/pro-components/commit/df59f7e893ba59a564d253bbd7330d4ed7da2900))

## [2.54.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.54.1...@ant-design/pro-table@2.54.2) (2021-09-18)

**Note:** Version bump only for package @ant-design/pro-table

## [2.54.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.54.0...@ant-design/pro-table@2.54.1) (2021-09-18)

### Bug Fixes

- **utils:** use swr beta verison fix ie support ([#3697](https://github.com/ant-design/pro-components/issues/3697)) ([490bb96](https://github.com/ant-design/pro-components/commit/490bb9657285dda4b20d7c2252072baea59d7c51))

# [2.54.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.53.2...@ant-design/pro-table@2.54.0) (2021-09-17)

### Features

- **table:** support persistence stateMap ([#3684](https://github.com/ant-design/pro-components/issues/3684)) ([fa7cf30](https://github.com/ant-design/pro-components/commit/fa7cf302762b19155329be22b1b05a6f7504fd67))

## [2.53.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.53.1...@ant-design/pro-table@2.53.2) (2021-09-16)

### Bug Fixes

- **ProTable:** proFieldProps.proFieldKey custom key should priority over dataIndex ([#3665](https://github.com/ant-design/pro-components/issues/3665)) ([e074174](https://github.com/ant-design/pro-components/commit/e074174e84685266878ea0246c6a89db3082892c)), closes [#3658](https://github.com/ant-design/pro-components/issues/3658)

## [2.53.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.53.0...@ant-design/pro-table@2.53.1) (2021-09-10)

**Note:** Version bump only for package @ant-design/pro-table

# [2.53.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.52.0...@ant-design/pro-table@2.53.0) (2021-09-09)

### Features

- **table:** fix table empty style error ([#3552](https://github.com/ant-design/pro-components/issues/3552)) ([05ab05a](https://github.com/ant-design/pro-components/commit/05ab05a351624efdad0ac493ea4165e568539a48))

# [2.52.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.51.2...@ant-design/pro-table@2.52.0) (2021-09-07)

### Bug Fixes

- **form:** if valueType need request, note need request ([#3575](https://github.com/ant-design/pro-components/issues/3575)) ([41bb815](https://github.com/ant-design/pro-components/commit/41bb81540408659256da329fe0eb02e5c1583ea5))
- **Form:** 当原先在 url 中存在的字段被删除时，应该讲 params 中的该字段设置为 undefined, 以便触发 url 同步删除 ([#3558](https://github.com/ant-design/pro-components/issues/3558)) ([cbce2f8](https://github.com/ant-design/pro-components/commit/cbce2f8f6df5b1d19f29424368867c118941579a)), closes [Form#3547](https://github.com/Form/issues/3547) [#3547](https://github.com/ant-design/pro-components/issues/3547)
- **utils:** remove array move ([#3571](https://github.com/ant-design/pro-components/issues/3571)) ([f77f6e2](https://github.com/ant-design/pro-components/commit/f77f6e2d7ac041a7804af1aaa3612068bc539c0d))
- **utils:** use array-move latest version ([12ea1ff](https://github.com/ant-design/pro-components/commit/12ea1ffd6c421ad3ff2140cf9e7ff81a93b1174d))
- EditableTable 的类型 ValueType 提示补充 ([#3559](https://github.com/ant-design/pro-components/issues/3559)) ([cc3a87e](https://github.com/ant-design/pro-components/commit/cc3a87edfa043064293a5ededc771741b2e4c414))

### Features

- **form,field:** 增加 ProFormMoney 组件 ([#3588](https://github.com/ant-design/pro-components/issues/3588)) ([2435ac3](https://github.com/ant-design/pro-components/commit/2435ac34b968ebbbeb018ab070f94f344822eddd)), closes [Form#3547](https://github.com/Form/issues/3547) [#3547](https://github.com/ant-design/pro-components/issues/3547)

## [2.51.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.51.1...@ant-design/pro-table@2.51.2) (2021-08-30)

### Bug Fixes

- **utils:** add react-sortable-hoc ([0cbae03](https://github.com/ant-design/pro-components/commit/0cbae03bc246bd2390b86f1128345ea99035f3b6))

## [2.51.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.51.0...@ant-design/pro-table@2.51.1) (2021-08-30)

### Bug Fixes

- **table:** RecordCreator support return false ([83e93b6](https://github.com/ant-design/pro-components/commit/83e93b6e3f74083d0844f9e36501df7f05fe72b2))

# [2.51.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.50.1...@ant-design/pro-table@2.51.0) (2021-08-30)

### Bug Fixes

- **table:** fix tooltip no render dom ([#3543](https://github.com/ant-design/pro-components/issues/3543)) ([98e0a64](https://github.com/ant-design/pro-components/commit/98e0a648d3e90923e581b740279ee05e7769e3d3)), closes [#3473](https://github.com/ant-design/pro-components/issues/3473)

### Features

- ProTable 集成拖拽排序功能 ([#3420](https://github.com/ant-design/pro-components/issues/3420)) ([a33826a](https://github.com/ant-design/pro-components/commit/a33826a42dd5e1cc8cdf64d3ab8b36b53ddb8184))
- **layout:** support layout error boundaries ([#3551](https://github.com/ant-design/pro-components/issues/3551)) ([5b5f76a](https://github.com/ant-design/pro-components/commit/5b5f76a86df14ce42f12ce0e1e916e4b3b2ea357))

## [2.50.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.50.0...@ant-design/pro-table@2.50.1) (2021-08-26)

### Bug Fixes

- **form:** fix ranger date render error in table ([#3541](https://github.com/ant-design/pro-components/issues/3541)) ([3ba6022](https://github.com/ant-design/pro-components/commit/3ba6022c27be7c7b6fb7e8ba691d6f9e0cca9579))

# [2.50.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.49.0...@ant-design/pro-table@2.50.0) (2021-08-24)

### Features

- **table:** support column.chilren render ([#3487](https://github.com/ant-design/pro-components/issues/3487)) ([99cb645](https://github.com/ant-design/pro-components/commit/99cb645e51bb50e4cac7b6fd71666cb6efad5693))

# [2.49.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.48.0...@ant-design/pro-table@2.49.0) (2021-08-19)

### Bug Fixes

- **descriptions:** RequestData 类型优化 ([#3448](https://github.com/ant-design/pro-components/issues/3448)) ([d4253e0](https://github.com/ant-design/pro-components/commit/d4253e0efb330e06157f9739c638fe56722ad9eb))
- **table:** fix table reload style error ([6967fc6](https://github.com/ant-design/pro-components/commit/6967fc61f7a425379876b31086f90381695bd413))
- **table:** fix typo entry -> entity ([#3474](https://github.com/ant-design/pro-components/issues/3474)) ([e4fbb58](https://github.com/ant-design/pro-components/commit/e4fbb587d24b6f84ff7c2228ec1fe2d1c15a61ce))
- **table:** 添加滚动条，防止小屏幕下溢出 ([#3449](https://github.com/ant-design/pro-components/issues/3449)) ([cf23e82](https://github.com/ant-design/pro-components/commit/cf23e82dcd4263dd40a912ed6acebb8f9da3bf5e))
- setting extraUrlParams causes pageInfo to fail to sync to url ([#3439](https://github.com/ant-design/pro-components/issues/3439)) ([423f511](https://github.com/ant-design/pro-components/commit/423f511a5c876c585663130b6e2426f769a0b28f))

### Features

- **form:** support ProFormInstance types ([#3432](https://github.com/ant-design/pro-components/issues/3432)) ([e341b08](https://github.com/ant-design/pro-components/commit/e341b082994492eaca6773c325f37a3bebf29d00))

# [2.48.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.47.1...@ant-design/pro-table@2.48.0) (2021-08-09)

### Bug Fixes

- **table:** fix typo ([87850ec](https://github.com/ant-design/pro-components/commit/87850ecbb7574d83ef89e20b4d4a9d11eda179f7))

### Features

- **form:** FormItem support FilterDropdown ([#3381](https://github.com/ant-design/pro-components/issues/3381)) ([f5f7dbb](https://github.com/ant-design/pro-components/commit/f5f7dbb2730496a836d684840462c08715caff62))
- **table:** support defualt size ([#3383](https://github.com/ant-design/pro-components/issues/3383)) ([442f716](https://github.com/ant-design/pro-components/commit/442f716dcbd36dde436ebdf4a85a8fa6e9e3b1b1))

## [2.47.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.47.0...@ant-design/pro-table@2.47.1) (2021-08-05)

**Note:** Version bump only for package @ant-design/pro-table

# [2.47.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.46.1...@ant-design/pro-table@2.47.0) (2021-08-03)

### Features

- **list:** ProList add base proList ([#3361](https://github.com/ant-design/pro-components/issues/3361)) ([753afd8](https://github.com/ant-design/pro-components/commit/753afd81d0ca554f67bf92ef6dec1fab21efb8dd))

## [2.46.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.46.0...@ant-design/pro-table@2.46.1) (2021-07-30)

**Note:** Version bump only for package @ant-design/pro-table

# [2.46.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.45.0...@ant-design/pro-table@2.46.0) (2021-07-30)

### Bug Fixes

- **table:** fix ColumnSetting hover style error ([#3330](https://github.com/ant-design/pro-components/issues/3330)) ([7c9eca0](https://github.com/ant-design/pro-components/commit/7c9eca0f4946b2d2e816a0c66989fd67752c88cc))

### Features

- **table:** table rowSelection support alwaysShowAlert ([#3339](https://github.com/ant-design/pro-components/issues/3339)) ([f25d93f](https://github.com/ant-design/pro-components/commit/f25d93f5220c06ecdfa63ccd3d8973f2df1c887f))

# [2.45.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.44.0...@ant-design/pro-table@2.45.0) (2021-07-26)

### Bug Fixes

- **form:** 修复 QueryFilter 组件 optionRender 设为 false 无效问题 ([#3283](https://github.com/ant-design/pro-components/issues/3283)) ([e4ab640](https://github.com/ant-design/pro-components/commit/e4ab6409f16f918f73540420567552bff92edab6))

### Features

- **table:** support children column add function ([#3273](https://github.com/ant-design/pro-components/issues/3273)) ([2396e03](https://github.com/ant-design/pro-components/commit/2396e031d771ae818445d386e573898708b64f07))

# [2.44.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.43.6...@ant-design/pro-table@2.44.0) (2021-07-21)

### Features

- **table:** record function add new params dataSource ([#3278](https://github.com/ant-design/pro-components/issues/3278)) ([b532a70](https://github.com/ant-design/pro-components/commit/b532a70272c20b5fbab14a773f206a26418cf3c7))

## [2.43.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.43.5...@ant-design/pro-table@2.43.6) (2021-07-20)

### Bug Fixes

- **list:** fix form context no render error ([#3274](https://github.com/ant-design/pro-components/issues/3274)) ([851c408](https://github.com/ant-design/pro-components/commit/851c40870dab3c953109e6bfedd9650e10609449))

## [2.43.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.43.4...@ant-design/pro-table@2.43.5) (2021-07-19)

### Bug Fixes

- update demos ([40b4c15](https://github.com/ant-design/pro-components/commit/40b4c1528f4c724172519c1690037f3afbbd7597))

## [2.43.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.43.3...@ant-design/pro-table@2.43.4) (2021-07-06)

### Bug Fixes

- **table:** fix table listbar no render error ([#3154](https://github.com/ant-design/pro-components/issues/3154)) ([178e6e7](https://github.com/ant-design/pro-components/commit/178e6e7246c6a3bcf0a72fe52a381c5990592883))

## [2.43.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.43.2...@ant-design/pro-table@2.43.3) (2021-07-01)

### Bug Fixes

- **table:** fix table button no right error ([#3141](https://github.com/ant-design/pro-components/issues/3141)) ([1542386](https://github.com/ant-design/pro-components/commit/1542386f2b99de1bb803bce3d8317597c0738976))

## [2.43.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.43.1...@ant-design/pro-table@2.43.2) (2021-07-01)

### Bug Fixes

- **list:** fix list title node is null will render error ([#3138](https://github.com/ant-design/pro-components/issues/3138)) ([cfc9297](https://github.com/ant-design/pro-components/commit/cfc92977ca1a6451a3be2068255e5913c7882234))

## [2.43.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.43.0...@ant-design/pro-table@2.43.1) (2021-06-28)

### Bug Fixes

- **form:** fix reg inclubes “(” error ([#3103](https://github.com/ant-design/pro-components/issues/3103)) ([cc1f9d0](https://github.com/ant-design/pro-components/commit/cc1f9d06eb796df620f0f28f4764ff797a96692f))
- **table:** fix onSearch no work error ([#3097](https://github.com/ant-design/pro-components/issues/3097)) ([8c99641](https://github.com/ant-design/pro-components/commit/8c99641a547b6a7f34cb8842e69aaa9c6f047621))
- **table:** remove onchange form renderFormItem ([#3106](https://github.com/ant-design/pro-components/issues/3106)) ([00f5e44](https://github.com/ant-design/pro-components/commit/00f5e440eddf4e63c7af4b21bf9b315ee3363b32))

### Reverts

- Revert "fix(table): fix mergePagination order (#3050)" (#3111) ([2dd7a09](https://github.com/ant-design/pro-components/commit/2dd7a092e954e9bf8798eeda05edca5f83041c8a)), closes [#3050](https://github.com/ant-design/pro-components/issues/3050) [#3111](https://github.com/ant-design/pro-components/issues/3111)

# [2.43.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.42.1...@ant-design/pro-table@2.43.0) (2021-06-23)

### Bug Fixes

- **table:** fix mergePagination order ([#3050](https://github.com/ant-design/pro-components/issues/3050)) ([5df2144](https://github.com/ant-design/pro-components/commit/5df2144136f1588b5116f4c6d1aea2d4ebbdc472))

### Features

- **form:** SchemaForm support steps form ([#3058](https://github.com/ant-design/pro-components/issues/3058)) ([146f0fb](https://github.com/ant-design/pro-components/commit/146f0fb32e1f01b24917c225da4cb32e81861524))

## [2.42.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.42.0...@ant-design/pro-table@2.42.1) (2021-06-18)

### Bug Fixes

- **table:** fix selectedRows is null error ([#3045](https://github.com/ant-design/pro-components/issues/3045)) ([0c99a65](https://github.com/ant-design/pro-components/commit/0c99a6566538e41b35f52d36cde3f7d3dfcc8ab2))
- **table:** reset can not request ([#3046](https://github.com/ant-design/pro-components/issues/3046)) ([637291a](https://github.com/ant-design/pro-components/commit/637291a5e0a9bfc75d763838477cef24a7b3adb8))

# [2.42.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.41.0...@ant-design/pro-table@2.42.0) (2021-06-17)

### Features

- **table:** onSearch support return true ([#3033](https://github.com/ant-design/pro-components/issues/3033)) ([440e271](https://github.com/ant-design/pro-components/commit/440e271acba12d50c7c1af56d1ecf74b1cd4a802))

# [2.41.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.40.1...@ant-design/pro-table@2.41.0) (2021-06-15)

### Bug Fixes

- **table:** 处理分页问题 ([#2212](https://github.com/ant-design/pro-components/issues/2212)) ([#3008](https://github.com/ant-design/pro-components/issues/3008)) ([ac630f9](https://github.com/ant-design/pro-components/commit/ac630f9af0d7a5addbbbda2742a8d3b520c695cf))

### Features

- **table:** TableDropdown support all Menu.Item ([#2989](https://github.com/ant-design/pro-components/issues/2989)) ([907fdd4](https://github.com/ant-design/pro-components/commit/907fdd4f3113b52945083d739d37c4523da66684))

## [2.40.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.40.0...@ant-design/pro-table@2.40.1) (2021-06-09)

### Bug Fixes

- **table:** fix table rowselection bug when set false ([#2967](https://github.com/ant-design/pro-components/issues/2967)) ([b851407](https://github.com/ant-design/pro-components/commit/b851407a8f196ba4bd1106c097099ed562ccf195))

# [2.40.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.39.2...@ant-design/pro-table@2.40.0) (2021-06-08)

### Bug Fixes

- **form:** hideInForm is invalid ([#2889](https://github.com/ant-design/pro-components/issues/2889)) ([361941d](https://github.com/ant-design/pro-components/commit/361941d1cca0d7b6289a484b3366b3993fbec643))
- **pro-table:** fix alter style ([#2953](https://github.com/ant-design/pro-components/issues/2953)) ([d33b187](https://github.com/ant-design/pro-components/commit/d33b187c9e089c3472f4ed0213167953b119ff00))
- **table:** fix table ellipsis automatically ([#2948](https://github.com/ant-design/pro-components/issues/2948)) ([#2964](https://github.com/ant-design/pro-components/issues/2964)) ([e64b964](https://github.com/ant-design/pro-components/commit/e64b964b9de3857871c9b534e640b484157702e7))
- **table:** fix tree table no work error ([#2943](https://github.com/ant-design/pro-components/issues/2943)) ([b699812](https://github.com/ant-design/pro-components/commit/b699812b5dbcbf7985607e2d82bfb67fabfb2130))
- **table:** SelectedRowKeys 受控处理 selectRows ([#2446](https://github.com/ant-design/pro-components/issues/2446)) ([#2963](https://github.com/ant-design/pro-components/issues/2963)) ([52301dd](https://github.com/ant-design/pro-components/commit/52301dd4810ad7150710de04d8ea6f7a56f4b2c1))
- **table:** support three levels of nesting ([#2941](https://github.com/ant-design/pro-components/issues/2941)) ([c9dc346](https://github.com/ant-design/pro-components/commit/c9dc346c309d54da2b8b7c4a4500b1b54a0305cb))

### Features

- **form:** support more tooltip props ([#2932](https://github.com/ant-design/pro-components/issues/2932)) ([bedd7eb](https://github.com/ant-design/pro-components/commit/bedd7ebb0784da8fbb9c4998651f39f5efff5354))
- **table:** EditableTable support controlled ([#2965](https://github.com/ant-design/pro-components/issues/2965)) ([f5432f8](https://github.com/ant-design/pro-components/commit/f5432f899687c36fd7a6aa934860851a95bc1e31))
- **table:** onsave support origin data and no merge record ([#2949](https://github.com/ant-design/pro-components/issues/2949)) ([8c9d021](https://github.com/ant-design/pro-components/commit/8c9d0218c2d8927bae4fb0bad9a911a3b905d580))

## [2.39.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.39.1...@ant-design/pro-table@2.39.2) (2021-05-31)

**Note:** Version bump only for package @ant-design/pro-table

## [2.39.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.39.0...@ant-design/pro-table@2.39.1) (2021-05-28)

### Bug Fixes

- **table:** fix table shouldUpdate ([#2848](https://github.com/ant-design/pro-components/issues/2848)) ([6fa9928](https://github.com/ant-design/pro-components/commit/6fa9928273fc0c1c7c07d8273b59ec1e1854484d))

# [2.39.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.38.0...@ant-design/pro-table@2.39.0) (2021-05-25)

### Features

- **table:** eidt table use Proform ([#2832](https://github.com/ant-design/pro-components/issues/2832)) ([5c8b4ba](https://github.com/ant-design/pro-components/commit/5c8b4bac7169d2d0c091b1d1d9a68f03166abd88))

# [2.38.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.37.2...@ant-design/pro-table@2.38.0) (2021-05-24)

### Features

- **form:** form support request and params ([#2812](https://github.com/ant-design/pro-components/issues/2812)) ([8064293](https://github.com/ant-design/pro-components/commit/8064293532e9e937dea973be50d9e8fbc06c3aa9))

## [2.37.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.37.1...@ant-design/pro-table@2.37.2) (2021-05-23)

**Note:** Version bump only for package @ant-design/pro-table

## [2.37.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.37.0...@ant-design/pro-table@2.37.1) (2021-05-21)

### Bug Fixes

- **EditTable:** allowClear 清除值后保存数据没有更新 ([#2780](https://github.com/ant-design/pro-components/issues/2780)) ([1ac6bb3](https://github.com/ant-design/pro-components/commit/1ac6bb3cfd10160ef9ec6bd3d790005744314c06))
- **table:** if editableKeys change,should Cell Update ([#2803](https://github.com/ant-design/pro-components/issues/2803)) ([291e27e](https://github.com/ant-design/pro-components/commit/291e27ea073653fff3b0fbc4ef2466d6e4164b91))

# [2.37.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.36.0...@ant-design/pro-table@2.37.0) (2021-05-18)

### Bug Fixes

- **table:** tabs and menu add keys ([#2733](https://github.com/ant-design/pro-components/issues/2733)) ([310bc90](https://github.com/ant-design/pro-components/commit/310bc90b62e74a643bb50e7207185c388997c318))

### Features

- add table drag demo ([#2736](https://github.com/ant-design/pro-components/issues/2736)) ([cedb26e](https://github.com/ant-design/pro-components/commit/cedb26ee26733a1a9e83184b0a1a87b0e2866d60))

# [2.36.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.35.1...@ant-design/pro-table@2.36.0) (2021-05-11)

### Bug Fixes

- **table:** fix the style problem of the fixed new button ([#2661](https://github.com/ant-design/pro-components/issues/2661)) ([b80c99f](https://github.com/ant-design/pro-components/commit/b80c99fa298152adc9d4ef39ecfc2c2ac5e4c21f))
- **table:** toolbar fullScreen default value ([#2691](https://github.com/ant-design/pro-components/issues/2691)) ([4508cd4](https://github.com/ant-design/pro-components/commit/4508cd4c996ddbc28a03c4c06a9cff8b54a8574c))

### Features

- **table:** support sync pageinfo to url ([#2701](https://github.com/ant-design/pro-components/issues/2701)) ([384ca36](https://github.com/ant-design/pro-components/commit/384ca364e0606535e4538920d6ecc85cff70c164))

## [2.35.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.35.0...@ant-design/pro-table@2.35.1) (2021-04-29)

**Note:** Version bump only for package @ant-design/pro-table

# [2.35.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.34.5...@ant-design/pro-table@2.35.0) (2021-04-29)

### Bug Fixes

- **table:** only onFilter === true run defaultOnFilter ([#2640](https://github.com/ant-design/pro-components/issues/2640)) ([31ceede](https://github.com/ant-design/pro-components/commit/31ceedee0fd1570365f8e603d659c7cd43553b88))

### Features

- **form:** FieldSet support type=group ([#2628](https://github.com/ant-design/pro-components/issues/2628)) ([4e737dd](https://github.com/ant-design/pro-components/commit/4e737dd566a3eea4b292b427836c407523b3c48b))

## [2.34.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.34.4...@ant-design/pro-table@2.34.5) (2021-04-22)

### Bug Fixes

- **form:** fix transformKeySubmitValue will gen null value error ([#2571](https://github.com/ant-design/pro-components/issues/2571)) ([c3e5118](https://github.com/ant-design/pro-components/commit/c3e5118a91fa5bf9560e6cd036dca9864fac1b09))
- **form:** support moneySymbol=undefined ([#2579](https://github.com/ant-design/pro-components/issues/2579)) ([029482d](https://github.com/ant-design/pro-components/commit/029482d557c8de3cb761af59560aa5e7a9166082))
- **table:** fix the problem of nested data reporting errors ([#2578](https://github.com/ant-design/pro-components/issues/2578)) ([780510d](https://github.com/ant-design/pro-components/commit/780510d3f86008fe9346c5ce32c44577d563b878))
- **utils:** stop propagation icon event ([#2566](https://github.com/ant-design/pro-components/issues/2566)) ([7f0cab6](https://github.com/ant-design/pro-components/commit/7f0cab6cec7b52fc9237e977521903308f19793b))

## [2.34.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.34.3...@ant-design/pro-table@2.34.4) (2021-04-19)

**Note:** Version bump only for package @ant-design/pro-table

## [2.34.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.34.2...@ant-design/pro-table@2.34.3) (2021-04-19)

**Note:** Version bump only for package @ant-design/pro-table

## [2.34.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.34.1...@ant-design/pro-table@2.34.2) (2021-04-19)

### Bug Fixes

- **table:** fix add end will error in pagination ([#2529](https://github.com/ant-design/pro-components/issues/2529)) ([a74e410](https://github.com/ant-design/pro-components/commit/a74e410e8f6ffa3f84b455c4399130008ebb509c))

## [2.34.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.34.0...@ant-design/pro-table@2.34.1) (2021-04-15)

**Note:** Version bump only for package @ant-design/pro-table

# [2.34.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.33.0...@ant-design/pro-table@2.34.0) (2021-04-15)

### Bug Fixes

- **table:** better moblie style ([#2490](https://github.com/ant-design/pro-components/issues/2490)) ([20550a9](https://github.com/ant-design/pro-components/commit/20550a9cca89d0122d3f205148869534b3280d8c))
- **table:** defaultSortOrder and defaultFilteredValue ([#2392](https://github.com/ant-design/pro-components/issues/2392)) ([a930e1f](https://github.com/ant-design/pro-components/commit/a930e1f141ee0c87e9e373bc4efe76ba3faff9f7))
- **table:** fix ProTable always have form error ([#2488](https://github.com/ant-design/pro-components/issues/2488)) ([d0e68b1](https://github.com/ant-design/pro-components/commit/d0e68b1a86c349155b56406d00a87d9ab3167c85))
- **table:** fix style error when getPopupContainer ([#2481](https://github.com/ant-design/pro-components/issues/2481)) ([2bc9834](https://github.com/ant-design/pro-components/commit/2bc98348855bd697974811f12622a64c12403e68))
- **table:** fix text is 0, initialValue no work error ([#2412](https://github.com/ant-design/pro-components/issues/2412)) ([6bdd590](https://github.com/ant-design/pro-components/commit/6bdd590867c8f0ced15e3b4d46f90e82866e873c))
- **table:** if request is null,pageSize change no set datasoucre ([#2482](https://github.com/ant-design/pro-components/issues/2482)) ([8ea20ab](https://github.com/ant-design/pro-components/commit/8ea20ab7f4ae23555b404c5049577fe7c1442167))
- **table:** use user config tableLayout ([#2485](https://github.com/ant-design/pro-components/issues/2485)) ([5657ef0](https://github.com/ant-design/pro-components/commit/5657ef008eed6be9275972ea5a948393a434a72d))

### Features

- **form:** support SchemaForm ([#2040](https://github.com/ant-design/pro-components/issues/2040)) ([423f476](https://github.com/ant-design/pro-components/commit/423f4761eecde5a62c4a8476441aa0484ff94711))

# [2.33.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.32.2...@ant-design/pro-table@2.33.0) (2021-04-06)

### Features

- **table:** table column sorter supports field ([#2376](https://github.com/ant-design/pro-components/issues/2376)) ([e419c1b](https://github.com/ant-design/pro-components/commit/e419c1b2d381f2e22b858493147c74750b5b0bb8))

## [2.32.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.32.1...@ant-design/pro-table@2.32.2) (2021-03-31)

### Bug Fixes

- **table:** fix polling no work error ([3f8d318](https://github.com/ant-design/pro-components/commit/3f8d3187d7a416e8ff045eae106336133b30984d))

## [2.32.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.32.0...@ant-design/pro-table@2.32.1) (2021-03-31)

### Bug Fixes

- **table:** fix pagination no work error ([#2349](https://github.com/ant-design/pro-components/issues/2349)) ([0201893](https://github.com/ant-design/pro-components/commit/020189305f5d6453a8c559a7fe222a7f1a225dbc))

# [2.32.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.31.0...@ant-design/pro-table@2.32.0) (2021-03-29)

### Bug Fixes

- **form:** fix form item control no work error ([#2303](https://github.com/ant-design/pro-components/issues/2303)) ([65f0e4c](https://github.com/ant-design/pro-components/commit/65f0e4c869310ea9e305ffb8602f32e24c8a8726))
- **list:** fix list no use dataIndex error ([#2298](https://github.com/ant-design/pro-components/issues/2298)) ([81e1301](https://github.com/ant-design/pro-components/commit/81e1301507679e729b51c71ab43fda0a62846923))
- **table:** fix activeKey no work error ([#2299](https://github.com/ant-design/pro-components/issues/2299)) ([6d37832](https://github.com/ant-design/pro-components/commit/6d37832d117cd66fcb38784a02977fc0a4536606))
- **table:** fix polling alway run after unmount table ([#2308](https://github.com/ant-design/pro-components/issues/2308)) ([f23bb96](https://github.com/ant-design/pro-components/commit/f23bb966108dd0aca59e453d80bfebd0f1b64adc))
- **table:** fix textarea ellipsis no work error ([#2294](https://github.com/ant-design/pro-components/issues/2294)) ([81118d5](https://github.com/ant-design/pro-components/commit/81118d55943759f46f8e1e86b95bbac7cda04f69))
- **table:** omit className in treeData ([#2261](https://github.com/ant-design/pro-components/issues/2261)) ([63c10c6](https://github.com/ant-design/pro-components/commit/63c10c6c35886de274ff655ec8f8223568e9354a))

### Features

- **table:** search form support className ([#2254](https://github.com/ant-design/pro-components/issues/2254)) ([4b36710](https://github.com/ant-design/pro-components/commit/4b36710e6b314a2054b69b319bf071e3754727be))

# [2.31.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.8...@ant-design/pro-table@2.31.0) (2021-03-18)

### Features

- **utils:** upgrade inline-error-form-item ([#2168](https://github.com/ant-design/pro-components/issues/2168)) ([077c168](https://github.com/ant-design/pro-components/commit/077c1689c86484acae8d7e9146934c1af137a802))

## [2.30.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.7...@ant-design/pro-table@2.30.8) (2021-03-17)

**Note:** Version bump only for package @ant-design/pro-table

## [2.30.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.6...@ant-design/pro-table@2.30.7) (2021-03-16)

### Bug Fixes

- **form:** fix text is 0, initialValue no work error ([#2183](https://github.com/ant-design/pro-components/issues/2183)) ([e8f0d70](https://github.com/ant-design/pro-components/commit/e8f0d709fa7b7b870fcd2d2a1b9077f6031ed204))

## [2.30.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.5...@ant-design/pro-table@2.30.6) (2021-03-11)

**Note:** Version bump only for package @ant-design/pro-table

## [2.30.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.4...@ant-design/pro-table@2.30.5) (2021-03-11)

### Bug Fixes

- **table:** remove dragicon ([#2124](https://github.com/ant-design/pro-components/issues/2124)) ([49e1023](https://github.com/ant-design/pro-components/commit/49e1023edccef07c7397fd0adf1d1c38af552626))

## [2.30.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.3...@ant-design/pro-table@2.30.4) (2021-03-08)

### Bug Fixes

- **table:** fix tooltip no work error ([#2079](https://github.com/ant-design/pro-components/issues/2079)) ([9838b9a](https://github.com/ant-design/pro-components/commit/9838b9a7954ab4cb167a8643ef9854ead25fef47))

## [2.30.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.2...@ant-design/pro-table@2.30.3) (2021-02-28)

**Note:** Version bump only for package @ant-design/pro-table

## [2.30.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.1...@ant-design/pro-table@2.30.2) (2021-02-25)

### Bug Fixes

- **form:** form list support formlist ([#1995](https://github.com/ant-design/pro-components/issues/1995)) ([94e5d7b](https://github.com/ant-design/pro-components/commit/94e5d7b28bf0d2677da2dab2afbb1388bfaa9502))

## [2.30.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.30.0...@ant-design/pro-table@2.30.1) (2021-02-23)

### Bug Fixes

- **table:** export Table.Summary ([#1943](https://github.com/ant-design/pro-components/issues/1943)) ([a3ec1b2](https://github.com/ant-design/pro-components/commit/a3ec1b2a48ce67d56caf1bf1a0c5562c34d0d7f7))
- **table:** manualRequest may not working. ([#1963](https://github.com/ant-design/pro-components/issues/1963)) ([4eef300](https://github.com/ant-design/pro-components/commit/4eef300948b44c14f635bc702fb865ce35527a08))
- **table:** remove unnecessary tooltip ([#1907](https://github.com/ant-design/pro-components/issues/1907)) ([932a769](https://github.com/ant-design/pro-components/commit/932a7698c4ad3f4d896544aba5319cdb07143c2b))

# [2.30.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.29.0...@ant-design/pro-table@2.30.0) (2021-02-22)

### Bug Fixes

- **field:** omit fieldProps and support onChange ([#1886](https://github.com/ant-design/pro-components/issues/1886)) ([8d7c963](https://github.com/ant-design/pro-components/commit/8d7c9639073822daa554db07a5f0c8c0ea334a65))
- **form:** fix error message no work error ([#1875](https://github.com/ant-design/pro-components/issues/1875)) ([584a73a](https://github.com/ant-design/pro-components/commit/584a73a18aadc339202f34306edaa20d849e6c23))
- **layout:** use @umijs/use-params ([#1895](https://github.com/ant-design/pro-components/issues/1895)) ([80aac76](https://github.com/ant-design/pro-components/commit/80aac7665115c8f884c473d78c2fcc12ac042bb3))
- **table:** no has colSize on renderFormItem ([#1876](https://github.com/ant-design/pro-components/issues/1876)) ([98b6afd](https://github.com/ant-design/pro-components/commit/98b6afd93248a33e457c71234d7f4dbc9ce77bf0))
- **table:** set function to aysnc ([8751290](https://github.com/ant-design/pro-components/commit/8751290d02b706db1d9f435c97af2a9e71b1d59d))

### Features

- **table:** editable support form config ([#1879](https://github.com/ant-design/pro-components/issues/1879)) ([2fd7dff](https://github.com/ant-design/pro-components/commit/2fd7dff2c163fc9f5cd7f98739130ba4f7b4a9ee))

# [2.29.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.28.0...@ant-design/pro-table@2.29.0) (2021-02-04)

### Bug Fixes

- **form:** fix form control error ([#1833](https://github.com/ant-design/pro-components/issues/1833)) ([541c7b3](https://github.com/ant-design/pro-components/commit/541c7b35a0faf2c682fe26dca43b2102ba955cd0))
- **list:** fix list item no key error ([#1836](https://github.com/ant-design/pro-components/issues/1836)) ([2690cd6](https://github.com/ant-design/pro-components/commit/2690cd6d81dc99e86b136405afd289d4b6eb9316))
- **table:** fix editabletable initialValue alaway rewirte ([#1834](https://github.com/ant-design/pro-components/issues/1834)) ([b86b7e8](https://github.com/ant-design/pro-components/commit/b86b7e8a2f1bbb018863ef9a50bac8e82ce9a8f8))
- **table:** fix table no close loading when error ([#1832](https://github.com/ant-design/pro-components/issues/1832)) ([0ee772e](https://github.com/ant-design/pro-components/commit/0ee772ea78817258085b0f101c3f38609b4c4fd2))
- **table:** fix table unmount warning ([#1840](https://github.com/ant-design/pro-components/issues/1840)) ([826ff42](https://github.com/ant-design/pro-components/commit/826ff42ad18e49865f9255de4f64ee83b2836092))
- **table:** fix toNumber will gen 0 start number ([#1850](https://github.com/ant-design/pro-components/issues/1850)) ([63ca3b8](https://github.com/ant-design/pro-components/commit/63ca3b824501eae102f8b0098b5645740acab7ed))

### Features

- **table:** actionRef add pageInfo ([#1851](https://github.com/ant-design/pro-components/issues/1851)) ([7370cba](https://github.com/ant-design/pro-components/commit/7370cba941b350b0e93fcd135dd12623d66ea511))

# [2.28.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.27.2...@ant-design/pro-table@2.28.0) (2021-02-02)

### Bug Fixes

- **table:** fix fieldProps no has bug ([#1776](https://github.com/ant-design/pro-components/issues/1776)) ([01e67a4](https://github.com/ant-design/pro-components/commit/01e67a45ef0f977e38688ab727dde878b11dd338))
- **table:** fix manualRequest always show loading error ([#1767](https://github.com/ant-design/pro-components/issues/1767)) ([17d92e6](https://github.com/ant-design/pro-components/commit/17d92e6f5a5e0986b9066fe7ea8f5f27b54f0576))
- **table:** LightFilter dosn't render if options={false} ([#1802](https://github.com/ant-design/pro-components/issues/1802)) ([38ad131](https://github.com/ant-design/pro-components/commit/38ad13150a504e0529ac07c543616472dbcfeaca))
- **table:** reset messageVariables to label ([#1773](https://github.com/ant-design/pro-components/issues/1773)) ([baa8b65](https://github.com/ant-design/pro-components/commit/baa8b659980d6695b609a334251a003f0f50ae2d))

### Features

- **descriptions:** descriptions Columns support order ([#1763](https://github.com/ant-design/pro-components/issues/1763)) ([b004d9d](https://github.com/ant-design/pro-components/commit/b004d9d41fde2e0a75bcbe23e2ffcf8f70f837cb))
- **list:** proList support checkox alert ([#1821](https://github.com/ant-design/pro-components/issues/1821)) ([8784360](https://github.com/ant-design/pro-components/commit/8784360b3238064c67d1782ad67d9aecbfa4a490))

## [2.27.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.27.1...@ant-design/pro-table@2.27.2) (2021-01-25)

### Bug Fixes

- **table:** fix column dragger problem ([#1730](https://github.com/ant-design/pro-components/issues/1730)) ([77fb14a](https://github.com/ant-design/pro-components/commit/77fb14a852f51003aa7713c83201d20e18a7565f))
- **table:** fix polling times ([#1739](https://github.com/ant-design/pro-components/issues/1739)) ([2005764](https://github.com/ant-design/pro-components/commit/2005764c43ef37bc078f5bb23beca71b95140bbf))
- **table:** fix the problem that it still executes when polling=false ([#1747](https://github.com/ant-design/pro-components/issues/1747)) ([5c8ecfa](https://github.com/ant-design/pro-components/commit/5c8ecfa5ad36a558315089455d4e29dc22aa8b3c))

## [2.27.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.27.0...@ant-design/pro-table@2.27.1) (2021-01-21)

### Bug Fixes

- **table:** fix table reset pageSize ([85ab498](https://github.com/ant-design/pro-components/commit/85ab4989ef872645294fe85a5fc60b5b9c653a19))

# [2.27.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.26.1...@ant-design/pro-table@2.27.0) (2021-01-21)

### Bug Fixes

- **form:** fix StepsForm onFinish error ([#1714](https://github.com/ant-design/pro-components/issues/1714)) ([380b8ee](https://github.com/ant-design/pro-components/commit/380b8eea5f59a5fb09c896509a5958389e32b08b))
- **pro-table:** on option search resetPageIndex ([#1689](https://github.com/ant-design/pro-components/issues/1689)) ([092ce34](https://github.com/ant-design/pro-components/commit/092ce342f6299f45d9491f202ef6042e6a188cc0))
- **table:** stop passing prop ignoreRules to Form ([#1699](https://github.com/ant-design/pro-components/issues/1699)) ([c5bcbdf](https://github.com/ant-design/pro-components/commit/c5bcbdfead692f633a9ab061c3edb6d241c47824))

### Features

- **table:** EditableProTable support onValuesChange ([#1713](https://github.com/ant-design/pro-components/issues/1713)) ([8e67799](https://github.com/ant-design/pro-components/commit/8e67799125e37c44d356166a309479c611895d86))
- **table:** proTable supports polling ([#1694](https://github.com/ant-design/pro-components/issues/1694)) ([b37fe69](https://github.com/ant-design/pro-components/commit/b37fe69c53363acfc431900e01d6c5512fdae118))

## [2.26.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.26.0...@ant-design/pro-table@2.26.1) (2021-01-18)

**Note:** Version bump only for package @ant-design/pro-table

# [2.26.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.25.1...@ant-design/pro-table@2.26.0) (2021-01-18)

### Bug Fixes

- **form:** query form support open rules ([#1653](https://github.com/ant-design/pro-components/issues/1653)) ([5833ea2](https://github.com/ant-design/pro-components/commit/5833ea2c0e5279a143d9e4cd53a0036d1c2fd4f1))

### Features

- **form:** support sync url ([#1650](https://github.com/ant-design/pro-components/issues/1650)) ([df6a8ec](https://github.com/ant-design/pro-components/commit/df6a8ec7340891691334ab4acc1c7d8679f649d7))
- **table:** support hideInSetting props ([#1651](https://github.com/ant-design/pro-components/issues/1651)) ([2dee954](https://github.com/ant-design/pro-components/commit/2dee95453c79de23d967f285bb8aa9351b8b8cb0))
- **table:** table support editable.onValuesChange ([#1644](https://github.com/ant-design/pro-components/issues/1644)) ([2017a46](https://github.com/ant-design/pro-components/commit/2017a463fd74fbd6334b2154b59ed0b4f48c4d89))

## [2.25.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.25.0...@ant-design/pro-table@2.25.1) (2021-01-13)

### Bug Fixes

- **form:** default render form ([#1611](https://github.com/ant-design/pro-components/issues/1611)) ([fcdfeb6](https://github.com/ant-design/pro-components/commit/fcdfeb659c776250c7b70c4d71db2ac0609ee550))
- **form:** fix the problem of duplicate form fields ([#1607](https://github.com/ant-design/pro-components/issues/1607)) ([fe237a3](https://github.com/ant-design/pro-components/commit/fe237a3b99738cc19afb8ff63551f5c08076dad7))
- **table:** docs debounce time api ([#1599](https://github.com/ant-design/pro-components/issues/1599)) ([146d49b](https://github.com/ant-design/pro-components/commit/146d49b93ecbfb0efc0d31e114c5101d1f79de79))

# [2.25.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.24.0...@ant-design/pro-table@2.25.0) (2021-01-13)

### Features

- table request add debounce wait ([#1591](https://github.com/ant-design/pro-components/issues/1591)) ([a75eb4c](https://github.com/ant-design/pro-components/commit/a75eb4c9ec210c22afaf3a0940ead445ed3dc832))

# [2.24.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.23.0...@ant-design/pro-table@2.24.0) (2021-01-12)

### Bug Fixes

- **table:** table support data is partial ([a0f592e](https://github.com/ant-design/pro-components/commit/a0f592e8275882df2bc26aa6c7c224a517e265f7))

### Features

- **table:** table columns use tree ([#1583](https://github.com/ant-design/pro-components/issues/1583)) ([821d54f](https://github.com/ant-design/pro-components/commit/821d54f1f77337155e314f0a95cab04ae80adc8e))

# [2.23.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.22.2...@ant-design/pro-table@2.23.0) (2021-01-11)

### Bug Fixes

- **table:** optimised type to suit oneapi ([#1576](https://github.com/ant-design/pro-components/issues/1576)) ([44054e2](https://github.com/ant-design/pro-components/commit/44054e2cc64fb4f8d21c39612271f01cb3fc39d8))

### Features

- **table:** editable table add tableViewRender ([#1572](https://github.com/ant-design/pro-components/issues/1572)) ([457f814](https://github.com/ant-design/pro-components/commit/457f81405debc2e7f0daf8bce8ab30e07dfbaa6f))

## [2.22.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.22.1...@ant-design/pro-table@2.22.2) (2021-01-11)

### Bug Fixes

- **field:** fix valueEnum disabled no work error ([#1567](https://github.com/ant-design/pro-components/issues/1567)) ([a643747](https://github.com/ant-design/pro-components/commit/a643747da6acc5784c75ce6e9bc119a0965ddb29))

## [2.22.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.22.0...@ant-design/pro-table@2.22.1) (2021-01-08)

### Bug Fixes

- **descriptions:** support ErrorBoundary ([#1541](https://github.com/ant-design/pro-components/issues/1541)) ([15a1601](https://github.com/ant-design/pro-components/commit/15a1601e2f553ab97aae8133f8b6b924698b42ff))
- **form:** fix defaultColsNumber no work error ([#1551](https://github.com/ant-design/pro-components/issues/1551)) ([4a30512](https://github.com/ant-design/pro-components/commit/4a305123f82ed26f9bac170aad887a6398c51cdd))
- **form:** fix transform no work when namePath is array ([#1537](https://github.com/ant-design/pro-components/issues/1537)) ([ca244fe](https://github.com/ant-design/pro-components/commit/ca244fe2c17a2a397909340d23cbed49a1b2c5a9))
- **table:** fix filters or onFilter style error ([#1539](https://github.com/ant-design/pro-components/issues/1539)) ([d6cde92](https://github.com/ant-design/pro-components/commit/d6cde927e8f43fc453b50ff20454016861bbd792))
- **table:** fix hover dom style error ([#1538](https://github.com/ant-design/pro-components/issues/1538)) ([7a152aa](https://github.com/ant-design/pro-components/commit/7a152aa8cd177d6902de5acf05277b2341508539))

# [2.22.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.21.1...@ant-design/pro-table@2.22.0) (2021-01-07)

### Features

- **table:** reset will rest form values ([#1518](https://github.com/ant-design/pro-components/issues/1518)) ([b4b218f](https://github.com/ant-design/pro-components/commit/b4b218fb68c6f30d1428ec5c4ff085f87d960ac5))

## [2.21.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.21.0...@ant-design/pro-table@2.21.1) (2021-01-06)

**Note:** Version bump only for package @ant-design/pro-table

# [2.21.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.20.1...@ant-design/pro-table@2.21.0) (2021-01-05)

### Features

- **field:** text use CompositionInput ([#1499](https://github.com/ant-design/pro-components/issues/1499)) ([4f26efb](https://github.com/ant-design/pro-components/commit/4f26efb81a7592868e6e863ca6fbb59cb6918016))

## [2.20.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.20.0...@ant-design/pro-table@2.20.1) (2021-01-05)

**Note:** Version bump only for package @ant-design/pro-table

# [2.20.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.19.1...@ant-design/pro-table@2.20.0) (2021-01-04)

### Bug Fixes

- **list:** fix editable for list ([#1481](https://github.com/ant-design/pro-components/issues/1481)) ([64c8fb9](https://github.com/ant-design/pro-components/commit/64c8fb91dc9cdea2575f3018ce63fdf101b63c2b))

### Features

- **field:** support image valueType ([#1480](https://github.com/ant-design/pro-components/issues/1480)) ([08b36e2](https://github.com/ant-design/pro-components/commit/08b36e24ff077392572c625b6fb3d119afeb44ea))

## [2.19.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.19.0...@ant-design/pro-table@2.19.1) (2021-01-02)

### Bug Fixes

- **table:** fix colSize no work error ([#1470](https://github.com/ant-design/pro-components/issues/1470)) ([fe1ce2e](https://github.com/ant-design/pro-components/commit/fe1ce2e8129187fc31427f0d63efc3b0c8663fca))
- **table:** fix the compatibility problem of sorting ([#1471](https://github.com/ant-design/pro-components/issues/1471)) ([ee3191a](https://github.com/ant-design/pro-components/commit/ee3191afdecbd7ec6bed8b2e1982115747e317df))

# [2.19.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.18.3...@ant-design/pro-table@2.19.0) (2021-01-01)

### Bug Fixes

- **table:** fix table form submit time error ([#1466](https://github.com/ant-design/pro-components/issues/1466)) ([5591a87](https://github.com/ant-design/pro-components/commit/5591a8754d0e911eecdd8bdac7b5d010e2824451))

### Features

- **table:** support customization valueType ([#1456](https://github.com/ant-design/pro-components/issues/1456)) ([cbce5ba](https://github.com/ant-design/pro-components/commit/cbce5baf9ae456a1ab32a748e7ac86ee592b4344))

## [2.18.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.18.2...@ant-design/pro-table@2.18.3) (2020-12-31)

**Note:** Version bump only for package @ant-design/pro-table

## [2.18.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.18.1...@ant-design/pro-table@2.18.2) (2020-12-31)

### Bug Fixes

- **table:** reloadAndRest should reset page index ([#1444](https://github.com/ant-design/pro-components/issues/1444)) ([629cec2](https://github.com/ant-design/pro-components/commit/629cec2a172e07a967be6db50abf57da84f16048))

## [2.18.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.18.0...@ant-design/pro-table@2.18.1) (2020-12-28)

### Bug Fixes

- **layout:** not use important ([babf934](https://github.com/ant-design/pro-components/commit/babf9340678e7b82f75752db113dbb11330295d6))

# [2.18.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.17.3...@ant-design/pro-table@2.18.0) (2020-12-28)

### Features

- **field:** 在 labelInVaue 的场景下能显示备选项里不存在的 valuezhi ([#1390](https://github.com/ant-design/pro-components/issues/1390)) ([e89f65e](https://github.com/ant-design/pro-components/commit/e89f65e86c0d21cf3b591dc300a3af6862545d82))

## [2.17.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.17.2...@ant-design/pro-table@2.17.3) (2020-12-28)

### Bug Fixes

- **table:** fix onfilter no work error ([#1422](https://github.com/ant-design/pro-components/issues/1422)) ([4fb9e4b](https://github.com/ant-design/pro-components/commit/4fb9e4b8a85a1374ab0d0710b6796d3b09ced06a))

## [2.17.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.17.1...@ant-design/pro-table@2.17.2) (2020-12-25)

**Note:** Version bump only for package @ant-design/pro-table

## [2.17.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.17.0...@ant-design/pro-table@2.17.1) (2020-12-25)

### Bug Fixes

- **layout:** add PageLoading ([0153505](https://github.com/ant-design/pro-components/commit/0153505ccf6e009137d2e75d41f80830c709174d))

# [2.17.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.16.4...@ant-design/pro-table@2.17.0) (2020-12-24)

### Bug Fixes

- **table:** Filter de parameters van beforeSearchSubmit ([#1384](https://github.com/ant-design/pro-components/issues/1384)) ([5bd26f0](https://github.com/ant-design/pro-components/commit/5bd26f09fa7d633e42aac333bed3a34535557e3c)), closes [#1382](https://github.com/ant-design/pro-components/issues/1382)

### Features

- **chore:** adjust information structure ([#1383](https://github.com/ant-design/pro-components/issues/1383)) ([76b3f29](https://github.com/ant-design/pro-components/commit/76b3f2929c5a5dcd4ed78e723b2a01e3a5cdfbf5)), closes [#1376](https://github.com/ant-design/pro-components/issues/1376) [#1380](https://github.com/ant-design/pro-components/issues/1380)

## [2.16.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.16.3...@ant-design/pro-table@2.16.4) (2020-12-21)

**Note:** Version bump only for package @ant-design/pro-table

## [2.16.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.16.2...@ant-design/pro-table@2.16.3) (2020-12-21)

### Bug Fixes

- **table:** 设置 pageSize 后，查询或重置没获取最新的 pageSize ([#1352](https://github.com/ant-design/pro-components/issues/1352)) ([535d93a](https://github.com/ant-design/pro-components/commit/535d93a5da4861a3901750b88e04f4728acfb20b))

## [2.16.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.16.1...@ant-design/pro-table@2.16.2) (2020-12-17)

**Note:** Version bump only for package @ant-design/pro-table

## [2.16.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.16.0...@ant-design/pro-table@2.16.1) (2020-12-15)

**Note:** Version bump only for package @ant-design/pro-table

# [2.16.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.15.1...@ant-design/pro-table@2.16.0) (2020-12-14)

### Features

- **desciption:** support editable ([#1273](https://github.com/ant-design/pro-components/issues/1273)) ([bc8821b](https://github.com/ant-design/pro-components/commit/bc8821bce05faadaa7d9337ae2287131c41791e0))
- **table:** EditableTable support max length ([#1286](https://github.com/ant-design/pro-components/issues/1286)) ([dac9844](https://github.com/ant-design/pro-components/commit/dac9844e42ed19d5a539b6b0eae42ea35d6f958d))

## [2.15.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.15.0...@ant-design/pro-table@2.15.1) (2020-12-10)

**Note:** Version bump only for package @ant-design/pro-table

# [2.15.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.14.0...@ant-design/pro-table@2.15.0) (2020-12-09)

### Bug Fixes

- **colsize:** fix colsize warning ([#1245](https://github.com/ant-design/pro-components/issues/1245)) ([af674b6](https://github.com/ant-design/pro-components/commit/af674b661f53ef7f537bd49bea32784274cf0d34))
- **table:** remove unuse code ([#1243](https://github.com/ant-design/pro-components/issues/1243)) ([922496c](https://github.com/ant-design/pro-components/commit/922496cf7dafeb024a8c2cb742c9c4d60f6970eb))

### Features

- **table:** add "colSize" in fieldProps within proTable's columns to customize query form item width ([#1229](https://github.com/ant-design/pro-components/issues/1229)) ([4ca6370](https://github.com/ant-design/pro-components/commit/4ca63709fbc8df7b850bb5e81b1f11e578775f0f))

# [2.14.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.13.3...@ant-design/pro-table@2.14.0) (2020-12-08)

### Bug Fixes

- avoid exceptions when text is undefined ([#1192](https://github.com/ant-design/pro-components/issues/1192)) ([f12ed9b](https://github.com/ant-design/pro-components/commit/f12ed9bd589bfd4d5a0804f15f44f0606e1c3c49))

### Features

- **table:** fieldProps support function ([#1227](https://github.com/ant-design/pro-components/issues/1227)) ([bc34fb0](https://github.com/ant-design/pro-components/commit/bc34fb0ce11d006c83b06166f6cf8903bd5d3e1a))

## [2.13.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.13.2...@ant-design/pro-table@2.13.3) (2020-12-07)

### Bug Fixes

- **table:** fix formItemProps no work error ([#1222](https://github.com/ant-design/pro-components/issues/1222)) ([aed476d](https://github.com/ant-design/pro-components/commit/aed476d38006ad7b37aa5583a644e4a434ddc566))

## [2.13.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.13.1...@ant-design/pro-table@2.13.2) (2020-12-04)

### Bug Fixes

- **table:** onSave support newLineConfig ([576042c](https://github.com/ant-design/pro-components/commit/576042cc0ef5715a173b544320cdec5920ac18a8))

## [2.13.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.13.0...@ant-design/pro-table@2.13.1) (2020-12-03)

**Note:** Version bump only for package @ant-design/pro-table

# [2.13.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.12.2...@ant-design/pro-table@2.13.0) (2020-12-03)

### Features

- **field:** support new valueType `second` ([#1177](https://github.com/ant-design/pro-components/issues/1177)) ([3c45102](https://github.com/ant-design/pro-components/commit/3c45102763bbfa05b481aa0c8462912179a1dfbf))

## [2.12.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.12.1...@ant-design/pro-table@2.12.2) (2020-12-02)

### Bug Fixes

- **table:** fix protable form types error ([#1158](https://github.com/ant-design/pro-components/issues/1158)) ([21c12f3](https://github.com/ant-design/pro-components/commit/21c12f3d828cb0747a1b10a4c71d9aa16d91f09e))
- **table:** support children of column in EditableProTable ([#1161](https://github.com/ant-design/pro-components/issues/1161)) ([738c053](https://github.com/ant-design/pro-components/commit/738c053511f133e30a7f4642f735a4193f8d16b1))
- **table:** support onlyAddOneLineAlertMessage and onlyOneLineEditorAlertMessage ([#1157](https://github.com/ant-design/pro-components/issues/1157)) ([9193b8a](https://github.com/ant-design/pro-components/commit/9193b8a6e3fd3fe0a7e621b50cdcb1f98694322b))

## [2.12.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.12.0...@ant-design/pro-table@2.12.1) (2020-11-30)

### Bug Fixes

- **table:** fix editable table show rules error ([#1129](https://github.com/ant-design/pro-components/issues/1129)) ([a0c5af3](https://github.com/ant-design/pro-components/commit/a0c5af3c645b6c336f5d2a231a18eced4b8817b1))

# [2.12.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.11.4...@ant-design/pro-table@2.12.0) (2020-11-27)

### Bug Fixes

- **table:** optimize table demos and table style. ([#1105](https://github.com/ant-design/pro-components/issues/1105)) ([6e6437e](https://github.com/ant-design/pro-components/commit/6e6437e621200932a24a9199ee729ff4253d71c0))

### Features

- **form:** add table demos and fix form layout styles ([#1069](https://github.com/ant-design/pro-components/issues/1069)) ([4a25cf2](https://github.com/ant-design/pro-components/commit/4a25cf2b2475e534598360e0d62b6a0a3cf69354))
- **table:** support editor table ([#994](https://github.com/ant-design/pro-components/issues/994)) ([35f40fe](https://github.com/ant-design/pro-components/commit/35f40feb72dd10ea6fefb7d6a59943d43d0a7325))
- **table:** table support fieldProps.onChange ([#1068](https://github.com/ant-design/pro-components/issues/1068)) ([b8fe662](https://github.com/ant-design/pro-components/commit/b8fe662fd042dda92c4ad0e35c24e1afe2870996))

## [2.11.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.11.3...@ant-design/pro-table@2.11.4) (2020-11-19)

**Note:** Version bump only for package @ant-design/pro-table

## [2.11.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.11.2...@ant-design/pro-table@2.11.3) (2020-11-19)

### Bug Fixes

- **table:** fix the problem that the table rendering is not timely ([#1024](https://github.com/ant-design/pro-components/issues/1024)) ([19d3af5](https://github.com/ant-design/pro-components/commit/19d3af58e692dbfa5a4b32644afe9672ba5719cf))

## [2.11.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.11.1...@ant-design/pro-table@2.11.2) (2020-11-18)

**Note:** Version bump only for package @ant-design/pro-table

## [2.11.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.11.0...@ant-design/pro-table@2.11.1) (2020-11-17)

**Note:** Version bump only for package @ant-design/pro-table

# [2.11.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.10.1...@ant-design/pro-table@2.11.0) (2020-11-17)

### Features

- **form:** support readonly ([#963](https://github.com/ant-design/pro-components/issues/963)) ([2b27e91](https://github.com/ant-design/pro-components/commit/2b27e917707c530c2a9d9c91fa27c1b663a07bf4))

## [2.10.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.10.0...@ant-design/pro-table@2.10.1) (2020-11-10)

**Note:** Version bump only for package @ant-design/pro-table

# [2.10.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.16...@ant-design/pro-table@2.10.0) (2020-11-09)

### Features

- **table:** 修复 ListToolBar 样式问题 & 调整部分 Table 样式的 demo ([#918](https://github.com/ant-design/pro-components/issues/918)) ([a217c6e](https://github.com/ant-design/pro-components/commit/a217c6ea309f5232fd1864b2d886f449f49f2b6a))

## [2.9.16](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.15...@ant-design/pro-table@2.9.16) (2020-11-04)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.15](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.14...@ant-design/pro-table@2.9.15) (2020-11-02)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.14](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.13...@ant-design/pro-table@2.9.14) (2020-11-02)

### Bug Fixes

- **table:** table 工具栏：options 为 false 时，不显示父级节点 ([#866](https://github.com/ant-design/pro-components/issues/866)) ([11d310c](https://github.com/ant-design/pro-components/commit/11d310c4b3697bb4a1029ef69018c11bd4c77447))

## [2.9.13](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.12...@ant-design/pro-table@2.9.13) (2020-10-29)

### Bug Fixes

- **table:** options or fullScreen is null, not render ConfigProvider ([#854](https://github.com/ant-design/pro-components/issues/854)) ([004abb9](https://github.com/ant-design/pro-components/commit/004abb90a9d002de0c13223ac27ac98b34b3341b))
- **table:** renderFormItem should run in form init ([#852](https://github.com/ant-design/pro-components/issues/852)) ([612b04a](https://github.com/ant-design/pro-components/commit/612b04a7225ccc93b8c081d268981d988c333d4c))

## [2.9.12](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.11...@ant-design/pro-table@2.9.12) (2020-10-26)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.10...@ant-design/pro-table@2.9.11) (2020-10-23)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.9...@ant-design/pro-table@2.9.10) (2020-10-23)

### Bug Fixes

- **layout:** fix PageContainer header ts definition ([#817](https://github.com/ant-design/pro-components/issues/817)) ([80e5b60](https://github.com/ant-design/pro-components/commit/80e5b605f2dd7c69ea2bc5607d41087926394262))

## [2.9.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.8...@ant-design/pro-table@2.9.9) (2020-10-22)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.7...@ant-design/pro-table@2.9.8) (2020-10-21)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.6...@ant-design/pro-table@2.9.7) (2020-10-19)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.5...@ant-design/pro-table@2.9.6) (2020-10-16)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.4...@ant-design/pro-table@2.9.5) (2020-10-15)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.3...@ant-design/pro-table@2.9.4) (2020-10-15)

### Bug Fixes

- **table:** Fix pro-table 在卸载之后仍然设值，导致 react 报错 ([#693](https://github.com/ant-design/pro-components/issues/693)) ([90cdb91](https://github.com/ant-design/pro-components/commit/90cdb913720e548106980ef9eac565e22e0d9824))
- **table:** perfect unmount judgment ([68362db](https://github.com/ant-design/pro-components/commit/68362db7081aced76984149785913c6a69e0ebf7))

## [2.9.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.2...@ant-design/pro-table@2.9.3) (2020-10-12)

**Note:** Version bump only for package @ant-design/pro-table

## [2.9.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.9.0...@ant-design/pro-table@2.9.2) (2020-10-12)

**Note:** Version bump only for package @ant-design/pro-table

# [2.9.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.8.1...@ant-design/pro-table@2.9.0) (2020-09-29)

### Bug Fixes

- **table:** 修改 protable 组件，使用 ellipsis 属性时，同时出现 tooltips 和 title 两种提示 ([#598](https://github.com/ant-design/pro-components/issues/598)) ([170853b](https://github.com/ant-design/pro-components/commit/170853b9ac28407bad70732d8e6bc9356bbf3b1e))
- **table:** 将 table 的 loading 属性改为全受控 ([#563](https://github.com/ant-design/pro-components/issues/563)) ([291401d](https://github.com/ant-design/pro-components/commit/291401d1d88ea2bb46fc5bac1ce558aaaff9e682))

### Features

- ProTable & ProList support LightFilter ([#622](https://github.com/ant-design/pro-components/issues/622)) ([ce925c1](https://github.com/ant-design/pro-components/commit/ce925c191330956dadbad752b25ad4c7481d9663))
- **list:** new ProList 1.x! ([#556](https://github.com/ant-design/pro-components/issues/556)) ([f0da2aa](https://github.com/ant-design/pro-components/commit/f0da2aa3bde891b1f51cc3d60769074b3a858038))

## [2.8.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.8.0...@ant-design/pro-table@2.8.1) (2020-09-22)

**Note:** Version bump only for package @ant-design/pro-table

# [2.8.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.7.4...@ant-design/pro-table@2.8.0) (2020-09-22)

### Features

- 优化 ProTable 批量操作工具栏 ([#532](https://github.com/ant-design/pro-components/issues/532)) ([8e8f69b](https://github.com/ant-design/pro-components/commit/8e8f69b7c16e0004b13cbd5d009d25ad3b56e29f))
- **Table:** Fix column reset to default column display ([#525](https://github.com/ant-design/pro-components/issues/525)) ([af6ce53](https://github.com/ant-design/pro-components/commit/af6ce53a9f70dd92b889e7cd885f71c9e4315fab))

## [2.7.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.7.3...@ant-design/pro-table@2.7.4) (2020-09-14)

**Note:** Version bump only for package @ant-design/pro-table

## [2.7.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.7.2...@ant-design/pro-table@2.7.3) (2020-09-14)

**Note:** Version bump only for package @ant-design/pro-table

## [2.7.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.7.1...@ant-design/pro-table@2.7.2) (2020-09-10)

### Bug Fixes

- **layout:** support using GlobalHeader prefixCls ([#411](https://github.com/ant-design/pro-components/issues/411)) ([d820fa3](https://github.com/ant-design/pro-components/commit/d820fa3aa75385b2262fe3e70101ab3664eea44f))

## [2.7.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.7.0...@ant-design/pro-table@2.7.1) (2020-09-08)

**Note:** Version bump only for package @ant-design/pro-table

# [2.7.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.6.3...@ant-design/pro-table@2.7.0) (2020-09-07)

### Bug Fixes

- **protable:** remove unused import ([ed5e6c4](https://github.com/ant-design/pro-components/commit/ed5e6c4ffcbcf2b2e40af2682ca9a2c84a1a44d3))

### Features

- add protable demos and adjust docs ([016a8fe](https://github.com/ant-design/pro-components/commit/016a8fe12d1ea672d5f46fdbaafa075974febdc0))

## [2.6.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.6.2...@ant-design/pro-table@2.6.3) (2020-08-31)

**Note:** Version bump only for package @ant-design/pro-table

## [2.6.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.6.1...@ant-design/pro-table@2.6.2) (2020-08-26)

**Note:** Version bump only for package @ant-design/pro-table

## [2.6.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.6.0...@ant-design/pro-table@2.6.1) (2020-08-25)

### Bug Fixes

- **table:** use default value of labelWidth ([#290](https://github.com/ant-design/pro-components/issues/290)) ([c37e753](https://github.com/ant-design/pro-components/commit/c37e753f9cdca00b1d75716467cefa0f1c7cb3b5))

# [2.6.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.15...@ant-design/pro-table@2.6.0) (2020-08-24)

### Features

- **form:** ProForm new Layout LightFilter support ([#173](https://github.com/ant-design/pro-components/issues/173)) ([e558c62](https://github.com/ant-design/pro-components/commit/e558c62a14e9d3b85050f790c72de96dbaa82321))

## [2.5.15](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.14...@ant-design/pro-table@2.5.15) (2020-08-19)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.14](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.13...@ant-design/pro-table@2.5.14) (2020-08-18)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.13](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.12...@ant-design/pro-table@2.5.13) (2020-08-17)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.12](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.11...@ant-design/pro-table@2.5.12) (2020-08-17)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.10...@ant-design/pro-table@2.5.11) (2020-08-17)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.9...@ant-design/pro-table@2.5.10) (2020-08-14)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.8...@ant-design/pro-table@2.5.9) (2020-08-14)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.7...@ant-design/pro-table@2.5.8) (2020-08-14)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.6...@ant-design/pro-table@2.5.7) (2020-08-12)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.5...@ant-design/pro-table@2.5.6) (2020-08-12)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.4...@ant-design/pro-table@2.5.5) (2020-08-12)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.3...@ant-design/pro-table@2.5.4) (2020-08-10)

**Note:** Version bump only for package @ant-design/pro-table

## [2.5.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@2.5.0-beta.1...@ant-design/pro-table@2.5.1) (2020-08-10)

### Bug Fixes

- **table:** 搜索项如果只选择起始日期时，会出现 Invalid Date ([#123](https://github.com/ant-design/pro-components/issues/123)) ([a8c26e2](https://github.com/ant-design/pro-components/commit/a8c26e26167d91a08ebcf15fea63bd7692196764))
- iteration key ([6b63e42](https://github.com/ant-design/pro-components/commit/6b63e425ae8ee5d65fb6e3cb7e52c6808d2d848b))
- 修复 ci 问题 ([b8b8048](https://github.com/ant-design/pro-components/commit/b8b80482b17d21f0535aca15dfdd04e4e84f212b))
- 删掉不用的代码，避免干扰 ([9f93a2e](https://github.com/ant-design/pro-components/commit/9f93a2e4cb8515c1d629e695c7c9e4fb21af6526))
- 补上 API ([0c775dc](https://github.com/ant-design/pro-components/commit/0c775dc7da0f6bea32798ff41ee40012eaca30c5))

# [2.5.0-beta.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@1.0.0-beta.3...@ant-design/pro-table@2.5.0-beta.1) (2020-07-30)

### Bug Fixes

- pro-table, setting icon upper than others in toolbar. ([#30](https://github.com/ant-design/pro-components/issues/30)) ([d62dc57](https://github.com/ant-design/pro-components/commit/d62dc576c77af2935a65f3c93a0b8f54ccf56f82))

# [1.0.0-beta.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-table@1.0.0-beta.2...@ant-design/pro-table@1.0.0-beta.3) (2020-07-25)

**Note:** Version bump only for package @ant-design/pro-table

# 1.0.0-beta.2 (2020-07-09)

**Note:** Version bump only for package @ant-design/pro-table
