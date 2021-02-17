---
title: ProForm - 高级表单
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProForm

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

## 何时使用

当你想快速实现一个表单但不想花太多时间去布局时 ProForm 是最好的选择。

## 代码示例

### 基本使用

<code src="./demos/base.tsx" height="548px"/>

### Form 的 layout 切换

<code src="./demos/layout-change.tsx" height="548px"/>

### 登录

<code src="./demos/login.tsx" height="300px"/>

### 表单联动

<code src="./demos/dependency.tsx" height="248px"/>

### 同步提交结果到 url

打开时也会把 url 的参数设置为默认值，支持 transform, 但是要注意字段的映射。

<code src="./demos/sync-to-url.tsx" height="376px"/>

### 固定页脚

<code src="./demos/layout-base.tsx" iframe="764px" />

### ProForm 和 EditableTable 同时使用

<code src="./demos/pro-form-editableTable.tsx" heigh="1774px" />

### ProForm.List

<code src="./demos/list.tsx" heigh="1774px" />

## Layouts API

### ProForm

ProForm 是 antd Form 的再封装，如果你想要自定义表单元素，ProForm 与 antd 的方法是相同的，你仍然可以用 FormItem + 自定义组件的方式来自定义。当然这样不会影响到别的组件，QueryFilter 等组件同理。

> antd 的 Form api 查看[这里](https://ant.design/components/form-cn/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onFinish | 提交表单且数据验证成功后回调事件，同 antd 4 `Form` 组件 API | `(values)=>Promise<void>` | - |
| onReset | 点击重置按钮的回调，设置后重置按钮才会被渲染 | `(e)=>void` | - |
| submitter | 提交按钮相关配置 | `boolean` \| `SubmitterProps` | `true` |
| syncToUrl | 同步参数到 url 上,url 只支持 string，在使用之前最好读一下[文档](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) | `true` \| `(values,type)=>values` | - |
| dateFormatter | 自动格式数据,主要是 moment 的表单,支持 string 和 number 两种模式 | `string\| number \|false` | string |
| omitNil | ProForm 会自动清空 null 和 undefined 的数数据，如果你约定了 nil 代表某种数据，可以设置为 false 关闭此功能 | `boolean` | true |
| [(...)](https://ant.design/components/form-cn/) | 支持除 `wrapperCol` \| `labelCol` \| `layout` 外的其他 antd `Form` 组件参数 | - | - |

### ProForm.Group

| 参数     | 说明                 | 类型              | 默认值 |
| -------- | -------------------- | ----------------- | ------ |
| title    | 标题                 | `string`          | -      |
| children | 表单控件或者其他元素 | `React.ReactNode` | -      |

#### submitter

虽然我们希望不要对 submitter 进行修改，但是在使用中修改时很常见的需求，ProForm 的各个组件都使用了同样的 API 来支持需求。

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
