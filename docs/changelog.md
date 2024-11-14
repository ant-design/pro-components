## @ant-design/pro-components@2.8.2

`2024-11-14`

- fix(table): React does not recognize the `showCount` prop on a DOM element. (#8856). [#8856](https://github.com/ant-design/pro-components/pull/#8856) [@leshalv](https://github.com/leshalv)

## @ant-design/pro-components@2.8.0

`2024-10-17`

- fix(components):修复 ts 定义导致列名获取不到的问题 (#8795). [#8795](https://github.com/ant-design/pro-components/pull/#8795) [@qnnp-me](https://github.com/qnnp-me)
- fix(form): field 为 checkbox 时设置了 fieldNames 后控制器报错的问题 React does not recognize the `fieldNames` prop on a DOM element (#8785). [#8785](https://github.com/ant-design/pro-components/pull/#8785) [@echoyl](https://github.com/echoyl)

## @ant-design/pro-components@2.7.19

- fix(layout): downgrade path-to-regexp to version 8.0.0 (#8732)
- fix(layout): missing appListRender props (#8731) @Beeant

## @ant-design/pro-components@2.7.18

- refactor(layout): update path-to-regexp to version 8.1.0 (#8725)

`2024-09-05`

- feat(layout): add menuTextRender props. [1d65e22](https://github.com/ant-design/pro-components/commit/1d65e22)
- fix(form): props title is not assignable to type ReactNode (#8682). [#8682](https://github.com/ant-design/pro-components/pull/#8682) [@jiAng](https://github.com/jiAng)
- feat(Form): FormRef support forward nativeElement (#8632). [#8632](https://github.com/ant-design/pro-components/pull/#8632) [@红](https://github.com/红)
- fix(field): keyboard events of search input in LightSelect (#8629). [#8629](https://github.com/ant-design/pro-components/pull/#8629) [@Anzimu](https://github.com/Anzimu)

## @ant-design/pro-components@2.7.15

`2024-08-05`

- fix(form): pass the OptionType type of ProFormSelect to the inner Select (#8568). [#8568](https://github.com/ant-design/pro-components/pull/#8568) [@dreammaker7](https://github.com/dreammaker7)
- fix(form): correct line height in list action (#8584). [#8584](https://github.com/ant-design/pro-components/pull/#8584) [@drizzlesconsin](https://github.com/drizzlesconsin)
- feat(form): export ProFormTreeSelectProps (#8589). [#8589](https://github.com/ant-design/pro-components/pull/#8589) [@fnoopv](https://github.com/fnoopv)
- fix(table): don't spread key to children (#8588). [#8588](https://github.com/ant-design/pro-components/pull/#8588) [@fnoopv](https://github.com/fnoopv)
- feat(field): add localizedFormat plugin to dayjs (#8582). [#8582](https://github.com/ant-design/pro-components/pull/#8582) [@lynette-li](https://github.com/lynette-li)

## @ant-design/pro-components@2.7.12

`2024-07-15`

- fix(form): Digit support stringMode. [5075113](https://github.com/ant-design/pro-components/commit/5075113)
- fix(form): fix FormList size=small, icon is default size error. [d797fa7](https://github.com/ant-design/pro-components/commit/d797fa7)
- fix(table): fix canel editort no work error. [2b60fe5](https://github.com/ant-design/pro-components/commit/2b60fe5)
- fix(table): 解决 ProTable.editable.actionRender 无法获取最新 state 快照的问题（第二种改法） (#8549). [#8549](https://github.com/ant-design/pro-components/pull/#8549) [@ShuangxingYang](https://github.com/ShuangxingYang)

## @ant-design/pro-components@2.7.11

`2024-06-21`

- fix(layout): PageHeader style and breadcrumb.routes prop (#8491). [#8491](https://github.com/ant-design/pro-components/pull/#8491) [@ChuChencheng](https://github.com/ChuChencheng)
- fix(form): formItem help render type (#8482). [#8482](https://github.com/ant-design/pro-components/pull/#8482) [@yunho1017](https://github.com/yunho1017)

## @ant-design/pro-components@2.7.10

`2024-06-08`

- feat(form): add form item help render type (#8462). [#8462](https://github.com/ant-design/pro-components/pull/#8462) [@Yuno](https://github.com/Yuno)
- feat(form): the second field supports negative numbers (#8449). [#8449](https://github.com/ant-design/pro-components/pull/#8449) [@Geng](https://github.com/Geng)
- fix(form):ProFormTimePicker.RangePicker 获取时间区间，当 name 超过两层时，值为日期+时间格式. [0ce8bcd](https://github.com/ant-design/pro-components/commit/0ce8bcd)
- fix(form): 修复 openChange 打开时不触发问题 (#8403). [#8403](https://github.com/ant-design/pro-components/pull/#8403) [@beautiful-boyyy](https://github.com/beautiful-boyyy)

## @ant-design/pro-components@2.7.9

`2024-05-20`

- fix(form): LightFilter + SearchSelect component support fetchDataOnSearch (#8363). [#8363](https://github.com/ant-design/pro-components/pull/#8363) [@zhuba-Ahhh](https://github.com/zhuba-Ahhh)
- fix(form): SearchSelect scrolling error in grouping (#8365). [#8365](https://github.com/ant-design/pro-components/pull/#8365) [@zhuba-Ahhh](https://github.com/zhuba-Ahhh)
- fix(form): 将 LightSelect 组件中，popupMatchSelectWidth={false}注释掉，变成灵活多变的动态配置，供用户自行配置。否则，popupMatchSelectWidth 写死 false 会关闭虚拟滚动，数量量过大时，影响组件性能 (#8354). [#8354](https://github.com/ant-design/pro-components/pull/#8354) [@gb853940223](https://github.com/gb853940223)
- feat(table): table support RowEditorTable and CellEditorTable. [013877d](https://github.com/ant-design/pro-components/commit/013877d)
- fix(table): 修 columnsMap 重新赋值时总是使用默认值的问题 (#8384). [#8384](https://github.com/ant-design/pro-components/pull/#8384) [@fnoopv](https://github.com/fnoopv)
- fix(card): The extra element and title ellipsis in the checkcard are not functioning correctly when the title is too long (#8347). [#8347](https://github.com/ant-design/pro-components/pull/#8347) [@justnewneo](https://github.com/justnewneo)
- chore(descriptions): Reveal the key to prevent errors (#8394). [#8394](https://github.com/ant-design/pro-components/pull/#8394) [@zhuba-Ahhh](https://github.com/zhuba-Ahhh)

## @ant-design/pro-components@2.7.3

`2024-04-19`

- feat(card): CheckCard support children cards (#8325). [#8325](https://github.com/chenshuai2144/pro-components/pull/#8325) [@陈帅](https://github.com/陈帅)

## @ant-design/pro-components@2.7.1

`2024-04-17`

- fix(components): compatible 5.13.0 border (#8296). [#8296](https://github.com/ant-design/pro-components/pull/#8296) [@leshalv](https://github.com/leshalv)
- fix(layout): slove footerRender types error (#8280). [#8280](https://github.com/ant-design/pro-components/pull/#8280) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(layout):解决 Layout Menu 小屏幕下样式丢失的问题 (#8147). [#8147](https://github.com/ant-design/pro-components/pull/#8147) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(form): onOpenChange fires twice when opening ModalForm (#8311). [#8311](https://github.com/ant-design/pro-components/pull/#8311) [@zhuba-Ahhh](https://github.com/zhuba-Ahhh)
- fix(form): FilterDropdown onClear setTempValue null (#8305). [#8305](https://github.com/ant-design/pro-components/pull/#8305) [@zhuba-Ahhh](https://github.com/zhuba-Ahhh)
- feat(form): form list support transform. [7ea4fd1](https://github.com/ant-design/pro-components/commit/7ea4fd1)
- fix(form): Fix the problem of FieldLabel activating style when the value is an array (#8287). [#8287](https://github.com/ant-design/pro-components/pull/#8287) [@zhuba-Ahhh](https://github.com/zhuba-Ahhh)
- fix(table): Custom components.body no work error (#8281). [#8281](https://github.com/ant-design/pro-components/pull/#8281) [@zhuba-Ahhh](https://github.com/zhuba-Ahhh)
- chore(table): update column search ts type (#8275). [#8275](https://github.com/ant-design/pro-components/pull/#8275) [@acfasj](https://github.com/acfasj)
- fix(descriptions): Customized contentStyle (#8272). [#8272](https://github.com/ant-design/pro-components/pull/#8272) [@zhuba-Ahhh](https://github.com/zhuba-Ahhh)

## @ant-design/pro-components@2.7.0

`2024-03-27`

- fix(form): DrawerForm ssr 错误 : window is not defined (#8244). [#8244](https://github.com/ant-design/pro-components/pull/#8244) [@edram](https://github.com/edram)
- fix(table): densityLarger 中文简体和繁体国际化，文案问题修改 (#8241). [#8241](https://github.com/ant-design/pro-components/pull/#8241) [@lk0606](https://github.com/lk0606)
- feat(card): ProCard support colStyle. [bfcf8aa](https://github.com/ant-design/pro-components/commit/bfcf8aa)

## @ant-design/pro-components@2.6.52

`2024-03-22`

- feat(form): ProFormFieldSet support funtion. [efbdab6](https://github.com/ant-design/pro-components/commit/efbdab6)

## @ant-design/pro-components@2.6.51

`2024-03-20`

- feat(form): ProFormFieldSet support funtion. [efbdab6](https://github.com/ant-design/pro-components/commit/efbdab6)

## @ant-design/pro-components@2.6.50

`2024-03-15`

- fix(components): remove deprecated tip props. [85de8a2](https://github.com/ant-design/pro-components/commit/85de8a2)
- fix(components): compatible 5.13.0 border. [ddf0c82](https://github.com/ant-design/pro-components/commit/ddf0c82)
- fix(form): PasswordStrength support morse options. [3ab9f11](https://github.com/ant-design/pro-components/commit/3ab9f11)
- fix(list): support add string line. [9ec366d](https://github.com/ant-design/pro-components/commit/9ec366d)
- feat(table): add click event for icon element (#8167). [#8167](https://github.com/ant-design/pro-components/pull/#8167) [@Been101](https://github.com/Been101)

## @ant-design/pro-components@2.6.49

`2024-01-31`

- fix(layout): fix bgLayout no work error. [4a21fdf](https://github.com/ant-design/pro-components/commit/4a21fdf)
- fix(field): fieldProps.options not effective in ProFormSegmented (#8129). [#8129](https://github.com/ant-design/pro-components/pull/#8129) [@ChuChencheng](https://github.com/ChuChencheng)

## @ant-design/pro-components@2.6.47

`2024-01-18`

- fix(layout): fix bgLayout no work error. [4a21fdf](https://github.com/ant-design/pro-components/commit/4a21fdf)
- fix(form): fix DrawerForm and ModalForm button error. [7bf4b30](https://github.com/ant-design/pro-components/commit/7bf4b30)
- fix(form): 修复默认情况下 sumbitter render 和 render 时候 dom 位置不一致的问题 (#8096). [#8096](https://github.com/ant-design/pro-components/pull/#8096) [@Shinji-Li](https://github.com/Shinji-Li)
- feat(table): column SettingTitle 内容太长时显示省略&弹出 tooltip (#8070). [#8070](https://github.com/ant-design/pro-components/pull/#8070) [@xlboy](https://github.com/xlboy)

## @ant-design/pro-components@2.6.46

`2024-01-15`

- fix(layout): fix bgLayout no work error. [4a21fdf](https://github.com/ant-design/pro-components/commit/4a21fdf)
- fix(form): fix ProFormPage submit error. [2260b0d](https://github.com/ant-design/pro-components/commit/2260b0d)

## @ant-design/pro-components@2.6.45

`2024-01-15`

- fix(layout): if bgImgStyleList is null ,no render bg-list dom. [0b26161](https://github.com/ant-design/pro-components/commit/0b26161)
- feat(form): 添加 FormItemRender 组件 (#8012). [#8012](https://github.com/ant-design/pro-components/pull/#8012) [@hans000](https://github.com/hans000)
- fix(form): fix ProFormDateRangePicker readonly no warp error. [b2276c3](https://github.com/ant-design/pro-components/commit/b2276c3)
- fix(form): 修复 dateFormatter 使用 string 类型提示错误 (#8029). [#8029](https://github.com/ant-design/pro-components/pull/#8029) [@yjhtry](https://github.com/yjhtry)
- fix(form): add playsInline props. [e1233d1](https://github.com/ant-design/pro-components/commit/e1233d1)
- fix(form): 修复特殊情况（不使用 ProFormMoney 使用 FieldMoney）下格式化错误的问题 (#8024). [#8024](https://github.com/ant-design/pro-components/pull/#8024) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(form): 修复特殊情况下多出 moneySymbol 的问题 (#8004). [#8004](https://github.com/ant-design/pro-components/pull/#8004) [@ONLY-yours](https://github.com/ONLY-yours)
- chore(form): adjust `submitter` dom order (#7988). [#7988](https://github.com/ant-design/pro-components/pull/#7988) [@kungege](https://github.com/kungege)
- fix(form): remove extra `div` (#7987). [#7987](https://github.com/ant-design/pro-components/pull/#7987) [@kungege](https://github.com/kungege)
- fix(form): no set maxHeight. [64dc9f7](https://github.com/ant-design/pro-components/commit/64dc9f7)
- fix(list): 修复 ProFormList 透传部分属性到 FormItem 中导致的 react 警告 (#8051). [#8051](https://github.com/ant-design/pro-components/pull/#8051) [@SANmq](https://github.com/SANmq)
- fix(table): Record Creator re-render when props change (#8018). [#8018](https://github.com/ant-design/pro-components/pull/#8018) [@bartelemi](https://github.com/bartelemi)
- fix(table): 修复同时使用 defalutValue 和 Storage 存储的情况下，defalutValue 失效的问题 (#7979). [#7979](https://github.com/ant-design/pro-components/pull/#7979) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.6.44

`2023-12-12`

- fix(layout): pass SiderProps to avatar render function (#7963). [#7963](https://github.com/ant-design/pro-components/pull/#7963) [@jaulz](https://github.com/jaulz)
- fix(layout): slove DensityIcon setting not work (#7942). [#7942](https://github.com/ant-design/pro-components/pull/#7942) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(form): fix cjs require statement (#7952). [#7952](https://github.com/ant-design/pro-components/pull/#7952) [@shijistar](https://github.com/shijistar)
- fix(table): remove unless code (#7954). [#7954](https://github.com/ant-design/pro-components/pull/#7954) [@linxianxi](https://github.com/linxianxi)
- fix(table): DragSortTable --- Reorder columns by dragging and dropping columns will have issues when the table has fixed columns first (#7936). [#7936](https://github.com/ant-design/pro-components/pull/#7936) [@tanjianyong](https://github.com/tanjianyong)
- fix(Descriptions): fix emptytext alway set error. [85f1366](https://github.com/ant-design/pro-components/commit/85f1366)

## @ant-design/pro-components\@2.6.42

`2023-11-20`

- feat(form): ProFormCaptcha onTiming callback (#7908). [#7908](https://github.com/ant-design/pro-components/pull/#7908) [@ModestFun](https://github.com/ModestFun)
- fix(table): slove editable wrapper by null initvalue (#7900). [#7900](https://github.com/ant-design/pro-components/pull/#7900) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.6.41

`2023-11-15`

- fix(form): fix statusRender no work error. [a94f13e](https://github.com/ant-design/pro-components/commit/a94f13e)

## @ant-design/pro-components\@2.6.40

`2023-11-15`

- fix(form): PasssWordStrength remove progressDom. [77099e4](https://github.com/ant-design/pro-components/commit/77099e4)

## @ant-design/pro-components\@2.6.39

`2023-11-15`

- fix(form): PassWord getPercent support status. [7c1bf34](https://github.com/ant-design/pro-components/commit/7c1bf34)
- fix(form): PasssWord statusRender support value. [5abe403](https://github.com/ant-design/pro-components/commit/5abe403)
- fix(form): PasssWord use Progress step. [ee6beb6](https://github.com/ant-design/pro-components/commit/ee6beb6)

## @ant-design/pro-components\@2.6.38

`2023-11-15`

- fix(form): Password support strengthText. [fcade9f](https://github.com/ant-design/pro-components/commit/fcade9f)

## @ant-design/pro-components\@2.6.37

`2023-11-15`

- fix(form): Password support popoverProps. [39aa69b](https://github.com/ant-design/pro-components/commit/39aa69b)

## @ant-design/pro-components\@2.6.36

`2023-11-14`

- feat (utils): FieldLabel 的 VALUE_MAX_LENGTH 可以通过参数传入 (#7845) (#7846). [#7845](https://github.com/ant-design/pro-components/pull/#7845) [@Rabbit](https://github.com/Rabbit)
- fix(layout): fix popupBg no work error. [ea20878](https://github.com/ant-design/pro-components/commit/ea20878)
- fix(layout): \[antd: Drawer] `bodyStyle` is deprecated waring (#7864). [#7864](https://github.com/ant-design/pro-components/pull/#7864) [@OXXD](https://github.com/OXXD)
- fix(layout): fix ProLayout did not match error. [cb330f9](https://github.com/ant-design/pro-components/commit/cb330f9)
- fix(form): fix ProFormMoney customSymbol no work error. [d0f30b8](https://github.com/ant-design/pro-components/commit/d0f30b8)
- fix (form): 修复 FieldOptions 中子元素换行问题 (#7856). [#7856](https://github.com/ant-design/pro-components/pull/#7856) [@zavven](https://github.com/zavven)
- style (list): 样式修复 (#7855). [#7855](https://github.com/ant-design/pro-components/pull/#7855) [@xliez](https://github.com/xliez)
- fix(table): less render function. [b314a37](https://github.com/ant-design/pro-components/commit/b314a37)
- fix(field): remove useDeepCompareMemo which causing renderFormItem not updated (#7887). [#7887](https://github.com/ant-design/pro-components/pull/#7887) [@mjss](https://github.com/mjss)
- fix (descriptions): fix ProTable 和 ProDescriptions render 行为不一样的问题. [227d302](https://github.com/ant-design/pro-components/commit/227d302)
- fix(descriptions): fix save and cancel are not aligned when using Form rules. [ebd1898](https://github.com/ant-design/pro-components/commit/ebd1898)

## @ant-design/pro-components\@2.6.35

`2023-11-01`

- fix (layout): 修复 Layout 菜单 submenu 和 grounp 混用的时候收起错误. [d99a14d](https://github.com/ant-design/pro-components/commit/d99a14d)
- fix(form): fix addonWarpStyle no work error. [e5374b7](https://github.com/ant-design/pro-components/commit/e5374b7)
- fix (table): 修复不能单独展示 filter 的问题. [b77b5d4](https://github.com/ant-design/pro-components/commit/b77b5d4)

## @ant-design/pro-components\@2.6.33

`2023-10-26`

- revert (layout): 回滚 Layout Menu 的获取逻辑 (#7819). [#7819](https://github.com/ant-design/pro-components/pull/#7819) [@ONLY-yours](https://github.com/ONLY-yours)
- feat(form):addonBefore warp support style. [5dd732e](https://github.com/ant-design/pro-components/commit/5dd732e)

## @ant-design/pro-components\@2.6.32

`2023-10-24`

- fix(layout): fix layout menu align error. [24cf799](https://github.com/ant-design/pro-components/commit/24cf799)
- feat(table): expose `index` in `onDragSortEnd` (#7803). [#7803](https://github.com/ant-design/pro-components/pull/#7803) [@kungege](https://github.com/kungege)
- fix (card): 移除 stopPropagation，让事件继续冒泡 (#7785). [#7785](https://github.com/ant-design/pro-components/pull/#7785) [@xliez](https://github.com/xliez)

## @ant-design/pro-components\@2.6.31

`2023-10-19`

- fix(layout): add `title` property to `ProHelp` component (#7795). [#7795](https://github.com/ant-design/pro-components/pull/#7795) [@yuetyeelo2855](https://github.com/yuetyeelo2855)
- fix (layout): Page Contianer 无 Header 边界情况调整 (#7779). [#7779](https://github.com/ant-design/pro-components/pull/#7779) [@ONLY-yours](https://github.com/ONLY-yours)
- fix (table): 修复 EditableProTable 实时编辑表格存在 name 属性且有分页的时候，渲染的数据总是为第一页 (#7794). [#7794](https://github.com/ant-design/pro-components/pull/#7794) [@xliez](https://github.com/xliez)

## @ant-design/pro-components\@2.6.29

`2023-10-11`

- fix (layout): 修复 layout 组件在销毁时，删除了其他不相关的 SWR 缓存 (#7737). [#7737](https://github.com/ant-design/pro-components/pull/#7737) [@febear](https://github.com/febear)
- fix(form): fix loginPage style error. [80ace22](https://github.com/ant-design/pro-components/commit/80ace22)
- fix (form): 增加透传给 FormItem 的 style 和 className (#7769). [#7769](https://github.com/ant-design/pro-components/pull/#7769) [@ONLY-yours](https://github.com/ONLY-yours)
- feat (form): 优化密码只读模式展现形式 (#7736). [#7736](https://github.com/ant-design/pro-components/pull/#7736) [@gamemock](https://github.com/gamemock)
- fix (form): 首次同步到 url 参数时也执行 syncToUrl (#7741). [#7741](https://github.com/ant-design/pro-components/pull/#7741) [@ldc-37](https://github.com/ldc-37)

## @ant-design/pro-components\@2.6.28

`2023-09-26`

- feat(form): LoginFormPage support backgroundVideoUrl. [6dc50b0](https://github.com/ant-design/pro-components/commit/6dc50b0)

## @ant-design/pro-components\@2.6.27

`2023-09-26`

- fix(form): fix Captcha style no work error. [f31381d](https://github.com/ant-design/pro-components/commit/f31381d)

## @ant-design/pro-components\@2.6.26

`2023-09-26`

- feat(form): support more style config. [b8c3954](https://github.com/ant-design/pro-components/commit/b8c3954)

## @ant-design/pro-components\@2.6.25

`2023-09-26`

- fix(form): the `onChange` event in `ProFormUploadButton` has been triggered multiple times (#7732). [#7732](https://github.com/ant-design/pro-components/pull/#7732) [@kungege](https://github.com/kungege)
- feat(form): new LoginFormPage style (#7734). [#7734](https://github.com/ant-design/pro-components/pull/#7734) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(table): unuse Tab.TabPanel (#7731). [#7731](https://github.com/ant-design/pro-components/pull/#7731) [@leshalv](https://github.com/leshalv)

## @ant-design/pro-components\@2.6.24

`2023-09-25`

- fix(layout): fix colorBgMenuElevated no extends colorBgHeader error. [d915ed1](https://github.com/ant-design/pro-components/commit/d915ed1)
- fix (layout): 统一 PageContainer 计算到 styles.ts 中 (#7699). [#7699](https://github.com/ant-design/pro-components/pull/#7699) [@ONLY-yours](https://github.com/ONLY-yours)
- fix (Table): 修改 search transform 类型 (#7708). [#7708](https://github.com/ant-design/pro-components/pull/#7708) [@linxianxi](https://github.com/linxianxi)
- fix (table): 修复 editableFormRef hooks 未正确传递 deps 依赖导致 value 取值不是最新 (#7707). [#7707](https://github.com/ant-design/pro-components/pull/#7707) [@xliez](https://github.com/xliez)

## @ant-design/pro-components\@2.6.23

`2023-09-20`

- fix(layout): WaterMark support dark theme. [0898061](https://github.com/ant-design/pro-components/commit/0898061)
- fix (table): 修复 ColumnSetting Tree 组件 title 过长导致强制换行的问题. [08ded31](https://github.com/ant-design/pro-components/commit/08ded31)

## @ant-design/pro-components\@2.6.21

`2023-09-18`

- fix (layout): 默认宽度更改为 1152. [84cc927](https://github.com/ant-design/pro-components/commit/84cc927)
- fix(layout): deprecated warning (#7693). [#7693](https://github.com/ant-design/pro-components/pull/#7693) [@kungege](https://github.com/kungege)
- fix(table): less render function. [b3ef405](https://github.com/ant-design/pro-components/commit/b3ef405)

## @ant-design/pro-components\@2.6.20

`2023-09-18`

- fix(layout): default set contentWidth=Fixed. [065524d](https://github.com/ant-design/pro-components/commit/065524d)
- fix (form): 修复 treeSelect 组件 bordered 属性无法生效 (#7687). [#7687](https://github.com/ant-design/pro-components/pull/#7687) [@badrylin](https://github.com/badrylin)
- fix(form): form list support readonly. [6407072](https://github.com/ant-design/pro-components/commit/6407072)
- fix(table): EditableProTable reset FormItem grid. [c53ecce](https://github.com/ant-design/pro-components/commit/c53ecce)
- fix(card): check card extra tag token fixed (#7669). [#7669](https://github.com/ant-design/pro-components/pull/#7669) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.6.19

`2023-09-14`

- fix (layout): 默认宽度更改为 1152. [8fd2665](https://github.com/ant-design/pro-components/commit/8fd2665)
- feat (layout): 更新 PageContainer Token 样式和计算规则 (#7645). [#7645](https://github.com/ant-design/pro-components/pull/#7645) [@ONLY-yours](https://github.com/ONLY-yours)
- fix (form): 优化 PassWord 展现形式 (#7657). [#7657](https://github.com/ant-design/pro-components/pull/#7657) [@leshalv](https://github.com/leshalv)
- fix(card): check card extra tag token fixed (#7669). [#7669](https://github.com/ant-design/pro-components/pull/#7669) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.6.18

`2023-09-07`

- 修复了布局中点击链接无效的错误。[9252b14](https://github.com/ant-design/pro-components/commit/9252b14)
- 修复了抽屉表单（DrawerForm）中控制宽度权重失效的问题。[#7642](https://github.com/ant-design/pro-components/pull/#7642) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.6.17

`2023-09-06`

- fix(layout): appList item click preventDefault and stopPropagation. [9b3cd65](https://github.com/ant-design/pro-components/commit/9b3cd65)
- fix(layout): fix menu title center error. [904a89f](https://github.com/ant-design/pro-components/commit/904a89f)
- fix(form): fix DatePicker format (#7622). [#7622](https://github.com/ant-design/pro-components/pull/#7622) [@SummyGitHub](https://github.com/SummyGitHub)
- fix (form): 更新 DrawerForm resize 参数默认值 & 文档描述 (#7621). [#7621](https://github.com/ant-design/pro-components/pull/#7621) [@LengYXin](https://github.com/LengYXin)
- fix (form): dependency 支持 colSize (#7611). [#7611](https://github.com/ant-design/pro-components/pull/#7611) [@yiyi17](https://github.com/yiyi17)
- fix(form): fix marginBlockEnd no use marginLG error. [6e5f384](https://github.com/ant-design/pro-components/commit/6e5f384)
- fix(form): fix formList containerClassName and containerStyle no work error. [7a2c9e0](https://github.com/ant-design/pro-components/commit/7a2c9e0)
- fix (table): sortConfig 值为 undefined 时与默认值 {} 不一致，会导致翻页时再次触发 request 请求 (#7616). [#7616](https://github.com/ant-design/pro-components/pull/#7616) [@caronchen](https://github.com/caronchen)

## @ant-design/pro-components\@2.6.15

`2023-08-29`

- fix (form): 解决因 stringify 导致死循环的问题 (#7599). [#7599](https://github.com/ant-design/pro-components/pull/#7599) [@kiner-tang](https://github.com/kiner-tang)
- feat(table): table columns setting add fixable config (#7586). [#7586](https://github.com/ant-design/pro-components/pull/#7586) [@LeoZeda](https://github.com/LeoZeda)

## @ant-design/pro-components\@2.6.14

`2023-08-28`

- fix(layout): fix menuItem icon no align error. [62f1bb5](https://github.com/ant-design/pro-components/commit/62f1bb5)
- fix (layout): 修复 sider token 样式问题 (#7574). [#7574](https://github.com/ant-design/pro-components/pull/#7574) [@daifuyang](https://github.com/daifuyang)
- fix(layout): use useBreakpoint utils. [af522ee](https://github.com/ant-design/pro-components/commit/af522ee)
- fix(layout): use useBreakpoint utils. [3a174d1](https://github.com/ant-design/pro-components/commit/3a174d1)
- fix (form): textarea 只读状态样式不统一 (#7578 #6618) (#7579). [#7579](https://github.com/ant-design/pro-components/pull/#7579) [@HoPGoldy](https://github.com/HoPGoldy)
- fix(form): fix FormItem name is null，but has data error (#7583). [#7583](https://github.com/ant-design/pro-components/pull/#7583) [@chenshuai2144](https://github.com/chenshuai2144)
- fix (form): ValueTypeWithFieldPropsBase 泛型参数失效 (#7582). [#7582](https://github.com/ant-design/pro-components/pull/#7582) [@ldc-37](https://github.com/ldc-37)
- feat(descriptions): support emptyText. [d5ccc34](https://github.com/ant-design/pro-components/commit/d5ccc34)
- fix(descriptions): fix valueType is null. label no work error. [8779112](https://github.com/ant-design/pro-components/commit/8779112)

## @ant-design/pro-components\@2.6.13

`2023-08-17`

- fix(layout): pageContainer token not work (#7524). [#7524](https://github.com/ant-design/pro-components/pull/#7524) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(layout): fix ProFormSelect unsupport title error. [d41b1a7](https://github.com/ant-design/pro-components/commit/d41b1a7)
- fix(layout): if src=null, un render avatar. [c721e07](https://github.com/ant-design/pro-components/commit/c721e07)
- fix(layout): collapsed use vertical mode. [e82170f](https://github.com/ant-design/pro-components/commit/e82170f)
- feat (form): 修复 field color style width:100% 导致的样式不美观问题 & ts 定义 (#7510). [#7510](https://github.com/ant-design/pro-components/pull/#7510) [@LengYXin](https://github.com/LengYXin)
- feat(table): custom `toolbar` icon (#7521). [#7521](https://github.com/ant-design/pro-components/pull/#7521) [@kungege](https://github.com/kungege)
- fix(Descriptions): fix use key props error. [c8987bb](https://github.com/ant-design/pro-components/commit/c8987bb)

## @ant-design/pro-components\@2.6.12

`2023-08-10`

- fix (form): 修复 compact warning (#7496). [#7496](https://github.com/ant-design/pro-components/pull/#7496) [@xliez](https://github.com/xliez)
- feat (form): transform 支持深合并 (#7494). [#7494](https://github.com/ant-design/pro-components/pull/#7494) [@xliez](https://github.com/xliez)
- fix (form): 修复 transform 方法与预期不符 (#7486). [#7486](https://github.com/ant-design/pro-components/pull/#7486) [@xliez](https://github.com/xliez)
- fix (form): 表单项配置 request 并且自定义 renderFormItem 时，没有透传 options 和 loading (#7457). [#7457](https://github.com/ant-design/pro-components/pull/#7457) [@Yang-yibu](https://github.com/Yang-yibu)
- fix (table): DragSortTable 每次 render 执行时 Table DOM 会销毁重建新的 DOM (#7490). [#7490](https://github.com/ant-design/pro-components/pull/#7490) [@xliez](https://github.com/xliez)
- feat (field): 调整 field color 为 antd 新的 ColorPicker (#7403). [#7403](https://github.com/ant-design/pro-components/pull/#7403) [@LengYXin](https://github.com/LengYXin)

## @ant-design/pro-components\@2.6.11

`2023-08-04`

- fix(layout): fix menu item no align error. [450a823](https://github.com/ant-design/pro-components/commit/450a823)
- fix(form): form field support mobile width best. [56ccc63](https://github.com/ant-design/pro-components/commit/56ccc63)
- fix(form): update `ReturnType<SearchConvertKeyFn>` (#7462). [#7462](https://github.com/ant-design/pro-components/pull/#7462) [@q1uxu](https://github.com/q1uxu)
- fix(table): restrict movement to only the vertical axis.. [5a8f9fb](https://github.com/ant-design/pro-components/commit/5a8f9fb)

## @ant-design/pro-components\@2.6.10

`2023-07-31`

- fix(layout): fix col size error. [749a303](https://github.com/ant-design/pro-components/commit/749a303)

## @ant-design/pro-components\@2.6.9

`2023-07-31`

- feat(components): hebrew support (#7435). [#7435](https://github.com/ant-design/pro-components/pull/#7435) [@edenHechtArbox](https://github.com/edenHechtArbox)
- fix(layout): fix pop menu style error. [36bfccf](https://github.com/ant-design/pro-components/commit/36bfccf)
- fix(layout): fix colorBgMenuItemHover no work error. [3efdd46](https://github.com/ant-design/pro-components/commit/3efdd46)
- fix(layout): fix footer links hover no work error. [a2bdb21](https://github.com/ant-design/pro-components/commit/a2bdb21)
- feat(form): StepForm added layoutRender props (#7431). [#7431](https://github.com/ant-design/pro-components/pull/#7431) [@xXAvoraXx](https://github.com/xXAvoraXx)

## @ant-design/pro-components\@2.6.8

`2023-07-24`

- fix(layout): fix submenu popup text is center error. [7191501](https://github.com/ant-design/pro-components/commit/7191501)
- fix(form): StepForm support moblie width. [6eee22f](https://github.com/ant-design/pro-components/commit/6eee22f)
- fix(form): ProFormSet support lightProps. [0593fe1](https://github.com/ant-design/pro-components/commit/0593fe1)
- fix(form): ProForm support readonly. [e466f4e](https://github.com/ant-design/pro-components/commit/e466f4e)
- fix(form): fix transform no set false error. [f547ed0](https://github.com/ant-design/pro-components/commit/f547ed0)

## @ant-design/pro-components\@2.6.7

`2023-07-19`

- fix(layout): fix sider collpse no work error. [e17dee6](https://github.com/ant-design/pro-components/commit/e17dee6)

## @ant-design/pro-components\@2.6.6

`2023-07-19`

- fix(layout): disable SiderContext when Sider other dom. [4d53446](https://github.com/ant-design/pro-components/commit/4d53446)
- fix(layout): fix FooterToolBar width error. [54d9afe](https://github.com/ant-design/pro-components/commit/54d9afe)
- fix(layout): Layout siderMenu delete getContainer = false. [ed0c88b](https://github.com/ant-design/pro-components/commit/ed0c88b)
- fix(layout): menuItem support disableTooltip. [84b79c8](https://github.com/ant-design/pro-components/commit/84b79c8)
- fix (form): 修复当 LightFilter 折叠模式 icon 样式问题 (#7388). [#7388](https://github.com/ant-design/pro-components/pull/#7388) [@datoou](https://github.com/datoou)
- feat(form): drawer support resizable (#7288). [#7288](https://github.com/ant-design/pro-components/pull/#7288) [@natashaamin](https://github.com/natashaamin)
- fix(form): fix jsonCode bgColor no work in dart mode. [03927db](https://github.com/ant-design/pro-components/commit/03927db)
- fix(form): use 'Space.Compact' instead 'Input.Group'. [89e1fb4](https://github.com/ant-design/pro-components/commit/89e1fb4)
- fix(form): LightFilter default set popupMatchSelectWidth=false. [27667aa](https://github.com/ant-design/pro-components/commit/27667aa)
- fix(form): select use options. [59d5e72](https://github.com/ant-design/pro-components/commit/59d5e72)
- feat(form): StepsForm support multifile StepForm. [ccc35f5](https://github.com/ant-design/pro-components/commit/ccc35f5)
- fix(form): Fix the issue of the ProFormMoney component causing duplicate currency symbols when using trigger=onBlur. [bc94215](https://github.com/ant-design/pro-components/commit/bc94215)
- fix(form): ModalForm and DrawerForm support params type. [76470d8](https://github.com/ant-design/pro-components/commit/76470d8)
- fix(form): support OptionType types. [189f933](https://github.com/ant-design/pro-components/commit/189f933)
- fix(form): CheckBox readonly mode support warp. [646f4a7](https://github.com/ant-design/pro-components/commit/646f4a7)
- fix(list): ProList card support on checked. [2a0257e](https://github.com/ant-design/pro-components/commit/2a0257e)
- fix(table): params change awaly reload fetch. [b147a16](https://github.com/ant-design/pro-components/commit/b147a16)
- feat(table): ProTable support optionsRender. [8b56b6a](https://github.com/ant-design/pro-components/commit/8b56b6a)
- fix(table): fix renderFormItem render twice render time. [c3b8ffd](https://github.com/ant-design/pro-components/commit/c3b8ffd)
- fix(table): Protable support EXPAND_COLUMN and SELECTION_COLUMN. [3454347](https://github.com/ant-design/pro-components/commit/3454347)
- fix(table): when checkable=false, no render all select boxs. [5421e41](https://github.com/ant-design/pro-components/commit/5421e41)
- fix(table): Fix the columnsSetting styling issue in controlling column state when the table header is too long. [5b746b3](https://github.com/ant-design/pro-components/commit/5b746b3)
- fix(table): Fix the issue where align="center" is not working. [db6fc65](https://github.com/ant-design/pro-components/commit/db6fc65)
- fix(table): Fix the issue of actionref not being synchronized. [2160fb8](https://github.com/ant-design/pro-components/commit/2160fb8)
- fix(table): dataSource support string list. [7b81b4c](https://github.com/ant-design/pro-components/commit/7b81b4c)
- fix(descriptions): contentStyle add minwidth=0. [9087253](https://github.com/ant-design/pro-components/commit/9087253)

## @ant-design/pro-components\@2.6.5

`2023-07-14`

- fix(layout): Fix the issue of excessively long titles not being truncated.. [0e67775](https://github.com/ant-design/pro-components/commit/0e67775)
- fix(layout): fix abnormal animation playback.. [854ce2b](https://github.com/ant-design/pro-components/commit/854ce2b)
- fix(form): Fix the display style of the switch. [8cdeda4](https://github.com/ant-design/pro-components/commit/8cdeda4)
- fix(form): InlineErrorFormItemPopover support radio and checkbox. [8c6ede6](https://github.com/ant-design/pro-components/commit/8c6ede6)
- fix(table): export editor pro table props (#7330). [#7330](https://github.com/ant-design/pro-components/pull/#7330) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(card): change checkCard checked token (#7352). [#7352](https://github.com/ant-design/pro-components/pull/#7352) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(card): remove onChange stopPropagation. [5f4bb48](https://github.com/ant-design/pro-components/commit/5f4bb48)

## @ant-design/pro-components\@2.6.4

`2023-07-04`

- fix(layout): support antd\@5.6.4. [a6ee785](https://github.com/ant-design/pro-components/commit/a6ee785)
- feat (layout): 添加 appListRender api (#7286). [#7286](https://github.com/ant-design/pro-components/pull/#7286) [@sansheng741](https://github.com/sansheng741)
- feat (form): ProForm 支持第二个泛型参数 (#7318). [#7318](https://github.com/ant-design/pro-components/pull/#7318) [@q1uxu](https://github.com/q1uxu)
- fix (form): 修复当 value 为搜索条件 option 显示不出来的问题 (#7283). [#7283](https://github.com/ant-design/pro-components/pull/#7283) [@ldwonday](https://github.com/ldwonday)
- feat(table): add support of custom render serch form (#7307). [#7307](https://github.com/ant-design/pro-components/pull/#7307) [@mashirozx](https://github.com/mashirozx)

## @ant-design/pro-components\@2.6.3

`2023-06-30`

- fix(layout): submenu close tooltip. [a550039](https://github.com/ant-design/pro-components/commit/a550039)
- fix(form): fix block when QueryFilter set grid. [393fbe8](https://github.com/ant-design/pro-components/commit/393fbe8)
- fix(form): fix className is undefined error. [a27d453](https://github.com/ant-design/pro-components/commit/a27d453)
- fix(form): fix DigitRange un support theme error. [70ad3bc](https://github.com/ant-design/pro-components/commit/70ad3bc)
- fix(form): formRef.current change will update formitem list. [5e977db](https://github.com/ant-design/pro-components/commit/5e977db)
- fix(table): fix filter and sort is null no trigger change error. [8c444d7](https://github.com/ant-design/pro-components/commit/8c444d7)
- fix(card): close onClick and onchange Propagation. [c86532f](https://github.com/ant-design/pro-components/commit/c86532f)

## @ant-design/pro-components\@2.6.2

`2023-06-19`

- fix(form): fix inline form reset value for destoy. [dc9420a](https://github.com/ant-design/pro-components/commit/dc9420a)

## @ant-design/pro-components\@2.6.0

`2023-06-19`

- fix(form): alway use shouldUpdate for json. [7933961](https://github.com/ant-design/pro-components/commit/7933961)
- fix(form): onInit use ProFormInstance. [ad537a5](https://github.com/ant-design/pro-components/commit/ad537a5)
- fix(table): add Form.Item shouldUpdate function. [db3224b](https://github.com/ant-design/pro-components/commit/db3224b)
- feat (field): LightFilter 中使用 ProFormSelect 的两个 bug 修复 (#7225) (#7233). [#7225](https://github.com/ant-design/pro-components/pull/#7225) [@Rabbit](https://github.com/Rabbit)

## @ant-design/pro-components\@2.5.11

`2023-06-16`

- fix(layout): fix ErrorBoundary types error. [5bb5be1](https://github.com/ant-design/pro-components/commit/5bb5be1)
- fix(table): fix editableFormRef no work error. [0cd2e4d](https://github.com/ant-design/pro-components/commit/0cd2e4d)

## @ant-design/pro-components\@2.5.10

`2023-06-15`

- fix(form): fix table render less error. [dcd3888](https://github.com/ant-design/pro-components/commit/dcd3888)

## @ant-design/pro-components\@2.5.9

`2023-06-14`

- fix(form): fix shouldUpdate no work error. [ff8bbef](https://github.com/ant-design/pro-components/commit/ff8bbef)

## @ant-design/pro-components\@2.5.7

`2023-06-12`

- fix (components): fix useToken no supoort antd\@4 的问题. [58b96e9](https://github.com/ant-design/pro-components/commit/58b96e9)

## @ant-design/pro-components\@2.5.6

`2023-06-12`

- fix(components): remove hashid empty. [b46bb80](https://github.com/ant-design/pro-components/commit/b46bb80)
- fix(layout): support antd\@5.6 token. [28291fe](https://github.com/ant-design/pro-components/commit/28291fe)
- fix (form): 修复 ProTable 的 columns.proFieldProps 不生效 (#7205). [#7205](https://github.com/ant-design/pro-components/pull/#7205) [@fanck0605](https://github.com/fanck0605)
- fix(form): ColorPicker use antd style-n. [8d3cd04](https://github.com/ant-design/pro-components/commit/8d3cd04)
- fix(form): ProFormColorPicker support disable. [973ac28](https://github.com/ant-design/pro-components/commit/973ac28)
- fix(form): fix set addonAfter valuePropName will no work error. [8072666](https://github.com/ant-design/pro-components/commit/8072666)
- fix (form): 修复 fn \[curK] 为函数时，参数 undefined 导致的报错 (#7163). [#7163](https://github.com/ant-design/pro-components/pull/#7163) [@Soulwail](https://github.com/Soulwail)
- fix (table): 修复 Editable 的 record.id 使用 index，且 index 为 0 时，导致无法添加新行 (#7176). [#7176](https://github.com/ant-design/pro-components/pull/#7176) [@Soulwail](https://github.com/Soulwail)
- fix(card): fix ProCard small header style error. [17ccf69](https://github.com/ant-design/pro-components/commit/17ccf69)

## @ant-design/pro-components\@2.5.5

`2023-06-02`

- fix(form): fix Cascader light mode no work error. [4ce56dc](https://github.com/ant-design/pro-components/commit/4ce56dc)

## @ant-design/pro-components\@2.5.3

`2023-05-30`

- chore: 修复 ts 定义缺失的问题。

## @ant-design/pro-components\@2.5.2

`2023-05-30`

- fix(form): fix \_transformArray is null will throw error. [ba1d9e9](https://github.com/ant-design/pro-components/commit/ba1d9e9)

## @ant-design/pro-components\@2.5.0

`2023-05-29`

- fix (layout): 修复 collapsedShowTitle 样式错误问题 (#7098). [#7098](https://github.com/ant-design/pro-components/pull/#7098) [@ONLY-yours](https://github.com/ONLY-yours)
- fix (form): 解决 ProFormList 多重嵌套 ProFormList 下的表单组件未调用 transform 方法问题 (#7138). [#7138](https://github.com/ant-design/pro-components/pull/#7138) [@kaneruan](https://github.com/kaneruan)
- fix(form): use oninit reset formRef. [1deedf2](https://github.com/ant-design/pro-components/commit/1deedf2)
- fix(form): close icon style (#7091). [#7091](https://github.com/ant-design/pro-components/pull/#7091) [@kungege](https://github.com/kungege)
- fix(list): Extend ProListMeta\<T> type with `renderFormItem` (#7136). [#7136](https://github.com/ant-design/pro-components/pull/#7136) [@bartelemi](https://github.com/bartelemi)
- fix (list): 修复 ProFormList 使用 className 无效问题 (#7128). [#7128](https://github.com/ant-design/pro-components/pull/#7128) [@leshalv](https://github.com/leshalv)
- fix(list): `onChange ` prop don't work (#7129). [#7129](https://github.com/ant-design/pro-components/pull/#7129) [@kungege](https://github.com/kungege)
- fix(table): Edit to make defaultValue become higher priority to reset column setting (#7113). [#7113](https://github.com/ant-design/pro-components/pull/#7113) [@ianccy](https://github.com/ianccy)
- feat(table): use @dnd-kit (#7131). [#7131](https://github.com/ant-design/pro-components/pull/#7131) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(table): component EditableProTable actionDeleteRef function Single row status Locked (#7124). [#7124](https://github.com/ant-design/pro-components/pull/#7124) [@varown](https://github.com/varown)

## @ant-design/pro-components\@2.4.16

`2023-05-18`

- fix (layout): 修复因为 menu 不存在 icon 时候，收起的 tooltip 会多展示一个字的问题 (#7083). [#7083](https://github.com/ant-design/pro-components/pull/#7083) [@ONLY-yours](https://github.com/ONLY-yours)
- feat (layout): ProSchemaValueEnumMap 类型 key 增加对 boolean 的支持 (#7081). [#7081](https://github.com/ant-design/pro-components/pull/#7081) [@hans000](https://github.com/hans000)
- fix(form): LightFilter icon add color transition. [becd94e](https://github.com/ant-design/pro-components/commit/becd94e)
- fix(form): fix LightFilter close icon style error. [38e5cd1](https://github.com/ant-design/pro-components/commit/38e5cd1)

## @ant-design/pro-components\@2.4.15

`2023-05-15`

- fix(layout): support fix header scroll use new color (#7071). [#7071](https://github.com/ant-design/pro-components/pull/#7071) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(layout): set layout headermenu height to 40. [f50cfd2](https://github.com/ant-design/pro-components/commit/f50cfd2)
- fix (form): 修复 form 自定义组件过多卡顿的问题 (#7018). [#7018](https://github.com/ant-design/pro-components/pull/#7018) [@ldwonday](https://github.com/ldwonday)
- fix (form):ProFormList 支持更多类型 (#7051). [#7051](https://github.com/ant-design/pro-components/pull/#7051) [@leshalv](https://github.com/leshalv)
- feat(form): rewirte light date form (#7052). [#7052](https://github.com/ant-design/pro-components/pull/#7052) [@chenshuai2144](https://github.com/chenshuai2144)
- fix (form): 当设置了 digit 的 stringMode 为 true，但是组件没有返回 string (#7031). [#7031](https://github.com/ant-design/pro-components/pull/#7031) [@ldwonday](https://github.com/ldwonday)

## @ant-design/pro-components\@2.4.14

`2023-05-08`

- fix(layout): fix menu classname no work error. [c64e81c](https://github.com/ant-design/pro-components/commit/c64e81c)

## @ant-design/pro-components\@2.4.13

`2023-05-08`

- fix(layout): use best className slove token error. [8090248](https://github.com/ant-design/pro-components/commit/8090248)
- fix(form): fix ModalForm ref less error. [06721c3](https://github.com/ant-design/pro-components/commit/06721c3)
- fix(table): table should support dependencies (#7019). [#7019](https://github.com/ant-design/pro-components/pull/#7019) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-components\@2.4.11

`2023-05-04`

- fix(layout): paddingBlockStart set value=8. [6eac5b6](https://github.com/ant-design/pro-components/commit/6eac5b6)
- feat(layout): help add extraRender api (#6982). [#6982](https://github.com/ant-design/pro-components/pull/#6982) [@ONLY-yours](https://github.com/ONLY-yours)
- fix (table): 修复 useLocaleFilter 方法未判断存在 children 的情况 (#6987). [#6987](https://github.com/ant-design/pro-components/pull/#6987) [@zhou0322-lab](https://github.com/zhou0322-lab)

## @ant-design/pro-components\@2.4.9

`2023-04-26`

- fix(layout): up layout mix css level. [18e8157](https://github.com/ant-design/pro-components/commit/18e8157)

## @ant-design/pro-components\@2.4.3

`2023-03-27`

- feat(components): Add translation for Slovak and Czech (#6802). [#6802](https://github.com/ant-design/pro-components/pull/#6802) [@craftedsro](https://github.com/craftedsro)
- fix(layout):fix drawer bgColor error. [907bead](https://github.com/ant-design/pro-components/commit/907bead)
- fix(layout): remove ProLayout defaultProps. [7d1891f](https://github.com/ant-design/pro-components/commit/7d1891f)
- fix(layout): slove menu content inlineflex & child not 100% problem (#6819). [#6819](https://github.com/ant-design/pro-components/pull/#6819) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(layout): Provide a hack method to bypass the breadcrumb error check of antd and remove the error message.. [bcb32b9](https://github.com/ant-design/pro-components/commit/bcb32b9)
- feat(form): introduce proFieldProps in BaseFormProps and pass it to all Fields with the lowest priority (#6847). [#6847](https://github.com/ant-design/pro-components/pull/#6847) [@shijistar](https://github.com/shijistar)
- feat (table): ProTable 的 toolbar.tabs 和 toolbar.menu 配置下增加 defaultActiveKey 选项 (#6818). [#6818](https://github.com/ant-design/pro-components/pull/#6818) [@hans000](https://github.com/hans000)
- fix(card): remove reset fontFamily. [b33dfef](https://github.com/ant-design/pro-components/commit/b33dfef)
- fix(card): fix StatisticCard value style error. [5de24b7](https://github.com/ant-design/pro-components/commit/5de24b7)
- fix(descriptions): fix Descriptions action no center error. [11c1166](https://github.com/ant-design/pro-components/commit/11c1166)

## @ant-design/pro-components\@2.4.2

`2023-03-14`

- feat(form): QueryFilter support submitterColSpanProps. [11dbc0c](https://github.com/ant-design/pro-components/commit/11dbc0c)
- fix(form): fix AdvancedSearch demo no work error. [226fbac](https://github.com/ant-design/pro-components/commit/226fbac)
- fix(form): fix collapse button unuse colorPrimary txt. [55b8aab](https://github.com/ant-design/pro-components/commit/55b8aab)
- fix(list): fix usePaginationArgs and useSelection args error. [fe331b9](https://github.com/ant-design/pro-components/commit/fe331b9)

## @ant-design/pro-components\@2.4.1

`2023-03-13`

- fix(layout): fix sider menu height. [e8963cc](https://github.com/ant-design/pro-components/commit/e8963cc)
- fix(layout): remove procard use antd card. [02e1830](https://github.com/ant-design/pro-components/commit/02e1830)
- fix(form): Select request not trigger twice when keywords not change … (#6717). [#6717](https://github.com/ant-design/pro-components/pull/#6717) [@zd5043039119](https://github.com/zd5043039119)

## @ant-design/pro-components\@2.4.0

`2023-03-09`

- fix(layout): fix menu item icon style error (#6745). [#6745](https://github.com/ant-design/pro-components/pull/#6745) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(layout): fix colorBgPageContainerFixed no use colorBgElevated error. [712bc82](https://github.com/ant-design/pro-components/commit/712bc82)
- fix(layout): fix sider menu Drawer onCollapse no work error. [7d638f4](https://github.com/ant-design/pro-components/commit/7d638f4)
- fix(form): Select request not trigger twice when keywords not change … (#6717). [#6717](https://github.com/ant-design/pro-components/pull/#6717) [@zd5043039119](https://github.com/zd5043039119)

## @ant-design/pro-components\@2.3.59

`2023-03-08`

- feat(components): support antd\@5.4.0 (#6730). [#6730](https://github.com/ant-design/pro-components/pull/#6730) [@chenshuai2144](https://github.com/chenshuai2144)
- chore(layout):change == to === (#6735). [#6735](https://github.com/ant-design/pro-components/pull/#6735) [@dingxyang](https://github.com/dingxyang)
- fix (layout): siderMenu 中的 subMenu 在 dark 模式下显示不正常 (#6721). [#6721](https://github.com/ant-design/pro-components/pull/#6721) [@crazyurus](https://github.com/crazyurus)
- fix(layout): avatarProps not work when actionsRender is falsy (#6695). [#6695](https://github.com/ant-design/pro-components/pull/#6695) [@xliez](https://github.com/xliez)
- feat(layout): add ProHelp components (#6654). [#6654](https://github.com/ant-design/pro-components/pull/#6654) [@chenshuai2144](https://github.com/chenshuai2144)
- fix (form): 修复 label 属性没有传值的问题 (#6728). [#6728](https://github.com/ant-design/pro-components/pull/#6728) [@hans000](https://github.com/hans000)
- fix (form): lightSelect 默认转小写 #6692 (#6696). [#6696](https://github.com/ant-design/pro-components/pull/#6696) [@XueMeijing](https://github.com/XueMeijing)
- fix (table): 修复 maxLength 选项配置为 0 时逻辑不符合预期的问题 (#6719). [#6719](https://github.com/ant-design/pro-components/pull/#6719) [@hans000](https://github.com/hans000)

## @ant-design/pro-components\@2.3.58

`2023-02-28`

- fix(layout): menuHeaderRender not work (#6676). [#6676](https://github.com/ant-design/pro-components/pull/#6676) [@elrrrrrrr](https://github.com/elrrrrrrr)
- fix(layout): if layout's avatarProps doesn't exist, the actionsRender props should also take effect (#6642). [#6642](https://github.com/ant-design/pro-components/pull/#6642) [@BooYeu](https://github.com/BooYeu)
- 💥 feat (layout): layout 提供在菜单为空时隐藏 Sider 的功能 (#6643). [#6643](https://github.com/ant-design/pro-components/pull/#6643) [@wtchaos](https://github.com/wtchaos)
- feat(form): ProFormTreeSelect support fetchDataOnSearch (#6638). [#6638](https://github.com/ant-design/pro-components/pull/#6638) [@Eliot00](https://github.com/Eliot00)
- fix(form): textarea read-mode error (#6632). [#6632](https://github.com/ant-design/pro-components/pull/#6632) [@jaluik](https://github.com/jaluik)
- fix (table): selectedRows 拿不到最新的值 (#6671). [#6671](https://github.com/ant-design/pro-components/pull/#6671) [@hans000](https://github.com/hans000)
- fix (table): ProTable 组件 toolbar menu 属性为 tab 时抖动问题 (#6584) (#6641). [#6584](https://github.com/ant-design/pro-components/pull/#6584) [@chencc](https://github.com/chencc)

## @ant-design/pro-components\@2.3.57

`2023-02-17`

- fix(layout): fix rightContentRender alway work error. [796ab12](https://github.com/ant-design/pro-components/commit/796ab12)

## @ant-design/pro-components\@2.3.56

`2023-02-17`

- fix(components): src alway use es path. [4a13142](https://github.com/ant-design/pro-components/commit/4a13142)

## @ant-design/pro-components\@2.3.55

`2023-02-16`

- fix(layout): alway use actionsRender. [2e6223432](https://github.com/ant-design/pro-components/commit/2e6223432)
- feat(layout): layout avatarProps support render funtion. [1dd790089](https://github.com/ant-design/pro-components/commit/1dd790089)
- fix(form): `optionFilterProp` doesn't work with LightFilter. [#6603](https://github.com/ant-design/pro-components/pull/6603) [@kalykun](https://github.com/kalykun)
- fix(components): fix valuetype no work error. [f6215e98e](https://github.com/ant-design/pro-components/commit/f6215e98e)
- feat(components): remove unstate-next for protable. [f284e6620](https://github.com/ant-design/pro-components/commit/f284e6620)
- fix(layout): remove `title` attribute. [#6604](https://github.com/ant-design/pro-components/pull/6604) [@kalykun](https://github.com/kalykun)
- fix(table): fix pagination padding style error. [a5e7439e4](https://github.com/ant-design/pro-components/commit/a5e7439e4)
- fix(form): inconsistent digit value when precision=0. [f83092a50](https://github.com/ant-design/pro-components/commit/f83092a50) [@Guan](https://github.com/Guan)
- fix(components): Thai translation in ProTable [#6600](https://github.com/ant-design/pro-components/pull/6600) [@Eugene Goh](https://github.com/EugeneGohh)
- fix(table): if toolBarRender,search and headerTitle is null, norender table card dom. [fc59a1996](https://github.com/ant-design/pro-components/commit/fc59a1996)

## @ant-design/pro-components\@2.3.54

`2023-02-10`

- fix(components): fix lib has es path error. [157f1f1](https://github.com/ant-design/pro-components/commit/157f1f1)

## @ant-design/pro-components\@2.3.53

`2023-02-08`

- fix(components): remove useLayoutEffect to useEffect. [19ccf1c](https://github.com/ant-design/pro-components/commit/19ccf1c)
- fix(layout): use logical properties and values instead margin. [a3c1b31](https://github.com/ant-design/pro-components/commit/a3c1b31)
- fix (layout): 修复因为 Sider 折叠导致菜单展开状态丢失的 bug (#6472). [#6472](https://github.com/ant-design/pro-components/pull/#6472) [@wtchaos](https://github.com/wtchaos)
- feat (layout): pro-layout top 模式下支持 headerTitleRender (#6560). [#6560](https://github.com/ant-design/pro-components/pull/#6560) [@Hahet](https://github.com/Hahet)
- fix(layout): Group-list demo fix (#6512). [#6512](https://github.com/ant-design/pro-components/pull/#6512) [@chengaway](https://github.com/chengaway)
- fix (layout): ItemClick 自定义点击事件，回传触发 Popover 元素 ref (#6504). [#6504](https://github.com/ant-design/pro-components/pull/#6504) [@chengaway](https://github.com/chengaway)
- fix(form): FieldLabel support i18n #6578(#6578). [#6578](https://github.com/ant-design/pro-components/pull/#6578) [@kungege](https://github.com/kungege)
- fix(form): dataindex should take precedence over key. [8249ccd](https://github.com/ant-design/pro-components/commit/8249ccd)
- fix(form): slove form list label defalut mode show problem (#6549). [#6549](https://github.com/ant-design/pro-components/pull/#6549) [@ONLY-yours](https://github.com/ONLY-yours)
- fix (form): 修复了 textarea 在只读模式下的对齐和换行的问题 (#6524). [#6524](https://github.com/ant-design/pro-components/pull/#6524) [@WilenChen](https://github.com/WilenChen)
- fix (form): debounceTime 在 SchemaForm 上配置不生效的问题 (#6557). [#6557](https://github.com/ant-design/pro-components/pull/#6557) [@ldwonday](https://github.com/ldwonday)
- fix(table): fix keyframes style no work error. [122484e](https://github.com/ant-design/pro-components/commit/122484e)
- fix (table): 列设置里面拖动列改变顺序会导致重新发布按钮出现多次 (#6565). [#6565](https://github.com/ant-design/pro-components/pull/#6565) [@nocodeempire](https://github.com/nocodeempire)
- fix (table): 删除 EditableTable 的 console.log (#6526). [#6526](https://github.com/ant-design/pro-components/pull/#6526) [@sushi-su](https://github.com/sushi-su)
- fix(descriptions): fix fetch error no retry fetch error. [9158e71](https://github.com/ant-design/pro-components/commit/9158e71)

## @ant-design/pro-components\@2.3.52

`2023-01-10`

- fix(layout): replace marginTop to marigin-block-start. [5d0f58f](https://github.com/ant-design/pro-components/commit/5d0f58f)
- fix(layout): fix ProLayout pageTitleRender not overriding document title (#6492). [#6492](https://github.com/ant-design/pro-components/pull/#6492) [@whyour](https://github.com/whyour)
- fix(layout): open sider from right on rtl direction (#6491). [#6491](https://github.com/ant-design/pro-components/pull/#6491) [@3hson](https://github.com/3hson)
- fix (layout): 修复分组逻辑部分代码 (#6488). [#6488](https://github.com/ant-design/pro-components/pull/#6488) [@chengaway](https://github.com/chengaway)
- fix(layout): support click mask close. [06a8920](https://github.com/ant-design/pro-components/commit/06a8920)
- fix (layout): 调整菜单收缩时 margin 与展开时 一致 (#6481). [#6481](https://github.com/ant-design/pro-components/pull/#6481) [@hihuangwei](https://github.com/hihuangwei)
- fix(form): fix formref no work error in BetaSchemaForm. [7b9bbdd](https://github.com/ant-design/pro-components/commit/7b9bbdd)
- fix (Table): 列配置子项 disable 时，无法拖动调整顺序 (#6476). [#6476](https://github.com/ant-design/pro-components/pull/#6476) [@chiaweilee](https://github.com/chiaweilee)
- fix (Table): 列配置子项 disable 时，“固定” 按钮点击无效 (#6475). [#6475](https://github.com/ant-design/pro-components/pull/#6475) [@chiaweilee](https://github.com/chiaweilee)
- fix (Table): 列配置点击 “列展示” 全选操作时，顺序排列和 disable 状态异常 (#6477). [#6477](https://github.com/ant-design/pro-components/pull/#6477) [@chiaweilee](https://github.com/chiaweilee)
- fix(table): fix cancelEditable will reset value error. [40fba50](https://github.com/ant-design/pro-components/commit/40fba50)

## @ant-design/pro-components\@2.3.51

`2023-01-06`

- feat (layout): 修复 prolayout 传入自定义 prefixCls 时样式异常 (#6464). [#6464](https://github.com/ant-design/pro-components/pull/#6464) [@Hahet](https://github.com/Hahet)
- feat(layout): remove unuse deps. [9cac437](https://github.com/ant-design/pro-components/commit/9cac437)
- fix(form): fix ProFormDigitRange label formart style. [6250094](https://github.com/ant-design/pro-components/commit/6250094)

## @ant-design/pro-components\@2.3.50

`2023-01-04`

- fix(layout): fix colorBgMenuItemCollapsedElevated no work error. [6aa0d2c](https://github.com/ant-design/pro-components/commit/6aa0d2c)
- fix (layout): 调整 margin ，与 Table 组件分页 margin 一致 (#6438). [#6438](https://github.com/ant-design/pro-components/pull/#6438) [@hihuangwei](https://github.com/hihuangwei)
- fix (layout): Layout 分组逻辑调整 (#6451). [#6451](https://github.com/ant-design/pro-components/pull/#6451) [@chengaway](https://github.com/chengaway)
- fix (layout): 修复 AppsLogoComponents 样式警告 (#6440). [#6440](https://github.com/ant-design/pro-components/pull/#6440) [@leshalv](https://github.com/leshalv)
- fix (form): Light FilterightWrapper 当中清除功能的默认行为，使得 LightFilter 当中的 Checkbox 可以正常地被清除功能重置 (#6450). [#6450](https://github.com/ant-design/pro-components/pull/#6450) [@Leo-captain](https://github.com/Leo-captain)
- fix(table): fix columnsState.defaultValue no work error. [2b9a283](https://github.com/ant-design/pro-components/commit/2b9a283)

## @ant-design/pro-components\@2.3.48

`2022-12-29`

- feat (layout): Layout 新增 跨站点导航 分组形式 (#6431). [#6431](https://github.com/ant-design/pro-components/pull/#6431) [@chengaway](https://github.com/chengaway)
- fix (layout): 修复 extraContent 在 md 尺寸不位于 content 右侧的 bug (#6389). [#6389](https://github.com/ant-design/pro-components/pull/#6389) [@edram](https://github.com/edram)
- feat (layout): sider token 增加 colorBgElevated (#6384). [#6384](https://github.com/ant-design/pro-components/pull/#6384) [@sushi-su](https://github.com/sushi-su)
- fix(form): treeSelect do not default reset to empty string. [387d2d7](https://github.com/ant-design/pro-components/commit/387d2d7)
- fix(form): do not remove collapsed dom. [769177f](https://github.com/ant-design/pro-components/commit/769177f)
- fix(form): `ProFormList` style does not work (#6398). [#6398](https://github.com/ant-design/pro-components/pull/#6398) [@kungege](https://github.com/kungege)
- fix (form): 优化 checkbox 在 hashPriority=high 不生效问题 (#6400). [#6400](https://github.com/ant-design/pro-components/pull/#6400) [@leshalv](https://github.com/leshalv)
- fix(list): fix card list style error (#6436). [#6436](https://github.com/ant-design/pro-components/pull/#6436) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(table): no render onSearch will SearchProps has onSearch. [a1383e2](https://github.com/ant-design/pro-components/commit/a1383e2)
- fix(table): use flex replace Space (#6426). [#6426](https://github.com/ant-design/pro-components/pull/#6426) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(table): fix childrenColumnName is null error. [0fb584c](https://github.com/ant-design/pro-components/commit/0fb584c)
- fix (table): 轻量筛选替换查询表单，将 padding 调为 8px 更为统一美观 (#6423). [#6423](https://github.com/ant-design/pro-components/pull/#6423) [@hihuangwei](https://github.com/hihuangwei)
- fix(card): slove nested table background color was cover by pro-card (#6410). [#6410](https://github.com/ant-design/pro-components/pull/#6410) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(card): disable & checked style fixed (#6414). [#6414](https://github.com/ant-design/pro-components/pull/#6414) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.3.47

`2022-12-13`

- feat(components): bump swr from 1.x to 2.x (#6367). [#6367](https://github.com/ant-design/pro-components/pull/#6367) [@sushi-su](https://github.com/sushi-su)

## @ant-design/pro-components\@2.3.43

`2022-12-08`

- fix(layout): no set default colorPrimary. [f85103e](https://github.com/ant-design/pro-components/commit/f85103e)

## @ant-design/pro-components\@2.3.42

`2022-12-08`

- fix(layout): support configprovide darkAlgorithm. [dabf05e](https://github.com/ant-design/pro-components/commit/dabf05e)
- fix (form): 修复 ProFormSelect 在 LightFilter 中自定义过滤无效 (#6341). [#6341](https://github.com/ant-design/pro-components/pull/#6341) [@SeaHaiWorld](https://github.com/SeaHaiWorld)
- fix(table): fix table extra classname break (#6334). [#6334](https://github.com/ant-design/pro-components/pull/#6334) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.3.40

`2022-12-05`

- fix (layout): 修复 PageContainer 设置为 fixedHeader，内容滚动的时候 Title 抖动问题 (#6330). [#6330](https://github.com/ant-design/pro-components/pull/#6330) [@lhzhou180606](https://github.com/lhzhou180606)
- fix(layout): fix bgColor token no work error. [bad0f2f](https://github.com/ant-design/pro-components/commit/bad0f2f)
- fix (form): 修复 SearchSelect 组件在设置了 showSearch 和 多选模式下，当搜索并选中后，搜索的文字没有清空的问题 (#6302). [#6302](https://github.com/ant-design/pro-components/pull/#6302) [@catmiao8](https://github.com/catmiao8)
- fix (table): 修复 table 使用后端分页时（频繁变化 dataSource 场景）多选功能 selectedRow 缓存丢失 (#6314). [#6314](https://github.com/ant-design/pro-components/pull/#6314) [@YingJiangHui](https://github.com/YingJiangHui)
- fix(card): fix card style error. [60ac49c](https://github.com/ant-design/pro-components/commit/60ac49c)

## @ant-design/pro-components\@2.3.37

`2022-12-01`

- fix(table): fix table style error. [3fbfddd](https://github.com/ant-design/pro-components/commit/3fbfddd)

## @ant-design/pro-components\@2.3.36

`2022-11-30`

- fix(layout): fix collapsedshowtitle style error. [e4dc580](https://github.com/ant-design/pro-components/commit/e4dc580)
- fix (layout): 修复 Footer `<a>` 标签单独使用时带有下划线问题 (#6300). [#6300](https://github.com/ant-design/pro-components/pull/#6300) [@leshalv](https://github.com/leshalv)
- feat(layout): support stylish. [60c0b54](https://github.com/ant-design/pro-components/commit/60c0b54)
- fix(layout): better theme gen style. [fcbc182](https://github.com/ant-design/pro-components/commit/fcbc182)
- fix(layout): update drawer style. [eb7ace8](https://github.com/ant-design/pro-components/commit/eb7ace8)
- feat(layout): fix dark style no work error. [3e06527](https://github.com/ant-design/pro-components/commit/3e06527)
- fix(form): new antd version use items props. [9f520bf](https://github.com/ant-design/pro-components/commit/9f520bf)
- fix(form): formRef repeats the assignment (#6278). [#6278](https://github.com/ant-design/pro-components/pull/#6278) [@caijf](https://github.com/caijf)
- fix (table): Sortable 组件提取到外部防止不必要的页面重建 (#6246). [#6246](https://github.com/ant-design/pro-components/pull/#6246) [@yqz0203](https://github.com/yqz0203)
- fix (descriptions): 修复 ProDescriptions 编辑带有校验情况下，样式排版问题 (#6254). [#6254](https://github.com/ant-design/pro-components/pull/#6254) [@leshalv](https://github.com/leshalv)

## @ant-design/pro-components\@2.3.34

`2022-11-17`

- chore(form): update @ant-design/pro-form peer dependency "@types/lodash.merge" to be optional (#6220). [#6220](https://github.com/ant-design/pro-components/pull/#6220) [@lzm0x219](https://github.com/lzm0x219)
- fix (form): 只读模式下的 ProFormSelect 应该支持 wrap (#6235). [#6235](https://github.com/ant-design/pro-components/pull/#6235) [@kiner-tang](https://github.com/kiner-tang)
- fix(table): fix nested table style (#6228). [#6228](https://github.com/ant-design/pro-components/pull/#6228) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.3.33

`2022-11-15`

- fix (form): 修复 checkbox 在 ant design 5 vertical 布局失效问题 (#6214). [#6214](https://github.com/ant-design/pro-components/pull/#6214) [@leshalv](https://github.com/leshalv)
- fix(table): change css cache error. [a5bc4cb](https://github.com/ant-design/pro-components/commit/a5bc4cb)
- fix(Descriptions): fix ellipsis type error. [d051be5](https://github.com/ant-design/pro-components/commit/d051be5)

## @ant-design/pro-components\@2.3.32

`2022-11-14`

- fix (form): 修复 checkbox 在 ant design 5 vertical 布局失效问题 (#6214). [#6214](https://github.com/ant-design/pro-components/pull/#6214) [@leshalv](https://github.com/leshalv)

## @ant-design/pro-components\@2.3.31

`2022-11-14`

- fix (layout): 在内容定宽下，TopNavHeader 的样式问题 (#6182). [#6182](https://github.com/ant-design/pro-components/pull/#6182) [@hqwlkj](https://github.com/hqwlkj)
- fix(form): reset ProFormList when new form. [b9ba5d0](https://github.com/ant-design/pro-components/commit/b9ba5d0)
- fix (table): 修复 DragSortTable 的 dataSource 值变更后未生效 (#6207). [#6207](https://github.com/ant-design/pro-components/pull/#6207) [@acg-developer](https://github.com/acg-developer)
- fix (table): 修复拖拽排序表格使用数据源时数据源改变后未更新数据问题 (#6211). [#6211](https://github.com/ant-design/pro-components/pull/#6211) [@kiner-tang](https://github.com/kiner-tang)
- fix(table): column not working correctly after reset (#6159). [#6159](https://github.com/ant-design/pro-components/pull/#6159) [@Zeng-J](https://github.com/Zeng-J)

## @ant-design/pro-components\@2.3.30

`2022-11-08`

- fix(utils): alway check process is undefined. [a861967](https://github.com/ant-design/pro-components/commit/a861967)
- fix(table): update table alert style. [1302a90](https://github.com/ant-design/pro-components/commit/1302a90)

## @ant-design/pro-components\@2.3.29

`2022-11-07`

- fix(utils): do not use process?.env?.ANTD_VERSION. [a295b3d](https://github.com/ant-design/pro-components/commit/a295b3d)
- fix (table): 兼容 ellipsis 不想显示 Tooltip #6158 (#6160). [#6160](https://github.com/ant-design/pro-components/pull/#6160) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-components\@2.3.28

`2022-11-03`

- fix(layout): PageContainer support childrenContentStyle. [2a487cf](https://github.com/ant-design/pro-components/commit/2a487cf)
- fix(layout): fix sub menu padding style. [324e083](https://github.com/ant-design/pro-components/commit/324e083)
- feat(table): add new api actionRef.saveEditable (#6081). [#6081](https://github.com/ant-design/pro-components/pull/#6081) [@shijistar](https://github.com/shijistar)

## @ant-design/pro-components\@2.3.24

`2022-10-24`

- fix(table): column drag order error when move upward (#6113). [#6113](https://github.com/ant-design/pro-components/pull/#6113) [@xiawenqi](https://github.com/xiawenqi)
- fix(layout): auto open hashid (#6114). [#6114](https://github.com/ant-design/pro-components/pull/#6114) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-components\@2.3.21

`2022-10-21`

- fix(layout): support dynamic token set (#6106). [#6106](https://github.com/ant-design/pro-components/pull/#6106) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(layout): fix listtool bar style error. [820a5b7](https://github.com/ant-design/pro-components/commit/820a5b7)
- fix (layout): 默认开启 hash. [47f30c9](https://github.com/ant-design/pro-components/commit/47f30c9)
- fix(form): ProFormDigit value will fixed when not set precision(#6101). [#6101](https://github.com/ant-design/pro-components/pull/#6101) [@ONLY-yours](https://github.com/ONLY-yours)
- fix (table): 修复 inline 类型样式丢失问题 (#6092). [#6092](https://github.com/ant-design/pro-components/pull/#6092) [@sushi-su](https://github.com/sushi-su)
- fix(table): use ellipsis type exported from antd/rc-table (#6105). [#6105](https://github.com/ant-design/pro-components/pull/#6105) [@Jungzl](https://github.com/Jungzl)
- fix(table): fix table select rows style error. [dff31f3](https://github.com/ant-design/pro-components/commit/dff31f3)
- fix(card): static style fixed (#6100). [#6100](https://github.com/ant-design/pro-components/pull/#6100) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.3.20

`2022-10-19`

- fix (Layout): 修复 PageContainer 设置 fixedHeader 属性后，样式 ant-pro-page-container-warp 未生效问题 (#6078). [#6078](https://github.com/ant-design/pro-components/pull/#6078) [@hqwlkj](https://github.com/hqwlkj)
- fix(layout): add ghost classname. [7df07ba](https://github.com/ant-design/pro-components/commit/7df07ba)
- fix(layout): alway set pageheader is ghost. [e06d908](https://github.com/ant-design/pro-components/commit/e06d908)
- fix (form): 金额格式化支持负数形式展示 (#6080). [#6080](https://github.com/ant-design/pro-components/pull/#6080) [@kiner-tang](https://github.com/kiner-tang)
- fix(form): fix intl no work error. [ecfc9d6](https://github.com/ant-design/pro-components/commit/ecfc9d6)
- fix(card): fix card hover error style. [7ab8e7e](https://github.com/ant-design/pro-components/commit/7ab8e7e)

## @ant-design/pro-components\@2.3.18

`2022-10-14`

- fix(utils): remove act import. [fc76519](https://github.com/ant-design/pro-components/commit/fc76519)
- fix(layout): AppsLogo stopPropagation. [2235842](https://github.com/ant-design/pro-components/commit/2235842)
- fix(layout): Support for multiple PageContainers to be used together. [7a9aad7](https://github.com/ant-design/pro-components/commit/7a9aad7)
- fix(layout): use img height. [224b573](https://github.com/ant-design/pro-components/commit/224b573)
- fix(layout): support hover token. [8eb4545](https://github.com/ant-design/pro-components/commit/8eb4545)
- fix (form): ProFormList 组件 required 时需要提供加星号样式 (#5995). [#5995](https://github.com/ant-design/pro-components/pull/#5995) [@Zeng-J](https://github.com/Zeng-J)
- fix(form): Fixed a bug with nested FormList. [2100074](https://github.com/ant-design/pro-components/commit/2100074)
- fix(table): support tooltip=false, close ellipsis tooltip. [1c6c7ef](https://github.com/ant-design/pro-components/commit/1c6c7ef)
- fix(table): table search style fixed (#6069). [#6069](https://github.com/ant-design/pro-components/pull/#6069) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.3.17

`2022-10-13`

- fix (layout): 优化页面滑动的问题. [367c667](https://github.com/ant-design/pro-components/commit/367c667)
- fix(layout): use inline style. [827349d](https://github.com/ant-design/pro-components/commit/827349d)
- fix(form): fix filter dropdown not close (#6067). [#6067](https://github.com/ant-design/pro-components/pull/#6067) [@ONLY-yours](https://github.com/ONLY-yours)
- fix(table): fix no has key when maxsize call error. [657e971](https://github.com/ant-design/pro-components/commit/657e971)
- fix(table): card add hashid. [b98c387](https://github.com/ant-design/pro-components/commit/b98c387)

## @ant-design/pro-components\@2.3.15

`2022-10-11`

- fix(layout): fix PageContainer token no rerender error. [5611a16](https://github.com/ant-design/pro-components/commit/5611a16)
- fix(form): ProFormDependency support T. [7b0c85d](https://github.com/ant-design/pro-components/commit/7b0c85d)
- fix(form): fix key and visible use. [0ebd3db](https://github.com/ant-design/pro-components/commit/0ebd3db)
- fix(field): use open replace visible. [8dcf66a](https://github.com/ant-design/pro-components/commit/8dcf66a)

## @ant-design/pro-components\@2.3.14

`2022-10-10`

- fix(layout): support pageContainer.token. [0abcbd4](https://github.com/ant-design/pro-components/commit/0abcbd4)
- fix(layout): support pageContainer.token. [bd6e110](https://github.com/ant-design/pro-components/commit/bd6e110)
- fix(layout): fix pageheader style overwrite. [5b1a774](https://github.com/ant-design/pro-components/commit/5b1a774)
- fix(layout): fix layout margin style error. [3f9e8b5](https://github.com/ant-design/pro-components/commit/3f9e8b5)
- fix(layout): fix back icon style error. [1ecdad4](https://github.com/ant-design/pro-components/commit/1ecdad4)
- fix(form): fix showSearch title no work error. [96da32d](https://github.com/ant-design/pro-components/commit/96da32d)
- fix(form): remove redundant code (#6030). [#6030](https://github.com/ant-design/pro-components/pull/#6030) [@kiner-tang](https://github.com/kiner-tang)
- fix (form): 修复 ListItem 自定义样式和样式名称不生效的 BUG (#5982). [#5982](https://github.com/ant-design/pro-components/pull/#5982) [@hqwlkj](https://github.com/hqwlkj)
- fix (form): 解决 moneySymbol 设置为 false 时金额格式化异常问题 (#6012). [#6012](https://github.com/ant-design/pro-components/pull/#6012) [@kiner-tang](https://github.com/kiner-tang)
- fix (form): 修复 ModalForm 和 DrawerForm 关闭过程中表单内容闪现初始值的问题 (#6009). [#6009](https://github.com/ant-design/pro-components/pull/#6009) [@kiner-tang](https://github.com/kiner-tang)
- fix (table):DragSortTable - 拖动排序表格设置 rowClassName 无效问题 (#6038). [#6038](https://github.com/ant-design/pro-components/pull/#6038) [@hqwlkj](https://github.com/hqwlkj)

## @ant-design/pro-components\@2.3.13

`2022-09-28`

- fix(components): provide support getPrefixCls. [b3da61f](https://github.com/ant-design/pro-components/commit/b3da61f)
- fix(form): fix visible props warning (#5937). [#5937](https://github.com/ant-design/pro-components/pull/#5937) [@zzcbnz](https://github.com/zzcbnz)
- fix (table): 解决 CheckCard 与 Table 联用时 CheckCard 样式丢失问题 (#5980). [#5980](https://github.com/ant-design/pro-components/pull/#5980) [@kiner-tang](https://github.com/kiner-tang)

## @ant-design/pro-components\@2.3.12

`2022-09-22`

- fix(layout): awlay use route.children. [44b6fe1](https://github.com/ant-design/pro-components/commit/44b6fe1)
- fix(form): export FormListContext (#5968). [#5968](https://github.com/ant-design/pro-components/pull/#5968) [@houkunlin](https://github.com/houkunlin)
- fix (list): 修复类型问题：未将 RecordType 的泛型传入 meta 中 (#5962). [#5962](https://github.com/ant-design/pro-components/pull/#5962) [@SoraYama](https://github.com/SoraYama)
- fix(table): option button alignment problem (#5959). [#5959](https://github.com/ant-design/pro-components/pull/#5959) [@GoodbyeNJN](https://github.com/GoodbyeNJN)
- fix (table): useEditableArray 修复无法正确添加深度大于 1 的子记录 (#5949). [#5949](https://github.com/ant-design/pro-components/pull/#5949) [@zd5043039119](https://github.com/zd5043039119)
- fix(field): fix ProFormSegmented style (#5969). [#5969](https://github.com/ant-design/pro-components/pull/#5969) [@DBvc](https://github.com/DBvc)
- fix(card): card key props warning (#5941). [#5941](https://github.com/ant-design/pro-components/pull/#5941) [@zzcbnz](https://github.com/zzcbnz)

## @ant-design/pro-components\@2.3.10

`2022-09-21`

- fix(layout): fix colorPrimary change no rerender style error. [be6ab65](https://github.com/ant-design/pro-components/commit/be6ab65)
- feat(layout): remove routers types. [6c54c7e](https://github.com/ant-design/pro-components/commit/6c54c7e)
- fix(table): use better style import funtion. [8ce8d5a](https://github.com/ant-design/pro-components/commit/8ce8d5a)
- fix(card): fixed col width digit lost (#5958). [#5958](https://github.com/ant-design/pro-components/pull/#5958) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.3.9

`2022-09-16`

- fix(table): fix dateformat no work error. [c30c107](https://github.com/ant-design/pro-components/commit/c30c107)

## @ant-design/pro-components\@2.3.8

`2022-09-14`

- fix(components): fix ref error. [c9e1e98](https://github.com/ant-design/pro-components/commit/c9e1e98)
- fix(utils): remove unuse code. [bcbdbf6](https://github.com/ant-design/pro-components/commit/bcbdbf6)
- fix(layout): fix colorBgPageContainer (#5911). [#5911](https://github.com/ant-design/pro-components/pull/#5911) [@drizzlesconsin](https://github.com/drizzlesconsin)
- fix(layout): custom header padding (#5912). [#5912](https://github.com/ant-design/pro-components/pull/#5912) [@drizzlesconsin](https://github.com/drizzlesconsin)
- fix(form): fix select keyword lose. [797f853](https://github.com/ant-design/pro-components/commit/797f853)
- feat(form): add ProFormSegmented (#5913). [#5913](https://github.com/ant-design/pro-components/pull/#5913) [@leoooy](https://github.com/leoooy)
- fix (form): 修复 ProFormRadio.Group layout 作用反了 (#5918). [#5918](https://github.com/ant-design/pro-components/pull/#5918) [@leshalv](https://github.com/leshalv)
- fix(table): fix configuration issues with nested columns. [c2c9d9d](https://github.com/ant-design/pro-components/commit/c2c9d9d)
- fix(table): fix ColumnSetting style error. [ec39ccc](https://github.com/ant-design/pro-components/commit/ec39ccc)
- fix(card): Card.Tabs.Pane Render null (#5926). [#5926](https://github.com/ant-design/pro-components/pull/#5926) [@ONLY-yours](https://github.com/ONLY-yours)

## @ant-design/pro-components\@2.3.7

`2022-09-09`

- fix(components): fix compareVersions error. [9751208](https://github.com/ant-design/pro-components/commit/9751208)

## @ant-design/pro-components\@2.3.6

`2022-09-08`

- fix(components): fix open props warning. [77703c8](https://github.com/ant-design/pro-components/commit/77703c8)
- fix(components): fix css var error. [bd5d3bf](https://github.com/ant-design/pro-components/commit/bd5d3bf)
- fix(components): unuse theme import. [bcac384](https://github.com/ant-design/pro-components/commit/bcac384)

## @ant-design/pro-components\@2.3.5

`2022-09-05`

- fix(components): export more types from components (#5840). [#5840](https://github.com/ant-design/pro-components/pull/#5840) [@Jungzl](https://github.com/Jungzl)

## @ant-design/pro-components\@2.3.4

`2022-09-02`

## @ant-design/pro-components\@2.3.3

`2022-09-02`

- fix(components): add antd version dependencies. [aa5fd10](https://github.com/ant-design/pro-components/commit/aa5fd10)
- feat(components): add @ant-design/pro-component (#5258). [#5258](https://github.com/ant-design/pro-components/pull/#5258) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-components\@2.3.2

`2022-09-01`

## @ant-design/pro-components\@2.3.1

`2022-08-31`

## @ant-design/pro-components\@2.3.0

`2022-08-30`

## @ant-design/pro-components\@2.2.1

`2022-08-29`

## @ant-design/pro-components\@2.2.0

`2022-08-26`

## @ant-design/pro-components\@2.1.2

`2022-08-25`

## @ant-design/pro-components\@2.1.1

`2022-08-25`

## @ant-design/pro-components\@2.1.0

`2022-08-25`

## @ant-design/pro-components\@2.0.5

`2022-08-24`

- fix(components): add antd version dependencies. [aa5fd10](https://github.com/ant-design/pro-components/commit/aa5fd10)
- feat(components): add @ant-design/pro-component (#5258). [#5258](https://github.com/ant-design/pro-components/pull/#5258) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-components\@2.0.0

`2022-09-07`

- fix(components): fix css var error. [bd5d3bf](https://github.com/ant-design/pro-components/commit/bd5d3bf)
- fix(components): unuse theme import. [bcac384](https://github.com/ant-design/pro-components/commit/bcac384)
- fix(components): export more types from components (#5840). [#5840](https://github.com/ant-design/pro-components/pull/#5840) [@Jungzl](https://github.com/Jungzl)
- fix(components): add antd version dependencies. [aa5fd10](https://github.com/ant-design/pro-components/commit/aa5fd10)
- feat(components): add @ant-design/pro-component (#5258). [#5258](https://github.com/ant-design/pro-components/pull/#5258) [@chenshuai2144](https://github.com/chenshuai2144)
