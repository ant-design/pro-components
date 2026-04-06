### ProLayout

**Purpose**: A heavy-duty layout component that provides a complete application frame including Sidebar, Header, Content, and Footer.

**When to use**:

- As the root component of your admin application.
- When you need a responsive layout with collapsible sidebar.
- When you need automatic menu generation from routes.

**API Overview**:

- `layout`: 'side' | 'top' | 'mix'.
- `route`: Route configuration object.
- `location`: Current location (usually from router).
- `menuItemRender`: Custom render for menu items.
- `headerContentRender`: Custom content in the header.
- `rightContentRender`: Custom content in the top right (user profile, settings).
- `footerRender`: Custom footer.
- `token`: Design tokens for customization.

**Usage Pattern**:

```tsx
import { ProLayout } from '@ant-design/pro-components';
import { Button } from 'antd';

export default (props) => {
  return (
    <ProLayout
      title="My Application"
      logo="https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg"
      layout="mix"
      splitMenus={false}
      route={{
        routes: [
          {
            path: '/welcome',
            name: 'Welcome',
            icon: 'smile',
          },
          {
            path: '/admin',
            name: 'Admin',
            icon: 'crown',
            routes: [
              {
                path: '/admin/sub-page',
                name: 'Sub Page',
                icon: 'smile',
                component: './Welcome',
              },
            ],
          },
        ],
      }}
      location={{
        pathname: '/welcome',
      }}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        title: 'User Name',
        size: 'small',
      }}
      actionsRender={(props) => {
        if (props.isMobile) return [];
        return [
          <Button key="key" type="text">
            Action
          </Button>,
        ];
      }}
    >
      {props.children}
    </ProLayout>
  );
};
```

**Common Mistakes**:

- Not passing `location` causing the menu highlight to fail.
- Forgetting to handle `menuItemRender` when using a router (like `react-router-dom`) to use `Link` instead of `a` tags.
- Using `mix` layout without setting `splitMenus` correctly for the desired behavior.
