# changelog

### 4.5.14

- 🐞 Fix the problem that the inline menu of the sidebar cannot be expanded and collapsed.

### 4.5.13

- 🐞 Fixed an issue with the output warning of the collapsed error. [#81](https://github.com/ant-design/ant-design-pro-layout/pull/81) [@blackraindrop](https://github.com/blackraindrop)
- 🌟 Supported usage of openKeys and selectedKeys is supported.

### 4.5.12

- 💄 Fix extra margin top in small screen.
- 🌟 add menuHeaderRender and onMenuHeaderClick props.

### 4.5.11

- 🐞 Fixed an issue where phone mode could not be collapsed when onCollapse was not configured.
- 🌟 pageTitleRender add pageName props.
- 💄 PageHeaderWarp style optimization.

### 4.5.10

- 🐞 Fix the problem that lib/xx will still be loaded in es module.

### 4.5.9

- 🐞 Fix the wrong isUrl to determine the hash mode menu rendering error.

### 4.5.8

- 🌟 menuItemRender add `isMobile` and `isUrl` props.
- 🌟 When title=false, don not render title view

### 4.5.7

- 🐞 Fix the permissions issue of the release package.

### 4.5.6

- 🌟 Add new prop: collapsedButtonRender.
- 🌟 Fix the problem that the location is not passed, the menu is not selected. [#23](https://github.com/ant-design/ant-design-pro-layout/issues/23)
- 🌟 Menu icon support local image path. [#12](https://github.com/ant-design/ant-design-pro-layout/pull/12) [@billfeller](https://github.com/billfeller)
- 🐞 Fix icon error className. [#17](https://github.com/ant-design/ant-design-pro-layout/pull/17) [@zzh1991](https://github.com/zzh1991)
- 🌟 Footer support configurable. [#17](https://github.com/ant-design/ant-design-pro-layout/pull/17) [@zzh1991](https://github.com/zzh1991)
- 🌟 RouteContext value add isMobile and collapsed props.
- 🐞 Fix [ant-design/ant-design-pro#4532](https://github.com/ant-design/ant-design-pro/issues/4532), top header small misplacement.
- 🐞 Fix [ant-design/ant-design-pro#4482](https://github.com/ant-design/ant-design-pro/pull/4482), fix the problem that menuData does not judge null value.

### 4.5.4

- 🐞 Fixed PageHeaderWrapper type error.

### 4.5.3

- 🌟 SettingDrawer get lang form localStorage.

### 4.5.2

- 🌟 Modify the introduction of `antd/lib` to `antd/es`
- 🐞 Fixed a problem where `css` was too low to be covered by the `antd` style.

### 4.5.1

- 🌟 PageHeaderWrapper supports content customization through pageHeaderRender.

### 4.5.0

- 🌟 Modified to babel compilation, supported by the less theme feature.
- 🐞 lint is modified for eslint-typescript.

### 4.4.0

- 🌟 Support for custom contentWidth.
- 🐞 Fixed a series of lint errors.
