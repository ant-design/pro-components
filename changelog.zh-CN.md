# 更新日志

### 4.5.14

- 🐞 修复边栏的内联菜单无法展开和折叠的问题。

### 4.5.13

- 🐞 删除 collapsed 错误的输出 warning 的问题。[#81](https://github.com/ant-design/ant-design-pro-layout/pull/81) [@blackraindrop](https://github.com/blackraindrop)
- 🌟 支持了 openKeys 与 selectedKeys 受控用法。

### 4.5.12

- 💄 删除在小屏幕上修复额外的边距。
- 🌟 添加 menuHeaderRender 和 onMenuHeaderClick props。

### 4.5.11

- 🐞 修复 onCollapse 不配置时，手机模式无法收起的问题。
- 🌟 pageTitleRender 增加 pageName 参数。
- 💄 PageHeaderWarp 的样式调整.

### 4.5.10

- 🐞 修复在 es 模式下仍会加载 lib/xx 的问题

### 4.5.9

- 🐞 修复错误的 isUrl 判断导致的 hash 模式菜单渲染错误。

### 4.5.8

- 🌟 menuItemRender 增加 `isMobile` and `isUrl` 参数。
- 🌟 当 title=false 时不再显示 title。

### 4.5.7

- 🐞 修复发布包的权限问题。

### 4.5.6

- 🌟 增加一个新的 props：collapsedButtonRender。
- 🌟 修复 location 不传时，菜单不选中的问题。[#23](https://github.com/ant-design/ant-design-pro-layout/issues/23)
- 🌟 Menu icon support 支持本地的图片路径。 [#12](https://github.com/ant-design/ant-design-pro-layout/pull/12) [@billfeller](https://github.com/billfeller)
- 🐞 修复 icon 错误的 className。 [#17](https://github.com/ant-design/ant-design-pro-layout/pull/17) [@zzh1991](https://github.com/zzh1991)
- 🌟 Footer 支持传入 props。 [#17](https://github.com/ant-design/ant-design-pro-layout/pull/17) [@zzh1991](https://github.com/zzh1991)
- 🌟 RouteContext 增加了 isMobile 的值。
- 🐞 修复 [ant-design/ant-design-pro#4532](https://github.com/ant-design/ant-design-pro/issues/4532)，修复 icon 大小错位的问题。
- 🐞 修复 [ant-design/ant-design-pro#4482](https://github.com/ant-design/ant-design-pro/pull/4482)， 修复 menuData 未判断空值的问题。

### 4.5.4

- 🐞 修复 PageHeaderWrapper 的类型错误。

### 4.5.3

- 🌟 SettingDrawer 默认从 localStorage 中获取语言配置。

### 4.5.2

- 🌟 修改 `antd/lib` 的引入到 `antd/es`
- 🐞 修复 `css` 的层级过低造成被 `antd` 样式覆盖的问题。

### 4.5.1

- 🌟 PageHeaderWrapper 支持通过 pageHeaderRender 来自定义内容。

### 4.5.0

- 🌟 修改为 babel 编译，支持通过 less 主题功能。
- 🐞 lint 修改为了 eslint-typescript。

### 4.4.0

- 🌟 支持自定义的 contentWidth。
- 🐞 修复了一系列 lint 错误。
