# Typography Design Tokens

ProComponents uses Ant Design's typography tokens.

## Token Categories

### Font Size

- `fontSize`: Default font size (14px).
- `fontSizeSM`: Small font size (12px).
- `fontSizeLG`: Large font size (16px).
- `fontSizeXL`: Extra large font size (20px).
- `fontSizeHeading1`: H1 size.
- `fontSizeHeading2`: H2 size.
- `fontSizeHeading3`: H3 size.
- `fontSizeHeading4`: H4 size.
- `fontSizeHeading5`: H5 size.

### Line Height

- `lineHeight`: Default line height.
- `lineHeightHeading1` to `lineHeightHeading5`: Line heights for headings.

### Font Weight

- `fontWeightStrong`: Bold weight (600).

## Usage

```tsx
import { theme } from 'antd';

const { useToken } = theme;

const MyComponent = () => {
  const { token } = useToken();

  return (
    <h1
      style={{
        fontSize: token.fontSizeHeading1,
        fontWeight: token.fontWeightStrong,
      }}
    >
      Title
    </h1>
  );
};
```
