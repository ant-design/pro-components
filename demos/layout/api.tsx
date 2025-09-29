import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter, PageContainer, ProLayout } from '@xxlabs/pro-components';
import { Switch } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';

export default () => {
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [menu, setMenu] = useState(true);
  const [header, setHeader] = useState(true);
  const [footer, setFooter] = useState(true);
  const [menuHeader, setMenuHeader] = useState(true);
  const [right, setRight] = useState(true);
  const [pure, setPure] = useState(false);
  const [collapsedButtonRender, setCollapsedButtonRender] = useState(true);
  return (
    <>
      <Switch
        checked={loading}
        style={{
          margin: 8,
        }}
        onChange={(e) => setLoading(e)}
      />
      loading 状态
      <Switch
        checked={collapsed}
        style={{
          margin: 8,
        }}
        onChange={(e) => setCollapsed(e)}
      />
      折叠layout
      <Switch
        checked={menu}
        style={{
          margin: 8,
        }}
        onChange={(e) => setMenu(e)}
      />
      显示菜单
      <Switch
        checked={collapsedButtonRender}
        style={{
          margin: 8,
        }}
        onChange={(e) => setCollapsedButtonRender(e)}
      />
      显示折叠按钮
      <Switch
        checked={header}
        style={{
          margin: 8,
        }}
        onChange={(e) => setHeader(e)}
      />
      显示顶栏
      <Switch
        checked={menuHeader}
        style={{
          margin: 8,
        }}
        onChange={(e) => setMenuHeader(e)}
      />
      显示菜单头
      <Switch
        checked={footer}
        style={{
          margin: 8,
        }}
        onChange={(e) => setFooter(e)}
      />
      显示页脚
      <Switch
        checked={right}
        style={{
          margin: 8,
        }}
        onChange={(e) => setRight(e)}
      />
      显示顶栏右侧
      <Switch
        checked={pure}
        style={{
          margin: 8,
        }}
        onChange={(e) => setPure(e)}
      />
      清爽模式
      <br />
      <br />
      <ProLayout
        {...defaultProps}
        avatarProps={{
          src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
        }}
        breakpoint={false}
        collapsed={collapsed}
        collapsedButtonRender={collapsedButtonRender ? undefined : false}
        footerRender={() =>
          footer ? (
            <DefaultFooter
              copyright="2022 蚂蚁金服体验技术部出品"
              links={[
                {
                  key: 'Ant Design Pro',
                  title: 'Ant Design Pro',
                  href: 'https://pro.ant.design',
                  blankTarget: true,
                },
                {
                  key: 'github',
                  title: <GithubOutlined />,
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
            />
          ) : null
        }
        headerRender={header ? undefined : false}
        loading={loading}
        location={{
          pathname: '/welcome',
        }}
        menuHeaderRender={menuHeader ? undefined : false}
        menuRender={(_, dom) => (menu ? dom : null)}
        pure={pure}
        style={{
          height: '100vh',
        }}
        onCollapse={setCollapsed}
      >
        <PageContainer content="欢迎使用">Hello World</PageContainer>
      </ProLayout>
    </>
  );
};
