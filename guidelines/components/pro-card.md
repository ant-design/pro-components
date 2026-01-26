### ProCard

**Purpose**: An extended Card component that supports grid layout, splitting, and tabs.

**When to use**:

- To organize content into sections.
- To create dashboard layouts with multiple cards.
- When you need a card that can be split vertically or horizontally.
- When you need tabs inside a card.

**API Overview**:

- `title`: Card title.
- `extra`: Action area in top right.
- `split`: 'vertical' | 'horizontal'. Split the card into multiple sections.
- `colSpan`: Grid width (like `antd` Col).
- `gutter`: Spacing between grid items.
- `tabs`: Configure tabs inside the card.
- `collapsible`: Whether the card can be collapsed.
- `ghost`: Transparent background.

**Usage Pattern**:

```tsx
import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard
      title="Card Title"
      extra="More"
      split="vertical"
      bordered
      headerBordered
    >
      <ProCard title="Left Details" colSpan="50%">
        Left Content
      </ProCard>
      <ProCard title="Right Details">
        <div style={{ height: 360 }}>Right Content</div>
      </ProCard>
    </ProCard>
  );
};
```

**Grid Layout**:

```tsx
<ProCard gutter={16} ghost>
  <ProCard colSpan={12} layout="center" bordered>
    Col 12
  </ProCard>
  <ProCard colSpan={6} layout="center" bordered>
    Col 6
  </ProCard>
  <ProCard colSpan={6} layout="center" bordered>
    Col 6
  </ProCard>
</ProCard>
```

**Tabs**:

```tsx
<ProCard
  tabs={{
    type: 'card',
    items: [
      {
        label: 'Tab 1',
        key: 'tab1',
        children: 'Content 1',
      },
      {
        label: 'Tab 2',
        key: 'tab2',
        children: 'Content 2',
      },
    ],
  }}
/>
```

**Best Practices**:

- Use `ghost` mode when placing cards on a gray background (like in `ProLayout`).
- Use `split` to create master-detail views.
- Use `colSpan` for responsive layouts.
