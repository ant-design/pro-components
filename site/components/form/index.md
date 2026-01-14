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
- ProForm 没有黑科技，只是 antd 的 Form 的封装，如果要使用自定义的组件可以用 Form.Item 包裹后使用，支持混用

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

<code src="../../../demos/form/layout-change.tsx" title="Form 的 layout 切换"></code>

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
<ProFormText
  name="name"
  transform={(value) => `${value}:suffix`}
/>
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

<code src="../../../demos/form/base.tsx" title="基本使用"></code>

### 标签与表单项布局

除了 `LightFilter` 和 `QueryFilter` 这样固定布局的表单样式，其他表单布局支持配置与 `antd` 一致的三种布局方式。

<code src="../../../demos/form/form-layout.tsx"  ></code>

### 栅格化布局

同时支持在 `ProForm`, `SchemaForm`, `ModalForm`, `DrawerForm`, `StepsForm` 中使用

<code src="../../../demos/form/form-layout-grid.tsx" ></code>

<code src="../../../demos/form/dependency.tsx" title="表单联动"></code>

<code src="../../../demos/form/formRef.tsx" id="formRef-usage" description="
你可以通过 `formRef` 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能。" title="表单方法调用"></code>

### 同步提交结果到 url

打开时也会把 url 的参数设置为默认值，支持 transform, 但是要注意字段的映射。

<code src="../../../demos/form/sync-to-url.tsx" ></code>

<code src="../../../demos/form/money.tsx" title="金额"></code>

<code src="../../../demos/form/layout-footer.tsx" iframe="580" title="固定页脚"></code>

<code src="../../../demos/form/pro-form-editableTable.tsx" title="ProForm 和 EditableTable 同时使用"></code>

## 劫持渲染函数的组件

FormItemRender 用来专门处理，采用 render props 的方式来组织代码，更好的聚合带请求的业务代码，也更好的完成自定义表单项的功能

在中后台项目表单是必不可少的，通常还伴随着一些非标准控件、复杂的表单项，此时需要借助自定义表单项，而完成一个自定义表单项至少需要完成 value 和 onChange 的实现。而如果该组件只被使用一次且需要的上下文参数很多，那么封装起来就是很不讨好，因此就有了该组件。

- 使用 useControlModel 来快速的创建一个自定义表单项，同时支持单实例或多实例（适用于封装自定义表单组件，在多个地方使用的场景）
- 使用 withFormItemRender 来生成一个 FormItemRender，可以以内联的方式去组织代码（适用于只被使用一次或需要的上下文参数很多的场景）
- 使用 FormControlRender 来把一个 form 组件转换成 render props 的形式，在特定情况下是很有用的（例如@alipay/techui-rule-tree 组件的一些设计缺陷，render 里面的组件不能调用 onChange 方法，这个时候包裹一下就可以解决）

> 当然，也不一定非要用 withFormItemRender，Form.Item 是可以嵌套使用，也可以 Form.Item 嵌套外层设置 noStyle 的方式来组织你的代码，这样会多一些 div 的元素包裹，如果对你样式没有影响也可以使用

### 使用 useControlModel

从一个官网例子开始[自定义表单项](https://ant.design/components/form-cn#components-form-demo-customized-form-controls)

<code src="../../../demos/form/antd.tsx" description="官网例子"></code> <code src="../../../demos/form/antd.modify.tsx" description="使用和hooks改造"></code> <code src="../../../demos/form/antd.nest.tsx" description="嵌套使用"></code>

### FormControlRender

使用 FormControlRender 既可以内联的书写代码，又可以更灵活的编写逻辑，适用于一些组件外层包裹了 ProForm.Item 或者 Form.Item。

有的时候需要使用 Form.Item.useStatus，但必须满足 hooks 的使用规范，这使得开发就必须提取成单独的组件来使用，没办法内联使用，而 FormControlRender 很好的解决这种情况

<code src="../../../demos/form/form-control-render.tsx"></code>

### FormItemRender & ProFormItemRender

使用 FormItemRender 或者 ProFormItemRender 可以更方便的在 Form 里书写表单项

<code src="../../../demos/form/form-item-render.tsx"></code>

<code src="../../../demos/form/linkage-customization.tsx" debug></code>

<code src="../../../demos/form/pro-form-dependency.debug.tsx"  debug></code>

<code src="../../../demos/form/label-col.tsx" debug></code>

## ProForm

ProForm 是对 antd Form 的再封装，如果你想要自定义表单元素，ProForm 与 antd 的方法是相同的，你仍然可以用 FormItem + 自定义组件的方式来自定义。当然这样不会影响到别的组件，QueryFilter 等组件同理。

> antd 的 Form api 查看[这里](https://ant.design/components/form-cn/)，initialValues 相关知识查看[这里](https://procomponents.ant.design/docs/faq)

| 参数                                            | 说明                                                                                                                                           | 类型                                                                                                       | 默认值          |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------- |
| onFinish                                        | 提交表单且数据验证成功后回调事件，支持 Promise，会自动设置按钮的加载效果                                                                       | `(formData: T) => Promise<boolean \| void> \| void`                                                        | -               |
| onReset                                         | 点击重置按钮的回调                                                                                                                             | `(e) => void`                                                                                              | -               |
| submitter                                       | 提交按钮相关配置                                                                                                                               | `SubmitterProps<{form?: FormInstance<any>}> \| false`                                                      | `true`          |
| loading                                         | 表单按钮的 loading 状态                                                                                                                        | `boolean`                                                                                                  | -               |
| onLoadingChange                                 | loading 状态改变时的回调                                                                                                                       | `(loading: boolean) => void`                                                                               | -               |
| formRef                                         | 获取表单所使用的 form，`ProFormInstance` 相比 antd Form 增加了格式化数据的方法                                                                  | `React.MutableRefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) \| undefined> \| React.RefObject<(ProFormInstance<T> & { nativeElement?: HTMLElement; focus?: () => void }) \| undefined>` | - |
| syncToUrl                                       | 同步参数到 url 上，url 只支持 string，在使用之前最好读一下[url 中的参数类型](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) | `boolean \| ((values: T, type: 'get' \| 'set') => T)`                                                      | -               |
| syncToUrlAsImportant                            | 当 syncToUrl 为 true，在页面回显示时，以url上的参数为主，默认为false                                                                           | `boolean`                                                                                                  | `false`         |
| extraUrlParams                                  | 额外的 url 参数                                                                                                                                | `Record<string, any>`                                                                                      | -               |
| syncToInitialValues                             | 同步结果到 initialValues，默认为 true，如果为 false，form.reset 的时候将会忽略从 url 上获取的数据                                              | `boolean`                                                                                                  | `true`          |
| omitNil                                         | ProForm 会自动清空 null 和 undefined 的数据，如果你约定了 nil 代表某种数据，可以设置为 false 关闭此功能                                        | `boolean`                                                                                                  | `true`          |
| dateFormatter                                   | 自动格式化数据，主要是 dayjs 的表单，支持 string 和 number 两种模式，此外还支持指定函数进行格式化。                                            | `string \| 'string' \| 'number' \| ((value: dayjs.Dayjs, valueType: string) => string \| number) \| false` | `'string'`      |
| onInit                                          | 表单初始化成功，比如布局，label等计算完成                                                                                                      | `(values: T, form: ProFormInstance<any>) => void`                                                          | -               |
| params                                          | 发起网络请求的参数，与 request 配合使用                                                                                                        | `U`                                                                                                        | -               |
| request                                         | 发起网络请求的参数，返回值会覆盖给 initialValues                                                                                               | `ProRequestData<T, U>`                                                                                     | -               |
| isKeyPressSubmit                                | 是否使用回车提交                                                                                                                               | `boolean`                                                                                                  | -               |
| formKey                                         | 用于控制form 是否相同的key，高阶用法                                                                                                           | `string`                                                                                                   | -               |
| autoFocusFirstInput                             | 自动 focus 表单第一个输入框，只对有 input 的类型有效                                                                                           | `boolean`                                                                                                  | `true`          |
| readonly                                        | 是否只读模式，对所有表单项生效，优先低于表单项的 readonly                                                                                      | `boolean`                                                                                                  | -               |
| grid                                            | 开启栅格化模式，宽度默认百分比，请使用 `colProps` 控制宽度 [查看示例](/components/form#栅格化布局)                                             | `boolean`                                                                                                  | `false`         |
| rowProps                                        | 开启 `grid` 模式时传递给 `Row`, 仅在`ProFormGroup`, `ProFormList`, `ProFormFieldSet` 中有效                                                    | [RowProps](https://ant.design/components/grid/#Row)                                                        | `{ gutter: 8 }` |
| colProps                                        | 开启 `grid` 模式时传递给 `Col`, 仅在`ProFormGroup`, `ProFormList`, `ProFormFieldSet` 中有效                                                    | [ColProps](https://ant.design/components/grid/#Col)                                                        | `{ xs: 24 }`    |
| [(...)](https://ant.design/components/form-cn/) | 注意 `LightFilter` 和 `QueryFilter` 仅支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数                              | -                                                                                                          | -               |

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

| 参数     | 说明                 | 类型              | 默认值 |
| -------- | -------------------- | ----------------- | ------ |
| title    | 标题                 | `string`          | -      |
| children | 表单控件或者其他元素 | `React.ReactNode` | -      |

#### submitter

虽然我们希望不要对 submitter 进行修改，但在使用中修改是很常见的需求，ProForm 的各个组件都使用了同样的 API 来支持需求。

| 参数              | 说明                         | 类型                                                    | 默认值 |
| ----------------- | ---------------------------- | ------------------------------------------------------- | ------ |
| onSubmit          | 提交方法                     | `()=>void`                                              | -      |
| onReset           | 重置方法                     | `()=>void`                                              | -      |
| searchConfig      | 搜索的配置，一般用来配置文本 | `{resetText,submitText}`                                | -      |
| submitButtonProps | 提交按钮的 props             | [ButtonProps](https://ant.design/components/button-cn/) | -      |
| resetButtonProps  | 重置按钮的 props             | [ButtonProps](https://ant.design/components/button-cn/) | -      |
| render            | 自定义操作的渲染             | `false`\|`(props,dom:JSX[])=>ReactNode[]`               | -      |

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

该属性是 ProForm 在原有的 Antd 的 `FormInstance` 的基础上做的一个上层分装，增加了一些更加便捷的方法。使用方式如下：

<code src="../../../demos/form/formRef.tsx" id="formRef-api" title="formRef的使用"></code>

```tsx | pure
import type { ProFormInstance } from '@ant-design/pro-components';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button, message, Space } from 'antd';
import { afterEach, describe, expect, it, vi } from 'vitest';
import moment from 'dayjs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();
  const onFill = () => {
    formRef?.current?.setFieldsValue({
      name: '张三',
      company: '蚂蚁金服',
    });
  };

  const getCompanyName = () => {
    message.info(`公司名称为 "${formRef?.current?.getFieldValue('company')}"`);
  };

  const getFormatValues = () => {
    console.log(
      '格式化后的所有数据：',
      formRef.current?.getFieldsFormatValue?.(),
    );
  };

  const validateAndGetFormatValue = async () => {
    const values = await formRef.current?.validateFieldsReturnFormatValue?.();
    console.log('校验表单并返回格式化后的所有数据：', values);
  };

  return (
    <ProForm
      title="新建表单"
      formRef={formRef}
      submitter={{
        render: (props, doms) => {
          return [
            ...doms,
            <Button htmlType="button" onClick={onFill} key="edit">
              一键填写
            </Button>,
            <Button htmlType="button" onClick={getCompanyName} key="read">
              读取公司
            </Button>,
            <Space.Compact key="refs" style={{ display: 'block' }}>
              <Button htmlType="button" onClick={getFormatValues} key="format">
                获取格式化后的所有数据
              </Button>
              <Button
                htmlType="button"
                onClick={validateAndGetFormatValue}
                key="format2"
              >
                校验表单并返回格式化后的所有数据
              </Button>
            </Space.Compact>,
          ];
        },
      }}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        message.success('提交成功');
        return true;
      }}
    >
      <ProFormText
        width="md"
        name="name"
        label="签约客户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />

      <ProFormText
        width="md"
        name="company"
        label="我方公司名称"
        placeholder="请输入名称"
      />
      <ProFormDatePicker name="date" initialValue={moment('2021-08-09')} />
    </ProForm>
  );
};
```

`ProFormInstance` 在原先 `FormInstance` 的基础上增加了如下方法：

|              方法名               |                                          使用描述                                          | 备注 |
| :-------------------------------: | :----------------------------------------------------------------------------------------: | :--: |
|      `getFieldsFormatValue`       |      使用方法与 `FormInstance` 的 `getFieldsValue` 方法相同，将返回格式化后的所有数据      |      |
|       `getFieldFormatValue`       |      使用方法与 `FormInstance` 的 `getFieldValue` 方法相同，将返回格式化后的指定数据       |      |
|   `getFieldFormatValueObject`     | 使用方法与 `FormInstance` 的 `getFieldValue` 方法相同，将返回格式化后的指定数据（包含 name） |      |
| `validateFieldsReturnFormatValue` | 使用方法与 `FormInstance` 的 `validateFields` 方法相同，验证通过后将返回格式化后的所有数据 |      |

<code src="../../../demos/form/modalform-test.tsx"  debug></code>

<code src="../../../demos/form/params-formref.tsx"  debug></code>
