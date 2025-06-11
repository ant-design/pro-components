---
title: LoginForm/Page - 登录表单
atomId: LoginForm,PageForm
order: 2
---

# 登录表单

LoginForm 和 LoginFormPage 是 ProForm 的变体，两者是为了适应常见的登录表单布局来专门实现，适用于各类登录场景，降低布局的压力。

## 登录表单

<code src="./demos/login-form"  background="var(--main-bg-color)" title="登录表单"></code>

## 页面级别的登录表单

<code src="./demos/login-form-page.tsx"  background="var(--main-bg-color)" iframe="887" title="页面级别的表单"></code>

## API

### LoginForm

LoginForm 代表了比较常见的居中布局样式。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| logo | logo 的配置，支持 ReactNode 和 string | `ReactNode \| url` | - |
| title | 标题，可以配置为空 | `ReactNode` | - |
| subTitle | 二级标题，可以配置为空 | `ReactNode` | - |
| actions | 自定义额外的登录功能 | `ReactNode` |  |
| message | form 顶部的一个提示配置，可以配置一些错误的提示信息 | `ReactNode` | - |

### LoginFormPage

LoginFormPage 使用了左右布局，并且增加了一些广告位的配置。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| logo | logo 的配置，支持 ReactNode 和 string | `ReactNode \| url` | - |
| title | 标题，可以配置为空 | `ReactNode` | - |
| subTitle | 二级标题，可以配置为空 | `ReactNode` | - |
| actions | 自定义额外的登录功能 | `ReactNode` |  |
| message | form 顶部的一个提示配置，可以配置一些错误的提示信息 | `ReactNode` | - |
| backgroundImageUrl | 整个区域的背景图片配置，手机端不会展示 | `url` | - |
| activityConfig | 活动的配置，包含 title，subTitle，action，分别代表标题，次标题和行动按钮，也可配置 style 来控制区域的样式 | `{title,subTitle,action,style}` | - |
