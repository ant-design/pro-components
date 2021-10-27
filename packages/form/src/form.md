---
title: ProForm - 高级表单
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProForm 高级表单

ProForm 在原来的 Form 的基础上增加一些语法糖和更多的布局设置，帮助我们快速的开发一个表单。同时添加一些默认行为，让我们的表单默认好用。

分步表单，Modal 表单，Drawer 表单，查询表单，轻量筛选等多种 layout 可以覆盖大部分的使用场景，脱离复杂而且繁琐的表单布局工作，更少的代码完成更多的功能。

- 如果你想要设置默认值，请使用 `initialValues`,任何直接使用组件 `value` 和 `onChange` 的方式都有可能导致值绑定失效。
- 如果想要表单联动或者做一些依赖，可以使用 render props 模式, ProFormDependency 绝对是最好的选择
- ProForm 的 onFinish 与 antd 的 Form 不同，是个 Promise，如果你正常返回会自动为你设置按钮的加载效果
- 如果想要监听某个值，建议使用 `onValuesChange`。保持单向的数据流无论对开发者还是维护者都大有脾益
- ProForm 没有黑科技，只是 antd 的 Form 的封装，如果要使用自定义的组件可以用 Form.Item 包裹后使用，支持混用

```tsx |pure
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

| 布局 | 使用场景 |
| --- | --- |
| [ProForm](/components/form#proform) | 标准 Form，增加了 `onFinish` 中自动 `loading` 和 根据 `request` 自动获取默认值的功能。 |
| [ModalForm\|DrawerForm](/components/modal-form) | 在 ProForm 的基础上增加了 `trigger` ，无需维护 `visible` 状态 |
| [QueryFilter](/components/query-filter) | 一般用于作为筛选表单，需要配合其他数据展示组件使用 |
| [LightFilter](/components/query-filter) | 一般用于作为行内内置的筛选，比如卡片操作栏和 表格操作栏。 |
| [StepsForm](/components/steps-form) | 分步表单，需要配置 StepForm 使用。 |

<code src="./demos/layout-change.tsx" height="488px" title="Form 的 layout 切换" />

## 代码示例

### 基本使用

<code src="./demos/base.tsx" height="548px" title="基本使用" />

### 标签与表单项布局

除了 `LightFilter` 和 `QueryFilter` 这样固定布局的表单样式，其他表单布局支持配置与 `antd` 一致的三种布局方式。

<code src="./demos/form-layout.tsx" title="标签与表单项布局" />

### 登录

<code src="./demos/login-form.tsx" height="300px" title="登录" />

### 表单联动

<code src="./demos/dependency.tsx" height="248px" title="表单联动" />

### 表单方法调用

你可以通过 `formRef` 获取到表单实例的引用，通过引用可以调用表单方法实现表单重置，设置表单，获取表单值等功能。

<code src="./demos/formRef.tsx" height="248px" title="表单方法调用" />

### 同步提交结果到 url

打开时也会把 url 的参数设置为默认值，支持 transform, 但是要注意字段的映射。

<code src="./demos/sync-to-url.tsx" height="376px" title="同步提交结果到 url" />

### 固定页脚

<code src="./demos/layout-base.tsx" iframe="764px" title="固定页脚" />

### ProForm 和 EditableTable 同时使用

<code src="./demos/pro-form-editableTable.tsx" heigh="1774px" title="ProForm 和 EditableTable 同时使用"/>

<code src="./demos/linkage-customization.tsx" heigh="1774px" debug/>

<code src="./demos/pro-form-dependency.debug.tsx" height="548px" title="formRef的使用" debug />

## ProForm

ProForm 是 antd Form 的再封装，如果你想要自定义表单元素，ProForm 与 antd 的方法是相同的，你仍然可以用 FormItem + 自定义组件的方式来自定义。当然这样不会影响到别的组件，QueryFilter 等组件同理。

> antd 的 Form api 查看[这里](https://ant.design/components/form-cn/) initialValues 相关知识查看[这里](https://procomponents.ant.design/docs/faq)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFinish | 提交表单且数据验证成功后回调事件，同 antd 4 `Form` 组件 API | `(values)=>Promise<void>` | - |
| onReset | 点击重置按钮的回调 | `(e)=>void` | - |
| submitter | 提交按钮相关配置 | `boolean` \| `SubmitterProps` | `true` |
| syncToUrl | 同步参数到 url 上,url 只支持 string，在使用之前最好读一下[url 中的参数类型](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) | `true` \| `(values,type)=>values` | - |
| syncToInitialValues | 同步结果到 initialValues,默认为 true 如果为 false，form.reset 的时将会忽略从 url 上获取的数据 | `boolean` | `true` |
| dateFormatter | 自动格式数据,主要是 moment 的表单,支持 string 和 number 两种模式 | `string\| number \|false` | string |
| omitNil | ProForm 会自动清空 null 和 undefined 的数数据，如果你约定了 nil 代表某种数据，可以设置为 false 关闭此功能 | `boolean` | true |
| params | 发起网络请求的参数,与 request 配合使用 | `Record` | - |
| request | 发起网络请求的参数,返回值会覆盖给 initialValues | `(params)=>Promise<data>` | - |
| isKeyPressSubmit | 是否使用回车提交 | `boolean` | - |
| autoFocusFirstInput | 自动 focus 表单第一个输入框 | `boolean` | - |
| [(...)](https://ant.design/components/form-cn/) | 注意 `LightFilter` 和 `QueryFilter` 仅支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数 | - | - |

### ProForm.Group

| 参数     | 说明                 | 类型              | 默认值 |
| -------- | -------------------- | ----------------- | ------ |
| title    | 标题                 | `string`          | -      |
| children | 表单控件或者其他元素 | `React.ReactNode` | -      |

#### submitter

虽然我们希望不要对 submitter 进行修改，但在使用中修改是很常见的需求，ProForm 的各个组件都使用了同样的 API 来支持需求。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onSubmit | 提交方法 | `()=>void` | - |
| onReset | 重置方法 | `()=>void` | - |
| searchConfig | 搜索的配置，一般用来配置文本 | `{resetText,submitText}` | - |
| submitButtonProps | 提交按钮的 props | [ButtonProps](https://ant.design/components/button-cn/) | - |
| resetButtonProps | 重置按钮的 props | [ButtonProps](https://ant.design/components/button-cn/) | - |
| render | 自定义操作的渲染 | `false`\|`(props,dom:JSX[])=>ReactNode[]` | - |

> render 的第二个参数是默认的 dom 数组，第一个是重置按钮，第二个是提交按钮。

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
        <button type="button" key="rest" onClick={() => props.form?.resetFields()}>
          重置
        </button>,
        <button type="button" key="submit" onClick={() => props.form?.submit?.()}>
          提交
        </button>,
      ];
    },
  }}
/>
```

### formRef

该属性是 ProForm 在原有的 Antd 的 `FormInstance` 的基础上做的一个上层分装，增加了一些更加便捷的方法。使用方式如下：

<code src="./demos/formRef.tsx" height="548px" title="formRef的使用" />

```tsx | pure
const App = () => {
  // 绑定一个 ProFormInstance 实例
  const formRef = useRef<
    ProFormInstance<{
      date: string;
    }>
  >();

  return (
    <ProForm
      onValuesChange={async () => {
        formRef.current?.validateFieldsReturnFormatValue?.().then((val) => {
          // 以下为格式化之后的表单值
          console.log(val.date);
        });
      }}
      // 通过formRef进行绑定
      formRef={formRef}
    >
      <ProFormDatePicker
        name="date"
        initialValue={moment('2021-08-09')}
        fieldProps={{ open: true }}
      />
    </ProForm>
  );
};
```

`ProFormInstance`在原先`FormInstance`的基础上增加了如下方法：

| 方法名 | 使用描述 | 备注 |
| :-: | :-: | :-: |
| `getFieldsFormatValue` | 使用方法与`FormInstance`的`getFieldsValue`方法相同，将返回格式化后的所有数据 |  |
| `getFieldFormatValue` | 使用方法与`FormInstance`的`getFieldValue`方法相同，将返回格式化后的指定数据 |  |
| `validateFieldsReturnFormatValue` | 使用方法与`FormInstance`的`validateFields`方法相同，验证通过后将返回格式化后的所有数据 |  |
