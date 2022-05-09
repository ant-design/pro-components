---
title: LoginForm/Page
Order: 2
group:
  Path: /
navigation:
  Title: Components
  path: /components
---

# Login form

LoginForm and LoginFormPage are variants of ProForm. They are specially implemented to adapt to common login form layouts. They are suitable for various login scenarios and reduce layout pressure.

## Login form

<code src="./demos/login-form" background="#f5f5f5" height="320px" title="login-form" />

## page level LoginForm

<code src="./demos/login-form-page.tsx" background="#f5f5f5" height="320px" title="Page level form" />

### LoginForm

LoginForm represents the more common centered layout style.

| parameter | description | type | default value |
| --- | --- | --- | --- |
| logo | Configuration of logo, supports ReactNode and string | `ReactNode \| url` | - |
| title | title, can be empty | `ReactNode` | - |
| subTitle | Secondary title, can be configured as empty | `ReactNode` | - |
| actions | Customize additional login functionality | `ReactNode` |
| message | A prompt configuration at the top of the form, you can configure some error message | `ReactNode` | - |

### LoginFormPage

LoginFormPage uses the left and right layout, and adds some ad slot configuration.

| parameter | description | type | default value |
| --- | --- | --- | --- |
| logo | Configuration of logo, supports ReactNode and string | `ReactNode \| url` | - |
| title | title, can be empty | `ReactNode` | - |
| subTitle | Secondary title, can be configured as empty | `ReactNode` | - |
| actions | Customize additional login functionality | `ReactNode` |
| message | A prompt configuration at the top of the form, you can configure some error message | `ReactNode` | - |
| backgroundImageUrl | The background image configuration of the entire area, it will not be displayed on the mobile phone | `url` | - |
| activityConfig | The configuration of the activity, including title, subTitle, action, which represent the title, subtitle and action button respectively. You can also configure style to control the style of the area | `{title,subTitle,action,style}` | - |
