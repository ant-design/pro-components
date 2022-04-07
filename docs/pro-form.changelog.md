---
title: ProForm - 更新日志
nav:
  title: 更新日志
  path: /changelog
group:
  path: /
---

# Change Log

## @ant-design/pro-form@1.62.0

`2022-04-07`

- feat(form): Render Extra Content inside Pro Form List (#4991). [#4991](https://github.com/ant-design/pro-components/pull/#4991) [@Tushar1998](https://github.com/Tushar1998)
- fix(form): fix alwaysShowItemLabel no work error. [8bccdf7](https://github.com/ant-design/pro-components/commit/8bccdf7)

## @ant-design/pro-form@1.61.1

`2022-04-06`

- fix(form): ProSelect not cleared keywords when closing option (#4986). [#4986](https://github.com/ant-design/pro-components/pull/#4986) [@DerrickTel](https://github.com/DerrickTel)
- fix(form): new row uses previous data (#4987). [#4987](https://github.com/ant-design/pro-components/pull/#4987) [@1247748612](https://github.com/1247748612)
- fix(form): cacheForSwr not work (#4976). [#4976](https://github.com/ant-design/pro-components/pull/#4976) [@1247748612](https://github.com/1247748612)
- 🐛 fix(form): fix 表单在 colSize!==1 下展示异常 (#4977). [#4977](https://github.com/ant-design/pro-components/pull/#4977) [@jaw52](https://github.com/jaw52)
- fix(form): Invalid use of DatePicker format in ProFormList (#4978). [#4978](https://github.com/ant-design/pro-components/pull/#4978) [@1247748612](https://github.com/1247748612)
- fix(form): select autoClearSearchValue config false (#4954). [#4954](https://github.com/ant-design/pro-components/pull/#4954) [@leoner](https://github.com/leoner)

## @ant-design/pro-form@1.61.0

`2022-03-28`

- fix(form): InlineErrorFormItem support set Props. [bef45a5](https://github.com/ant-design/pro-components/commit/bef45a5)
- fix(form): do not re-execute fieldProps when onValuesChange is set (#4922). [#4922](https://github.com/ant-design/pro-components/pull/#4922) [@1247748612](https://github.com/1247748612)
- feat(form): support setCurrentRowData and getCurrentRowData (#4926). [#4926](https://github.com/ant-design/pro-components/pull/#4926) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): ConfigProvider setting componentSize dosen't work when using BaseForm (#4927). [#4927](https://github.com/ant-design/pro-components/pull/#4927) [@1247748612](https://github.com/1247748612)
- fix(form): `LoginForm` login button i18n invalid (#4929). [#4929](https://github.com/ant-design/pro-components/pull/#4929) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.60.0

`2022-03-25`

- feat(form): support grid layout (#4859). [#4859](https://github.com/ant-design/pro-components/pull/#4859) [@1247748612](https://github.com/1247748612)
- feat(form): Select add style and className prop (#4915). [#4915](https://github.com/ant-design/pro-components/pull/#4915) [@zqran](https://github.com/zqran)
- fix(form): field will be ignored when value=0 (#4901). [#4901](https://github.com/ant-design/pro-components/pull/#4901) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.59.2

`2022-03-18`

- fix(form): fix modal and drawer form rerender error. [4b728f2](https://github.com/ant-design/pro-components/commit/4b728f2)

## @ant-design/pro-form@1.59.0

`2022-03-16`

- fix(form): min color compontents. [73252e6](https://github.com/ant-design/pro-components/commit/73252e6)
- feat(form): StepsForm support vertical direction (#4848). [#4848](https://github.com/ant-design/pro-components/pull/#4848) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.58.1

`2022-03-15`

- fix(form): fix ProFormDependency no rendeer transform error. [5b163eb](https://github.com/ant-design/pro-components/commit/5b163eb)

## @ant-design/pro-form@1.58.0

`2022-03-14`

- fix(form) improve action guard for FormList (#4822). [#4822](https://github.com/ant-design/pro-components/pull/#4822) [@1247748612](https://github.com/1247748612)
- fix(form): ModalForm and DrawerForm remove default value of forceRender (#4842). [#4842](https://github.com/ant-design/pro-components/pull/#4842) [@1247748612](https://github.com/1247748612)
- fix(form): avoid executing setState after unmount (#4814). [#4814](https://github.com/ant-design/pro-components/pull/#4814) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.57.0

`2022-03-08`

- feat(form): improve SchemaForm achieve (#4786). [#4786](https://github.com/ant-design/pro-components/pull/#4786) [@1247748612](https://github.com/1247748612)
- fix(form): switching current on `onFinish` has no effect (#4790). [#4790](https://github.com/ant-design/pro-components/pull/#4790) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.56.1

`2022-03-07`

- fix(form): FormList add no set key warning. [b677fef](https://github.com/ant-design/pro-components/commit/b677fef)
- fix(form): FormList min width=100%. [688b46f](https://github.com/ant-design/pro-components/commit/688b46f)

## @ant-design/pro-form@1.56.0

`2022-03-07`

- fix(form): range props not working because of SliderSingleProps (#4682). [#4682](https://github.com/ant-design/pro-components/pull/#4682) [@xXAvoraXx](https://github.com/xXAvoraXx)
- fix(form): 修复类型错误，使用 itemRender，children 应该是非必须 (#4784). [#4784](https://github.com/ant-design/pro-components/pull/#4784) [@rawbin-](https://github.com/rawbin-)
- fix(form): improve ModalForm and DrawerForm performance (#4773). [#4773](https://github.com/ant-design/pro-components/pull/#4773) [@1247748612](https://github.com/1247748612)
- feat(form): add `name` prop to `itemRender` (#4779). [#4779](https://github.com/ant-design/pro-components/pull/#4779) [@zqran](https://github.com/zqran)

## @ant-design/pro-form@1.55.2

`2022-03-04`

- fix(form): ModalForm and Drawer alway forceRender. [2f41fe6](https://github.com/ant-design/pro-components/commit/2f41fe6)
- fix(form): 🐛 hide upload button when fileList.length >= max (#4752). [#4752](https://github.com/ant-design/pro-components/pull/#4752) [@1247748612](https://github.com/1247748612)
- fix(form): submitter default config overwrite by proFormProps.submitter (#4751). [#4751](https://github.com/ant-design/pro-components/pull/#4751) [@loulin](https://github.com/loulin)
- fix(form): 🐛 Select search result label containing `#` do not display (#4754). [#4754](https://github.com/ant-design/pro-components/pull/#4754) [@1247748612](https://github.com/1247748612)
- fix(form): ignoreRules dosen't work (#4687). [#4687](https://github.com/ant-design/pro-components/pull/#4687) [@1247748612](https://github.com/1247748612)
- fix(form): 修复 queryFilter 响应式会受 span 的属性顺序问题 (#4722). [#4722](https://github.com/ant-design/pro-components/pull/#4722) [@fengluoX](https://github.com/fengluoX)

## @ant-design/pro-form@1.55.0

`2022-02-24`

- fix(form): initialValue no cover. [0669ddd](https://github.com/ant-design/pro-components/commit/0669ddd)
- feat(form): ProFormList 支持设置 min 和 max 控制条目数量 (#4684). [#4684](https://github.com/ant-design/pro-components/pull/#4684) [@kiner-tang](https://github.com/kiner-tang)

## @ant-design/pro-form@1.54.0

`2022-02-21`

- fix(form): 修复 modalForm 和 drawerForm 内容区表单按钮一闪而逝的问题 (#4680). [#4680](https://github.com/ant-design/pro-components/pull/#4680) [@kiner-tang](https://github.com/kiner-tang)
- feat(form): improve dependency component archive (#4678). [#4678](https://github.com/ant-design/pro-components/pull/#4678) [@1247748612](https://github.com/1247748612)
- fix(form): fix FormItemProp no rerender error. [2365df4](https://github.com/ant-design/pro-components/commit/2365df4)
- feat(form): 更新货币符号 (#4667). [#4667](https://github.com/ant-design/pro-components/pull/#4667) [@kiner-tang](https://github.com/kiner-tang)

## @ant-design/pro-form@1.53.7

`2022-02-18`

- fix(form): fix ignoreRules no work error. [5586970](https://github.com/ant-design/pro-components/commit/5586970)

## @ant-design/pro-form@1.53.6

`2022-02-15`

- fix(form): fix renderFormIten render null will show dom error. [8710ee3](https://github.com/ant-design/pro-components/commit/8710ee3)
- fix(form): fix form datetime no format error. [e420f7b](https://github.com/ant-design/pro-components/commit/e420f7b)
- fix(form): fix ProFormDateTimePicker ts error. [0ca384d](https://github.com/ant-design/pro-components/commit/0ca384d)
- fix(form): omit money props for fieldProps. [c5016fc](https://github.com/ant-design/pro-components/commit/c5016fc)

## @ant-design/pro-form@1.53.5

`2022-02-14`

- fix(form): fix xxx moudle is null errror. [e134df7](https://github.com/ant-design/pro-components/commit/e134df7)

## @ant-design/pro-form@1.53.4

`2022-02-14`

- fix(form): improve type reminder (#4618). [#4618](https://github.com/ant-design/pro-components/pull/#4618) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.53.3

`2022-02-11`

- fix(form): 解决行为守卫 insertIndex 为 undefined 的问题 (#4606). [#4606](https://github.com/ant-design/pro-components/pull/#4606) [@kiner-tang](https://github.com/kiner-tang)
- fix(form): fix getValuePropsFunc no work by newValue. [52ef52f](https://github.com/ant-design/pro-components/commit/52ef52f)
- fix(form): fix FieldMoney fieldProps no work error. [3f165fe](https://github.com/ant-design/pro-components/commit/3f165fe)

## @ant-design/pro-form@1.53.2

`2022-02-10`

- fix(form): modal and drawer new render function (#4597). [#4597](https://github.com/ant-design/pro-components/pull/#4597) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.53.1

`2022-02-10`

- fix(form): fix form list action error. [77dfdd1](https://github.com/ant-design/pro-components/commit/77dfdd1)

## @ant-design/pro-form@1.53.0

`2022-02-08`

- fix(form): fix cannot be given refs error (#4564). [#4564](https://github.com/ant-design/pro-components/pull/#4564) [@chenshuai2144](https://github.com/chenshuai2144)
- feat(form): form support convertValue. [b555dc5](https://github.com/ant-design/pro-components/commit/b555dc5)
- feat(form): 表单列表支持设置行为守卫 (#4518). [#4518](https://github.com/ant-design/pro-components/pull/#4518) [@kiner-tang](https://github.com/kiner-tang)

## @ant-design/pro-form@1.52.14

`2022-01-25`

- fix(form): proformlist style bug (#4524). [#4524](https://github.com/ant-design/pro-components/pull/#4524) [@cwjTerrace](https://github.com/cwjTerrace)
- feat(form): enhancement type (#4523). [#4523](https://github.com/ant-design/pro-components/pull/#4523) [@1247748612](https://github.com/1247748612)
- fix(form): make sure it is valid to get the form instance through formRef (#4517). [#4517](https://github.com/ant-design/pro-components/pull/#4517) [@1247748612](https://github.com/1247748612)
- fix(form): BetaSchemaForm setFieldsValue 失效 (#4516). [#4516](https://github.com/ant-design/pro-components/pull/#4516) [@rojer95](https://github.com/rojer95)

## @ant-design/pro-form@1.52.13

`2022-01-21`

- fix(form): dependency transform from Array to Object (#4500). [#4500](https://github.com/ant-design/pro-components/pull/#4500) [@MvCraK](https://github.com/MvCraK)
- fix(form): ProFormList should show label when form layout is horizontal (#4513). [#4513](https://github.com/ant-design/pro-components/pull/#4513) [@cwjTerrace](https://github.com/cwjTerrace)
- fix(form): add note for pro form list. [b477100](https://github.com/ant-design/pro-components/commit/b477100)
- fix(form): ProFormSelect support debounceTime. [1f26167](https://github.com/ant-design/pro-components/commit/1f26167)
- fix(form): 🐛 readonly form will not render the latest value (#4494). [#4494](https://github.com/ant-design/pro-components/pull/#4494) [@1247748612](https://github.com/1247748612)
- fix(form): SchemaForm dependency add warning message (#4478). [#4478](https://github.com/ant-design/pro-components/pull/#4478) [@rojer95](https://github.com/rojer95)
- fix(form): select fieldNames options (#4484). [#4484](https://github.com/ant-design/pro-components/pull/#4484) [@1247748612](https://github.com/1247748612)
- fix(form): 🐛 type error (#4485). [#4485](https://github.com/ant-design/pro-components/pull/#4485) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.52.12

`2022-01-18`

- fix(form): ProFormDependency support shouldUpdate. [4d3a531](https://github.com/ant-design/pro-components/commit/4d3a531)
- fix(form): fix form list error. [c646dcf](https://github.com/ant-design/pro-components/commit/c646dcf)

## @ant-design/pro-form@1.52.11

`2022-01-17`

- fix(form): ProFormList use uuid (#4479). [#4479](https://github.com/ant-design/pro-components/pull/#4479) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): default close swr cache (#4470). [#4470](https://github.com/ant-design/pro-components/pull/#4470) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): drawer auto focus first input (#4473). [#4473](https://github.com/ant-design/pro-components/pull/#4473) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.52.10

`2022-01-12`

- fix(form): fix ref no render error. [db98d79](https://github.com/ant-design/pro-components/commit/db98d79)

## @ant-design/pro-form@1.52.8

`2022-01-11`

- fix(form): fix money value=0, style error. [832da15](https://github.com/ant-design/pro-components/commit/832da15)
- fix(form): fix money value=0, style error. [4d049e6](https://github.com/ant-design/pro-components/commit/4d049e6)
- fix(form): fix datePick typing error (#4431). [#4431](https://github.com/ant-design/pro-components/pull/#4431) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): 🐛 DrawerForm cannot get form instance by formRef (#4421). [#4421](https://github.com/ant-design/pro-components/pull/#4421) [@1247748612](https://github.com/1247748612)
- fix(form): FormList same name will be cache problem (#4426). [#4426](https://github.com/ant-design/pro-components/pull/#4426) [@rojer95](https://github.com/rojer95)

## @ant-design/pro-form@1.52.7

`2022-01-07`

- fix(form): 🐛 Cannot read properties of undefined (reading 'autoFocus' (#4419). [#4419](https://github.com/ant-design/pro-components/pull/#4419) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.52.6

`2022-01-05`

- fix(form): 表单 submitter 增加自动换行属性 (#4406). [#4406](https://github.com/ant-design/pro-components/pull/#4406) [@kibuniverse](https://github.com/kibuniverse)
- fix(form): support using prefixCls from ConfigProvider in InlineErrorFormItem (#4403). [#4403](https://github.com/ant-design/pro-components/pull/#4403) [@yzwxk](https://github.com/yzwxk)
- fix(form): 🐛 repeat send request (#4400). [#4400](https://github.com/ant-design/pro-components/pull/#4400) [@1247748612](https://github.com/1247748612)
- fix(form): render option failed while key is number 0. (#4389). [#4389](https://github.com/ant-design/pro-components/pull/#4389) [@AdoKevin](https://github.com/AdoKevin)
- fix(form): DateRangePicker in LightFilter format is always set to YYYY-MM-DD (#4374). [#4374](https://github.com/ant-design/pro-components/pull/#4374) [@rojer95](https://github.com/rojer95)
- fix(form): fix stepForm props error. [1eec8a2](https://github.com/ant-design/pro-components/commit/1eec8a2)

## @ant-design/pro-form@1.52.5

`2021-12-28`

- fix(form): fix ts error. [fbe853d](https://github.com/ant-design/pro-components/commit/fbe853d)
- fix(form): fix ts error. [dc2fa95](https://github.com/ant-design/pro-components/commit/dc2fa95)
- fix(form): fix react warning. [883eb37](https://github.com/ant-design/pro-components/commit/883eb37)

## @ant-design/pro-form@1.51.1

`2021-12-20`

- fix(form): fix drawer no trigger open error (#4320). [#4320](https://github.com/ant-design/pro-components/pull/#4320) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.51.0

`2021-12-20`

- fix(form): fix the problem that the animation of the floating layer form is lost (#4308). [#4308](https://github.com/ant-design/pro-components/pull/#4308) [@chenshuai2144](https://github.com/chenshuai2144)
- feat(form): Support ProFormTreeSelect and valueType=treeSelect (#4237). [#4237](https://github.com/ant-design/pro-components/pull/#4237) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.50.1

`2021-12-17`

- fix(form): syncToUrl params error (#4296). [#4296](https://github.com/ant-design/pro-components/pull/#4296) [@zzcan](https://github.com/zzcan)

## @ant-design/pro-form@1.50.0

`2021-12-13`

- fix(form): relay no render DrawerForm and ModalForm (#4254). [#4254](https://github.com/ant-design/pro-components/pull/#4254) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.49.9

`2021-12-09`

- fix(form): fix InputNumberPopover null error (#4238). [#4238](https://github.com/ant-design/pro-components/pull/#4238) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): cascader mode=text error (#4213). [#4213](https://github.com/ant-design/pro-components/pull/#4213) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.49.8

`2021-12-08`

- fix(form): 🐛 SchemaForm and StepsForm formRef error (#4220). [#4220](https://github.com/ant-design/pro-components/pull/#4220) [@1247748612](https://github.com/1247748612)

## @ant-design/pro-form@1.49.7

`2021-12-07`

- performance(form): less render function (#4199). [#4199](https://github.com/ant-design/pro-components/pull/#4199) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.49.6

`2021-12-01`

- fix(form): fix RangePicker format is string,will error (#4169). [#4169](https://github.com/ant-design/pro-components/pull/#4169) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.49.5

`2021-12-01`

- fix(form): change numberPopoverRender render dom (#4161). [#4161](https://github.com/ant-design/pro-components/pull/#4161) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.49.4

`2021-11-30`

- fix(form): fix the problem that addonBefore Required does not work when formitem is set (#4141). [#4141](https://github.com/ant-design/pro-components/pull/#4141) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 chore(form): syncToUrl params judgment wrong order (#4124). [#4124](https://github.com/ant-design/pro-components/pull/#4124) [@DerrickTel](https://github.com/DerrickTel)
- 🐛 fix(form): syncToUrl params judgment error (#4117). [#4117](https://github.com/ant-design/pro-components/pull/#4117) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.49.2

`2021-11-23`

- fix(form): default close render params to url. [cd4f0ab](https://github.com/ant-design/pro-components/commit/cd4f0ab)

## @ant-design/pro-form@1.49.0

`2021-11-18`

- feat(form): ProFormList support showItemLabel (#4055). [#4055](https://github.com/ant-design/pro-components/pull/#4055) [@Liu-Ya](https://github.com/Liu-Ya)
- fix(form): fix layout="vertical" style error (#4054). [#4054](https://github.com/ant-design/pro-components/pull/#4054) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): support higher accuracy (#4051). [#4051](https://github.com/ant-design/pro-components/pull/#4051) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.48.1

`2021-11-16`

- fix(form): support onVisibleChange form set (#4044). [#4044](https://github.com/ant-design/pro-components/pull/#4044) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.48.0

`2021-11-15`

- feat(form): support antd next (#4038). [#4038](https://github.com/ant-design/pro-components/pull/#4038) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.47.0

`2021-11-12`

- fix(form): change modal/drawer form reset time (#4024). [#4024](https://github.com/ant-design/pro-components/pull/#4024) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): fix form item width overflow problew (#4023). [#4023](https://github.com/ant-design/pro-components/pull/#4023) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): fix onchange rechange error (#4022). [#4022](https://github.com/ant-design/pro-components/pull/#4022) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): fix proform.item no support QueryFilter error (#4011). [#4011](https://github.com/ant-design/pro-components/pull/#4011) [@chenshuai2144](https://github.com/chenshuai2144)
- feat(form): money support numberPopover (#4008). [#4008](https://github.com/ant-design/pro-components/pull/#4008) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): less render sum. [7b025e5](https://github.com/ant-design/pro-components/commit/7b025e5)

## @ant-design/pro-form@1.46.0

`2021-11-02`

- fix(form): 完善 StepsForm 的 useCallback 依赖，修复可能导致的打包丢失依赖问题 (#3938). [#3938](https://github.com/ant-design/pro-components/pull/#3938) [@xiaojun1994](https://github.com/xiaojun1994)
- feat(form): SchemaForm support dependency (#3895). [#3895](https://github.com/ant-design/pro-components/pull/#3895) [@rojer95](https://github.com/rojer95)

## @ant-design/pro-form@1.45.0

`2021-10-27`

- feat(form): support Cascader (#3904). [#3904](https://github.com/ant-design/pro-components/pull/#3904) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.44.0

`2021-10-26`

- feat(form): support autoFocusFirstInput props (#3894). [#3894](https://github.com/ant-design/pro-components/pull/#3894) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): fix modal and darwer no animation error (#3884). [#3884](https://github.com/ant-design/pro-components/pull/#3884) [@chenshuai2144](https://github.com/chenshuai2144)
- ✨ feat(form): footerRender support null (#3866). [#3866](https://github.com/ant-design/pro-components/pull/#3866) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.43.5

`2021-10-19`

- 🐛 fix(form): ProFormSlider support number [#3849](https://github.com/ant-design/pro-components/pull/3849) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.43.4

`2021-10-18`

- 🐛 fix(form): ProSelect filter support filterOption [#3822](https://github.com/ant-design/pro-components/pull/3822) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.43.3

`2021-10-15`

- 🐛 fix(form): fix Abnormal operation of proformdependency in proform [#3839](https://github.com/ant-design/pro-components/pull/3839) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix modal and drawer reset error [#3838](https://github.com/ant-design/pro-components/pull/3838) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): 修复 ProFormList 的 children 类型错误问题并添加 action 注入 [#3835](https://github.com/ant-design/pro-components/pull/3835) [@0x219](https://github.com/0x219)

## @ant-design/pro-form@1.43.0

`2021-10-08`

- 🐛 fix(form): fix form list preserve problem [#3766](https://github.com/ant-design/pro-components/pull/3766) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): ProFormField lightProps no work error [#3765](https://github.com/ant-design/pro-components/pull/3765) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix modal form rewrite getPopupContainer error [#3763](https://github.com/ant-design/pro-components/pull/3763) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): 修复了 formList 组件无法向外抛出 actionRef [#3744](https://github.com/ant-design/pro-components/pull/3744) [@yoke0104x](https://github.com/yoke0104x)
- 🐛 fix(field): timePicker 组件用 moment 解析时间不填入 format 是会直接 Invalid date [#3745](https://github.com/ant-design/pro-components/pull/3745) [@rojer95](https://github.com/rojer95)
- 💥 feat(form): form support use singer function [#3764](https://github.com/ant-design/pro-components/pull/3764) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.42.1

`2021-09-26`

- 🐛 fix(form): no use div ref render dom [#3739](https://github.com/ant-design/pro-components/pull/3739) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.42.0

`2021-09-24`

- 🐛 fix(form): drawer/modal support getContainer=false [#3727](https://github.com/ant-design/pro-components/pull/3727) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix:select unnamed cache [#3716](https://github.com/ant-design/pro-components/pull/3716) [@zitudu](https://github.com/zitudu)
- 🐛 fix(table): optimize style performance [#3706](https://github.com/ant-design/pro-components/pull/3706) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.41.0

`2021-09-17`

- 💥 feat(form): support auto getPopupContainer [#3685](https://github.com/ant-design/pro-components/pull/3685) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.40.1

`2021-09-16`

- 🐛 fix(form): fix the problem of multiple calls [#3676](https://github.com/ant-design/pro-components/pull/3676) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix the problem of repeated prompts [#3671](https://github.com/ant-design/pro-components/pull/3671) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.40.0

`2021-09-10`

- 💥 feat(form): formList support function children [#3635](https://github.com/ant-design/pro-components/pull/3635) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.39.1

`2021-09-09`

- 🐛 fix(form): fix transform no support lableInValue [#3630](https://github.com/ant-design/pro-components/pull/3630) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): auto close KeyPress submit [#3625](https://github.com/ant-design/pro-components/pull/3625) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): 解决有 addonBefore 或 addBefore 的情况下出现双重表单校验提示的问题 [#3611](https://github.com/ant-design/pro-components/pull/3611) [@kiner-tang](https://github.com/kiner-tang)

## @ant-design/pro-form@1.39.0

`2021-09-07`

- 🐛 fix(form): if valueType need request, note need request [#3575](https://github.com/ant-design/pro-components/pull/3575) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): better FormGroup Space style [#3562](https://github.com/ant-design/pro-components/pull/3562) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form,field): 增加 ProFormMoney 组件 [#3588](https://github.com/ant-design/pro-components/pull/3588) [@kiner-tang](https://github.com/kiner-tang)

## @ant-design/pro-form@1.38.0

`2021-08-30`

- 🐛 fix(form): fix onGetCaptcha error will reset timimg [#3544](https://github.com/ant-design/pro-components/pull/3544) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): FormList support actionRef [#3550](https://github.com/ant-design/pro-components/pull/3550) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): LoginForm support logo [#3545](https://github.com/ant-design/pro-components/pull/3545) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.36.0

`2021-08-24`

- 🐛 fix(form): proformtext support prefix and suffix [#3524](https://github.com/ant-design/pro-components/pull/3524) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix ProForm onBlur no work error [#3515](https://github.com/ant-design/pro-components/pull/3515) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(field-percent): fix parser and formatter regexp #3459 [#3505](https://github.com/ant-design/pro-components/pull/3505) [@yangger6](https://github.com/yangger6)
- 🐛 fix(form): fix incorrect formRef in demo code [#3501](https://github.com/ant-design/pro-components/pull/3501) [@Symous](https://github.com/Symous)
- 💥 feat(form): form columns support dependencies [#3523](https://github.com/ant-design/pro-components/pull/3523) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.35.0

`2021-08-19`

- 🐛 fix(form): ProFormItem work like Form.Item [#3471](https://github.com/ant-design/pro-components/pull/3471) [@chenshuai2144](https://github.com/chenshuai2144)
- 调整 Spin 大小使其保持垂直居中，更协调 [#3446](https://github.com/ant-design/pro-components/pull/3446) [@hihuangwei](https://github.com/hihuangwei)
- 🐛 fix(form): ProFormSelect: can not search after triggered clear event [#3455](https://github.com/ant-design/pro-components/pull/3455) [@ohhoney1](https://github.com/ohhoney1)
- 🐛 fix(form): ProFormCaptcha onGetCaptcha setSate no work [#3419](https://github.com/ant-design/pro-components/pull/3419) [@cc7gs](https://github.com/cc7gs)
- 💥 feat(form): FormList itemRender support index [#3466](https://github.com/ant-design/pro-components/pull/3466) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): Second support day [#3437](https://github.com/ant-design/pro-components/pull/3437) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): support ProFormInstance types [#3432](https://github.com/ant-design/pro-components/pull/3432) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): support addonBefore and addonAfter [#3434](https://github.com/ant-design/pro-components/pull/3434) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.33.1

`2021-08-05`

- 🐛 fix(form): ProFormGroup value of label [#3377](https://github.com/ant-design/pro-components/pull/3377) [@DerrickTel](https://github.com/DerrickTel)
- 🐛 fix(form): reset initialValues add warning [#3364](https://github.com/ant-design/pro-components/pull/3364) [@chenshuai2144](https://github.com/chenshuai2144)
- feat(table): table support editable.formProps [#3363](https://github.com/ant-design/pro-components/pull/3363) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.33.0

`2021-08-03`

- fix: error info undefined while label is undefined [#3348](https://github.com/ant-design/pro-components/pull/3348) [@yklydxtt](https://github.com/yklydxtt)
- 💥 feat(form): add login form [#3328](https://github.com/ant-design/pro-components/pull/3328) [@xiefengnian](https://github.com/xiefengnian)
- ✨ feat(form): SchemaForm add proFieldProps [#3347](https://github.com/ant-design/pro-components/pull/3347) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.32.3

`2021-07-30`

- 🐛 fix(form): fix DrawerForm&ModalForm submitter overwirter error [#3332](https://github.com/ant-design/pro-components/pull/3332) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): ProFormSelect can not get values [#3321](https://github.com/ant-design/pro-components/pull/3321) [@dingtianxiu](https://github.com/dingtianxiu)
- 🐛 fix(form): ProFormTextArea onChange [#3305](https://github.com/ant-design/pro-components/pull/3305) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.32.2

`2021-07-26`

- 🐛 fix(QueryFilter): 修复 QueryFilter 组件 optionRender 设为 false 无效问题 [#3283](https://github.com/ant-design/pro-components/pull/3283) [@0x219](https://github.com/0x219)

## @ant-design/pro-form@1.32.1

`2021-07-20`

- 🐛 fix(list): fix form context no render error [#3274](https://github.com/ant-design/pro-components/pull/3274) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.32.0

`2021-07-19`

- fix: proformUploadDragger padding [#3251](https://github.com/ant-design/pro-components/pull/3251) [@rdmclin2](https://github.com/rdmclin2)
- 🐛 fix(form): set BaseForm autoComplete=off [#3246](https://github.com/ant-design/pro-components/pull/3246) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): proform onValuesChange 触发两次 [#3241](https://github.com/ant-design/pro-components/pull/3241) [@dingtianxiu](https://github.com/dingtianxiu)
- chore(form): ProFormCheckbox 的 options 属性改为可选 [#3195](https://github.com/ant-design/pro-components/pull/3195) [@0x219](https://github.com/0x219)
- 💥 feat(form): StepForm support step props [#3239](https://github.com/ant-design/pro-components/pull/3239) [@chenshuai2144](https://github.com/chenshuai2144)
- ✨ feat(form): feat new valueType -> divider [#3215](https://github.com/ant-design/pro-components/pull/3215) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.31.0

`2021-06-28`

- 🐛 fix(table): remove onchange form renderFormItem [#3106](https://github.com/ant-design/pro-components/pull/3106) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix reg inclubes “(” error [#3103](https://github.com/ant-design/pro-components/pull/3103) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix Group vertical style error [#3102](https://github.com/ant-design/pro-components/pull/3102) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix select optionGroup no filter error [#3100](https://github.com/ant-design/pro-components/pull/3100) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): ProFormPropsType error type [#3089](https://github.com/ant-design/pro-components/pull/3089) [@zjjjjjjjjjjd](https://github.com/zjjjjjjjjjjd)
- 💥 feat(form) : support Embed mode [#3091](https://github.com/ant-design/pro-components/pull/3091) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): add layout demo [#3076](https://github.com/ant-design/pro-components/pull/3076) [@rdmclin2](https://github.com/rdmclin2)

## @ant-design/pro-form@1.30.0

`2021-06-23`

- 🐛 fix(form) : close onchange filter [#3072](https://github.com/ant-design/pro-components/pull/3072) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix regular match [#3064](https://github.com/ant-design/pro-components/pull/3064) [@DerrickTel](https://github.com/DerrickTel)
- 💥 feat(form): SchemaForm support steps form [#3058](https://github.com/ant-design/pro-components/pull/3058) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.29.0

`2021-06-15`

- 🐛 fix(form): use merge repacle assign [#3011](https://github.com/ant-design/pro-components/pull/3011) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): ModalForm support footer is null [#3001](https://github.com/ant-design/pro-components/pull/3001) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.28.0

`2021-06-08`

- 🐛 fix(form) : stepform support intl [#2954](https://github.com/ant-design/pro-components/pull/2954) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): add optionItemRender types [#2951](https://github.com/ant-design/pro-components/pull/2951) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix scrollLocker no unlock error [#2940](https://github.com/ant-design/pro-components/pull/2940) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix formitem lable display none [#2928](https://github.com/ant-design/pro-components/pull/2928) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): namePath and transform support omitNil [#2913](https://github.com/ant-design/pro-components/pull/2913) [@hemengke1997](https://github.com/hemengke1997)
- 🐛 fix(form): hideInForm is invalid [#2889](https://github.com/ant-design/pro-components/pull/2889) [@dingtianxiu](https://github.com/dingtianxiu)
- 💥 feat(form): support more tooltip props [#2932](https://github.com/ant-design/pro-components/pull/2932) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): LightFilter support footer (#2794) [#2884](https://github.com/ant-design/pro-components/pull/2884) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.27.1

`2021-05-31`

- 🐛 fix(form): fix abnormal gap [#2883](https://github.com/ant-design/pro-components/pull/2883) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.27.0

`2021-05-28`

- 🐛 fix(form): The label is displayed when the createButton above（#2786） [#2853](https://github.com/ant-design/pro-components/pull/2853) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.26.0

`2021-05-25`

- 🐛 fix(form): fix SchemaForm title function [#2826](https://github.com/ant-design/pro-components/pull/2826) [@hui5](https://github.com/hui5)
- 💥 feat(table): eidt table use Proform [#2832](https://github.com/ant-design/pro-components/pull/2832) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.25.0

`2021-05-24`

- 🐛 fix(form): digit support formatter [#2818](https://github.com/ant-design/pro-components/pull/2818) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix formRef no work error [#2816](https://github.com/ant-design/pro-components/pull/2816) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): form support request and params [#2812](https://github.com/ant-design/pro-components/pull/2812) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.24.1

`2021-05-21`

- 🐛 fix(form): space between button and form (#2767) [#2777](https://github.com/ant-design/pro-components/pull/2777) [@DerrickTel](https://github.com/DerrickTel)
- 💥 feat(form): select option support ellipsis(#2555) [#2765](https://github.com/ant-design/pro-components/pull/2765) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.24.0

`2021-05-18`

- fix(table): A little performance improvement [#2759](https://github.com/ant-design/pro-components/pull/2759) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): nested-list causes Dependency error [#2752](https://github.com/ant-design/pro-components/pull/2752) [@IronKinoko](https://github.com/IronKinoko)
- 🐛 fix(form): should only clear collapsed fields when clear button in the more dropdown clicked [#2749](https://github.com/ant-design/pro-components/pull/2749) [@j3r0lin](https://github.com/j3r0lin)
- 🐛 fix(form): support fieldProps.format [#2735](https://github.com/ant-design/pro-components/pull/2735) [@chenshuai2144](https://github.com/chenshuai2144)
- fix(form): reset will destroyOnClose [#2731](https://github.com/ant-design/pro-components/pull/2731) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form) : fix Rate text no work error [#2730](https://github.com/ant-design/pro-components/pull/2730) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): select option height light support less(#2667) [#2748](https://github.com/ant-design/pro-components/pull/2748) [@DerrickTel](https://github.com/DerrickTel)
- 💥 feat(form): valueType digit supports intlProps [#2740](https://github.com/ant-design/pro-components/pull/2740) [@jiyingzhi](https://github.com/jiyingzhi)

## @ant-design/pro-form@1.23.0

`2021-05-11`

- 🐛 fix(form): UploadButton upload failed value is still modified [#2700](https://github.com/ant-design/pro-components/pull/2700) [@DerrickTel](https://github.com/DerrickTel)
- 🐛 fix(form): UploadButton support fileList (#2231) [#2681](https://github.com/ant-design/pro-components/pull/2681) [@DerrickTel](https://github.com/DerrickTel)
- 🐛 fix(form): fix react warning [#2663](https://github.com/ant-design/pro-components/pull/2663) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): LightFilter 折叠的 ProFormFields 行为异常 [#2657](https://github.com/ant-design/pro-components/pull/2657) [@wen-haoming](https://github.com/wen-haoming)
- 💥 feat(form) : support getFieldsFormatValue [#2675](https://github.com/ant-design/pro-components/pull/2675) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.22.0

`2021-04-29`

- 🐛 fix(form): switch add default props [#2629](https://github.com/ant-design/pro-components/pull/2629) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): ispicturecard judgment logic [#2619](https://github.com/ant-design/pro-components/pull/2619) [@0x30](https://github.com/0x30)
- 🐛 fix(form): FieldImage support fieldProps [#2586](https://github.com/ant-design/pro-components/pull/2586) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): FieldSet support type=group [#2628](https://github.com/ant-design/pro-components/pull/2628) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.21.5

`2021-04-22`

- 🐛 fix(form): support moneySymbol=undefined [#2579](https://github.com/ant-design/pro-components/pull/2579) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): sync url should no alawys set reset [#2568](https://github.com/ant-design/pro-components/pull/2568) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix transformKeySubmitValue will gen null value error [#2571](https://github.com/ant-design/pro-components/pull/2571) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.21.2

`2021-04-19`

- 🐛 fix(form) : support moneySymbol=false [#2532](https://github.com/ant-design/pro-components/pull/2532) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form) : fix searchValue no work error [#2531](https://github.com/ant-design/pro-components/pull/2531) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.21.0

`2021-04-15`

- 🐛 fix(form): drawer and modal add scrollLocker [#2493](https://github.com/ant-design/pro-components/pull/2493) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): transform support format config [#2489](https://github.com/ant-design/pro-components/pull/2489) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(table): fix ProTable always have form error [#2488](https://github.com/ant-design/pro-components/pull/2488) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix ProFormUploadButton listType=picture-card style error [#2483](https://github.com/ant-design/pro-components/pull/2483) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): support SchemaForm [#2040](https://github.com/ant-design/pro-components/pull/2040) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): group support align [#2457](https://github.com/ant-design/pro-components/pull/2457) [@drizzlesconsin](https://github.com/drizzlesconsin)
- 设置 Select 的 optionLabelProp 和 optionFilterProp 的默认值为 label [#2413](https://github.com/ant-design/pro-components/pull/2413) [@jiyingzhi](https://github.com/jiyingzhi)

## @ant-design/pro-form@1.20.0

`2021-04-06`

- 🐛 fix(form): ignore case when highlighting options [#2397](https://github.com/ant-design/pro-components/pull/2397) [@jiyingzhi](https://github.com/jiyingzhi)
- 🐛 fix(form): fix ProForm.Item no work in ProFormList [#2377](https://github.com/ant-design/pro-components/pull/2377) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(utils): 优化 inline-error-form-item 的 popover 展示逻辑 [#2372](https://github.com/ant-design/pro-components/pull/2372) [@xiefengnian](https://github.com/xiefengnian)
- 💥 feat(form): creatorRecord support function [#2383](https://github.com/ant-design/pro-components/pull/2383) [@newketom](https://github.com/newketom)

## @ant-design/pro-form@1.19.1

`2021-03-31`

- 🐛 fix(form): fix form list hidde label error [#2360](https://github.com/ant-design/pro-components/pull/2360) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix moblie style width is over [#2357](https://github.com/ant-design/pro-components/pull/2357) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix StepsForm min-width error [#2351](https://github.com/ant-design/pro-components/pull/2351) [@chenshuai2144](https://github.com/chenshuai2144)
- fix: render empty text when 'text === 0' [#2348](https://github.com/ant-design/pro-components/pull/2348) [@yingzhiji](https://github.com/yingzhiji)

## @ant-design/pro-form@1.19.0

`2021-03-29`

- 🐛 fix(form): fix form item control no work error [#2303](https://github.com/ant-design/pro-components/pull/2303) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(proform): call synctourl props during onreset [#2258](https://github.com/ant-design/pro-components/pull/2258) [@JunlinZhu-Tommy](https://github.com/JunlinZhu-Tommy)
- 💥 feat(table): search form support className [#2254](https://github.com/ant-design/pro-components/pull/2254) [@drizzlesconsin](https://github.com/drizzlesconsin)

## @ant-design/pro-form@1.18.4

`2021-03-18`

- 🐛 fix(form): fix drawer and modal from render error [#2221](https://github.com/ant-design/pro-components/pull/2221) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): if width<16, no rerender form layout [#2220](https://github.com/ant-design/pro-components/pull/2220) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(utils): fix inline-error-form-item problems [#2223](https://github.com/ant-design/pro-components/pull/2223) [@xiefengnian](https://github.com/xiefengnian)
- 💥 feat(utils): upgrade inline-error-form-item [#2168](https://github.com/ant-design/pro-components/pull/2168) [@xiefengnian](https://github.com/xiefengnian)

## @ant-design/pro-form@1.18.2

`2021-03-16`

- 🐛 fix(form): fix list form label no display error [#2190](https://github.com/ant-design/pro-components/pull/2190) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix text is 0, initialValue no work error [#2183](https://github.com/ant-design/pro-components/pull/2183) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix ProFormDateRangePicker type error [#2181](https://github.com/ant-design/pro-components/pull/2181) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix width<16, layout will change error [#2180](https://github.com/ant-design/pro-components/pull/2180) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.18.0

`2021-03-11`

- 🐛 fix(select): 修复 Select 默认的 filterOption 没有忽略大小写 [#2137](https://github.com/ant-design/pro-components/pull/2137) [@raohong](https://github.com/raohong)
- 🐛 fix(form): fix copy trigger rerender error [#2136](https://github.com/ant-design/pro-components/pull/2136) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.17.0

`2021-03-08`

- 🐛 fix(form): fix list key no had error [#2122](https://github.com/ant-design/pro-components/pull/2122) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix form dateFormatter no export error [#2123](https://github.com/ant-design/pro-components/pull/2123) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): if button=1,no render space [#2091](https://github.com/ant-design/pro-components/pull/2091) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix form list copy no work error [#2081](https://github.com/ant-design/pro-components/pull/2081) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): remove no work error [#2078](https://github.com/ant-design/pro-components/pull/2078) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix QueryFilter span and colSize error [#2072](https://github.com/ant-design/pro-components/pull/2072) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix ProFormDateTimeRangePicker filedProps error [#2074](https://github.com/ant-design/pro-components/pull/2074) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix ProFormDigit width no work error [#2069](https://github.com/ant-design/pro-components/pull/2069) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): FormList support rules [#2070](https://github.com/ant-design/pro-components/pull/2070) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): select optipn support optGroup [#2067](https://github.com/ant-design/pro-components/pull/2067) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.16.3

`2021-02-28`

- 🐛 fix(form): 🇧🇷 Adding stepForm and editableTable translations to pt-BR [#2018](https://github.com/ant-design/pro-components/pull/2018) [@renanwilliam](https://github.com/renanwilliam)
- 🐛 fix(form): fix multiple data no work error [#2028](https://github.com/ant-design/pro-components/pull/2028) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.16.2

`2021-02-25`

- 🐛 fix(form): fix ligthfilter label error [#1998](https://github.com/ant-design/pro-components/pull/1998) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): form list support formlist [#1995](https://github.com/ant-design/pro-components/pull/1995) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix placeholder no work error [#1991](https://github.com/ant-design/pro-components/pull/1991) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.16.1

`2021-02-23`

- 🐛 fix(form): fix error onchange params [#1955](https://github.com/ant-design/pro-components/pull/1955) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix breakpoint xl width error [#1946](https://github.com/ant-design/pro-components/pull/1946) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): modelForm and DrawerForm stopPropagation [#1939](https://github.com/ant-design/pro-components/pull/1939) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.16.0

`2021-02-22`

- 🐛 fix(form): fix error message no work error [#1875](https://github.com/ant-design/pro-components/pull/1875) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix searchText and resetText no work error [#1872](https://github.com/ant-design/pro-components/pull/1872) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): support form list [#1908](https://github.com/ant-design/pro-components/pull/1908) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.15.4

`2021-02-04`

- 🐛 fix(form): fix form control error [#1833](https://github.com/ant-design/pro-components/pull/1833) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): modal and drawer form close not reset [#1827](https://github.com/ant-design/pro-components/pull/1827) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.15.2

`2021-01-25`

- fix: ignore Blob type [#1722](https://github.com/ant-design/pro-components/pull/1722) [@eynol](https://github.com/eynol)

## @ant-design/pro-form@1.15.0

`2021-01-21`

- 🐛 fix(form): fix StepsForm onFinish error [#1714](https://github.com/ant-design/pro-components/pull/1714) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix from reset error [#1709](https://github.com/ant-design/pro-components/pull/1709) [@chenshuai2144](https://github.com/chenshuai2144)
- fix: allow `labelInValue` value in form values [#1705](https://github.com/ant-design/pro-components/pull/1705) [@eynol](https://github.com/eynol)

## @ant-design/pro-form@1.14.0

`2021-01-18`

- 🐛 fix(form): form supports generic types [#1662](https://github.com/ant-design/pro-components/pull/1662) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): visible=true when simulate onVisibleChange [#1658](https://github.com/ant-design/pro-components/pull/1658) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): query form support open rules [#1653](https://github.com/ant-design/pro-components/pull/1653) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): onFinish close loading when throw error [#1639](https://github.com/ant-design/pro-components/pull/1639) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): form support omitNil [#1666](https://github.com/ant-design/pro-components/pull/1666) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): QueryForm support preserve [#1665](https://github.com/ant-design/pro-components/pull/1665) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): support sync url [#1650](https://github.com/ant-design/pro-components/pull/1650) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.13.10

`2021-01-13`

- 🐛 fix(form): fix the problem of duplicate form fields [#1607](https://github.com/ant-design/pro-components/pull/1607) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): default render form [#1611](https://github.com/ant-design/pro-components/pull/1611) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.13.8

`2021-01-11`

- fix(form): fix namePath is array error [#1579](https://github.com/ant-design/pro-components/pull/1579) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): lightSelect searchInput allowClear [#1568](https://github.com/ant-design/pro-components/pull/1568) [@oldturkey](https://github.com/oldturkey)

## @ant-design/pro-form@1.13.6

`2021-01-08`

- 🐛 fix(form): fix defaultColsNumber no work error [#1551](https://github.com/ant-design/pro-components/pull/1551) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix ProFormRadio.Group vertical style error [#1542](https://github.com/ant-design/pro-components/pull/1542) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix transform no work when namePath is array [#1537](https://github.com/ant-design/pro-components/pull/1537) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix ModalForm and DrawerFrom props error [#1534](https://github.com/ant-design/pro-components/pull/1534) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.13.0

`2021-01-03`

- 🐛 fix(form): fix form submitButtonProps no work error [#1476](https://github.com/ant-design/pro-components/pull/1476) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix the problem of attribute priority [#1472](https://github.com/ant-design/pro-components/pull/1472) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): add footer warning [#1469](https://github.com/ant-design/pro-components/pull/1469) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.12.0

`2021-01-01`

- 🐛 fix(table): fix table form submit time error [#1466](https://github.com/ant-design/pro-components/pull/1466) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.11.7

`2020-12-31`

- 🐛 fix(form): fix ProFormCaptcha name error [#1459](https://github.com/ant-design/pro-components/pull/1459) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.11.6

`2020-12-31`

- 🐛 fix(form): add defaultXXX warning [#1457](https://github.com/ant-design/pro-components/pull/1457) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.11.3

`2020-12-28`

- 🐛 fix(form): fix ProFormSet no work error [#1420](https://github.com/ant-design/pro-components/pull/1420) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix QueryFilter span style error [#1419](https://github.com/ant-design/pro-components/pull/1419) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.11.0

`2020-12-24`

- 🐛 fix(form): run validateFields before onGetCaptcha [#1396](https://github.com/ant-design/pro-components/pull/1396) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(form): 懒加载 DrawerForm 和 ModalFrom 优化性能 [#1370](https://github.com/ant-design/pro-components/pull/1370) [@Deturium](https://github.com/Deturium)
- 💥 feat(chore): adjust information structure [#1383](https://github.com/ant-design/pro-components/pull/1383) [@rdmclin2](https://github.com/rdmclin2)

## @ant-design/pro-form@1.10.4

`2020-12-21`

- 🐛 fix(compiler): form 修复问题和清空操作冲突，改成 hasOwnProperty 判断 [#1363](https://github.com/ant-design/pro-components/pull/1363) [@oldturkey](https://github.com/oldturkey)

## @ant-design/pro-form@1.10.3

`2020-12-21`

- 🐛 fix(form): use same width enum like antd [#1351](https://github.com/ant-design/pro-components/pull/1351) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.10.2

`2020-12-17`

- 🐛 fix(form): 修复 lightFilter 在 collapse 的情况下 form 失效的 bug [#1323](https://github.com/ant-design/pro-components/pull/1323) [@oldturkey](https://github.com/oldturkey)

## @ant-design/pro-form@1.10.0

`2020-12-14`

- 🐛 fix(dependencies):add dependencies to pro-utils & pro-descriptions & pro-layout & pro-form [#1280](https://github.com/ant-design/pro-components/pull/1280) [@yanm1ng](https://github.com/yanm1ng)

## @ant-design/pro-form@1.9.0

`2020-12-10`

- 💥 feat(form): support getPopupContainer [#1251](https://github.com/ant-design/pro-components/pull/1251) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.8.1

`2020-12-09`

- 💥 feat(table): add "colSize" in fieldProps within proTable's columns to customize query form item width [#1229](https://github.com/ant-design/pro-components/pull/1229) [@LyndonXiao](https://github.com/LyndonXiao)

## @ant-design/pro-form@1.7.6

`2020-12-07`

- 🐛 fix(table): fix formItemProps no work error [#1222](https://github.com/ant-design/pro-components/pull/1222) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.7.3

`2020-12-03`

- 🐛 fix(form): fix modalForm cancel button is invalid error [#1174](https://github.com/ant-design/pro-components/pull/1174) [@chenshuai2144](https://github.com/chenshuai2144)
- 💥 feat(table): onReset support search. transform [#1176](https://github.com/ant-design/pro-components/pull/1176) [@DerrickTel](https://github.com/DerrickTel)

## @ant-design/pro-form@1.7.2

`2020-12-02`

- 🐛 fix(table): fix protable form types error [#1158](https://github.com/ant-design/pro-components/pull/1158) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix optionRender no has form error [#1147](https://github.com/ant-design/pro-components/pull/1147) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.7.1

`2020-11-30`

- 🐛 fix(form): fix setState() call inside `Field` error [#1137](https://github.com/ant-design/pro-components/pull/1137) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): No longer generate redundant dom [#1121](https://github.com/ant-design/pro-components/pull/1121) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.7.0

`2020-11-27`

- 🐛 fix(form):fix switch readonly shows error [#1082](https://github.com/ant-design/pro-components/pull/1082) [@BooYeu](https://github.com/BooYeu)
- fix: drawerForm&modalForm trigger 区域调整 [#1063](https://github.com/ant-design/pro-components/pull/1063) [@binvb](https://github.com/binvb)
- 🐛 fix(form): do not trigger submit twice [#1048](https://github.com/ant-design/pro-components/pull/1048) [@chenshuai2144](https://github.com/chenshuai2144)
- ⚡️ feat(form): optimize query filter performance [#1074](https://github.com/ant-design/pro-components/pull/1074) [@chenshuai2144](https://github.com/chenshuai2144)
- feat: add table demos and fix form layout styles [#1069](https://github.com/ant-design/pro-components/pull/1069) [@rdmclin2](https://github.com/rdmclin2)

## @ant-design/pro-form@1.6.2

`2020-11-19`

- 🐛 fix(form): fix formItemProps no work error [#1037](https://github.com/ant-design/pro-components/pull/1037) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.6.1

`2020-11-19`

- 🐛 fix(form): modal and drawer render to body [#1031](https://github.com/ant-design/pro-components/pull/1031) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(table): No more transparent formitem [#1028](https://github.com/ant-design/pro-components/pull/1028) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix stepForm formRef no work error [#1023](https://github.com/ant-design/pro-components/pull/1023) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.6.0

`2020-11-18`

- feat(form): onFinish support reset form [cf840641](https://github.com/ant-design/pro-components/commit/cf8406411b2445399290b476b3d8dff959507db3)

## @ant-design/pro-form@1.5.0

`2020-11-17`

- 💄 UI(form): add a empty label [#980](https://github.com/ant-design/pro-components/pull/980) [@chenshuai2144](https://github.com/chenshuai2144)
- 🐛 fix(form): fix form captcha loading error [#945](https://github.com/ant-design/pro-components/pull/945) [@3lang3](https://github.com/3lang3)
- 🐛 fix(form): raise style priority [#960](https://github.com/ant-design/pro-components/pull/960) [@chenshuai2144](https://github.com/chenshuai2144)
- feat: LightFilter support allowClear [#974](https://github.com/ant-design/pro-components/pull/974) [@yutingzhao1991](https://github.com/yutingzhao1991)
- 💥 feat(form): support readonly [#963](https://github.com/ant-design/pro-components/pull/963) [@chenshuai2144](https://github.com/chenshuai2144)

## @ant-design/pro-form@1.3.0

`2020-11-04`

- 🐛 fix(form): fix transformKeySubmitValue namepath error ([@chenshuai2144](https://github.com/chenshuai2144))[#903](https://github.com/ant-design/pro-components/pull/903)
- 🐛 fix(form): default width is undefined ([@chenshuai2144](https://github.com/chenshuai2144))[#902](https://github.com/ant-design/pro-components/pull/902)
- 💥 feat(form): submit button text localization ([@DavidNorena](https://github.com/DavidNorena))[#896](https://github.com/ant-design/pro-components/pull/896)
- 💥 feat(form): step form onfisih support return boolean ([@chenshuai2144](https://github.com/chenshuai2144))[#894](https://github.com/ant-design/pro-components/pull/894)

## @ant-design/pro-form@1.2.1

`2020-11-02`

- 🐛 fix(form): support onKeyPress for Enter ([@chenshuai2144](https://github.com/chenshuai2144))[#883](https://github.com/ant-design/pro-components/pull/883)

## @ant-design/pro-form@1.2.0

`2020-11-02`

- 🐛 fix(form): Radio and Checkbox should support children ([@chenshuai2144](https://github.com/chenshuai2144))[#857](https://github.com/ant-design/pro-components/pull/857)
- 💥 feat(form): support ProFormCaptcha ([@chenshuai2144](https://github.com/chenshuai2144))[#875](https://github.com/ant-design/pro-components/pull/875)
- 💥 feat(form): localize stepsform submitter buttons texts ([@DavidNorena](https://github.com/DavidNorena))[#868](https://github.com/ant-design/pro-components/pull/868)
- 💥 feat(form): support ProFromFieldSet ([@chenshuai2144](https://github.com/chenshuai2144))[#522](https://github.com/ant-design/pro-components/pull/522)

## @ant-design/pro-form@1.1.0

`2020-10-19`

- 💥 feat: add effective style to LightFilter when collapse ([@yutingzhao1991](https://github.com/yutingzhao1991))[#746](https://github.com/ant-design/pro-components/pull/746)

## @ant-design/pro-form@1.0.3

`2020-10-15`

- 💄 UI(form): fix group style error ([@chenshuai2144](https://github.com/chenshuai2144))[#709](https://github.com/ant-design/pro-components/pull/709)
- 🐛 fix(form): fix name path no work problem ([@chenshuai2144](https://github.com/chenshuai2144))[#712](https://github.com/ant-design/pro-components/pull/712)
- 💄 UI(form): fix group style error ([@chenshuai2144](https://github.com/chenshuai2144))[#709](https://github.com/ant-design/pro-components/pull/709)
- 🐛 fix(form): use antd default tooltip ([@chenshuai2144](https://github.com/chenshuai2144))[#686](https://github.com/ant-design/pro-components/pull/686)
- 💥 feat(form): onFinish auto close modal ([@chenshuai2144](https://github.com/chenshuai2144))[#735](https://github.com/ant-design/pro-components/pull/735)
- 💥 feat(form): ProFormUploadButton support diable ([@chenshuai2144](https://github.com/chenshuai2144))[#689](https://github.com/ant-design/pro-components/pull/689)

## @ant-design/pro-form@1.0.0-beta.31

`2020-10-12`

- 💥 feat(form): add DrawerForm and ModalForm ([@chenshuai2144](https://github.com/chenshuai2144))[#632](https://github.com/ant-design/pro-components/pull/632)

## @ant-design/pro-form@1.0.0-beta.30

`2020-09-29`

- 💥 feat(form): submitter support resetButtonProps and submitButtonProps ([@chenshuai2144](https://github.com/chenshuai2144))[#619](https://github.com/ant-design/pro-components/pull/619)
