---
group: Form
title: ProForm 高级表单
atomId: ProForm
order: 1
---

# ProForm 高级表单

ProForm 在原来的 Form 的基础上增加了一些语法糖和更多的布局设置，帮助我们快速地开发一个表单，同时添加了一些默认行为，让我们的表单默认好用。

分步表单、Modal 表单、Drawer 表单、查询表单、轻量筛选等多种 layout 可以覆盖大部分的使用场景，让我们脱离复杂而且繁琐的表单布局工作，用更少的代码完成更多的功能。

- 如果想要设置默认值，请使用 `initialValues`，任何直接使用组件 `value` 和 `onChange` 的方式都有可能导致值绑定失效
- 如果想要表单联动或者做一些依赖，可以使用 render props 模式，ProFormDependency 绝对是最好的选择
- ProForm 的 onFinish 与 antd 的 Form 不同，支持 Promise，如果你正常返回会自动为你设置按钮的加载效果
- 如果想要监听某个值，建议使用 `onValuesChange`。保持单向的数据流无论对开发者还是维护者都大有裨益
- ProForm 没有「魔法」：`ProForm` 只是对 antd `Form` 的薄封装；自定义控件用 `Form.Item` 包裹后与 Pro 表单项混用即可。

## Issue 回归场景

<code src="../../demos/form/overlay-initial-values.tsx" title="弹窗初始化：ModalForm.initialValues"></code>
<code src="../../demos/form/request-reuse.tsx" title="重复参数请求：ProForm.params 与 request"></code>

`dateFormatter` 将日期字段格式化为指定字符串；提交后可查看实际值。

<code src="../../demos/form/_base-test.tsx" title="dateFormatter：自定义日期格式"></code>

```tsx | pure
// 设置整体默认值
<ProForm initialValues={obj} />

// 设置单个控件的
<ProForm
 onValuesChange={(changeValues) => console.log(changeValues)}
>
  <ProFormText initialValue="prop"/>
</ProForm>

// 相互依赖的组件联动
<ProForm>
  <Form.Item noStyle shouldUpdate>
    {(form) => {
      return (
        <ProFormSelect
          options={[
            {
              value: "chapter",
              label: "盖章后生效",
            },
          ]}
          width="md"
          name="useMode"
          label={`与${form.getFieldValue("name")}合同约定生效方式`}
        />
      );
    }}
  </Form.Item>
</ProForm>;


// 使用自定义组件
<ProForm>
  <Form.Item name="switch" label="Switch" valuePropName="checked">
    <Switch />
  </Form.Item>
</ProForm>
```

## 何时使用 ProForm？

当你想快速实现一个表单但不想花太多时间去布局时 ProForm 是最好的选择。

ProForm 是基于 antd Form 的可降级封装，与 antd 功能完全对齐，但是在其之上还增加一些预设行为和多种布局。这些布局之间可以无缝切换，并且拥有公共的 API。

| 布局                                            | 使用场景                                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| [ProForm](/components/form#proform)             | 标准 Form，增加了 `onFinish` 中自动 `loading` 和根据 `request` 自动获取默认值的功能。 |
| [ModalForm\|DrawerForm](/components/modal-form) | 在 ProForm 的基础上增加了 `trigger` ，无需维护 `open` 状态。                          |
| [QueryFilter](/components/query-filter)         | 一般用于作为筛选表单，需要配合其他数据展示组件使用。                                  |
| [LightFilter](/components/query-filter)         | 一般用于作为行内内置的筛选，比如卡片操作栏和表格操作栏。                              |
| [StepsForm](/components/steps-form)             | 分步表单，需要配置 StepForm 使用。                                                    |

<code src="../../demos/form/playground/form-basic.tsx" title="标准表单：ProForm.onFinish"></code>
<code src="../../demos/form/playground/form-modal.tsx" title="弹窗表单：ModalForm.trigger"></code>
<code src="../../demos/form/playground/form-drawer.tsx" title="抽屉表单：DrawerForm.trigger"></code>
<code src="../../demos/form/playground/form-query-filter.tsx" title="查询表单：QueryFilter.onFinish"></code>
<code src="../../demos/form/playground/form-light-filter.tsx" title="轻量筛选：LightFilter.onFinish"></code>
<code src="../../demos/form/playground/form-steps.tsx" title="分步表单：StepsForm.StepForm"></code>
<code src="../../demos/form/playground/form-login.tsx" title="登录表单：LoginForm.onFinish"></code>

## 数据转化

很多时候组件需要的数据和后端需要的数据之间不能完全匹配，ProForm 为了解决这个问题提供了 `transform` 和 `convertValue` 两个 API 来处理这种情况。

### convertValue 前置转化

convertValue 发生在组件获得数据之前，一般是后端直接给前端的数据，有时需要精加工一下。

```tsx | pure
   export type SearchConvertKeyFn =
    (value: any, field: NamePath)=>string | boolean | Record<string, any>;
  /**
   * @name 获取时转化值，一般用于将数据格式化为组件接收的格式
   * @param value 字段的值
   * @param namePath 字段的name
   * @returns 字段新的值
   *
   * @example a,b => [a,b]
   * convertValue:(value,namePath)=>value.split(",")
   * @example string =>json
   * convertValue:(value,namePath)=>JSON.parse(value)
   * @example number =>date
   * convertValue:(value,namePath)=>Moment(value)
   * @example YYYY-MM-DD => date
   * convertValue:(value,namePath)=>Moment(value,"YYYY-MM-DD")
   * @example  string => object
   * convertValue:(value,namePath)=>({value,label:value})
   */
  convertValue?: SearchConvertKeyFn;
```

### transform 提交时转化

transform 发生在提交的时候，一般来说都是吐给后端的存在数据库里的数据。

为了方便大家使用，`ProFormDependency` 和 `formRef` 都支持了 `transform`，可以获取到被转化后的值。

```tsx | pure
<ProFormDependency>
  {(value, form) => {
    // value 被 transform转化之后的值
    // form 当前的formRef，可以获取未转化的值
    return ReactNode;
  }}
</ProFormDependency>
```

formRef 内置了几个方法来获取转化之后的值，这也是相比 antd 的 Form 新增的功能，详细可以看 ProFormInstance 的类型定义。

```tsx | pure
  /** 获取被 ProForm 格式化后的所有数据  */
  getFieldsFormatValue?: (nameList?: true) => T;
  /** 获取格式化之后的单个数据 */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /** 获取格式化之后的单个数据 */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /** 验字段后返回格式化之后的所有数据*/
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
```

```tsx | pure
  export type SearchTransformKeyFn = (
    value: any,
    namePath: string[],
    allValues: any,
  ) => string | Record<string, any>;

  /**
   * @name 提交时转化值，一般用于将值转化为提交的数据
   * @param value 字段的值
   * @param namePath 字段的name
   * @param allValues 所有的字段
   * @returns 字段新的值，如果返回对象，会和所有值深度 merge 一次
   *
   * @example {name:[a,b] => {name:a,b }
   * transform: (value,namePath,allValues)=> value.join(",")
   * @example {name: string => { newName:string }
   * transform: (value,namePath,allValues)=> { newName:value }
   * @example {name:moment} => {name:string
   * transform: (value,namePath,allValues)=> value.format("YYYY-MM-DD")
   * @example {name:moment}=> {name:时间戳}
   * transform: (value,namePath,allValues)=> value.valueOf()
   * @example {name:{value,label}} => { name:string}
   * transform: (value,namePath,allValues)=> value.value
   * @example {name:{value,label}} => { valueName,labelName  }
   * transform: (value)=>{valueName:value.value,labelName:value.name}
   */
  transform?: SearchTransformKeyFn;
```

#### transform 的两种常见返回写法（建议直接照着用）

`transform` 的返回值常见有两种写法：

- **1）返回普通值（最直观，也最稳定）**：会替换当前字段的提交值。

```tsx | pure
<ProFormText name="name" transform={(value) => `${value}:suffix`} />
// 提交时：{ name: 'xxx:suffix' }
```

- **2）返回对象（用于“改名/拆分字段/写回嵌套路径”）**：推荐按字段的 `name` / `namePath` 构造对象，避免“看起来对但提交没变”的情况。

```tsx | pure
import { set } from '@rc-component/util';

// 写回同一路径（推荐：不依赖外层 merge 行为）
<ProFormText
  name={['company', 'name']}
  transform={(value) => set({}, ['company', 'name'], `${value}:suffix`)}
/>
// 提交时：{ company: { name: 'xxx:suffix' } }

// 变更 key（示例：把 name 写成 displayName）
<ProFormText
  name="name"
  transform={(value) => ({ displayName: value })}
/>
// 提交时：{ displayName: 'xxx' }（注意：这会改变最终输出结构）
```

> 提醒：`SearchTransformKeyFn` 的类型签名里第二个参数是 `namePath: string[]`，但在部分场景（例如嵌套、`ProFormList`）里你可能会观察到传入值并不总是你期望的“完整路径数组”。这也是推荐你**直接用组件的 `name` 构造返回对象**的原因。

## 代码示例

<code src="../../demos/form/base.tsx" title="基本使用"></code>

### 标签与表单项布局

`ProForm.layout` 支持 `horizontal`、`vertical` 和 `inline`；切换分段选择器可比较同一组字段的排列。

<code src="../../demos/form/form-layout.tsx" title="layout：横向、纵向和行内"></code>

`labelCol` 与 `wrapperCol` 可按断点设置标签和输入区宽度。

<code src="../../demos/form/label-col.tsx" title="响应式标签宽度"></code>

### 栅格化布局

`grid` 启用栅格，`rowProps.gutter` 设置间距，字段的 `colProps` 按断点控制列宽。缩放页面即可看到字段从两列变为一列；提交后显示表单值。

<code src="../../demos/form/form-layout-grid.tsx" title="grid：响应式表单栅格"></code>

`ProFormDependency name={[["customer", "name"]]}` 监听嵌套字段；修改客户名称时，备注字段的标签同步变化。

<code src="../../demos/form/dependency.tsx" title="嵌套字段联动"></code>

`formRef.current.setFieldsValue` 从表单外部填写字段。

<code src="../../demos/form/form-ref.tsx" title="setFieldsValue"></code>

### 同步表单值到 URL

`syncToUrl` 将表单值写入 URL 查询参数，再次打开时也会从查询参数恢复字段。

<code src="../../demos/form/sync-to-url.tsx" title="syncToUrl 基础同步"></code>

传入函数可控制哪些字段写入 URL。下例将私密备注从查询参数中排除，但提交时仍保留该值。

<code src="../../demos/form/sync-to-url-filter.tsx" title="syncToUrl 自定义字段同步"></code>

`ProFormMoney` 的金额输入属性分别展示；提交后可查看实际表单值。

<code src="../../demos/form/money.tsx" title="customSymbol：自定义符号"></code>

<code src="../../demos/form/money-no-symbol.tsx" title="moneySymbol：隐藏符号"></code>

<code src="../../demos/form/money-locale.tsx" title="locale：地区格式"></code>

<code src="../../demos/form/money-precision.tsx" title="precision：整数精度"></code>

<code src="../../demos/form/money-min.tsx" title="min：最低金额"></code>

<code src="../../demos/form/layout-footer.tsx" iframe="580" title="固定页脚"></code>

`ProForm.Item` 的 `trigger="onValuesChange"` 将可编辑表格的行数据纳入表单提交值。先保存行编辑，再提交表单查看结果。

<code src="../../demos/form/pro-form-editable-table.tsx" title="ProForm 和 EditableTable 同时使用"></code>

## 劫持渲染函数的组件

FormItemRender 用来专门处理，采用 render props 的方式来组织代码，更好的聚合带请求的业务代码，也更好的完成自定义表单项的功能

在中后台项目表单是必不可少的，通常还伴随着一些非标准控件、复杂的表单项，此时需要借助自定义表单项，而完成一个自定义表单项至少需要完成 value 和 onChange 的实现。而如果该组件只被使用一次且需要的上下文参数很多，那么封装起来就是很不讨好，因此就有了该组件。

- 使用 useControlModel 来快速的创建一个自定义表单项，同时支持单实例或多实例（适用于封装自定义表单组件，在多个地方使用的场景）
- 使用 withFormItemRender 来生成一个 FormItemRender，可以以内联的方式去组织代码（适用于只被使用一次或需要的上下文参数很多的场景）
- 使用 FormControlRender 来把一个 form 组件转换成 render props 的形式，在特定情况下是很有用的（例如某些第三方组件的设计缺陷导致 render 里面的组件不能调用 onChange 方法，这个时候包裹一下就可以解决）

> 当然，也不一定非要用 withFormItemRender，Form.Item 是可以嵌套使用，也可以 Form.Item 嵌套外层设置 noStyle 的方式来组织你的代码，这样会多一些 div 的元素包裹，如果对你样式没有影响也可以使用

### 使用 useControlModel

下面三个示例都提交“金额 + 币种”，分别展示实现复合表单项的三种方式。修改值后提交，可对比结果。

原生受控组件显式接收 `value` 并调用 `onChange`。

<code src="../../demos/form/antd.tsx" title="自定义表单项：value / onChange"></code>

`useControlModel` 为复合组件生成两个字段的受控属性。

<code src="../../demos/form/antd-modify.tsx" title="useControlModel：复合字段"></code>

嵌套 `Form.Item noStyle` 将金额和币种分别绑定到 `price` 下的字段。

<code src="../../demos/form/antd-nest.tsx" title="Form.Item noStyle：嵌套字段"></code>

### FormControlRender

使用 FormControlRender 既可以内联的书写代码，又可以更灵活的编写逻辑，适用于一些组件外层包裹了 ProForm.Item 或者 Form.Item。

有的时候需要使用 Form.Item.useStatus，但必须满足 hooks 的使用规范，这使得开发就必须提取成单独的组件来使用，没办法内联使用，而 FormControlRender 很好的解决这种情况

提交空值会触发校验，`FormControlRender` 的 `status` 让内联文本框显示错误边框；`pickControlPropsWithId` 传递表单值、事件和输入框 id。

<code src="../../demos/form/form-control-render.tsx" title="内联控件显示校验状态"></code>

### FormItemRender & ProFormItemRender

`ProFormItemRender` 配合 `pickControlProps` 为自定义输入框提供表单值与事件。

<code src="../../demos/form/form-item-render.tsx" title="ProFormItemRender 自定义输入"></code>

`FormItemRender` 配合 `pickControlPropsWithId`，同时传递输入框的 `id`。

<code src="../../demos/form/form-item-render-with-id.tsx" title="FormItemRender 传递 id"></code>

`useControlModel` 将自定义组件接入单个表单字段。

<code src="../../demos/form/use-control-model.tsx" title="单值控制模型"></code>

`useControlModel` 的多字段配置将复选框和输入框合并为一个表单值。

<code src="../../demos/form/use-control-model-multiple.tsx" title="多值控制模型"></code>

### ProFormDependency 动态选项

`name={['dbName']}` 监听数据库名称，按输入值调整迁移方式选项；提交后可查看选中的值。

<code src="../../demos/form/linkage-customization.tsx" title="依赖字段的动态选项"></code>

在 `ProFormList` 中，`ProFormDependency name={['enabled']}` 只读取当前列表项的开关；两行成员可以独立显示备注。

<code src="../../demos/form/_pro-form-dependency.tsx" title="列表项内的 ProFormDependency"></code>

### Select `labelInValue`

`fieldProps.labelInValue={true}` 让提交值同时包含选项的 `label` 和 `value`，下方会展示实际提交结果。

<code src="../../demos/form/label-in-value.tsx" title="Select 的 labelInValue"></code>

### 自定义 request 加载状态

`request` 加载期间默认渲染居中的 `Spin`，通过 `loadingRender` 替换为 `Skeleton`。点击“重新加载表单”可再次观察加载状态。

<code src="../../demos/form/loading-render.tsx"></code>

### Select `request` 数据本地搜索

`request` 一次性拉取全量数据后，设置 `fetchDataOnSearch={false}` 可让搜索走本地过滤，不再重复发起请求。

<code src="../../demos/field/field-search-remote.tsx" title="输入时请求：ProFormSelect.request"></code>
<code src="../../demos/field/field-search-local.tsx" title="本地筛选：fetchDataOnSearch=false"></code>

| 参数              | 说明                                                                          | 类型      | 默认值 |
| ----------------- | ----------------------------------------------------------------------------- | --------- | ------ |
| fetchDataOnSearch | 搜索时是否重新触发 `request`；设为 `false` 时仅初始化拉取一次，搜索走本地过滤 | `boolean` | `true` |

### ConfigProvider 设置表单语言

`ConfigProvider.locale` 设置日期选择器的语言；示例使用英文语言包，可打开日期面板查看月份和操作文案。

<code src="../../demos/form/config-provider.tsx" title="ConfigProvider.locale" background="var(--main-bg-color)"></code>

## ProForm

ProForm 是对 antd Form 的再封装，如果你想要自定义表单元素，ProForm 与 antd 的方法是相同的，你仍然可以用 FormItem + 自定义组件的方式来自定义。当然这样不会影响到别的组件，QueryFilter 等组件同理。

> antd 的 Form api 查看[这里](https://ant.design/components/form-cn/)，initialValues 相关知识查看[这里](https://procomponents.ant.design/docs/faq)

| 参数                                            | 说明                                                                                                                                           | 类型                                                                                                                                                                                                                          | 默认值          |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| onFinish                                        | 提交表单且数据验证成功后回调事件，支持 Promise，会自动设置按钮的加载效果                                                                       | `(formData: T) => Promise<boolean \| void> \| void`                                                                                                                                                                           | -               |
| onReset                                         | 点击重置按钮的回调                                                                                                                             | `(e) => void`                                                                                                                                                                                                                 | -               |
| submitter                                       | 提交按钮相关配置                                                                                                                               | `SubmitterProps<{form?: FormInstance<any>}> \| false`                                                                                                                                                                         | `true`          |
| loading                                         | 表单按钮的 loading 状态                                                                                                                        | `boolean`                                                                                                                                                                                                                     | -               |
| loadingRender                                   | `request` 加载期间的自定义渲染，默认为居中的 `Spin`，可传 `Skeleton` 对齐 antd 5.18+ 加载风格                                                  | `ReactNode \| (() => ReactNode)`                                                                                                                                                                                              | `<Spin />`      |
| onLoadingChange                                 | loading 状态改变时的回调                                                                                                                       | `(loading: boolean) => void`                                                                                                                                                                                                  | -               |
| formRef                                         | 获取表单所使用的 form，`ProFormInstance` 相比 antd Form 增加了格式化数据的方法                                                                 | `React.MutableRefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) \| undefined> \| React.RefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) \| undefined>` | -               |
| syncToUrl                                       | 同步参数到 url 上，url 只支持 string，在使用之前最好读一下[url 中的参数类型](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) | `boolean \| ((values: T, type: 'get' \| 'set') => T)`                                                                                                                                                                         | -               |
| syncToUrlAsImportant                            | 当 syncToUrl 为 true，在页面回显示时，以url上的参数为主，默认为false                                                                           | `boolean`                                                                                                                                                                                                                     | `false`         |
| extraUrlParams                                  | 额外的 url 参数                                                                                                                                | `Record<string, any>`                                                                                                                                                                                                         | -               |
| syncToInitialValues                             | 同步结果到 initialValues，默认为 true，如果为 false，form.reset 的时候将会忽略从 url 上获取的数据                                              | `boolean`                                                                                                                                                                                                                     | `true`          |
| omitNil                                         | ProForm 会自动清空 null 和 undefined 的数据，如果你约定了 nil 代表某种数据，可以设置为 false 关闭此功能                                        | `boolean`                                                                                                                                                                                                                     | `true`          |
| dateFormatter                                   | 自动格式化数据，主要是 dayjs 的表单，支持 string 和 number 两种模式，此外还支持指定函数进行格式化。                                            | `string \| 'string' \| 'number' \| ((value: dayjs.Dayjs, valueType: string) => string \| number) \| false`                                                                                                                    | `'string'`      |
| onInit                                          | 表单初始化成功，比如布局，label等计算完成                                                                                                      | `(values: T, form: ProFormInstance<any>) => void`                                                                                                                                                                             | -               |
| params                                          | 发起网络请求的参数，与 request 配合使用                                                                                                        | `U`                                                                                                                                                                                                                           | -               |
| request                                         | 发起网络请求的参数，返回值会覆盖给 initialValues                                                                                               | `ProRequestData<T, U>`                                                                                                                                                                                                        | -               |
| isKeyPressSubmit                                | 是否使用回车提交                                                                                                                               | `boolean`                                                                                                                                                                                                                     | -               |
| formKey                                         | 用于控制form 是否相同的key，高阶用法                                                                                                           | `string`                                                                                                                                                                                                                      | -               |
| autoFocusFirstInput                             | 自动 focus 表单第一个输入框，只对有 input 的类型有效                                                                                           | `boolean`                                                                                                                                                                                                                     | `true`          |
| readonly                                        | 是否只读模式，对所有表单项生效，优先低于表单项的 readonly                                                                                      | `boolean`                                                                                                                                                                                                                     | -               |
| grid                                            | 开启栅格化模式，宽度默认百分比，请使用 `colProps` 控制宽度 [查看示例](/components/form#栅格化布局)                                             | `boolean`                                                                                                                                                                                                                     | `false`         |
| rowProps                                        | 开启 `grid` 模式时传递给 `Row`, 仅在`ProFormGroup`, `ProFormList`, `ProFormFieldSet` 中有效                                                    | [RowProps](https://ant.design/components/grid/#Row)                                                                                                                                                                           | `{ gutter: 8 }` |
| colProps                                        | 开启 `grid` 模式时传递给 `Col`, 仅在`ProFormGroup`, `ProFormList`, `ProFormFieldSet` 中有效                                                    | [ColProps](https://ant.design/components/grid/#Col)                                                                                                                                                                           | `{ xs: 24 }`    |
| [(...)](https://ant.design/components/form-cn/) | 注意 `LightFilter` 和 `QueryFilter` 仅支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数                              | -                                                                                                                                                                                                                             | -               |

### ProFormInstance

ProFormInstance 与 antd 的 form 相比增加了一些能力。

```tsx | pure
  /**
   * 获取被 ProForm 格式化后的所有数据
   * @param nameList boolean
   * @param omitNil boolean 是否忽略 null 和 undefined
   * @returns T
   *
   * @example  getFieldsFormatValue() ->返回所有数据
   * @example  getFieldsFormatValue(true) ->返回所有数据，即使没有被 form 托管的
   * @example  getFieldsFormatValue(true, true) ->返回所有数据，忽略 null 和 undefined
   */
  getFieldsFormatValue?: (nameList?: true, omitNil?: boolean) => T;
  /**
   * 获取被 ProForm 格式化后的单个数据
   * @param nameList (string|number)[]
   * @returns T
   * @example {a:{b:value}} -> getFieldFormatValue(['a', 'b']) -> value
   */
  /** 获取格式化之后的单个数据 */
  getFieldFormatValue?: (nameList?: NamePath) => T;
  /**
   * 获取被 ProForm 格式化后的单个数据, 包含他的 name
   * @param nameList (string|number)[]
   * @returns T
   * @example
   * {a:{b:value}} -> getFieldFormatValueObject(['a', 'b']) -> {a:{b:value}}
   */
  getFieldFormatValueObject?: (nameList?: NamePath) => T;
  /**
   *验字段后返回格式化之后的所有数据
   * @param nameList (string|number)[]
   * @returns T
   *
   * @example validateFieldsReturnFormatValue -> {a:{b:value}}
   */
  validateFieldsReturnFormatValue?: (nameList?: NamePath[]) => Promise<T>;
```

### ProForm.Group

ProForm.Group 支持 `title`、`tooltip`、`extra` 等分组配置，完整类型见 `ProFormBaseGroupProps`。

| 参数     | 说明                 | 类型              | 默认值 |
| -------- | -------------------- | ----------------- | ------ |
| title    | 标题                 | `ReactNode`       | -      |
| children | 表单控件或者其他元素 | `React.ReactNode` | -      |

#### submitter

虽然我们希望不要对 submitter 进行修改，但在使用中修改是很常见的需求，ProForm 的各个组件都使用了同样的 API 来支持需求。

| 参数              | 说明                         | 类型                                                        | 默认值 |
| ----------------- | ---------------------------- | ----------------------------------------------------------- | ------ |
| onSubmit          | 提交方法                     | `(value?: T)=>void`                                         | -      |
| onReset           | 重置方法                     | `(value?: T)=>void`                                         | -      |
| searchConfig      | 搜索的配置，一般用来配置文本 | `{resetText,submitText}`                                    | -      |
| submitButtonProps | 提交按钮的 props             | `false \| ButtonProps`                                      | -      |
| resetButtonProps  | 重置按钮的 props             | `false \| ButtonProps`                                      | -      |
| render            | 自定义操作的渲染             | `false\|((props,dom:JSX[])=>ReactNode[]\|ReactNode\|false)` | -      |

> render 的第二个参数是默认的 dom 数组，第一个是提交按钮，第二个是重置按钮。

```tsx | pure
<ProForm
  submitter={{
    // 配置按钮文本
    searchConfig: {
      resetText: '重置',
      submitText: '提交',
    },
    // 配置按钮的属性
    resetButtonProps: {
      style: {
        // 隐藏重置按钮
        display: 'none',
      },
    },
    submitButtonProps: {},

    // 完全自定义整个区域
    render: (props, doms) => {
      console.log(props);
      return [
        <button
          type="button"
          key="rest"
          onClick={() => props.form?.resetFields()}
        >
          重置
        </button>,
        <button
          type="button"
          key="submit"
          onClick={() => props.form?.submit?.()}
        >
          提交
        </button>,
      ];
    },
  }}
/>
```

### formRef

`formRef` 提供表单实例。以下示例分别展示读取单个字段、读取经过 `transform` 转换的值，以及先校验再读取格式化值。

<code src="../../demos/form/form-ref-get-field-value.tsx" title="getFieldValue"></code>

<code src="../../demos/form/form-ref-format-value.tsx" title="getFieldsFormatValue"></code>

<code src="../../demos/form/form-ref-validate-format-value.tsx" title="validateFieldsReturnFormatValue"></code>

`ProFormInstance` 在原先 `FormInstance` 的基础上增加了如下方法：

|              方法名               |                                           使用描述                                           | 备注 |
| :-------------------------------: | :------------------------------------------------------------------------------------------: | :--: |
|      `getFieldsFormatValue`       |       使用方法与 `FormInstance` 的 `getFieldsValue` 方法相同，将返回格式化后的所有数据       |      |
|       `getFieldFormatValue`       |       使用方法与 `FormInstance` 的 `getFieldValue` 方法相同，将返回格式化后的指定数据        |      |
|    `getFieldFormatValueObject`    | 使用方法与 `FormInstance` 的 `getFieldValue` 方法相同，将返回格式化后的指定数据（包含 name） |      |
| `validateFieldsReturnFormatValue` |  使用方法与 `FormInstance` 的 `validateFields` 方法相同，验证通过后将返回格式化后的所有数据  |      |

`BetaSchemaForm.formRef` 也能读取表单当前值。修改项目名称后点击按钮查看结果。

<code src="../../demos/form/params-form-ref.tsx" title="BetaSchemaForm.formRef 读取字段"></code>
