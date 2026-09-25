---
group: Form
title: LoginForm/Page
order: 2
atomId: LoginForm,PageForm
navigation:
  Title: Components
---

# LoginForm/Page

LoginForm and LoginFormPage are ProForm variants tailored for typical login compositions and reduce layout friction.

## Login form

<code src="../../demos/form/login-form/login-form.tsx" background="var(--main-bg-color)" title="LoginForm"></code>

## Full-page login shell

<code src="../../demos/form/login-form/login-form-page.tsx" background="var(--main-bg-color)" iframe="887" title="Full-page LoginForm"></code>

### LoginForm

LoginForm represents the more common centered layout style.

| parameter | description                                                                         | type                       | default value |
| --------- | ----------------------------------------------------------------------------------- | -------------------------- | ------------- |
| logo      | Configuration of logo, supports ReactNode and string                                | `ReactNode`                | -             |
| title     | title, can be empty                                                                 | `ReactNode \| false`       | -             |
| subTitle  | Secondary title, can be configured as empty                                         | `ReactNode \| false`       | -             |
| actions   | Customize additional login functionality                                            | `ReactNode`                | -             |
| message   | A prompt configuration at the top of the form, you can configure some error message | `ReactNode \| false`       | -             |
| contentStyle | Style of the main login box                                                     | `React.CSSProperties`      | -             |
| containerStyle | Style of the login container                                                 | `React.CSSProperties`      | -             |
| otherStyle | Style of other areas                                                                | `React.CSSProperties`      | -             |

### LoginFormPage

LoginFormPage uses the left and right layout, and adds some ad slot configuration.

| parameter          | description                                                                                                                                                                                             | type                            | default value |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------- |
| logo               | Configuration of logo, supports ReactNode and string                                                                                                                                                    | `ReactNode \| string`           | -             |
| title              | title, can be empty                                                                                                                                                                                     | `ReactNode \| false`           | -             |
| subTitle           | Secondary title, can be configured as empty                                                                                                                                                             | `ReactNode \| false`           | -             |
| actions            | Customize additional login functionality                                                                                                                                                                | `ReactNode`                     | -             |
| message            | A prompt configuration at the top of the form, you can configure some error message                                                                                                                     | `ReactNode \| false`           | -             |
| backgroundImageUrl | The background image configuration of the entire area, it will not be displayed on the mobile phone                                                                                                     | `string`                        | -             |
| backgroundVideoUrl | The background video configuration of the entire area, takes priority over backgroundImageUrl                                                                                                           | `string`                        | -             |
| activityConfig     | The configuration of the activity, including title, subTitle, action, which represent the title, subtitle and action button respectively. You can also configure style to control the style of the area | `{title,subTitle,action,style}` | -             |
| containerStyle     | Style of the container                                                                                                                                                                                  | `React.CSSProperties`           | -             |
| mainStyle          | Style of the main area                                                                                                                                                                                  | `React.CSSProperties`           | -             |
| otherStyle         | Style of other areas                                                                                                                                                                                    | `React.CSSProperties`           | -             |
