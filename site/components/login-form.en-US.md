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

`LoginForm` provides a centered layout; `onFinish` handles account submissions.

<code src="../../demos/form/login-form/login-form.tsx" background="var(--main-bg-color)" title="Account login"></code>

`ProFormCaptcha.onGetCaptcha` retrieves a sample verification code.

<code src="../../demos/form/login-form/login-form-phone.tsx" background="var(--main-bg-color)" title="Phone verification login"></code>

`actions` places alternative login methods beneath the form.

<code src="../../demos/form/login-form/login-form-actions.tsx" background="var(--main-bg-color)" title="Alternative login actions"></code>

`ProFormText.Password.fieldProps.statusRender` shows password strength as the user types.

<code src="../../demos/form/login-form/login-password-strength.tsx" background="var(--main-bg-color)" title="Password strength"></code>

## Full-page login shell

`LoginFormPage.backgroundImageUrl` sets an image background.

<code src="../../demos/form/login-form/login-form-page.tsx" background="var(--main-bg-color)" iframe="760" title="Image background login page"></code>

`backgroundVideoUrl` sets a video background.

<code src="../../demos/form/login-form/login-form-page-video.tsx" background="var(--main-bg-color)" iframe="760" title="Video background login page"></code>

`activityConfig` displays a campaign title, description, and action.

<code src="../../demos/form/login-form/login-form-page-activity.tsx" background="var(--main-bg-color)" iframe="760" title="Login activity area"></code>

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
