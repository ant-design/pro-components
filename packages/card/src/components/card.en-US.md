---
title: ProCard
atomId: ProCard
nav:
  title: Components
---

# ProCard

In-page container cards that provide standard card styles, card segmentation and grid layout capabilities. ProCard creatively combines `Col`, `Row`, `Card`, `Tabs` and other component implementations together, allowing you to complete various card-related layouts with only one component.

- If you also need to use it with the chart, you can refer to the `StatisticCard` indicator card component, which is a further package of ProCard.
- If you also need to encapsulate `ProCard`, note that you need to expose the static property of `isProCard=true` so that ProCard can be recognized as the same element.

## When to use

- When a standard card is required to hold the content.
- When multiple card grids are required, gutter layout.
- When in-card split layout is required.
- When the card is required to be foldable.

## Code demo

### Basic Card

When used alone a `ProCard` is just a regular card.

<code src="../demos/basic.tsx" background="var(--main-bg-color)" oldtitle="Basic Card"></code>

### Grid layout

When nesting child cards, the component will automatically switch to `flex` flex box layout, you can set `direction` to `column` to specify the flex direction, you can also configure the `ghost` property to `true` to remove Background color and padding facilitate in-page layout.

<code src="../demos/colspan.tsx" background="var(--main-bg-color)" oldtitle="Grid Layout"></code>

### Responsive

`colSpan` supports [Grid Responsive Layout](https://ant.design/components/grid-cn/#components-grid-demo-responsive) defined by antd. There are six preset response sizes: `xs` `sm` `md` `lg` `xl` `xxl`. If you want to support responsiveness, you can write `{ xs: 4, sm: 8, md: 10, lg: 12 }`.

<code src="../demos/responsive.tsx" background="var(--main-bg-color)" oldtitle="responsive"></code>

### Card segmentation

In layout mode, by configuring `split`, you can easily split the card, and you can make any column, whether it is horizontal or vertical cutting, it is very convenient, the split column still retains the characteristics of the card, and the height is automatically filled. Notice:

- The content `padding` of the parent card will be set to 0 when splitting.
- `border-radius` of subcards will be set to 0 when splitting.

<code src="../demos/split2.tsx" background="var(--main-bg-color)" oldtitle="Card Splitting"></code>

### Left and right columns

Through the card segmentation ability, we can easily achieve the effect of left and right columns, which is very suitable for the structure of the list on the left and the details on the right.

<code src="../demos/split23.tsx" background="var(--main-bg-color)" oldtitle="Left and right columns"></code>

### Complex segmentation

Through the card segmentation capability, we can achieve more complex data presentation forms.

<code src="../demos/split.tsx" background="var(--main-bg-color)" oldtitle="Complex Split"></code>

### Grid interval

The grid often needs to cooperate with the interval. You can use the `gutter` property. We recommend using `(16+8n)px` as the grid interval (n is a natural number). If you want to support responsiveness, you can write it as `{ xs: 8, sm: 16, md: 24, lg: 32 }`. If vertical spacing is required, it can be written in array form `[horizontal spacing, vertical spacing][16, { xs: 8, sm: 16, md: 24, lg: 32 }]`.

<code src="../demos/gutter.tsx" background="var(--main-bg-color)" oldtitle="Grid Gutter"></code>

### Multi-Line Cards

The default card layout does not wrap, you can configure `wrap` to `true` to enable line wrapping between multiple cards, which is suitable for multiple card layouts.

<code src="../demos/multipleLine.tsx" background="var(--main-bg-color)" oldtitle="Multiple Line Cards"></code>

### group display

You can nest card components to group content, and `Divider` subcomponents to separate those content.

<code src="../demos/divider.tsx" background="var(--main-bg-color)" oldtitle="Group Indicator"></code>

### Title with dividing line

When adding a divider it automatically increases the height of the header to separate it from the content area.

<code src="../demos/headerBordered.tsx" background="var(--main-bg-color)" oldtitle="Title with dividing line"></code>

### Collapsible

- You can use `collapsible` to configure whether the card is collapsible or not, and configure whether the card is collapsed by default through the `defaultCollapsed` property.
- Or you can customize it by controlling the `collapsed` property.

<code src="../demos/collapsible.tsx" background="var(--main-bg-color)" oldtitle="collapsible"></code>

### Deck expansion

With the `ghost` ghost mode and collapsible ability, the card deck can be expanded.

<code src="../demos/group.tsx" background="var(--main-bg-color)" oldtitle="Card group expansion"></code>

### Content centered

Configure the `layout` property to `center` to control the vertical centering of the content. When setting the centering, the content part is converted to a `flex` layout. You can use `direction` to control the `flex` direction.

<code src="../demos/layout.tsx" background="var(--main-bg-color)" oldtitle="Center content"></code>

### Loading

Configure the `loading` property to `true` to control the loading of the card. You can also pass the DOM to `loading` to customize the loading display.

<code src="../demos/loading.tsx" background="var(--main-bg-color)" oldtitle="Loading"></code>

### Action items

Configure the `actions` property to configure card actions.

<code src="../demos/actions.tsx" background="var(--main-bg-color)" oldtitle="Actions"></code>

### Untitled

The header is automatically hidden when there is no content.

<code src="../demos/headless.tsx" background="var(--main-bg-color)" oldtitle="Untitled"></code>

### with border

Configure the `bordered` property to control whether the card is bordered.

<code src="../demos/bordered.tsx" oldtitle="With border"></code>

### floating effect

<code src="../demos/hoverable.tsx" oldtitle="Flyover" desc="Configure popover via hoverable" background="var(--main-bg-color)"></code>

### bookmark

Configure the `tabs` property with the `ProCard.TabPane` subcomponent to configure the tab bar of the card.

<code src="../demos/tabs.tsx" background="var(--main-bg-color)" oldtitle="tabs"></code>

### Card Tab

Set the `type` of `tab` to `card` to configure card-style tabs.

<code src="../demos/tabs-card.tsx" background="var(--main-bg-color)" oldtitle="Card Tabs"></code>

### Internal Cards

Can be placed inside a card to display information in a multi-level structure.

<code src="../demos/inner.tsx" oldtitle="Inner Card"></code>

### Vertical step example

The `Steps` component is combined with the `ProCard` component to complete the vertical step example.

<code src="../demos/steps-v.tsx" background="var(--main-bg-color)" oldtitle="Example of vertical steps"></code>

## API

| Parameters | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| title | title | `React.ReactNode` | - |  |
| subTitle | Subtitle | `React.ReactNode` | - |  |
| tooltip | Icon hover prompt information on the right side of the title | `string` | - |  |
| headStyle | The style of the header | `CSSProperties` | - |  |
| bodyStyle | style of the content area | `CSSProperties` | - |  |
| extra | Custom area in the upper right corner | `React.ReactNode` | - |  |
| layout | Content layout, supports vertical centering | `default` \| `center` | default |  |
| loading | Loading, support custom loading style | `boolean` \| `ReactNode` | false |  |
| colSpan | Grid layout width, 24 grid, supports specifying width px or percentage, supports responsive object writing `{ xs: 8, sm: 16, md: 24}`, only set on nested subcards efficient. | `number` \| `string` | 24 |  |
| gutter | Number or use array form to set \[horizontal spacing, vertical spacing], supports responsive object notation `{ xs: 8, sm: 16, md: 24}` | `number` \| `array` | 0 |  |
| split | Direction to split the card | `vertical` \| `horizontal` | - |  |
| type | card type | `inner` \| `default` | - |  |
| size | card size | `default` \| `small` | - |  |
| actions | Card action group, located at the bottom of the card | `Array&lt;ReactNode>` | - |  |
| direction | Specifies the flex direction, only valid when subcards are nested, the default direction is row horizontal | `column` | - |  |
| wrap | Whether to support line wrapping, only valid when subcards are nested | false | - | 1.12.0 |
| bordered | whether to have a border | `boolean` | false |  |
| ghost | Ghost mode, that is, whether to cancel the padding of the card content area and the background color of the card. | `boolean` | false |  |
| headerBordered | Whether the header has a dividing line | `boolean` | false |  |
| collapsed | Controlled property, whether to collapse | `boolean` | false |  |
| collapsible | Whether the configuration is collapsible, invalid when controlled | `boolean` | false |  |
| collapsibleIconRender | Replaces default collapsed icon | `({ collapsed }: { collapsed: boolean }) => React.ReactNode` | - |  |
| defaultCollapsed | Default collapsing, invalid when controlled | `boolean` | false |  |
| onCollapse | Collapsed card event, invalid when controlled | `(collapsed: boolean) => void` | - |  |
| tabs | Tab configuration | See below ProCardTabs | - |  |

### ProCardTabs

| parameter | description | type | default value |
| :-- | :-- | :-- | :-- |
| activeKey | currently selected item | string | - |
| type | The basic style of the tab, optional `line`, `card`, `editable-card` type | string | inline |
| onChange | callback | `(activeKey: string) => void;` | - |

- For more properties, see antd [Tab](https://ant.design/components/tabs-cn/#Tabs) API description.

### ProCard.TabPane

All properties of [Tabs.TabPane](https://ant.design/components/tabs-cn/#Tabs.TabPane) are supported.

| parameter | description | type | default value |
| :-- | :-- | :-- | :-- |
| key | Corresponding to activeKey, used to calibrate whether to select and dom update, must not repeat, otherwise it will cause abnormal performance | `string` | - |
| tab | Tab header display text | `ReactNode` | - |
| disabled | unavailable | `boolean` | false |
| cardProps | ProCard card property passthrough | `ProCard` | - |

### ProCard.Divider

Used to separate when grouping content.

| parameter | description     | type                     | default value |
| --------- | --------------- | ------------------------ | ------------- |
| type      | Separation type | `horizontal \| vertical` | -             |

### ProCard.Group

The property is the same as ProCard, but the card content margin will be cancelled, which is used to group multiple cards.
