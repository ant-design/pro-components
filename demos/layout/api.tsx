import { GithubFilled } from '@ant-design/icons';
import {
  DefaultFooter,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';

const Demo = () => {
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [menu, setMenu] = useState(true);
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [menuHeader, setMenuHeader] = useState(true);
  const [pure, setPure] = useState(false);
  const [collapsedButtonRender, setCollapsedButtonRender] = useState(true);

  const switches = [
    { label: 'loading 状态', checked: loading, onChange: setLoading },
    { label: '折叠layout', checked: collapsed, onChange: setCollapsed },
    { label: '显示菜单', checked: menu, onChange: setMenu },
    {
      label: '显示折叠按钮',
      checked: collapsedButtonRender,
      onChange: setCollapsedButtonRender,
    },
    { label: '显示顶栏', checked: header, onChange: setHeader },
    { label: '显示菜单头', checked: menuHeader, onChange: setMenuHeader },
    { label: '显示页脚', checked: footer, onChange: setFooter },
    { label: '清爽模式', checked: pure, onChange: setPure },
  ];

  return (
    <ProLayout
      {...defaultProps}
      style={{ height: '100vh' }}
      menuHeaderRender={menuHeader ? undefined : false}
      headerRender={header ? undefined : false}
      collapsedButtonRender={collapsedButtonRender ? undefined : false}
      menuRender={(_, dom) => (menu ? dom : null)}
      breakpoint={false}
      collapsed={collapsed}
      loading={loading}
      onCollapse={setCollapsed}
      avatarProps={{
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      }}
      location={{
        pathname: '/welcome',
      }}
      pure={pure}
      footerRender={() =>
        footer ? (
          <DefaultFooter
            links={[
              {
                key: 'Ant Design Pro',
                title: 'Ant Design Pro',
                href: 'https://pro.ant.design',
                blankTarget: true,
              },
              {
                key: 'github',
                title: <GithubFilled />,
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true,
              },
              {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'https://ant.design',
                blankTarget: true,
              },
            ]}
            copyright="2024 星辰科技体验技术部出品"
          />
        ) : null
      }
    >
      <PageContainer content="欢迎使用">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 16px',
            marginBottom: 16,
          }}
        >
          {switches.map(({ label, checked, onChange }) => (
            <span key={label} style={{ whiteSpace: 'nowrap' }}>
              <Switch
                size="small"
                checked={checked}
                onChange={onChange}
                style={{ marginInlineEnd: 4 }}
              />
              {label}
            </span>
          ))}
        </div>
        Hello World
      </PageContainer>
    </ProLayout>
  );
};

export default Demo;
