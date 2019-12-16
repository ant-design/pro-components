# 更新日志

### 4.9.11

- 🌟 Menu 的 `key` 与 `path` 解耦 [#238](https://github.com/ant-design/ant-design-pro-layout/pull/238)
- 🐞 修复了移动模式下的菜单样式问题。 [#241](https://github.com/ant-design/ant-design-pro-layout/pull/241)
- 🐞 修复了 Layout 的高度被固定的问题。 [2752721](https://github.com/ant-design/ant-design-pro-layout/commit/2752721)

### 4.9.10

- 🐞 Stricter locale judgment. [567cbdf](https://github.com/ant-design/ant-design-pro-layout/commit/567cbdf)

### 4.9.9

- 🐞 修复 `menu.locale=false`不工作的问题。[892983ab](https://github.com/ant-design/ant-design-pro-layout/commit/892983ab)
- 🌟 `menuDataRender` 支持了国际化。[c7f8ede4](https://github.com/ant-design/ant-design-pro-layout/commit/c7f8ede4)

### 4.9.8

- 🐞 添加默认的高度和宽度。[8064423d](https://github.com/ant-design/ant-design-pro-layout/commit/8064423d)
- 🌟 为 PageHeaderWrapper 添加 `tabAnimated` 属性。[#224](https://github.com/ant-design/ant-design-pro-layout/pull/224)
- 🌟 链接菜单支持 `inlineCollapsed`。[90003255](https://github.com/ant-design/ant-design-pro-layout/commit/90003255)
- 🌟 `pageTitleRender`添加增加`info`的参数。[fbc86888](https://github.com/ant-design/ant-design-pro-layout/commit/fbc86888)
- 🌟 使用 ResizeObserver 支持折叠菜单。[69b41b0e](https://github.com/ant-design/ant-design-pro-layout/commit/69b41b0e)
- 🌟 增加 `loading` 属性。[69b41b0e](https://github.com/ant-design/ant-design-pro-layout/commit/69b41b0e)
- 🌟 设置抽屉支持了意大利语。[#228](https://github.com/ant-design/ant-design-pro-layout/pull/228)

### 4.9.7

- 🐞 支持 ie11，删除了 `Object.fromEntries`使用。[4f2a368](https://github.com/ant-design/ant-design-pro-layout/commit/4f2a368)
- 🌟 新增 `hideColors` 属性。[90464d9](https://github.com/ant-design/ant-design-pro-layout/commit/90464d9)

### 4.9.6

- 🐞 修复 `menuRender=false` 时，padding 计算错误的问题。[fdabceb](https://github.com/ant-design/ant-design-pro-layout/commit/fdabceb)

### 4.9.5

- 🐞 修复 SettingDrawer 获取参数错误。 [F5758da0](https://github.com/ant-design/ant-design-pro-layout/commit/246d9dba)

### 4.9.4

- 🐞 修复 ResizeObserver 在 children 为数组时报错的问题。[246d9dba](https://github.com/ant-design/ant-design-pro-layout/commit/246d9dba)

### 4.9.3

- 🐞 修复面包屑顺序和路由配置不匹配的问题。[＃212](https://github.com/ant-design/ant-design-pro-layout/pull/212)

- 🐞 修复 getLanguage 函数忽略 localStorage 的问题。 [＃222](https://github.com/ant-design/ant-design-pro-layout/pull/222)

### 4.9.2

- 🐞 修复 layout 被过度撑开的问题。 [ab49d602](https://github.com/ant-design/ant-design-pro-layout/commit/ab49d602)

### 4.9.1

- 🌟 新增 `subMenuItemRender` 的支持。[8911e211](https://github.com/ant-design/ant-design-pro-layout/commit/8911e211)
- 🌟 新增 `links` 的支持。[ab162a0e](https://github.com/ant-design/ant-design-pro-layout/commit/ab162a0e)

### 4.8.3

- 🐞 解决页脚不显示的问题。 [da8239d3](https://github.com/ant-design/ant-design-pro-layout/commit/da8239d3)

- 🌟 支持从 url 获取设置。 [a9dc2d8f](https://github.com/ant-design/ant-design-pro-layout/commit/a9dc2d8)

### 4.8.2

- 🐞 修复 `fixSiderbar` 显示错误的问题. [1a478d60](https://github.com/ant-design/ant-design-pro-layout/commit/1a478d60)

### 4.8.1

- 🌟 增加 g`disableContentMargin` 属性，用于关闭内容区的 margin。[1456cce1](https://github.com/ant-design/ant-design-pro-layout/commit/1456cce1)

### 4.8.0

- 🔥🔥🔥 SettingDrawer 进行了技术改造，与 [umi-plugin-antd-theme](https://github.com/chenshuai2144/umi-plugin-antd-theme) 进行了联动。[#207](https://github.com/ant-design/ant-design-pro-layout/pull/207)
- 🔔 删除了 `autoHideHeader`，带来了性能损耗，使用量却不多。[#209](https://github.com/ant-design/ant-design-pro-layout/pull/209)
- 💄 修复 `fixSiderbar` 和 `fixedHeader` 下的样式问题。 [#209](https://github.com/ant-design/ant-design-pro-layout/pull/209)

### 4.7.4

- 💄 修复 `fixSiderbar` 和 `fixedHeader` 下的样式问题。 [8e916250](https://github.com/ant-design/ant-design-pro-layout/commit/8e916250)

### 4.7.3

- 🐞 修复 `siderWidth` 在手机模式不生效的问题。 [e6cc962d](https://github.com/ant-design/ant-design-pro-layout/commit/e6cc962d)
- 🐞 修复手机模式下，菜单样式错误的问题。[#192](https://github.com/ant-design/ant-design-pro-layout/pull/192)

### 4.7.1-2

- 🔔 增加 4.7.0 大改动的提示。[5ae53455](https://github.com/ant-design/ant-design-pro-layout/commit/5ae53455)

### 4.7.0

- 💄 修改 Header 的 `zIndex` 为 9。[#167](https://github.com/ant-design/ant-design-pro-layout/pull/167)
- 🌟 DefaultFooter `copyright` 支持值为 false。 [#181](https://github.com/ant-design/ant-design-pro-layout/pull/181)
- 🐞 修复 Layout 渲染两次的问题。[#172](https://github.com/ant-design/ant-design-pro-layout/pull/172)
- 🐞 修复 PageHeaderWrapper 不渲染面包屑的问题。 [#179](https://github.com/ant-design/ant-design-pro-layout/pull/179)
- 🐞 修复 submenu 不支持 menuItemRender 的问题。 [#180](https://github.com/ant-design/ant-design-pro-layout/pull/180)
- 🌟 Layout 的 pageTitleRender 现在包含了默认的 title。 [63c0a56c](https://github.com/ant-design/ant-design-pro-layout/commit/63c0a56c077815693cbbcd606b937dbe3270ed06)
- 🌟 所有的组件都支持了 `style` 和 `className`。[#169](https://github.com/ant-design/ant-design-pro-layout/pull/169)
- 🌟 支持 `breakpoint` 属性。[#160](https://github.com/ant-design/ant-design-pro-layout/pull/160)
- 🌟 支持 contentStyle 来设置 Layout 的容器样式。[#158](https://github.com/ant-design/ant-design-pro-layout/pull/158)
- 🌟 支持 isChildrenLayout 属性,用于支持嵌套 layout。[9749d772](https://github.com/ant-design/ant-design-pro-layout/commit/9749d7727aae1af260f6e23f35920b9ce7a94d22)

### 4.6.2

- 🌟 使用 react-responsive 替换了 react-container-query 和 react-media-hook2。[#150](https://github.com/ant-design/ant-design-pro-layout/pull/139)
- 🌟 使用 react-helmet 替换了 react-document-title。[#142](https://github.com/ant-design/ant-design-pro-layout/pull/139)

### 4.6.1

- 🐞 修复 sideEffects 导致 less 无法正确加载的问题。[cf0cb3e8](https://github.com/ant-design/ant-design-pro-layout/commit/cf0cb3e88ce6f80121b9a2e8a5d1eafefbadb59c)

### 4.6.0

Layout 现在默认不会渲染页脚，需要自己[设置](https://github.com/ant-design/ant-design-pro/blob/7888208389480656ae30a4bc87bf0f38e54fd818/src/layouts/BasicLayout.tsx#L67)。

- 🌟 SubMenu 支持 onTitleClick 属性。 [#139](https://github.com/ant-design/ant-design-pro-layout/pull/139)
- 🌟 Footer 支持 `links` 设置为 false。[2ac24296](https://github.com/ant-design/ant-design-pro-layout/commit/2ac242962e681cc5a2d01153a1565c578dc42ae8)
- 🌟 PageHeaderWrapper 支持 [TabsTabPane](https://ant.design/components/tabs-cn/#TabsTabPane) 的所有属性。[478c5a1d](https://github.com/ant-design/ant-design-pro-layout/commit/478c5a1dec631ec2247399e1ceee657361786bd3)

### 4.5.15

- 🐞 修复 GlobalHeader 的 className 错误。 [#92](https://github.com/ant-design/ant-design-pro-layout/pull/92)
- 🌟 修复对 ssr 的支持。 [#96](https://github.com/ant-design/ant-design-pro-layout/issues/96)
- 🌟 增加 `disableMobile` 和 `menuProps` 属性。 [#98](https://github.com/ant-design/ant-design-pro-layout/pull/98)

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
