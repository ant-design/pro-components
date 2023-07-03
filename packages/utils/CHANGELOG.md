# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.12.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.12.1...@ant-design/pro-utils@2.12.2) (2023-06-19)

### Bug Fixes

- **form:** fix inline form reset value for destoy ([dc9420a](https://github.com/ant-design/pro-components/commit/dc9420aa2a1ba71ff537d4b1585cec84f3afacb9))

## [2.12.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.12.0...@ant-design/pro-utils@2.12.1) (2023-06-19)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.12.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.8...@ant-design/pro-utils@2.12.0) (2023-06-19)

### Bug Fixes

- **form:** alway use shouldUpdate for json ([7933961](https://github.com/ant-design/pro-components/commit/7933961ccd5de7a67178165039b197f2b53d92e8))
- **form:** onInit use ProFormInstance ([ad537a5](https://github.com/ant-design/pro-components/commit/ad537a563c1f09dafde29bb2ecff0aa0df24122f))
- **table:** add Form.Item shouldUpdate function ([db3224b](https://github.com/ant-design/pro-components/commit/db3224b041008a1397e91e4b2a5da21991f2de4f))

### Features

- **field:** LightFilter 中使用 ProFormSelect 的两个 bug 修复 ([#7225](https://github.com/ant-design/pro-components/issues/7225)) ([#7233](https://github.com/ant-design/pro-components/issues/7233)) ([b3050e4](https://github.com/ant-design/pro-components/commit/b3050e4e82db6809ce93f6913e3903a9dd05da15))

## [2.11.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.7...@ant-design/pro-utils@2.11.8) (2023-06-16)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.11.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.6...@ant-design/pro-utils@2.11.7) (2023-06-14)

### Bug Fixes

- **form:** fix shouldUpdate no work error ([ff8bbef](https://github.com/ant-design/pro-components/commit/ff8bbefc6b67d83925e83f2559f0016014748323))

## [2.11.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.5...@ant-design/pro-utils@2.11.6) (2023-06-14)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.11.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.4...@ant-design/pro-utils@2.11.5) (2023-06-12)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.11.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.3...@ant-design/pro-utils@2.11.4) (2023-06-12)

### Bug Fixes

- **compoents:** gap use token margin ([#7204](https://github.com/ant-design/pro-components/issues/7204)) ([bd62243](https://github.com/ant-design/pro-components/commit/bd62243f4bc6a3ea6e97ad5e0db977c84394426f))
- **components:** remove hashid empty ([b46bb80](https://github.com/ant-design/pro-components/commit/b46bb808db287979fe7d2d5afe115185860422c9))
- **form:** 修复 fn[curK] 为函数时，参数 undefined 导致的报错 ([#7163](https://github.com/ant-design/pro-components/issues/7163)) ([ac8c651](https://github.com/ant-design/pro-components/commit/ac8c6516dcdcaca758ed489829dd9b109363c063))
- **layout:** support antd@5.6 token ([28291fe](https://github.com/ant-design/pro-components/commit/28291fea2ab1417640f79534d132b5e3db228d2c))
- **table:** 修复 Editable 的 record.id 使用 index，且 index 为 0 时，导致无法添加新行 ([#7176](https://github.com/ant-design/pro-components/issues/7176)) ([b62443c](https://github.com/ant-design/pro-components/commit/b62443c3f310f99b5912a4cb9f2da5dd74cb5ac3))

## [2.11.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.2...@ant-design/pro-utils@2.11.3) (2023-05-31)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.11.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.1...@ant-design/pro-utils@2.11.2) (2023-05-30)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.11.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.11.0...@ant-design/pro-utils@2.11.1) (2023-05-30)

### Bug Fixes

- **form:** fix \_transformArray is null will throw error ([ba1d9e9](https://github.com/ant-design/pro-components/commit/ba1d9e9c3bc9416ef4954081038730c5910b27a6))

# [2.11.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.10.0...@ant-design/pro-utils@2.11.0) (2023-05-29)

### Bug Fixes

- **form:** 解决 ProFormList 多重嵌套 ProFormList 下的表单组件未调用 transform 方法问题 ([#7138](https://github.com/ant-design/pro-components/issues/7138)) ([2e83b18](https://github.com/ant-design/pro-components/commit/2e83b184fae0f68013c0c1db39837981f70d1ec3))
- **table:** component EditableProTable actionDeleteRef function Single row status Locked ([#7124](https://github.com/ant-design/pro-components/issues/7124)) ([79c6c93](https://github.com/ant-design/pro-components/commit/79c6c93a6b7d8d9ee50598b8a48972a89eb7d02a))
- fix test case ([ab24418](https://github.com/ant-design/pro-components/commit/ab24418993d468b63f2711f21aae9ff58f91f191))
- **form:** close icon style ([#7091](https://github.com/ant-design/pro-components/issues/7091)) ([28a3402](https://github.com/ant-design/pro-components/commit/28a3402bc5207499d681a5a9df4e0e777b863a6c))

### Features

- **table:** use [@dnd-kit](https://github.com/dnd-kit) ([#7131](https://github.com/ant-design/pro-components/issues/7131)) ([26b6aa6](https://github.com/ant-design/pro-components/commit/26b6aa611a0c5d88232cda88ca7cec893ee2160b))

# [2.10.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.9.0...@ant-design/pro-utils@2.10.0) (2023-05-18)

### Bug Fixes

- **form:** fix LigthFilter close icon style error ([38e5cd1](https://github.com/ant-design/pro-components/commit/38e5cd1aa9c5b46570515a3c390d4f297fd860ed))
- **form:** LigthFilter icon add color transition ([becd94e](https://github.com/ant-design/pro-components/commit/becd94edb7eda974b700c9bc0a49992e11ad99e9))

### Features

- **layout:** ProSchemaValueEnumMap 类型 key 增加对 boolean 的支持 ([#7081](https://github.com/ant-design/pro-components/issues/7081)) ([278a2eb](https://github.com/ant-design/pro-components/commit/278a2eb7b71ecf753c6bfeabd4019c0560de19c5))

# [2.9.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.8.7...@ant-design/pro-utils@2.9.0) (2023-05-15)

### Features

- **form:** rewirte light date form ([#7052](https://github.com/ant-design/pro-components/issues/7052)) ([1cf4bfa](https://github.com/ant-design/pro-components/commit/1cf4bfa39858f03e1aadeb290d40ba8b82cdf170))

## [2.8.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.8.6...@ant-design/pro-utils@2.8.7) (2023-05-08)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.8.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.8.5...@ant-design/pro-utils@2.8.6) (2023-05-04)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.8.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.8.4...@ant-design/pro-utils@2.8.5) (2023-05-04)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.8.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.8.3...@ant-design/pro-utils@2.8.4) (2023-04-26)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.8.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.8.2...@ant-design/pro-utils@2.8.3) (2023-04-26)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.8.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.8.1...@ant-design/pro-utils@2.8.2) (2023-04-25)

### Bug Fixes

- **provide:** unuse process.env.NODE_ENV === 'TEST' ([0d9cba1](https://github.com/ant-design/pro-components/commit/0d9cba1a7fe74a87c6daf93a36f768801059f42d))

## [2.8.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.8.0...@ant-design/pro-utils@2.8.1) (2023-04-25)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.8.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.7.2...@ant-design/pro-utils@2.8.0) (2023-04-25)

### Bug Fixes

- **form:** 兼容 antd@4 ProFormTimePicker format 异常问题 ([#6863](https://github.com/ant-design/pro-components/issues/6863)) ([76131bb](https://github.com/ant-design/pro-components/commit/76131bb38a3426a2ded4d92cfc12c94e40fc685c)), closes [#6862](https://github.com/ant-design/pro-components/issues/6862)
- **form:** 修复 SchemaFormRef 的问题 ([#6943](https://github.com/ant-design/pro-components/issues/6943)) ([445c8ac](https://github.com/ant-design/pro-components/commit/445c8acfe3677d3d03a2a9c12d2a9542d50d10c0))
- **table:** new fetch function ([#6923](https://github.com/ant-design/pro-components/issues/6923)) ([275e9c1](https://github.com/ant-design/pro-components/commit/275e9c108ec939f13dbea002b5d287a074fce42e))

### Features

- **form:** add some DateRangePicker components ([#6850](https://github.com/ant-design/pro-components/issues/6850)) ([26cbe28](https://github.com/ant-design/pro-components/commit/26cbe28b4408847a965983049b020b9f4399eddb))
- **layout:** ProHelp support more feature ([#6970](https://github.com/ant-design/pro-components/issues/6970)) ([b445d0b](https://github.com/ant-design/pro-components/commit/b445d0bb350389ac96f6e711a4fc6a86ace56fb9))

## [2.7.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.7.1...@ant-design/pro-utils@2.7.2) (2023-03-27)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.7.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.7.0...@ant-design/pro-utils@2.7.1) (2023-03-14)

### Bug Fixes

- **compoments:** remove .ant-pro dom ([403319f](https://github.com/ant-design/pro-components/commit/403319f2b80489d04101f51d65c3cb4dcbe4595d))

# [2.7.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.6.0...@ant-design/pro-utils@2.7.0) (2023-03-09)

### Bug Fixes

- **layout:** fix menu item icon style error ([#6745](https://github.com/ant-design/pro-components/issues/6745)) ([87f9656](https://github.com/ant-design/pro-components/commit/87f965682e81d9ce166d140dd418a37a6020abcf))

# [2.6.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.9...@ant-design/pro-utils@2.6.0) (2023-03-08)

### Bug Fixes

- **form:** 修复 label 属性没有传值的问题 ([#6728](https://github.com/ant-design/pro-components/issues/6728)) ([99a7d53](https://github.com/ant-design/pro-components/commit/99a7d53ef42898f7206f93f58d10fcca841d417d))

### Features

- **components:** support antd@5.4.0 ([#6730](https://github.com/ant-design/pro-components/issues/6730)) ([1ac506f](https://github.com/ant-design/pro-components/commit/1ac506f8e46a30089437cdfe58a5f96447c39f7a))
- **layout:** add ProHelp components ([#6654](https://github.com/ant-design/pro-components/issues/6654)) ([b1a175c](https://github.com/ant-design/pro-components/commit/b1a175c9ecbdf24a26f1cf34e10a92da05ab2b9c)), closes [#6671](https://github.com/ant-design/pro-components/issues/6671) [#6676](https://github.com/ant-design/pro-components/issues/6676)

## [2.5.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.8...@ant-design/pro-utils@2.5.9) (2023-02-28)

### Bug Fixes

- **EditableTable:** editableKeys maybe undefined ([#6655](https://github.com/ant-design/pro-components/issues/6655)) ([321b758](https://github.com/ant-design/pro-components/commit/321b75810043bb4ce544ca1508aa582059c95d6d))

## [2.5.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.7...@ant-design/pro-utils@2.5.8) (2023-02-17)

### Bug Fixes

- **components:** src alway use es path ([4a13142](https://github.com/ant-design/pro-components/commit/4a1314225c08a60c5cef9d51f061cdf15a69ca13))

## [2.5.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.6...@ant-design/pro-utils@2.5.7) (2023-02-17)

### Bug Fixes

- **components:** fix valuetype no work error ([f6215e9](https://github.com/ant-design/pro-components/commit/f6215e98eaeb46fa979c1ca4ac40ceaa0828f9f3))
- **field:** `optionFilterProp` doesn't work with LightFilter ([#6603](https://github.com/ant-design/pro-components/issues/6603)) ([0e287f6](https://github.com/ant-design/pro-components/commit/0e287f6dba1cdc0f31bcae60e3149ed6a276169d))
- **form:** inconsistent digit value when precision=0 ([#6591](https://github.com/ant-design/pro-components/issues/6591)) ([f83092a](https://github.com/ant-design/pro-components/commit/f83092a50993f3a86b59565394c24228f7e8541e))

## [2.5.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.5...@ant-design/pro-utils@2.5.6) (2023-02-10)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.5.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.4...@ant-design/pro-utils@2.5.5) (2023-02-08)

### Bug Fixes

- **form:** FieldLabel support i18n [#6578](https://github.com/ant-design/pro-components/issues/6578)([#6578](https://github.com/ant-design/pro-components/issues/6578)) ([3bf2ea5](https://github.com/ant-design/pro-components/commit/3bf2ea599721d8416adbb39e2c961c3047e8c163))

## [2.5.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.3...@ant-design/pro-utils@2.5.4) (2023-01-10)

### Bug Fixes

- **table:** fix cancelEditable will reset value error ([40fba50](https://github.com/ant-design/pro-components/commit/40fba50d987cfcbf1dd37d0593c88123b04dfbb7))

## [2.5.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.2...@ant-design/pro-utils@2.5.3) (2023-01-06)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.5.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.1...@ant-design/pro-utils@2.5.2) (2022-12-29)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.5.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.5.0...@ant-design/pro-utils@2.5.1) (2022-12-29)

### Bug Fixes

- **table:** fix childrenColumnName is null error ([0fb584c](https://github.com/ant-design/pro-components/commit/0fb584c976347f9f96847772f9af31273ce1a144))
- **table:** 轻量筛选替换查询表单，将 padding 调为 8px 更为统一美观 ([#6423](https://github.com/ant-design/pro-components/issues/6423)) ([cd8a507](https://github.com/ant-design/pro-components/commit/cd8a507e00cd821f2826e6105d19ec3f479576f5))

# [2.5.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.4.5...@ant-design/pro-utils@2.5.0) (2022-12-13)

### Features

- **components:** bump swr from 1.x to 2.x ([#6367](https://github.com/ant-design/pro-components/issues/6367)) ([d7a5206](https://github.com/ant-design/pro-components/commit/d7a52068b9c70d40ecf68a065ed470573daade72))

## [2.4.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.4.4...@ant-design/pro-utils@2.4.5) (2022-12-09)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.4.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.4.3...@ant-design/pro-utils@2.4.4) (2022-12-08)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.4.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.4.2...@ant-design/pro-utils@2.4.3) (2022-12-08)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.4.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.4.1...@ant-design/pro-utils@2.4.2) (2022-12-05)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.4.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.4.0...@ant-design/pro-utils@2.4.1) (2022-12-01)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.4.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.3.5...@ant-design/pro-utils@2.4.0) (2022-11-30)

### Features

- **layout:** fix dark style no work error ([3e06527](https://github.com/ant-design/pro-components/commit/3e0652738e6993973aba34af118ffd8a9af5815c))

## [2.3.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.3.4...@ant-design/pro-utils@2.3.5) (2022-11-17)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.3.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.3.3...@ant-design/pro-utils@2.3.4) (2022-11-14)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.3.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.3.2...@ant-design/pro-utils@2.3.3) (2022-11-14)

### Bug Fixes

- **table:** column not working correctly after reset ([#6159](https://github.com/ant-design/pro-components/issues/6159)) ([6ec0307](https://github.com/ant-design/pro-components/commit/6ec0307041a7a439075af56c3a9a80809afb956f))

## [2.3.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.3.1...@ant-design/pro-utils@2.3.2) (2022-11-08)

### Bug Fixes

- **utils:** alway check process is undefined ([a861967](https://github.com/ant-design/pro-components/commit/a86196785cc4678a80adffb9e610e56d830b44eb))

## [2.3.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.3.0...@ant-design/pro-utils@2.3.1) (2022-11-07)

### Bug Fixes

- **table:** 兼容 ellipsis 不想显示 Tooltip [#6158](https://github.com/ant-design/pro-components/issues/6158) ([#6160](https://github.com/ant-design/pro-components/issues/6160)) ([f01335a](https://github.com/ant-design/pro-components/commit/f01335a30f1c629674d006c8eca146e326c626e6))
- **utils:** do not use process?.env?.ANTD_VERSION ([a295b3d](https://github.com/ant-design/pro-components/commit/a295b3d0735d7baab7e35935edbb5ed2f75674df))

# [2.3.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.13...@ant-design/pro-utils@2.3.0) (2022-11-03)

### Features

- **table:** add new api actionRef.saveEditable ([#6081](https://github.com/ant-design/pro-components/issues/6081)) ([428ed6d](https://github.com/ant-design/pro-components/commit/428ed6d959d816013c95817e29e3ff1d224fe42e))

## [2.2.13](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.12...@ant-design/pro-utils@2.2.13) (2022-10-28)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.2.12](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.11...@ant-design/pro-utils@2.2.12) (2022-10-27)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.2.11](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.10...@ant-design/pro-utils@2.2.11) (2022-10-25)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.2.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.9...@ant-design/pro-utils@2.2.10) (2022-10-24)

### Bug Fixes

- **table:** auto open hashid ([#6114](https://github.com/ant-design/pro-components/issues/6114)) ([3f72792](https://github.com/ant-design/pro-components/commit/3f72792762ae1c9d51b34f608352e776b645b3b0))

## [2.2.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.8...@ant-design/pro-utils@2.2.9) (2022-10-21)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.2.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.7...@ant-design/pro-utils@2.2.8) (2022-10-21)

### Bug Fixes

- **layout:** fix listtool bar style error ([820a5b7](https://github.com/ant-design/pro-components/commit/820a5b73d4be5b8e6da31049261c48cd3ff9e54f))
- **layout:** support dynamic token set ([#6106](https://github.com/ant-design/pro-components/issues/6106)) ([b57b7b1](https://github.com/ant-design/pro-components/commit/b57b7b10bf073c58f547071db4433b8f024c096a))

## [2.2.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.6...@ant-design/pro-utils@2.2.7) (2022-10-19)

### Bug Fixes

- **card:** fix card hover error style ([7ab8e7e](https://github.com/ant-design/pro-components/commit/7ab8e7e457988d803fbaa35451b05c24fdb7d64a))

## [2.2.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.5...@ant-design/pro-utils@2.2.6) (2022-10-14)

### Bug Fixes

- **table:** support tooltip=false, close ellipsis tooltip ([1c6c7ef](https://github.com/ant-design/pro-components/commit/1c6c7efbea7ceb23958c1bb7f0198a2b59427504))
- **utils:** remove act import ([fc76519](https://github.com/ant-design/pro-components/commit/fc765195dcd2050fb2e4f4a5bd4b2e54d7519681))

## [2.2.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.4...@ant-design/pro-utils@2.2.5) (2022-10-13)

### Bug Fixes

- **form:** fix filter dropdown not close ([#6067](https://github.com/ant-design/pro-components/issues/6067)) ([bd14cf9](https://github.com/ant-design/pro-components/commit/bd14cf930115e718916966061d82749ecfa8068c))

## [2.2.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.3...@ant-design/pro-utils@2.2.4) (2022-10-11)

### Bug Fixes

- **layout:** fix PageContainer token no rerender error ([5611a16](https://github.com/ant-design/pro-components/commit/5611a16b8314de5207c3149c4053521bba9563fb))

## [2.2.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.2...@ant-design/pro-utils@2.2.3) (2022-10-10)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.2.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.1...@ant-design/pro-utils@2.2.2) (2022-09-28)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.2.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.2.0...@ant-design/pro-utils@2.2.1) (2022-09-22)

### Bug Fixes

- **table:** useEditableArray 修复无法正确添加深度大于 1 的子记录 ([#5949](https://github.com/ant-design/pro-components/issues/5949)) ([012beab](https://github.com/ant-design/pro-components/commit/012beab045edb45445aa3042aee50672d2ad88f8))

# [2.2.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.1.1...@ant-design/pro-utils@2.2.0) (2022-09-21)

### Features

- **layout:** remove routers types ([6c54c7e](https://github.com/ant-design/pro-components/commit/6c54c7ec42fd4ae1cab7b990386eb80e2c4273b4))

## [2.1.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.1.0...@ant-design/pro-utils@2.1.1) (2022-09-16)

### Bug Fixes

- **table:** fix dateformat no work error ([c30c107](https://github.com/ant-design/pro-components/commit/c30c107056e177d0afff6c7b7885a29b104c7d03))

# [2.1.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.4...@ant-design/pro-utils@2.1.0) (2022-09-14)

### Bug Fixes

- **table:** fix ColumnSetting style error ([ec39ccc](https://github.com/ant-design/pro-components/commit/ec39ccc6727c366d0bcee803cb0ace08edffc7c2))
- **utils:** remove unuse code ([bcbdbf6](https://github.com/ant-design/pro-components/commit/bcbdbf613c91abdb3aeba0e681ab4a9b34853eb2))

### Features

- **form:** add ProFormSegmented ([#5913](https://github.com/ant-design/pro-components/issues/5913)) ([737c80d](https://github.com/ant-design/pro-components/commit/737c80d91fa9cfdc86ba05dce47b18ccb83058c4))

## [2.0.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.3...@ant-design/pro-utils@2.0.4) (2022-09-09)

### Bug Fixes

- **components:** fix compareVersions error ([9751208](https://github.com/ant-design/pro-components/commit/9751208a9ecb9a4120b7d4c8291b8df8a5da9144))
- **layout:** rm rc-util/lib ([d7f7aa1](https://github.com/ant-design/pro-components/commit/d7f7aa18581a198bd48282e3e38cd227d3b53bda))

## [2.0.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.2...@ant-design/pro-utils@2.0.3) (2022-09-08)

### Bug Fixes

- **components:** fix open props warning ([77703c8](https://github.com/ant-design/pro-components/commit/77703c82140d46c4fb9ad82e77d561d313e0436e))
- **components:** unuse theme import ([bcac384](https://github.com/ant-design/pro-components/commit/bcac384af74fcb724daaeffdd3fa1aa636e3c7cb))
- **form:** fix ts error ([a399cd1](https://github.com/ant-design/pro-components/commit/a399cd1f49e8d955f59b033cbc1a286957678473))
- **layout:** global header collapsed button support token ([#5889](https://github.com/ant-design/pro-components/issues/5889)) ([8c12481](https://github.com/ant-design/pro-components/commit/8c124810748a44477291ba6eac5963aedd75c2de))

## [2.0.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.45.3...@ant-design/pro-utils@2.0.2) (2022-09-02)

**Note:** Version bump only for package @ant-design/pro-utils

## [2.0.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.23...@ant-design/pro-utils@2.0.1) (2022-09-01)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.23](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.45.3...@ant-design/pro-utils@2.0.0-experimental.23) (2022-08-30)

### Bug Fixes

- update snapshot ([4db1605](https://github.com/ant-design/pro-components/commit/4db1605937c3b0cf22d22ad398ef4c11e21883cd))

### Features

- cssinjs ([#5596](https://github.com/ant-design/pro-components/issues/5596)) ([b82c7d2](https://github.com/ant-design/pro-components/commit/b82c7d2a1021506918947df56aaa66c3181187c7))

# [2.0.0-experimental.22](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.21...@ant-design/pro-utils@2.0.0-experimental.22) (2022-08-29)

### Bug Fixes

- update snapshot ([4db1605](https://github.com/ant-design/pro-components/commit/4db1605937c3b0cf22d22ad398ef4c11e21883cd))
- **form:** after close theme reset fields ([ecc6923](https://github.com/ant-design/pro-components/commit/ecc69233c0befa29558f142c091693398e4fe32f))

# [2.0.0-experimental.21](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.45.2...@ant-design/pro-utils@2.0.0-experimental.21) (2022-08-26)

### Features

- cssinjs ([#5596](https://github.com/ant-design/pro-components/issues/5596)) ([b82c7d2](https://github.com/ant-design/pro-components/commit/b82c7d2a1021506918947df56aaa66c3181187c7))

# [2.0.0-experimental.20](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.19...@ant-design/pro-utils@2.0.0-experimental.20) (2022-08-25)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.19](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.18...@ant-design/pro-utils@2.0.0-experimental.19) (2022-08-25)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.18](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.45.1...@ant-design/pro-utils@2.0.0-experimental.18) (2022-08-25)

### Features

- cssinjs ([#5596](https://github.com/ant-design/pro-components/issues/5596)) ([b82c7d2](https://github.com/ant-design/pro-components/commit/b82c7d2a1021506918947df56aaa66c3181187c7))

# [1.45.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.44.0...@ant-design/pro-utils@1.45.0) (2022-08-19)

### Bug Fixes

- **table:** editable table 增加子记录时没有按照 position 方向增加 ([#5736](https://github.com/ant-design/pro-components/issues/5736)) ([eb91a04](https://github.com/ant-design/pro-components/commit/eb91a049c580a167f48ddfde3b7a81a3f1dd27ea))

### Features

- **form:** support Pro.useFormInstance ([d53eccc](https://github.com/ant-design/pro-components/commit/d53eccca812e477c68f59243b227e3141526ce69))

# [1.44.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.43.2...@ant-design/pro-utils@1.44.0) (2022-08-15)

> > > > > > > master

### Bug Fixes

- **table:** useEditableArray fix nested children can not be add when position is not top and expandable.childrenColumnName isundefined ([#5643](https://github.com/ant-design/pro-components/issues/5643)) ([9604686](https://github.com/ant-design/pro-components/commit/960468691a4528aaf0a92bfaf1ce5742c2d24a52))
- **utils:** 修复构建预览页面时因 SSR 模式无 window 对象导致构建失败的问题 ([#5716](https://github.com/ant-design/pro-components/issues/5716)) ([642258b](https://github.com/ant-design/pro-components/commit/642258bcc525ecb83eb7200c5128fd616acc41d5))

### Features

- **locale:** Add multilingual translation ([#5685](https://github.com/ant-design/pro-components/issues/5685)) ([0de3c0d](https://github.com/ant-design/pro-components/commit/0de3c0dd559b4133c8b3195efbfb2590d26617fa))

# [2.0.0-experimental.10](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.9...@ant-design/pro-utils@2.0.0-experimental.10) (2022-08-12)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.8...@ant-design/pro-utils@2.0.0-experimental.9) (2022-08-10)

### Bug Fixes

- **table:** useEditableArray fix nested children can not be add when position is not top and expandable.childrenColumnName isundefined ([#5643](https://github.com/ant-design/pro-components/issues/5643)) ([9604686](https://github.com/ant-design/pro-components/commit/960468691a4528aaf0a92bfaf1ce5742c2d24a52))

# [2.0.0-experimental.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.7...@ant-design/pro-utils@2.0.0-experimental.8) (2022-08-05)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.6...@ant-design/pro-utils@2.0.0-experimental.7) (2022-08-01)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.5...@ant-design/pro-utils@2.0.0-experimental.6) (2022-08-01)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.4...@ant-design/pro-utils@2.0.0-experimental.5) (2022-08-01)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.3...@ant-design/pro-utils@2.0.0-experimental.4) (2022-08-01)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@2.0.0-experimental.2...@ant-design/pro-utils@2.0.0-experimental.3) (2022-08-01)

**Note:** Version bump only for package @ant-design/pro-utils

# [2.0.0-experimental.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.43.2...@ant-design/pro-utils@2.0.0-experimental.2) (2022-08-01)

### Features

- cssinjs ([#5596](https://github.com/ant-design/pro-components/issues/5596)) ([b82c7d2](https://github.com/ant-design/pro-components/commit/b82c7d2a1021506918947df56aaa66c3181187c7))

## [1.43.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.43.1...@ant-design/pro-utils@1.43.2) (2022-07-22)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.43.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.43.0...@ant-design/pro-utils@1.43.1) (2022-07-21)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.43.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.42.5...@ant-design/pro-utils@1.43.0) (2022-07-21)

### Features

- **form:** Form support readonly ([a5a9611](https://github.com/ant-design/pro-components/commit/a5a9611a9610281d9b4f71a617bbf205f84ca04a))
- **table:** ProTable columns 的 ellipsis 支持 showTitle ([#5575](https://github.com/ant-design/pro-components/issues/5575)) ([b10229d](https://github.com/ant-design/pro-components/commit/b10229d399d50b5b61ce6d292d36f7b1c5a65a1c))

## [1.42.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.42.4...@ant-design/pro-utils@1.42.5) (2022-07-11)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.42.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.42.3...@ant-design/pro-utils@1.42.4) (2022-07-06)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.42.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.42.2...@ant-design/pro-utils@1.42.3) (2022-06-30)

### Bug Fixes

- **form:** date time range ([#5412](https://github.com/ant-design/pro-components/issues/5412)) ([111cad7](https://github.com/ant-design/pro-components/commit/111cad7ae7af98e79e9ad6c5a98446f6a4929e90))

## [1.42.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.42.1...@ant-design/pro-utils@1.42.2) (2022-06-16)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.42.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.42.0...@ant-design/pro-utils@1.42.1) (2022-06-02)

### Bug Fixes

- [#5273](https://github.com/ant-design/pro-components/issues/5273) for all components ([#5314](https://github.com/ant-design/pro-components/issues/5314)) ([d25e87c](https://github.com/ant-design/pro-components/commit/d25e87c68db8e3c8d120ffc4cc7cd95e33ce6c24))
- **form:** fix Cascader and TreeSelect no has light lable error ([#5310](https://github.com/ant-design/pro-components/issues/5310)) ([2058bf4](https://github.com/ant-design/pro-components/commit/2058bf4179246bd3dd9b2fc7888fb2665e316d30))

# [1.42.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.41.4...@ant-design/pro-utils@1.42.0) (2022-05-26)

### Bug Fixes

- **form:** ProFormCheckBox support readonly lable ([ea574c4](https://github.com/ant-design/pro-components/commit/ea574c4d0206f70956a0a2009ba28722716a2ae3))
- **table:** useEditableArray fix child record traversal ([#5244](https://github.com/ant-design/pro-components/issues/5244)) ([762022c](https://github.com/ant-design/pro-components/commit/762022c2ecb514e4533de4713f5fa3f4bd8b042d))

### Features

- **table:** renderFormItem support ignoreFormItem ([7aae13d](https://github.com/ant-design/pro-components/commit/7aae13d791452121eedfc38c43676fc9a0f3ba05))

## [1.41.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.41.3...@ant-design/pro-utils@1.41.4) (2022-05-20)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.41.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.41.2...@ant-design/pro-utils@1.41.3) (2022-05-20)

### Bug Fixes

- **form:** 解决 ProFormSelect、ProFormDatePicker、ProFormTimePicker 在 LightFilter 模式下点击激活下拉选项后再次点击未隐藏下拉框的问题 ([#5169](https://github.com/ant-design/pro-components/issues/5169)) ([149cdff](https://github.com/ant-design/pro-components/commit/149cdff6e8f433c78bd3d006386b993d28f7f13e)), closes [fix#5010](https://github.com/fix/issues/5010) [fix#5010](https://github.com/fix/issues/5010)

## [1.41.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.41.1...@ant-design/pro-utils@1.41.2) (2022-05-12)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.41.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.41.0...@ant-design/pro-utils@1.41.1) (2022-05-12)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.41.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.39.3...@ant-design/pro-utils@1.41.0) (2022-05-07)

### Bug Fixes

- **form:** Simplify light filter ([#5163](https://github.com/ant-design/pro-components/issues/5163)) ([e1018c8](https://github.com/ant-design/pro-components/commit/e1018c8e72063c9da98ec28bd806040754dfb10e))
- **layout:** support ie11 ([89e2d5a](https://github.com/ant-design/pro-components/commit/89e2d5ab4a0d0ac2f55f8a5f4484ca0a5e844865))
- **table:** addEditRecord check parentKey is has record ([#5183](https://github.com/ant-design/pro-components/issues/5183)) ([d568c24](https://github.com/ant-design/pro-components/commit/d568c2425e3794a005ad3e34355f0af1c31a642d))
- **table:** if table data is null, render empty table ([281b8bd](https://github.com/ant-design/pro-components/commit/281b8bd541a3f93cb0e6ad3c24e21b0bc5f2f104))

### Features

- **layout:** use menu items ([e7606ff](https://github.com/ant-design/pro-components/commit/e7606ff2990719402b14d7bc1c2b32c2113ccfac))
- **table:** recordCreator must set rowKey ([a30ce30](https://github.com/ant-design/pro-components/commit/a30ce301e649a27277b1ed1482333173f1833091))
- **table:** renderFormIten support action ([5e33e57](https://github.com/ant-design/pro-components/commit/5e33e57fc61deab4668359d74e2cbc45901dd25c))

# [1.40.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.39.3...@ant-design/pro-utils@1.40.0) (2022-04-29)

### Bug Fixes

- **layout:** support ie11 ([89e2d5a](https://github.com/ant-design/pro-components/commit/89e2d5ab4a0d0ac2f55f8a5f4484ca0a5e844865))
- **table:** if table data is null, render empty table ([281b8bd](https://github.com/ant-design/pro-components/commit/281b8bd541a3f93cb0e6ad3c24e21b0bc5f2f104))

### Features

- **layout:** use menu items ([e7606ff](https://github.com/ant-design/pro-components/commit/e7606ff2990719402b14d7bc1c2b32c2113ccfac))
- **table:** recordCreator must set rowKey ([a30ce30](https://github.com/ant-design/pro-components/commit/a30ce301e649a27277b1ed1482333173f1833091))

## [1.39.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.39.2...@ant-design/pro-utils@1.39.3) (2022-04-24)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.39.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.39.1...@ant-design/pro-utils@1.39.2) (2022-04-18)

### Bug Fixes

- **form:** fix revalidateOnFocus alway work error-n ([0ea1618](https://github.com/ant-design/pro-components/commit/0ea1618154634f6e0ac9c64682a71746ab191807))
- **table:** key does not exist causing error ([#5066](https://github.com/ant-design/pro-components/issues/5066)) ([1dcbacb](https://github.com/ant-design/pro-components/commit/1dcbacb846ea28229417d74d1ad77a0758800829))

## [1.39.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.39.0...@ant-design/pro-utils@1.39.1) (2022-04-13)

### Bug Fixes

- **utils:** clean react color deps ([#5046](https://github.com/ant-design/pro-components/issues/5046)) ([21e92b7](https://github.com/ant-design/pro-components/commit/21e92b74bc1dcb96d4f5d68268df6b6ee89837c1))

# [1.39.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.38.2...@ant-design/pro-utils@1.39.0) (2022-04-12)

### Features

- **form:** add placement in lightFilter ([#4974](https://github.com/ant-design/pro-components/issues/4974)) ([0e4179d](https://github.com/ant-design/pro-components/commit/0e4179d9e12a370048ec840abc443246d479ffc7))

## [1.38.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.38.1...@ant-design/pro-utils@1.38.2) (2022-04-06)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.38.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.38.0...@ant-design/pro-utils@1.38.1) (2022-03-28)

### Bug Fixes

- **form:** InlineErrorFormItem support set Props ([bef45a5](https://github.com/ant-design/pro-components/commit/bef45a50edd1ea1e84b74d82017d07f7bdafd84c))
- **table:** fix EditorTable rowKey is rowIndex error ([6b8c6a4](https://github.com/ant-design/pro-components/commit/6b8c6a4131d57b10be29c93c7d9a37e5681adc87))
- **utils:** avoid empty prototype properties ([#4884](https://github.com/ant-design/pro-components/issues/4884)) ([a03373c](https://github.com/ant-design/pro-components/commit/a03373ca34d39d639b7724a013cd36850789dbed))

# [1.38.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.37.2...@ant-design/pro-utils@1.38.0) (2022-03-25)

### Bug Fixes

- **utils:** add missing backslash in moment format ([#4913](https://github.com/ant-design/pro-components/issues/4913)) ([93cb37b](https://github.com/ant-design/pro-components/commit/93cb37b0ba24d8e7da89e84fa3b988dc76e9ea7d))

### Features

- **table:** support getRows, getRow, setRow ([#4904](https://github.com/ant-design/pro-components/issues/4904)) ([756340e](https://github.com/ant-design/pro-components/commit/756340ee97f13b55e5f51cc875ec6b344e953d24))

## [1.37.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.37.1...@ant-design/pro-utils@1.37.2) (2022-03-22)

### Bug Fixes

- **table:** fix actionSaveRef logic when add new line ([#4881](https://github.com/ant-design/pro-components/issues/4881)) ([09673c9](https://github.com/ant-design/pro-components/commit/09673c97107be133757dabd878687c9386ec3196))

## [1.37.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.37.0...@ant-design/pro-utils@1.37.1) (2022-03-18)

### Bug Fixes

- **table:** fix inlint error render dom ([bfeb81a](https://github.com/ant-design/pro-components/commit/bfeb81afc6bc4305b3d7ef2b84c0afc089dad7a0))

# [1.37.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.36.1...@ant-design/pro-utils@1.37.0) (2022-03-16)

### Features

- **table:** `newRecordType: cache` support parentKey ([#4861](https://github.com/ant-design/pro-components/issues/4861)) ([dfed128](https://github.com/ant-design/pro-components/commit/dfed128c33c3116e44d5315ffa334854ce055f95))

## [1.36.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.36.0...@ant-design/pro-utils@1.36.1) (2022-03-15)

### Bug Fixes

- **form:** fix ProFormDependency no rendeer transform error ([5b163eb](https://github.com/ant-design/pro-components/commit/5b163eb1d6b3430281eee9ae73e86ddfc07d3f0c))
- **table:** fix table has name, add new line will error ([74f83df](https://github.com/ant-design/pro-components/commit/74f83df88bebb3fdfbc9874960b2e6e3658e0ac1))

# [1.36.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.35.3...@ant-design/pro-utils@1.36.0) (2022-03-14)

### Bug Fixes

- **utils:** genNanoid support ie11 ([ed2b3cf](https://github.com/ant-design/pro-components/commit/ed2b3cf55ab08ccf32cfefc65f33e0970cfdd3fb))

### Features

- **utils:** 🎸 improve type and support external override type ([#4806](https://github.com/ant-design/pro-components/issues/4806)) ([13b590a](https://github.com/ant-design/pro-components/commit/13b590acaa69315dbecb22267411e8a275da8648))

## [1.35.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.35.2...@ant-design/pro-utils@1.35.3) (2022-03-08)

### Bug Fixes

- **table:** InlineErrorFormItem render Popover to parentElement ([a766602](https://github.com/ant-design/pro-components/commit/a7666022ce164a654b6354fa77092a8b2578d00b))

## [1.35.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.35.0...@ant-design/pro-utils@1.35.2) (2022-03-04)

### Bug Fixes

- remove convertInitialValue error ([da16912](https://github.com/ant-design/pro-components/commit/da16912b1881fd70388ef4605d0f23010d4efc85))

## [1.35.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.35.0...@ant-design/pro-utils@1.35.1) (2022-03-02)

### Bug Fixes

- remove convertInitialValue error ([da16912](https://github.com/ant-design/pro-components/commit/da16912b1881fd70388ef4605d0f23010d4efc85))

# [1.35.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.34.5...@ant-design/pro-utils@1.35.0) (2022-02-21)

### Features

- **form,table,utils:** form 和 table 的 dateFormatter 支持函数 ([#4657](https://github.com/ant-design/pro-components/issues/4657)) ([bdbbae4](https://github.com/ant-design/pro-components/commit/bdbbae4212fede8bf230f9577feae853ce6bf287))

## [1.34.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.34.4...@ant-design/pro-utils@1.34.5) (2022-02-15)

### Bug Fixes

- **form:** fix form datetime no format error ([e420f7b](https://github.com/ant-design/pro-components/commit/e420f7b51ac2da0ebb22c0a1f6336c994ca90088))
- **table:** fix React state update on an unmounted component error ([07cf3a3](https://github.com/ant-design/pro-components/commit/07cf3a360ba0b12381cfd2574a30c4fdbccc51e2))

## [1.34.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.34.3...@ant-design/pro-utils@1.34.4) (2022-02-14)

### Bug Fixes

- **form:** fix xxx moudle is null errror ([e134df7](https://github.com/ant-design/pro-components/commit/e134df779368cc00a0c44ea19bbeae2b7c343fcd))

## [1.34.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.34.2...@ant-design/pro-utils@1.34.3) (2022-02-14)

### Bug Fixes

- **descriptions:** 修复当 dataIndex 设置为 keypath 数组时 ProDescriptions 更新异常问题 ([#4615](https://github.com/ant-design/pro-components/issues/4615)) ([b45b2f5](https://github.com/ant-design/pro-components/commit/b45b2f5cb21226b45742223c9756083437cd6455))
- **field:** setting debounceTime results in repeated requests ([#4609](https://github.com/ant-design/pro-components/issues/4609)) ([51d2441](https://github.com/ant-design/pro-components/commit/51d2441b080c7060fe083803e8a89c4db3ec0a67))

## [1.34.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.34.1...@ant-design/pro-utils@1.34.2) (2022-02-11)

### Bug Fixes

- **table:** fix oncancel no use runtime datasource ([712cd1e](https://github.com/ant-design/pro-components/commit/712cd1e671d94dbf11a666226057d418c21bd063))

## [1.34.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.34.0...@ant-design/pro-utils@1.34.1) (2022-02-10)

### Bug Fixes

- **utils:** fix merge will change null to {} ([#4590](https://github.com/ant-design/pro-components/issues/4590)) ([001e0eb](https://github.com/ant-design/pro-components/commit/001e0eb6b43e9391fa84ff078ee3f013331221b9)), closes [#4583](https://github.com/ant-design/pro-components/issues/4583)
- 🐛 make sure the function doesn't change ([#4568](https://github.com/ant-design/pro-components/issues/4568)) ([2dff56f](https://github.com/ant-design/pro-components/commit/2dff56f59e92c7dee563090b2581dfd1b02bf0fa))

# [1.34.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.33.0...@ant-design/pro-utils@1.34.0) (2022-02-08)

### Features

- **form:** form support convertValue ([b555dc5](https://github.com/ant-design/pro-components/commit/b555dc5293ae9e92793b1ac6ad09e3cfbaf1bf64))
- **table:** reduce the dom of the form ([#4565](https://github.com/ant-design/pro-components/issues/4565)) ([38750ea](https://github.com/ant-design/pro-components/commit/38750ea6a1de21702d4285f520e5b7ffb57f8fab))

# [1.33.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.32.7...@ant-design/pro-utils@1.33.0) (2022-01-25)

### Bug Fixes

- **utils:** pass popoverProps to Popover in InlineErrorFormItem ([#4540](https://github.com/ant-design/pro-components/issues/4540)) ([8ff67fc](https://github.com/ant-design/pro-components/commit/8ff67fc3bf4ef7c9ee893d54e510d1c69e7b2a47))

### Features

- **form:** enhancement type ([#4523](https://github.com/ant-design/pro-components/issues/4523)) ([9c2a10b](https://github.com/ant-design/pro-components/commit/9c2a10bcc967e42cd97344f304aee8b4e1f86b53))

## [1.32.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.32.6...@ant-design/pro-utils@1.32.7) (2022-01-21)

### Bug Fixes

- **form:** 🐛 readonly form will not render the latest value ([#4494](https://github.com/ant-design/pro-components/issues/4494)) ([2c169a8](https://github.com/ant-design/pro-components/commit/2c169a846b72351f9988c22fd5c2ef2b1684b577))
- **form:** dependency transform from Array to Object ([#4500](https://github.com/ant-design/pro-components/issues/4500)) ([ecd74ea](https://github.com/ant-design/pro-components/commit/ecd74ea8f5e55fa264ee104f285794f36af9599d))

## [1.32.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.32.5...@ant-design/pro-utils@1.32.6) (2022-01-17)

### Bug Fixes

- **form:** default close swr cache ([#4470](https://github.com/ant-design/pro-components/issues/4470)) ([770a0fb](https://github.com/ant-design/pro-components/commit/770a0fb3360b1b0eac67deb3879f563cf9d9071b))
- **form:** ProFormList use uuid ([#4479](https://github.com/ant-design/pro-components/issues/4479)) ([11b3f71](https://github.com/ant-design/pro-components/commit/11b3f717cf545d9a361f173975586a99375c6517))
- **table:** params support function ([#4474](https://github.com/ant-design/pro-components/issues/4474)) ([e7379cc](https://github.com/ant-design/pro-components/commit/e7379cc57a6834d97e211e1237ca005dca9890b7))

## [1.32.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.32.4...@ant-design/pro-utils@1.32.5) (2022-01-07)

### Bug Fixes

- **utils:** antd themes less file path ([#4411](https://github.com/ant-design/pro-components/issues/4411)) ([ff78bf0](https://github.com/ant-design/pro-components/commit/ff78bf0b3bbb52984a8cc12768e1099a6192fa1b))

## [1.32.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.32.3...@ant-design/pro-utils@1.32.4) (2022-01-05)

### Bug Fixes

- **form:** support using prefixCls from ConfigProvider in <InlineErrorFormItem /> ([#4403](https://github.com/ant-design/pro-components/issues/4403)) ([4fd876a](https://github.com/ant-design/pro-components/commit/4fd876a20531a479e4bc957a346b1bf179b940ac))
- **utils:** timestamp in moment no need pass second param ([#4396](https://github.com/ant-design/pro-components/issues/4396)) ([62a4f8e](https://github.com/ant-design/pro-components/commit/62a4f8e7eff6a456853eaefdb5da120a693d5143))

## [1.32.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.32.2...@ant-design/pro-utils@1.32.3) (2021-12-28)

### Bug Fixes

- **utils:** update typing.ts ([#4362](https://github.com/ant-design/pro-components/issues/4362)) ([4592841](https://github.com/ant-design/pro-components/commit/459284151dbcf2b1590996f54ed77457c651ae10))

## [1.32.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.32.1...@ant-design/pro-utils@1.32.2) (2021-12-24)

### Bug Fixes

- **utils:** remove inputProps typing ([ea33916](https://github.com/ant-design/pro-components/commit/ea3391646b8a2bbb5bceea26b32720cd812df430))

## [1.32.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.32.0...@ant-design/pro-utils@1.32.1) (2021-12-23)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.32.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.31.2...@ant-design/pro-utils@1.32.0) (2021-12-22)

### Features

- **field:** add DigitRange component ([#4133](https://github.com/ant-design/pro-components/issues/4133)) ([227a42d](https://github.com/ant-design/pro-components/commit/227a42def19035dc70e52f56142b33f55dd65f4b))

## [1.31.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.31.1...@ant-design/pro-utils@1.31.2) (2021-12-22)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.31.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.31.0...@ant-design/pro-utils@1.31.1) (2021-12-20)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.31.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.30.0...@ant-design/pro-utils@1.31.0) (2021-12-20)

### Bug Fixes

- **utils:** Stronger judgment ([#4309](https://github.com/ant-design/pro-components/issues/4309)) ([50dafcf](https://github.com/ant-design/pro-components/commit/50dafcfd596e0a3814a7bc7fa4981790b61516cc))

### Features

- **form:** Support ProFormTreeSelect and valueType=treeSelect ([#4237](https://github.com/ant-design/pro-components/issues/4237)) ([31fab85](https://github.com/ant-design/pro-components/commit/31fab85ecc2c3ef873e88b050f26d1c3de4b8f98))

# [1.30.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.29.0...@ant-design/pro-utils@1.30.0) (2021-12-17)

### Bug Fixes

- **utils:** useDebounceFn will auto reject promise ([#4270](https://github.com/ant-design/pro-components/issues/4270)) ([8de01a4](https://github.com/ant-design/pro-components/commit/8de01a4915bb8354923a0a6485f250cc6c242247))

### Features

- disable default error boundary ([#4276](https://github.com/ant-design/pro-components/issues/4276)) ([094942f](https://github.com/ant-design/pro-components/commit/094942fb96f4465e6e883c9ffb629ed7b228e9ce))

# [1.29.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.9...@ant-design/pro-utils@1.29.0) (2021-12-13)

### Bug Fixes

- **form:** relay no render DrawerForm and ModalForm ([#4254](https://github.com/ant-design/pro-components/issues/4254)) ([f986ecb](https://github.com/ant-design/pro-components/commit/f986ecb9d89d4e3edef18d50eee4c37e730227d9))

### Features

- **layout:** settingDrawer use new antd new function ([#4042](https://github.com/ant-design/pro-components/issues/4042)) ([8e907d8](https://github.com/ant-design/pro-components/commit/8e907d8bbe48848c37e8ce1d5a584880e181f250))

## [1.28.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.8...@ant-design/pro-utils@1.28.9) (2021-12-10)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.28.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.7...@ant-design/pro-utils@1.28.8) (2021-12-10)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.28.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.6...@ant-design/pro-utils@1.28.7) (2021-12-08)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.28.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.5...@ant-design/pro-utils@1.28.6) (2021-12-07)

### Bug Fixes

- simplify swr usage ([#4181](https://github.com/ant-design/pro-components/issues/4181)) ([ed66732](https://github.com/ant-design/pro-components/commit/ed6673272882af09287eb87457df2a8ca9daf7f1))

## [1.28.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.4...@ant-design/pro-utils@1.28.5) (2021-11-30)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.28.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.3...@ant-design/pro-utils@1.28.4) (2021-11-23)

### Bug Fixes

- **table:** fix valueEnum error ([15d5835](https://github.com/ant-design/pro-components/commit/15d5835a87a289acb11e661ccacd01179378a5f7))

## [1.28.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.2...@ant-design/pro-utils@1.28.3) (2021-11-22)

### Bug Fixes

- **ProForm:** 修复 ProForm 请求两次问题 ([#4074](https://github.com/ant-design/pro-components/issues/4074)) ([fe9d08c](https://github.com/ant-design/pro-components/commit/fe9d08c950497bb2447ca088471b9dc8b86acb67))

## [1.28.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.1...@ant-design/pro-utils@1.28.2) (2021-11-18)

### Bug Fixes

- **descriptions:** unuse protable ([#4062](https://github.com/ant-design/pro-components/issues/4062)) ([04d6a6c](https://github.com/ant-design/pro-components/commit/04d6a6c94aaf1597ec5bbdb9135fdacbdca9640a))
- **table:** fix table validateFields no work error ([#4058](https://github.com/ant-design/pro-components/issues/4058)) ([0291e08](https://github.com/ant-design/pro-components/commit/0291e085a17d57d654b698695e9a2c31915a07e0))
- **table:** pro table support lightProps ([#4068](https://github.com/ant-design/pro-components/issues/4068)) ([ce15148](https://github.com/ant-design/pro-components/commit/ce151487c7dbd17917a0be0aec09d4e01237ff6a))

## [1.28.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.28.0...@ant-design/pro-utils@1.28.1) (2021-11-16)

### Bug Fixes

- **descriptions:** fix descriptions cancel values no work error ([#4043](https://github.com/ant-design/pro-components/issues/4043)) ([c4fa372](https://github.com/ant-design/pro-components/commit/c4fa372f3f6b5da3f6604e8b9e0d665ff46f6404))

# [1.28.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.27.0...@ant-design/pro-utils@1.28.0) (2021-11-15)

### Features

- **form:** support antd next ([#4038](https://github.com/ant-design/pro-components/issues/4038)) ([96a64c3](https://github.com/ant-design/pro-components/commit/96a64c35d0fc6a359a4ff3d36b96f510f4580c63)), closes [#3770](https://github.com/ant-design/pro-components/issues/3770) [#3863](https://github.com/ant-design/pro-components/issues/3863)

# [1.27.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.26.1...@ant-design/pro-utils@1.27.0) (2021-11-12)

### Bug Fixes

- **form:** fix proform.item no support QueryFilter error ([#4011](https://github.com/ant-design/pro-components/issues/4011)) ([5eff600](https://github.com/ant-design/pro-components/commit/5eff600f580d99452f9e1a84b7c36c315e55804f))
- **table:** 取消编辑行后表单未能全部重置 ([#3997](https://github.com/ant-design/pro-components/issues/3997)) ([042e80e](https://github.com/ant-design/pro-components/commit/042e80e782725c9825869e5dcefb90ed46969ffc))
- **table:** fix editor table rowkey error ([#4000](https://github.com/ant-design/pro-components/issues/4000)) ([8760aad](https://github.com/ant-design/pro-components/commit/8760aad6d95b514ab57ef857adf74219fe006e99))

### Features

- **field:** select request 添加防抖动属性 ([#3987](https://github.com/ant-design/pro-components/issues/3987)) ([887e654](https://github.com/ant-design/pro-components/commit/887e6541dae8e614789e651c74b32abc875e83e7))

## [1.26.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.26.0...@ant-design/pro-utils@1.26.1) (2021-11-02)

### Bug Fixes

- **list:** fix list style error ([#3943](https://github.com/ant-design/pro-components/issues/3943)) ([68e0eed](https://github.com/ant-design/pro-components/commit/68e0eede7131932eb9e16734bb5bbb3c8fa0572e))

# [1.26.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.25.0...@ant-design/pro-utils@1.26.0) (2021-10-27)

### Features

- **form:** support Cascader ([#3904](https://github.com/ant-design/pro-components/issues/3904)) ([be63c81](https://github.com/ant-design/pro-components/commit/be63c81be1102fd2f099e9182fb296a01a8b59f0))

# [1.25.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.9...@ant-design/pro-utils@1.25.0) (2021-10-26)

### Bug Fixes

- **descriptions:** fix descriptions item set style error ([#3860](https://github.com/ant-design/pro-components/issues/3860)) ([27659b3](https://github.com/ant-design/pro-components/commit/27659b3b81d3eba3e8241ca4e05c0caed8464e1a))

### Features

- support ssr server ([69773c9](https://github.com/ant-design/pro-components/commit/69773c9dbaccd342d86312032c7b09958cdaed7c))

## [1.24.9](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.8...@ant-design/pro-utils@1.24.9) (2021-10-19)

### Bug Fixes

- **table:** header support ellipsis ([#3855](https://github.com/ant-design/pro-components/issues/3855)) ([0f3501d](https://github.com/ant-design/pro-components/commit/0f3501da23f9f8a1cc596f913fef21e12a570efa))

## [1.24.8](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.7...@ant-design/pro-utils@1.24.8) (2021-10-15)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.24.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.6...@ant-design/pro-utils@1.24.7) (2021-10-08)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.24.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.5...@ant-design/pro-utils@1.24.6) (2021-09-24)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.24.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.4...@ant-design/pro-utils@1.24.5) (2021-09-18)

### Bug Fixes

- **table:** use new merge funtion ([#3696](https://github.com/ant-design/pro-components/issues/3696)) ([293c327](https://github.com/ant-design/pro-components/commit/293c327fa8db7ebd7ae9557c1ce8c426f8114cbc))
- **utils:** use swr beta verison fix ie support ([#3697](https://github.com/ant-design/pro-components/issues/3697)) ([490bb96](https://github.com/ant-design/pro-components/commit/490bb9657285dda4b20d7c2252072baea59d7c51))

## [1.24.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.3...@ant-design/pro-utils@1.24.4) (2021-09-16)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.24.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.2...@ant-design/pro-utils@1.24.3) (2021-09-09)

### Bug Fixes

- **form:** fix transform no support lableInValue ([#3630](https://github.com/ant-design/pro-components/issues/3630)) ([de76c5f](https://github.com/ant-design/pro-components/commit/de76c5f15dfdf107f28939b407e871cc8b697906))

## [1.24.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.1...@ant-design/pro-utils@1.24.2) (2021-09-07)

### Bug Fixes

- **form:** if valueType need request, note need request ([#3575](https://github.com/ant-design/pro-components/issues/3575)) ([41bb815](https://github.com/ant-design/pro-components/commit/41bb81540408659256da329fe0eb02e5c1583ea5))
- **table:** fix save and cancel button click error ([#3565](https://github.com/ant-design/pro-components/issues/3565)) ([09e5d9b](https://github.com/ant-design/pro-components/commit/09e5d9b3d6579b8eed3032cad0ae00ba57dc9ad0))
- **table:** 修改 Table reload、reloadAndRest 类型 ([#3574](https://github.com/ant-design/pro-components/issues/3574)) ([39a6284](https://github.com/ant-design/pro-components/commit/39a6284167c982116bad9dc953b2135d5cf4e553))
- **utils:** remove array move ([#3571](https://github.com/ant-design/pro-components/issues/3571)) ([f77f6e2](https://github.com/ant-design/pro-components/commit/f77f6e2d7ac041a7804af1aaa3612068bc539c0d))

## [1.24.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.24.0...@ant-design/pro-utils@1.24.1) (2021-08-30)

### Bug Fixes

- **utils:** add react-sortable-hoc ([4789cc9](https://github.com/ant-design/pro-components/commit/4789cc986a417cc2d72d026cda12f1d0b483c60d))

# [1.24.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.23.0...@ant-design/pro-utils@1.24.0) (2021-08-30)

### Features

- **layout:** support layout error boundaries ([#3551](https://github.com/ant-design/pro-components/issues/3551)) ([5b5f76a](https://github.com/ant-design/pro-components/commit/5b5f76a86df14ce42f12ce0e1e916e4b3b2ea357))

# [1.23.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.22.0...@ant-design/pro-utils@1.23.0) (2021-08-26)

### Bug Fixes

- **form:** fix ranger date render error in table ([#3541](https://github.com/ant-design/pro-components/issues/3541)) ([3ba6022](https://github.com/ant-design/pro-components/commit/3ba6022c27be7c7b6fb7e8ba691d6f9e0cca9579))

### Features

- **form:** huge performance improvement ([#3528](https://github.com/ant-design/pro-components/issues/3528)) ([31be4cc](https://github.com/ant-design/pro-components/commit/31be4cc533b222607808742dd51d9016017fb4f0))

# [1.22.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.21.0...@ant-design/pro-utils@1.22.0) (2021-08-24)

### Features

- **form:** form columns support dependencies ([#3523](https://github.com/ant-design/pro-components/issues/3523)) ([73624c8](https://github.com/ant-design/pro-components/commit/73624c87cf81e417cc3547386050261a45903bce))

# [1.21.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.20.4...@ant-design/pro-utils@1.21.0) (2021-08-19)

### Bug Fixes

- **table:** fix typo entry -> entity ([#3474](https://github.com/ant-design/pro-components/issues/3474)) ([e4fbb58](https://github.com/ant-design/pro-components/commit/e4fbb587d24b6f84ff7c2228ec1fe2d1c15a61ce))

### Features

- **form:** support addonBefore and addonAfter ([#3434](https://github.com/ant-design/pro-components/issues/3434)) ([ff23de6](https://github.com/ant-design/pro-components/commit/ff23de663852e628447a25243b20c97395f30fc5))
- **table:** 增加在 ProTable 中的 ProColumns 中 fieldProps 支持的属性类型描述 ([#3410](https://github.com/ant-design/pro-components/issues/3410)) ([652bad9](https://github.com/ant-design/pro-components/commit/652bad9bdafeaee17e30ccd3d516068182ffa1ec))

## [1.20.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.20.3...@ant-design/pro-utils@1.20.4) (2021-08-09)

### Bug Fixes

- **table:** 订正 ProSchema 类型中 proFieldProps 的类型 & 导出 ProFormItemProps 类型 ([#3388](https://github.com/ant-design/pro-components/issues/3388)) ([b1aef5d](https://github.com/ant-design/pro-components/commit/b1aef5decddf6e8a790639c920a9d5ab12c6bf03))

## [1.20.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.20.2...@ant-design/pro-utils@1.20.3) (2021-08-05)

### Bug Fixes

- **table:** 设置 ProSchema 的 proFieldProps 为可选属性 ([#3374](https://github.com/ant-design/pro-components/issues/3374)) ([99f4f60](https://github.com/ant-design/pro-components/commit/99f4f6058babdd3caf9018692824d3659a990fed))

## [1.20.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.20.1...@ant-design/pro-utils@1.20.2) (2021-08-03)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.20.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.20.0...@ant-design/pro-utils@1.20.1) (2021-07-30)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.20.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.19.7...@ant-design/pro-utils@1.20.0) (2021-07-26)

### Features

- **table:** support children column add function ([#3273](https://github.com/ant-design/pro-components/issues/3273)) ([2396e03](https://github.com/ant-design/pro-components/commit/2396e031d771ae818445d386e573898708b64f07))

## [1.19.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.19.6...@ant-design/pro-utils@1.19.7) (2021-07-20)

### Bug Fixes

- **list:** fix form context no render error ([#3274](https://github.com/ant-design/pro-components/issues/3274)) ([851c408](https://github.com/ant-design/pro-components/commit/851c40870dab3c953109e6bfedd9650e10609449))

## [1.19.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.19.5...@ant-design/pro-utils@1.19.6) (2021-07-19)

### Bug Fixes

- **table:** fix onSave will merge origin data error ([#3221](https://github.com/ant-design/pro-components/issues/3221)) ([a16473e](https://github.com/ant-design/pro-components/commit/a16473ec56f1b3d1114c9b73fd18be97605ccfae))
- **table:** fix table align with tooltip ([#3193](https://github.com/ant-design/pro-components/issues/3193)) ([3b0647e](https://github.com/ant-design/pro-components/commit/3b0647e6a0f64366ae4716a01d2b7a21b86c3805))
- **utils:** fix error import type and add check-deps script ([#3242](https://github.com/ant-design/pro-components/issues/3242)) ([7c49079](https://github.com/ant-design/pro-components/commit/7c49079746001e8434c187d8fad4288a39525f3d))

## [1.19.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.19.4...@ant-design/pro-utils@1.19.5) (2021-07-06)

### Bug Fixes

- **form:** fix vite build error ([3b8be53](https://github.com/ant-design/pro-components/commit/3b8be53b2b8e02356cd9c66e278131c943623b58))

## [1.19.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.19.3...@ant-design/pro-utils@1.19.4) (2021-07-01)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.19.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.19.2...@ant-design/pro-utils@1.19.3) (2021-06-28)

### Bug Fixes

- **form:** fix select optionGroup no filter error ([#3100](https://github.com/ant-design/pro-components/issues/3100)) ([5a9419c](https://github.com/ant-design/pro-components/commit/5a9419c89e40cf6de953258ef00a382887922519))
- **table:** remove onchange form renderFormItem ([#3106](https://github.com/ant-design/pro-components/issues/3106)) ([00f5e44](https://github.com/ant-design/pro-components/commit/00f5e440eddf4e63c7af4b21bf9b315ee3363b32))

## [1.19.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.19.1...@ant-design/pro-utils@1.19.2) (2021-06-17)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.19.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.19.0...@ant-design/pro-utils@1.19.1) (2021-06-15)

### Bug Fixes

- **form:** use merge repacle assign ([#3011](https://github.com/ant-design/pro-components/issues/3011)) ([82df9a4](https://github.com/ant-design/pro-components/commit/82df9a4dfa42be4d0e58f624b14b7ff21c07ff02))

# [1.19.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.18.2...@ant-design/pro-utils@1.19.0) (2021-06-08)

### Bug Fixes

- **form:** namePath and transform support omitNil ([#2913](https://github.com/ant-design/pro-components/issues/2913)) ([dd3f740](https://github.com/ant-design/pro-components/commit/dd3f740594f22e12ed9146dc00387ed276fd9072))
- **table:** support three levels of nesting ([#2941](https://github.com/ant-design/pro-components/issues/2941)) ([c9dc346](https://github.com/ant-design/pro-components/commit/c9dc346c309d54da2b8b7c4a4500b1b54a0305cb))

### Features

- **form:** LightFilter support footer ([#2794](https://github.com/ant-design/pro-components/issues/2794)) ([#2884](https://github.com/ant-design/pro-components/issues/2884)) ([042daa6](https://github.com/ant-design/pro-components/commit/042daa6035361ae65b401004eb06f697186f33c8))
- **form:** support more tooltip props ([#2932](https://github.com/ant-design/pro-components/issues/2932)) ([bedd7eb](https://github.com/ant-design/pro-components/commit/bedd7ebb0784da8fbb9c4998651f39f5efff5354))
- **table:** onsave support origin data and no merge record ([#2949](https://github.com/ant-design/pro-components/issues/2949)) ([8c9d021](https://github.com/ant-design/pro-components/commit/8c9d0218c2d8927bae4fb0bad9a911a3b905d580))

## [1.18.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.18.1...@ant-design/pro-utils@1.18.2) (2021-05-31)

### Bug Fixes

- **table:** dateRange render wrong with light mode ([#2867](https://github.com/ant-design/pro-components/issues/2867)) ([09396f3](https://github.com/ant-design/pro-components/commit/09396f339befd974b0c66196cc04a68d66b13c2c))

## [1.18.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.18.0...@ant-design/pro-utils@1.18.1) (2021-05-28)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.18.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.17.0...@ant-design/pro-utils@1.18.0) (2021-05-25)

### Features

- **table:** eidt table use Proform ([#2832](https://github.com/ant-design/pro-components/issues/2832)) ([5c8b4ba](https://github.com/ant-design/pro-components/commit/5c8b4bac7169d2d0c091b1d1d9a68f03166abd88))

# [1.17.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.16.7...@ant-design/pro-utils@1.17.0) (2021-05-24)

### Features

- **form:** form support request and params ([#2812](https://github.com/ant-design/pro-components/issues/2812)) ([8064293](https://github.com/ant-design/pro-components/commit/8064293532e9e937dea973be50d9e8fbc06c3aa9))

## [1.16.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.16.6...@ant-design/pro-utils@1.16.7) (2021-05-21)

### Bug Fixes

- **EditTable:** allowClear 清除值后保存数据没有更新 ([#2780](https://github.com/ant-design/pro-components/issues/2780)) ([1ac6bb3](https://github.com/ant-design/pro-components/commit/1ac6bb3cfd10160ef9ec6bd3d790005744314c06))
- **table:** if editableKeys change,should Cell Update ([#2803](https://github.com/ant-design/pro-components/issues/2803)) ([291e27e](https://github.com/ant-design/pro-components/commit/291e27ea073653fff3b0fbc4ef2466d6e4164b91))

## [1.16.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.16.5...@ant-design/pro-utils@1.16.6) (2021-05-18)

### Bug Fixes

- **Descriptions:** fix Descriptions reset will set value ([#2732](https://github.com/ant-design/pro-components/issues/2732)) ([e36a35d](https://github.com/ant-design/pro-components/commit/e36a35d98111329a575c8316022637b9a4c5959c))
- **Descriptions:** fix proFieldKey is same error ([#2729](https://github.com/ant-design/pro-components/issues/2729)) ([be501ec](https://github.com/ant-design/pro-components/commit/be501ece15d04a9680fb08bd036e48587857dd9c))

## [1.16.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.16.4...@ant-design/pro-utils@1.16.5) (2021-05-11)

### Bug Fixes

- **table:** fix defaultRender will gen two label error ([#2715](https://github.com/ant-design/pro-components/issues/2715)) ([687d51b](https://github.com/ant-design/pro-components/commit/687d51b9edf6e0ed7ae07fc49af02701b7355457))

## [1.16.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.16.3...@ant-design/pro-utils@1.16.4) (2021-04-29)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.16.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.16.2...@ant-design/pro-utils@1.16.3) (2021-04-22)

### Bug Fixes

- **form:** fix transformKeySubmitValue will gen null value error ([#2571](https://github.com/ant-design/pro-components/issues/2571)) ([c3e5118](https://github.com/ant-design/pro-components/commit/c3e5118a91fa5bf9560e6cd036dca9864fac1b09))
- **form:** support moneySymbol=undefined ([#2579](https://github.com/ant-design/pro-components/issues/2579)) ([029482d](https://github.com/ant-design/pro-components/commit/029482d557c8de3cb761af59560aa5e7a9166082))
- **utils:** stop propagation icon event ([#2566](https://github.com/ant-design/pro-components/issues/2566)) ([7f0cab6](https://github.com/ant-design/pro-components/commit/7f0cab6cec7b52fc9237e977521903308f19793b))
- **utils:** 修复 InlineErrorFormItem 的 Popover 问题 ([#2546](https://github.com/ant-design/pro-components/issues/2546)) ([9765668](https://github.com/ant-design/pro-components/commit/9765668e25c7f9191ecc32a5485b2572f0edaaab))

## [1.16.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.16.1...@ant-design/pro-utils@1.16.2) (2021-04-19)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.16.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.16.0...@ant-design/pro-utils@1.16.1) (2021-04-19)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.16.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.15.3...@ant-design/pro-utils@1.16.0) (2021-04-15)

### Bug Fixes

- **form:** transform support format config ([#2489](https://github.com/ant-design/pro-components/issues/2489)) ([c3dd999](https://github.com/ant-design/pro-components/commit/c3dd9993d71032703e7f5ef7010bee0db2485a0c))

### Features

- **form:** support SchemaForm ([#2040](https://github.com/ant-design/pro-components/issues/2040)) ([423f476](https://github.com/ant-design/pro-components/commit/423f4761eecde5a62c4a8476441aa0484ff94711))

## [1.15.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.15.2...@ant-design/pro-utils@1.15.3) (2021-04-06)

### Bug Fixes

- **utils:** 优化 inline-error-form-item 的 popover 展示逻辑 ([#2372](https://github.com/ant-design/pro-components/issues/2372)) ([5436161](https://github.com/ant-design/pro-components/commit/543616114cf69a4ccdbbdac89d8807e4a5051f07)), closes [#2361](https://github.com/ant-design/pro-components/issues/2361)

## [1.15.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.15.1...@ant-design/pro-utils@1.15.2) (2021-03-31)

### Bug Fixes

- **descriptions:** fix descriptions onsave no work where key is array ([#2350](https://github.com/ant-design/pro-components/issues/2350)) ([36b34a1](https://github.com/ant-design/pro-components/commit/36b34a1a8e63838e3262e6f8edc24e43c1e8a4bc))
- **table:** fix isNewLine is error for editabletable ([#2366](https://github.com/ant-design/pro-components/issues/2366)) ([ea3bc5a](https://github.com/ant-design/pro-components/commit/ea3bc5a62cae4ef98961445d60e64f0b929c54f4))

## [1.15.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.15.0...@ant-design/pro-utils@1.15.1) (2021-03-29)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.15.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.14.3...@ant-design/pro-utils@1.15.0) (2021-03-18)

### Features

- **field:** add percent field support showSymbol is function ([#2228](https://github.com/ant-design/pro-components/issues/2228)) ([01480f7](https://github.com/ant-design/pro-components/commit/01480f7937efc7435aebc9a40414558643e00b97))
- **utils:** fix inline-error-form-item problems ([#2223](https://github.com/ant-design/pro-components/issues/2223)) ([ee4ad37](https://github.com/ant-design/pro-components/commit/ee4ad3769fb02de02e07a82d5f26f448c355580e))
- **utils:** upgrade inline-error-form-item ([#2168](https://github.com/ant-design/pro-components/issues/2168)) ([077c168](https://github.com/ant-design/pro-components/commit/077c1689c86484acae8d7e9146934c1af137a802))

## [1.14.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.14.2...@ant-design/pro-utils@1.14.3) (2021-03-16)

### Bug Fixes

- **form:** fix text is 0, initialValue no work error ([#2183](https://github.com/ant-design/pro-components/issues/2183)) ([e8f0d70](https://github.com/ant-design/pro-components/commit/e8f0d709fa7b7b870fcd2d2a1b9077f6031ed204))

## [1.14.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.14.1...@ant-design/pro-utils@1.14.2) (2021-03-11)

### Bug Fixes

- **table:** fix rowkey is number will error ([#2158](https://github.com/ant-design/pro-components/issues/2158)) ([fc38af8](https://github.com/ant-design/pro-components/commit/fc38af890846fd439e00c224d8bc7a00ef3a6723))

## [1.14.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.14.0...@ant-design/pro-utils@1.14.1) (2021-03-11)

### Bug Fixes

- **table:** EditableProTable no tonumber keys ([#2135](https://github.com/ant-design/pro-components/issues/2135)) ([b4d3c0a](https://github.com/ant-design/pro-components/commit/b4d3c0ac13e8ef2a981e2bc3132b951c583c1e58))

# [1.14.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.13.2...@ant-design/pro-utils@1.14.0) (2021-03-08)

### Bug Fixes

- **utils:** support value of BLOB array types ([#2082](https://github.com/ant-design/pro-components/issues/2082)) ([77cad4a](https://github.com/ant-design/pro-components/commit/77cad4a5b417a4878acaad811d626000da150c2e))

### Features

- **field:** add color pick ([#2089](https://github.com/ant-design/pro-components/issues/2089)) ([e83c2ee](https://github.com/ant-design/pro-components/commit/e83c2ee36f67b66070074562f80f248cbfc1a6e3))
- **form:** select optipn support optGroup ([#2067](https://github.com/ant-design/pro-components/issues/2067)) ([2a99e27](https://github.com/ant-design/pro-components/commit/2a99e27ea8f5d9d24b646f96ccd11967c059159e))

## [1.13.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.13.1...@ant-design/pro-utils@1.13.2) (2021-02-28)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.13.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.13.0...@ant-design/pro-utils@1.13.1) (2021-02-25)

### Bug Fixes

- **form:** fix ligthfilter label error ([#1998](https://github.com/ant-design/pro-components/issues/1998)) ([e75cd37](https://github.com/ant-design/pro-components/commit/e75cd37aa32301a438b9bcd903d7656964b43183))
- **utils:** fix if condition in conversionSubmitValue ([#1983](https://github.com/ant-design/pro-components/issues/1983)) ([f24cd70](https://github.com/ant-design/pro-components/commit/f24cd704f84927964f209630cae4d492711c9668))
- **utils:** new isUrl function copied from '@umijs/route-utils' ([#1996](https://github.com/ant-design/pro-components/issues/1996)) ([30a3fd3](https://github.com/ant-design/pro-components/commit/30a3fd37b67b07869263d12dbb511694fc08bf48))

# [1.13.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.12.0...@ant-design/pro-utils@1.13.0) (2021-02-22)

### Bug Fixes

- **field:** omit fieldProps and support onChange ([#1886](https://github.com/ant-design/pro-components/issues/1886)) ([8d7c963](https://github.com/ant-design/pro-components/commit/8d7c9639073822daa554db07a5f0c8c0ea334a65))

### Features

- **field:** support timeRange ([#1884](https://github.com/ant-design/pro-components/issues/1884)) ([4665efc](https://github.com/ant-design/pro-components/commit/4665efca7114737bcd7314ff3de6caad4afe30ae))
- **form:** support form list ([#1908](https://github.com/ant-design/pro-components/issues/1908)) ([bc34d34](https://github.com/ant-design/pro-components/commit/bc34d34e490d83a73c890e6514d12d451a0161f9))
- **table:** editable support form config ([#1879](https://github.com/ant-design/pro-components/issues/1879)) ([2fd7dff](https://github.com/ant-design/pro-components/commit/2fd7dff2c163fc9f5cd7f98739130ba4f7b4a9ee))

# [1.12.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.11.3...@ant-design/pro-utils@1.12.0) (2021-02-04)

### Bug Fixes

- **table:** fix toNumber will gen 0 start number ([#1850](https://github.com/ant-design/pro-components/issues/1850)) ([63ca3b8](https://github.com/ant-design/pro-components/commit/63ca3b824501eae102f8b0098b5645740acab7ed))

### Features

- **table:** actionRef add pageInfo ([#1851](https://github.com/ant-design/pro-components/issues/1851)) ([7370cba](https://github.com/ant-design/pro-components/commit/7370cba941b350b0e93fcd135dd12623d66ea511))

## [1.11.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.11.2...@ant-design/pro-utils@1.11.3) (2021-02-02)

### Bug Fixes

- **table:** fix fieldProps no has bug ([#1776](https://github.com/ant-design/pro-components/issues/1776)) ([01e67a4](https://github.com/ant-design/pro-components/commit/01e67a45ef0f977e38688ab727dde878b11dd338))

## [1.11.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.11.1...@ant-design/pro-utils@1.11.2) (2021-01-25)

### Bug Fixes

- **form:** ignore Blob type ([#1722](https://github.com/ant-design/pro-components/issues/1722)) ([e8a2638](https://github.com/ant-design/pro-components/commit/e8a26386f14dcbc40950ebe3a68f2e001e0d48d7))

## [1.11.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.11.0...@ant-design/pro-utils@1.11.1) (2021-01-21)

### Bug Fixes

- **filed:** allow value in form values ([#1705](https://github.com/ant-design/pro-components/issues/1705)) ([12b1d80](https://github.com/ant-design/pro-components/commit/12b1d808459ecc99cbb614e7d3cda041cd07a00e))

# [1.11.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.10.5...@ant-design/pro-utils@1.11.0) (2021-01-18)

### Features

- **form:** form support omitNil ([#1666](https://github.com/ant-design/pro-components/issues/1666)) ([67e8416](https://github.com/ant-design/pro-components/commit/67e8416fa85a531c3b6e7b98c8ae0874a8c9b8f8))
- **table:** table support editable.onValuesChange ([#1644](https://github.com/ant-design/pro-components/issues/1644)) ([2017a46](https://github.com/ant-design/pro-components/commit/2017a463fd74fbd6334b2154b59ed0b4f48c4d89))

## [1.10.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.10.4...@ant-design/pro-utils@1.10.5) (2021-01-13)

### Bug Fixes

- **form:** fix the problem of duplicate form fields ([#1607](https://github.com/ant-design/pro-components/issues/1607)) ([fe237a3](https://github.com/ant-design/pro-components/commit/fe237a3b99738cc19afb8ff63551f5c08076dad7))

## [1.10.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.10.3...@ant-design/pro-utils@1.10.4) (2021-01-12)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.10.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.10.2...@ant-design/pro-utils@1.10.3) (2021-01-11)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.10.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.10.1...@ant-design/pro-utils@1.10.2) (2021-01-08)

### Bug Fixes

- **descriptions:** support ErrorBoundary ([#1541](https://github.com/ant-design/pro-components/issues/1541)) ([15a1601](https://github.com/ant-design/pro-components/commit/15a1601e2f553ab97aae8133f8b6b924698b42ff))
- **filed:** moneySymbol support config ([#1545](https://github.com/ant-design/pro-components/issues/1545)) ([9f60b04](https://github.com/ant-design/pro-components/commit/9f60b0417b441a43c07716e7ea192eeb79648f20))
- **form:** fix transform no work when namePath is array ([#1537](https://github.com/ant-design/pro-components/issues/1537)) ([ca244fe](https://github.com/ant-design/pro-components/commit/ca244fe2c17a2a397909340d23cbed49a1b2c5a9))

## [1.10.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.10.0...@ant-design/pro-utils@1.10.1) (2021-01-07)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.10.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.9.0...@ant-design/pro-utils@1.10.0) (2021-01-05)

### Features

- **field:** text use CompositionInput ([#1499](https://github.com/ant-design/pro-components/issues/1499)) ([4f26efb](https://github.com/ant-design/pro-components/commit/4f26efb81a7592868e6e863ca6fbb59cb6918016))

# [1.9.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.8.0...@ant-design/pro-utils@1.9.0) (2021-01-05)

### Features

- **table:** add 'internationalization for editabletable action' option ([#1491](https://github.com/ant-design/pro-components/issues/1491)) ([6e40765](https://github.com/ant-design/pro-components/commit/6e407652deb168cfa6432d67546d4b23dff0971e))

# [1.8.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.7.0...@ant-design/pro-utils@1.8.0) (2021-01-04)

### Features

- **field:** support image valueType ([#1480](https://github.com/ant-design/pro-components/issues/1480)) ([08b36e2](https://github.com/ant-design/pro-components/commit/08b36e24ff077392572c625b6fb3d119afeb44ea))

# [1.7.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.6.4...@ant-design/pro-utils@1.7.0) (2021-01-01)

### Bug Fixes

- **table:** fix table form submit time error ([#1466](https://github.com/ant-design/pro-components/issues/1466)) ([5591a87](https://github.com/ant-design/pro-components/commit/5591a8754d0e911eecdd8bdac7b5d010e2824451))

### Features

- **table:** support customization valueType ([#1456](https://github.com/ant-design/pro-components/issues/1456)) ([cbce5ba](https://github.com/ant-design/pro-components/commit/cbce5baf9ae456a1ab32a748e7ac86ee592b4344))

## [1.6.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.6.3...@ant-design/pro-utils@1.6.4) (2020-12-31)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.6.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.6.2...@ant-design/pro-utils@1.6.3) (2020-12-31)

### Bug Fixes

- **compiler:** 当 value 值为 0 时，fieldLabel 显示异常 bug ([#1435](https://github.com/ant-design/pro-components/issues/1435)) ([d233a99](https://github.com/ant-design/pro-components/commit/d233a99587a35b36431e0ffbc47adbcc2504232f))

## [1.6.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.6.1...@ant-design/pro-utils@1.6.2) (2020-12-28)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.6.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.6.0...@ant-design/pro-utils@1.6.1) (2020-12-25)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.6.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.5.2...@ant-design/pro-utils@1.6.0) (2020-12-24)

### Features

- **form:** 懒加载 DrawerForm 和 ModalFrom 优化性能 ([#1370](https://github.com/ant-design/pro-components/issues/1370)) ([743a0ce](https://github.com/ant-design/pro-components/commit/743a0ce00d00e326b02dd83a3ab349405ef92aff))

## [1.5.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.5.1...@ant-design/pro-utils@1.5.2) (2020-12-21)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.5.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.5.0...@ant-design/pro-utils@1.5.1) (2020-12-15)

### Bug Fixes

- **table:** 修复新旧值均为 map 类型的等价判断，一直返回 true 的问题 ([#1302](https://github.com/ant-design/pro-components/issues/1302)) ([d61afb9](https://github.com/ant-design/pro-components/commit/d61afb90bc51a6835acfd317d9bf8dac95a54405))

# [1.5.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.4.0...@ant-design/pro-utils@1.5.0) (2020-12-14)

### Features

- **desciption:** support editable ([#1273](https://github.com/ant-design/pro-components/issues/1273)) ([bc8821b](https://github.com/ant-design/pro-components/commit/bc8821bce05faadaa7d9337ae2287131c41791e0))
- **table:** EditableTable support max length ([#1286](https://github.com/ant-design/pro-components/issues/1286)) ([dac9844](https://github.com/ant-design/pro-components/commit/dac9844e42ed19d5a539b6b0eae42ea35d6f958d))

# [1.4.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.3.2...@ant-design/pro-utils@1.4.0) (2020-12-08)

### Features

- **table:** fieldProps support function ([#1227](https://github.com/ant-design/pro-components/issues/1227)) ([bc34fb0](https://github.com/ant-design/pro-components/commit/bc34fb0ce11d006c83b06166f6cf8903bd5d3e1a))

## [1.3.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.3.1...@ant-design/pro-utils@1.3.2) (2020-12-07)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.3.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.3.0...@ant-design/pro-utils@1.3.1) (2020-12-02)

**Note:** Version bump only for package @ant-design/pro-utils

# [1.3.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.2.0...@ant-design/pro-utils@1.3.0) (2020-11-27)

### Bug Fixes

- **table:** optimize table demos and table style. ([#1105](https://github.com/ant-design/pro-components/issues/1105)) ([6e6437e](https://github.com/ant-design/pro-components/commit/6e6437e621200932a24a9199ee729ff4253d71c0))

### Features

- **table:** support editor table ([#994](https://github.com/ant-design/pro-components/issues/994)) ([35f40fe](https://github.com/ant-design/pro-components/commit/35f40feb72dd10ea6fefb7d6a59943d43d0a7325))

# [1.2.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.1.0...@ant-design/pro-utils@1.2.0) (2020-11-17)

### Features

- **form:** LightFilter support allowClear ([#974](https://github.com/ant-design/pro-components/issues/974)) ([6ef984a](https://github.com/ant-design/pro-components/commit/6ef984ae6ba9560737c200c0ca39e5d2f3d7286b))
- **form:** support readonly ([#963](https://github.com/ant-design/pro-components/issues/963)) ([2b27e91](https://github.com/ant-design/pro-components/commit/2b27e917707c530c2a9d9c91fa27c1b663a07bf4))

# [1.1.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.0.7...@ant-design/pro-utils@1.1.0) (2020-11-09)

### Features

- **table:** 修复 ListToolBar 样式问题 & 调整部分 Table 样式的 demo ([#918](https://github.com/ant-design/pro-components/issues/918)) ([a217c6e](https://github.com/ant-design/pro-components/commit/a217c6ea309f5232fd1864b2d886f449f49f2b6a))

## [1.0.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.0.6...@ant-design/pro-utils@1.0.7) (2020-11-04)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.0.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.0.5...@ant-design/pro-utils@1.0.6) (2020-11-02)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.0.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.0.4...@ant-design/pro-utils@1.0.5) (2020-10-29)

### Bug Fixes

- **layout:** fix pageTitle is empty error ([#851](https://github.com/ant-design/pro-components/issues/851)) ([f61ab17](https://github.com/ant-design/pro-components/commit/f61ab170ee1accc35c46956a96b5c8598dd4d90e))

## [1.0.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.0.3...@ant-design/pro-utils@1.0.4) (2020-10-26)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.0.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.0.2...@ant-design/pro-utils@1.0.3) (2020-10-15)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.0.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@1.0.1...@ant-design/pro-utils@1.0.2) (2020-10-15)

**Note:** Version bump only for package @ant-design/pro-utils

## [1.0.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.5.0...@ant-design/pro-utils@1.0.1) (2020-10-12)

**Note:** Version bump only for package @ant-design/pro-utils

# [0.5.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.4.1...@ant-design/pro-utils@0.5.0) (2020-09-29)

### Features

- ProTable & ProList support LightFilter ([#622](https://github.com/ant-design/pro-components/issues/622)) ([ce925c1](https://github.com/ant-design/pro-components/commit/ce925c191330956dadbad752b25ad4c7481d9663))

## [0.4.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.4.0...@ant-design/pro-utils@0.4.1) (2020-09-22)

**Note:** Version bump only for package @ant-design/pro-utils

# [0.4.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.3.1...@ant-design/pro-utils@0.4.0) (2020-09-14)

### Features

- **core:** 为 LabelIconTip 添加 subTitle ([#454](https://github.com/ant-design/pro-components/issues/454)) ([92c095c](https://github.com/ant-design/pro-components/commit/92c095cf88c15a959109403cc6321ee1be70225a))

## [0.3.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.3.0...@ant-design/pro-utils@0.3.1) (2020-09-14)

**Note:** Version bump only for package @ant-design/pro-utils

# [0.3.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.2.0...@ant-design/pro-utils@0.3.0) (2020-09-10)

### Features

- **from:** support ProFormDatePicker.Month & Quarter & Year ([#436](https://github.com/ant-design/pro-components/issues/436)) ([dade507](https://github.com/ant-design/pro-components/commit/dade507a45b0b27aa7f00c103a09db1f0bd1264f))

# [0.2.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.1.2...@ant-design/pro-utils@0.2.0) (2020-09-07)

### Features

- **form:** LightFilter support i18n ([#379](https://github.com/ant-design/pro-components/issues/379)) ([6e70e85](https://github.com/ant-design/pro-components/commit/6e70e85556291c2baf4b4b582b2a476e1aefe806))
- **form:** new form component ProFormDatePicker.Week & LightFilter support bordered ([#385](https://github.com/ant-design/pro-components/issues/385)) ([c6bb939](https://github.com/ant-design/pro-components/commit/c6bb939c016e1d278485fe0cd3808c242b4eb117))

## [0.1.2](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.1.1...@ant-design/pro-utils@0.1.2) (2020-08-31)

**Note:** Version bump only for package @ant-design/pro-utils

## [0.1.1](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.1.0...@ant-design/pro-utils@0.1.1) (2020-08-25)

**Note:** Version bump only for package @ant-design/pro-utils

# [0.1.0](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.0.7...@ant-design/pro-utils@0.1.0) (2020-08-24)

### Features

- **form:** ProForm new Layout LightFilter support ([#173](https://github.com/ant-design/pro-components/issues/173)) ([e558c62](https://github.com/ant-design/pro-components/commit/e558c62a14e9d3b85050f790c72de96dbaa82321))

## [0.0.7](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.0.6...@ant-design/pro-utils@0.0.7) (2020-08-19)

**Note:** Version bump only for package @ant-design/pro-utils

## [0.0.6](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.0.5...@ant-design/pro-utils@0.0.6) (2020-08-17)

**Note:** Version bump only for package @ant-design/pro-utils

## [0.0.5](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.0.4...@ant-design/pro-utils@0.0.5) (2020-08-12)

**Note:** Version bump only for package @ant-design/pro-utils

## [0.0.4](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.0.3...@ant-design/pro-utils@0.0.4) (2020-08-12)

**Note:** Version bump only for package @ant-design/pro-utils

## [0.0.3](https://github.com/ant-design/pro-components/compare/@ant-design/pro-utils@0.0.2...@ant-design/pro-utils@0.0.3) (2020-08-12)

**Note:** Version bump only for package @ant-design/pro-utils

## 0.0.2 (2020-08-10)

**Note:** Version bump only for package @ant-design/pro-utils
