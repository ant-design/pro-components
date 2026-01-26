# Layout Design Tokens

ProLayout uses a specific set of design tokens to control its appearance. These tokens can be configured via `ProConfigProvider` or `ProLayout`'s `token` prop.

## Token Structure

The `LayoutDesignToken` consists of:

### Sider Tokens (`sider`)
Controls the appearance of the side menu.
- `colorMenuBackground`: Background color of the menu
- `colorBgMenuItemSelected`: Background of selected item
- `colorTextMenuSelected`: Text color of selected item
- `colorBgMenuItemHover`: Background of hovered item
- `colorTextMenu`: Default text color
- `menuHeight`: Height of menu items

### Header Tokens (`header`)
Controls the appearance of the top header.
- `colorBgHeader`: Background color
- `heightLayoutHeader`: Height of the header (default 56)
- `colorHeaderTitle`: Color of the title
- `colorTextMenu`: Color of menu items in header

### PageContainer Tokens (`pageContainer`)
Controls the content area wrapper.
- `colorBgPageContainer`: Background color of the page container
- `paddingInlinePageContainerContent`: Horizontal padding
- `paddingBlockPageContainerContent`: Vertical padding

## Usage

```tsx
<ProLayout
  token={{
    header: {
      colorBgHeader: '#292f33',
      colorHeaderTitle: '#fff',
    },
    sider: {
      colorMenuBackground: '#fff',
    },
  }}
>
  {/* content */}
</ProLayout>
```
