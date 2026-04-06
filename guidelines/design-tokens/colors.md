# Color Design Tokens

ProComponents inherits the Design Token system from Ant Design v5.

## Token Categories

### Brand Color (`colorPrimary`)

The primary color of the application.

- `colorPrimary`: Main brand color.
- `colorPrimaryBg`: Background color for light brand elements.
- `colorPrimaryText`: Text color for brand elements.

### Functional Colors

- `colorSuccess`: Success state (Green).
- `colorWarning`: Warning state (Gold).
- `colorError`: Error state (Red).
- `colorInfo`: Info state (Blue).

### Neutral Colors

- `colorText`: Default text color.
- `colorTextSecondary`: Secondary text color.
- `colorTextTertiary`: Tertiary text color.
- `colorBgContainer`: Container background color (usually white).
- `colorBgLayout`: Layout background color (usually light gray).
- `colorBorder`: Default border color.

## Usage

You can access these tokens using `useToken` hook from `antd`.

```tsx
import { theme } from 'antd';

const { useToken } = theme;

const MyComponent = () => {
  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorPrimary,
        color: token.colorTextLightSolid,
      }}
    >
      Brand Content
    </div>
  );
};
```

## ProComponents Specifics

ProComponents may use additional tokens for specific layouts, which are documented in [layout.md](layout.md).
