---
nav:
  title: Card
group: Card
title: CheckCard - Multi-select Card
order: 1
atomId: CheckCard
---

# CheckCard - Multi-select Card

The CheckCard is a card that can contain various related descriptive information and can be selected. Features:

- ① Can contain various related descriptive information, such as title, description, image, labels, etc.
- ② Has a clear boundary.
- ③ Has a clear selected state.

## When to use

- When you need to display multiple descriptive information of selected objects.
- When the number of selected objects is not large.

## Code Demo

### Basic Usage

The most commonly used example of a card, including avatar, title, description, etc., and can be selected.

<code src="../../../demos/card/CheckCard/basic.tsx" ></code>

<code src="../../../demos/card/CheckCard/single.tsx"  description="When there are multiple options, you can use the `CheckCard.Group` to group them. The default option card component is in single selection mode." thumbnail="https://gw.alipayobjects.com/zos/bmw-prod/be0fcade-afae-4e85-95ef-a3cc90f6d4b3/kc60kq47_w1362_h412.jpeg" ></code>

<code src="../../../demos/card/CheckCard/multiple.tsx"  thumbnail="https://gw.alipayobjects.com/zos/bmw-prod/06963ad4-ba2b-4733-a1c5-778e7f696ac1/kc61xhvk_w1364_h280.jpeg" description="Set the `multiple` property of `CheckCard.Group` to enable multiple selection. Note that in multiple selection mode, the form item returns an array." ></code>

### Different Sizes

Configure the `size` property to change the size of the card. Currently available options are `large`, `default`, and `small`, with only the width being different.

<code src="../../../demos/card/CheckCard/size.tsx" ></code>

Of course, you can also customize the size of the card using the `style` or `className` properties.

### Custom Size

<code src="../../../demos/card/CheckCard/custom.tsx" ></code>

### Using in Form

CheckCard can be used together with form components. Here is an example.

<code src="../../../demos/card/CheckCard/form.tsx" oldtitle="CheckCard - Using in Form" thumbnail="https://gw.alipayobjects.com/zos/bmw-prod/c8fa2080-5a46-4f50-ae99-846b1804f56d/kc62b0ug_w1360_h656.jpeg" ></code>

### Composing Styles

The avatar, title, and description areas can be freely combined or presented separately. The component will adjust the alignment for you.

<code src="../../../demos/card/CheckCard/compose.tsx" ></code>

### Custom Avatar

You can customize the avatar area using the `avatar` property.

<code src="../../../demos/card/CheckCard/avatar.tsx" ></code>

### Custom Title

You can customize the title area using the `title` property.

<code src="../../../demos/card/CheckCard/title.tsx" ></code>

### Custom Description

The description area can be customized using the `description` property with a React node.

<code src="../../../demos/card/CheckCard/description.tsx" ></code>

### Default Checked

Set the `defaultChecked` property to `true` to specify that the option is checked by default.

<code src="../../../demos/card/CheckCard/defaultChecked.tsx" ></code>

### Action Area

Use the `extra` property to add an action area to the card.

<code src="../../../demos/card/CheckCard/extra.tsx" ></code>

### Loading State

Set the `loading` property to `true` to indicate that the content is still loading.

<code src="../../../demos/card/CheckCard/loading.tsx" ></code>

### Image Only Option

By only setting the `cover` property, you can create an image-only option.

<code src="../../../demos/card/CheckCard/image.tsx" ></code>

## API

### CheckCard

| Parameter      | Description                         | Type                              | Default     |
| -------------- | ----------------------------------- | --------------------------------- | ----------- |
| avatar         | Avatar                              | `ReactNode`                       | -           |
| title          | Title                               | `ReactNode`                       | -           |
| description    | Description                         | `ReactNode`                       | -           |
| cover          | Cover                               | `ReactNode`                       | -           |
| extra          | Action area                         | `ReactNode`                       | -           |
| size           | Size                                | `'large' \| 'default' \| 'small'` | `'default'` |
| checked        | Whether checked                     | `boolean`                         | -           |
| defaultChecked | Default checked state               | `boolean`                         | `false`     |
| disabled       | Whether disabled                    | `boolean`                         | `false`     |
| loading        | Loading state                       | `boolean`                         | `false`     |
| onChange       | Callback when checked state changes | `(checked: boolean) => void`      | -           |
| onClick        | Click callback                      | `(e: MouseEvent) => void`         | -           |

### CheckCard.Group

| Parameter    | Description                     | Type                                  | Default |
| ------------ | ------------------------------- | ------------------------------------- | ------- |
| multiple     | Whether multiple selection      | `boolean`                             | `false` |
| value        | Currently selected value        | `string \| string[]`                  | -       |
| defaultValue | Default selected value          | `string \| string[]`                  | -       |
| onChange     | Callback when selection changes | `(value: string \| string[]) => void` | -       |
| options      | Option configuration            | `CheckCardOption[]`                   | -       |

### CheckCardOption

| Parameter   | Description      | Type        | Default |
| ----------- | ---------------- | ----------- | ------- |
| title       | Title            | `ReactNode` | -       |
| description | Description      | `ReactNode` | -       |
| avatar      | Avatar           | `ReactNode` | -       |
| cover       | Cover            | `ReactNode` | -       |
| extra       | Action area      | `ReactNode` | -       |
| value       | Option value     | `string`    | -       |
| disabled    | Whether disabled | `boolean`   | `false` |
