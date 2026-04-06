### Icon Library

ProComponents and Ant Design use `@ant-design/icons`.

**Usage Pattern**:

```typescript
import {
  PlusOutlined,
  SettingOutlined,
  CloseOutlined,
  UserOutlined
} from '@ant-design/icons'

// In components
<Button icon={<PlusOutlined />}>Add item</Button>
```

**Finding Icons**:

- Icons are divided into three styles: `Outlined`, `Filled`, `TwoTone`.
- Suffix indicates style (e.g. `HomeOutlined`, `HomeFilled`).
- Always check `@ant-design/icons` package for availability.
