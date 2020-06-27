# changelog

### 5.0.5

- 💄 Fix the problem that the name is too long and cause a newline when `topMenu`. [9ad2016](https://github.com/ant-design/ant-design-pro-layout/commit/9ad2016)
- 🐛 Fix the problem of similar path matching errors. [ed74c4b](https://github.com/ant-design/ant-design-pro-layout/commit/ed74c4b)
- 🐛 Fix the issue that `contentStyle` does not take effect. [f87e24c](https://github.com/ant-design/ant-design-pro-layout/commit/f87e24c)
- 💥 Added `postMenuData` props. [cace4c1](https://github.com/ant-design/ant-design-pro-layout/commit/cace4c1)
- 💥 Added `onPageChange` props. [#346](https://github.com/ant-design/ant-design-pro-layout/pull/346)

### 5.0.4

- 🐞 The problem of monitoring failure when the menu icon is changed to dom. [901220f](https://github.com/ant-design/ant-design-pro-layout/commit/901220f)

### 5.0.3

- 🐞 Fix the problem of height calculation error. [d3edafb](https://github.com/ant-design/ant-design-pro-layout/commit/d3edafb)

### 5.0.2

- 🐞 Fix the problem that children change the page not refreshing. [e2b46dd](https://github.com/ant-design/ant-design-pro-layout/commit/e2b46dd)

### 5.0.1

- 🌟 Optimize performance to reduce the number of renders. [23b824c](https://github.com/ant-design/ant-design-pro-layout/commit/23b824c)

### 5.0.0

- 🔥🔥🔥 antd@4 is supported. In order to cope with the changes of icons, it needs to be used with `umi-plugin-antd-icon-config` to realize the function of the configuration menu in config. [#294](https://github.com/ant-design/ant-design-pro-layout/pull/294)

### 4.10.10

- 🌟 The default color values have been enumerated and can now be copied directly. [87e81c5](https://github.com/ant-design/ant-design-pro-layout/commit/87e81c5)
- 🌟 Added icon expiration warning. q[6642e43](https://github.com/ant-design/ant-design-pro-layout/commit/6642e43)

### 4.10.9

- 🌟 umd version provided. [ecb95fa](https://github.com/ant-design/ant-design-pro-layout/commit/ecb95fa)

### 4.10.8

- 🌟 when `isMobile` set Drawer `visible = false`. [fb5cdd47](https://github.com/ant-design/ant-design-pro-layout/commit/fb5cdd47)
- 🌟 export `PageContainerProps` interface. [#291](https://github.com/ant-design/ant-design-pro-layout/pull/291)
- 🐞 Layout `style` prefer user configuration. [521bf7c5](https://github.com/ant-design/ant-design-pro-layout/commit/521bf7c5)

### 4.10.7

- 🐞 Fixed the issue that keys calculation would not be triggered during reload. [a8f770f](https://github.com/ant-design/ant-design-pro-layout/commit/a8f770f)

### 4.10.6

- 🐞 `getPopupContainer` not in the default configuration menu. [e6c6971](https://github.com/ant-design/ant-design-pro-layout/commit/e6c6971)

### 4.10.5

- 🐞 unlock use-json-comparison.

### 4.10.4

- 🌟 `menuProps` supports overriding any attributes. [c039b4a1](https://github.com/ant-design/ant-design-pro-layout/commit/c039b4a1)
- 🐞 Fix the problem that SettingDrawer does not modify the url. [c039b4a1](https://github.com/ant-design/ant-design-pro-layout/commit/c039b4a1)

### 4.10.3

- 🌟 SettingDrawer adds inertia support. [#269](https://github.com/ant-design/ant-design-pro-layout/pull/269)
- 🐞 Fix the issue that the header is displayed abnormally in the mobile mode. [37ffbf27](https://github.com/ant-design/ant-design-pro-layout/commit/37ffbf27)
- 🐞 Fixed the problem of infinite loop when layout parameter is empty. [86275f4b](https://github.com/ant-design/ant-design-pro-layout/commit/86275f4b)
- 🐞 Fix the problem of embedded tags in tags. [2c0c42bb](https://github.com/ant-design/ant-design-pro-layout/commit/2c0c42bb)
- 🐞 Fixed the problem of the menu not scrolling when fixed menu. [e638aca1](https://github.com/ant-design/ant-design-pro-layout/commit/e638aca1)

### 4.10.2

- 🐞 Fix the problem that the dynamic menu does not take effect. [4a52b015](https://github.com/ant-design/ant-design-pro-layout/commit/4a52b015)

### 4.10.1

- 🌟 SettingDrawer add `hideCopyButton` props. [#258](https://github.com/ant-design/ant-design-pro-layout/pull/258)
- 🐞 Optimize calculation logic for menu expansion. [3c9b5ce9](https://github.com/ant-design/ant-design-pro-layout/commit/3c9b5ce9) [e5ad035b](https://github.com/ant-design/ant-design-pro-layout/commit/e5ad035b)

### 4.10.0

- 🐞 Fix the problem that the top menu bar is not responsive. [#243](https://github.com/ant-design/ant-design-pro-layout/pull/243)
- 🔧 Refactored layout box model. [#247](https://github.com/ant-design/ant-design-pro-layout/pull/247)
- 🐞 Fix settingDrawer no work for url params. [#246](https://github.com/ant-design/ant-design-pro-layout/pull/246)

### 4.9.11

- 🌟 Decoupling the menu `key` from the `path`. [#238](https://github.com/ant-design/ant-design-pro-layout/pull/238)
- 🐞 Fix menu style issues in mobile mode. [#241](https://github.com/ant-design/ant-design-pro-layout/pull/241)
- 🐞 Fix layout height is fixed. [2752721](https://github.com/ant-design/ant-design-pro-layout/commit/2752721)

### 4.9.10

- 🐞 Stricter locale judgment. [567cbdf](https://github.com/ant-design/ant-design-pro-layout/commit/567cbdf)

### 4.9.9

- 🐞 Fix `menu.locale=false` do not work problem. [892983ab](https://github.com/ant-design/ant-design-pro-layout/commit/892983ab)
- 🌟 `menuDataRender` support locale. [c7f8ede4](https://github.com/ant-design/ant-design-pro-layout/commit/c7f8ede4)

### 4.9.8

- 🐞 Add default height and width. [8064423d](https://github.com/ant-design/ant-design-pro-layout/commit/8064423d)
- 🌟 Add `tabAnimated` props for PageContainer. [#224](https://github.com/ant-design/ant-design-pro-layout/pull/224)
- 🌟 Links menu support inlineCollapsed. [90003255](https://github.com/ant-design/ant-design-pro-layout/commit/90003255)
- 🌟 `pageTitleRender` add add `info` props. [fbc86888](https://github.com/ant-design/ant-design-pro-layout/commit/fbc86888)
- 🌟 Use ResizeObserver support fold menu. [69b41b0e](https://github.com/ant-design/ant-design-pro-layout/commit/69b41b0e)
- 🌟 add `loading` props. [69b41b0e](https://github.com/ant-design/ant-design-pro-layout/commit/69b41b0e)
- 🌟 Added setting drawer Italian language support. [#228](https://github.com/ant-design/ant-design-pro-layout/pull/228)

### 4.9.7

-Ie Support ie11, remove the use of `Object.fromEntries`. [4f2a368](https://github.com/ant-design/ant-design-pro-layout/commit/4f2a368) -🌟 Added `hideColors` property. [90464d9](https://github.com/ant-design/ant-design-pro-layout/commit/90464d9)

### 4.9.6

- 🐞 Fix padding calculation error when `menuRender = false`. [fdabceb](https://github.com/ant-design/ant-design-pro-layout/commit/fdabceb)

### 4.9.5

- 🐞 Fix SettingDrawer get params bug. [f5758da0](https://github.com/ant-design/ant-design-pro-layout/commit/246d9dba)

### 4.9.4

- 🐞 Fixed ResizeObserver reporting an error when children is an array. [246d9dba](https://github.com/ant-design/ant-design-pro-layout/commit/246d9dba)

### 4.9.3

- 🐞 Fix: breadcrumb order and route config do not match. [#212](https://github.com/ant-design/ant-design-pro-layout/pull/212)

- 🐞 Fix: getLanguage function ignores localStorage. [#222](https://github.com/ant-design/ant-design-pro-layout/pull/222)

### 4.9.2

- 🐞 Fix the problem of layout being stretched too far. [ab49d602](https://github.com/ant-design/ant-design-pro-layout/commit/ab49d602)

### 4.9.1

- 🌟 Added support for `subMenuItemRender`. [8911e211](https://github.com/ant-design/ant-design-pro-layout/commit/8911e211) -🌟 Added support for `links`. [ab162a0e](https://github.com/ant-design/ant-design-pro-layout/commit/ab162a0e)

### 4.8.3

- 🐞 Fix footer hidden problem. [da8239d3](https://github.com/ant-design/ant-design-pro-layout/commit/da8239d3)
- 🌟 Support get setting from url. [a9dc2d8f](https://github.com/ant-design/ant-design-pro-layout/commit/a9dc2d8f)

### 4.8.2

- 🐞 Fix fixSiderbar warning. [1a478d60](https://github.com/ant-design/ant-design-pro-layout/commit/1a478d60)

### 4.8.1

- 🌟 Add the `disableContentMargin` property to close the margin of the content area. [1456cce1](https://github.com/ant-design/ant-design-pro-layout/commit/1456cce1)

### 4.8.0

- 🔥🔥🔥 SettingDrawer has been technically modified and linked to [umi-plugin-antd-theme](https://github.com/chenshuai2144/umi-plugin-antd-theme). [#207](https://github.com/ant-design/ant-design-pro-layout/pull/207)
- 🔔 The `autoHideHeader` has been removed, resulting in performance loss and not much usage. [#209](https://github.com/ant-design/ant-design-pro-layout/pull/209)
- 修复 Fix style issues under `fixSiderbar` and `fixedHeader`. [#209](https://github.com/ant-design/ant-design-pro-layout/pull/209)

### 4.7.4

- 💄 Fix style issues under `fixSiderbar` and `fixedHeader`. [8e916250](https://github.com/ant-design/ant-design-pro-layout/commit/8e916250)

### 4.7.3

- 🐞 Fix `siderWidth` in mobile mode does not work. [e6cc962d](https://github.com/ant-design/ant-design-pro-layout/commit/e6cc962d)
- 🐞 Fixed a problem with the wrong menu style in the phone mode. [#192](https://github.com/ant-design/ant-design-pro-layout/pull/192)

### 4.7.1-2

- 🔔 Increase the hint of 4.7.0 large strain. [5ae53455](https://github.com/ant-design/ant-design-pro-layout/commit/5ae53455)

### 4.7.0

- 💄 Modify Header component `zIndex` to 9. [#167](https://github.com/ant-design/ant-design-pro-layout/pull/167)
- 🌟 DefaultFooter `copyright` support false. [#181](https://github.com/ant-design/ant-design-pro-layout/pull/181)
- 🐞 Fix two renders of Layout. [#172](https://github.com/ant-design/ant-design-pro-layout/pull/172)
- 🐞 Fix PageContainer don't render breadcrumb. [#179](https://github.com/ant-design/ant-design-pro-layout/pull/179)
- 🐞 Fix submenu don't work for `menuItemRender`. [#180](https://github.com/ant-design/ant-design-pro-layout/pull/180)
- 🌟 PageTitleRender has defaultPageTitle. [63c0a56c](https://github.com/ant-design/ant-design-pro-layout/commit/63c0a56c077815693cbbcd606b937dbe3270ed06)
- 🌟 All component support style and className. [#169](https://github.com/ant-design/ant-design-pro-layout/pull/169)
- 🌟 Support `breakpoint` props. [#160](https://github.com/ant-design/ant-design-pro-layout/pull/160)
- 🌟 Support `contentStyle` props. [#158](https://github.com/ant-design/ant-design-pro-layout/pull/158)
- 🌟 Support `isChildrenLayout` props. [9749d772](https://github.com/ant-design/ant-design-pro-layout/commit/9749d7727aae1af260f6e23f35920b9ce7a94d22)

### 4.6.2

- 🌟Replaced react-container-query and react-media-hook2 with react-response. [#150](https://github.com/ant-design/ant-design-pro-layout/pull/139)
- 🌟Replace react-document-title with react-helmet. [#142](https://github.com/ant-design/ant-design-pro-layout/pull/139)

### 4.6.1

- 🐞 Fixing sideEffects causes less problems to load properly. [cf0cb3e8](https://github.com/ant-design/ant-design-pro-layout/commit/cf0cb3e88ce6f80121b9a2e8a5d1eafefbadb59c)

### 4.6.0

Layout now does not render the footer by default, you need to [set](https://github.com/ant-design/ant-design-pro/blob/7888208389480656ae30a4bc87bf0f38e54fd818/src/layouts/BasicLayout.tsx#L67) yourself.

- 🌟 Add onTitleClick for subMenu. [#139](https://github.com/ant-design/ant-design-pro-layout/issues/139)
- 🌟 Footer support links = false. [2ac24296](https://github.com/ant-design/ant-design-pro-layout/commit/2ac242962e681cc5a2d01153a1565c578dc42ae8)
- 🌟 PageContainer support all tabpanel props. [478c5a1d](https://github.com/ant-design/ant-design-pro-layout/commit/478c5a1dec631ec2247399e1ceee657361786bd3)

### 4.5.15

- 🐞 Fix Global Header class name. [#92](https://github.com/ant-design/ant-design-pro-layout/pull/92)
- 🌟 ssr support. [#96](https://github.com/ant-design/ant-design-pro-layout/issues/96)
- 🌟 add `disableMobile` and `menuProps`. [#98](https://github.com/ant-design/ant-design-pro-layout/pull/98)

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

- 🐞 Fixed PageContainer type error.

### 4.5.3

- 🌟 SettingDrawer get lang form localStorage.

### 4.5.2

- 🌟 Modify the introduction of `antd/lib` to `antd/es`
- 🐞 Fixed a problem where `css` was too low to be covered by the `antd` style.

### 4.5.1

- 🌟 PageContainer supports content customization through pageHeaderRender.

### 4.5.0

- 🌟 Modified to babel compilation, supported by the less theme feature.
- 🐞 lint is modified for eslint-typescript.

### 4.4.0

- 🌟 Support for custom contentWidth.
- 🐞 Fixed a series of lint errors.
