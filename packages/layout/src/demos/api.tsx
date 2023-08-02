import { GithubOutlined } from '@ant-design/icons';
import {
  DefaultFooter,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
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
        onChange={(e) => setLoading(e)}
        style={{
          margin: 8,
        }}
      />
      loading 状态
      <Switch
        checked={collapsed}
        onChange={(e) => setCollapsed(e)}
        style={{
          margin: 8,
        }}
      />
      折叠layout
      <Switch
        checked={menu}
        onChange={(e) => setMenu(e)}
        style={{
          margin: 8,
        }}
      />
      显示菜单
      <Switch
        checked={collapsedButtonRender}
        onChange={(e) => setCollapsedButtonRender(e)}
        style={{
          margin: 8,
        }}
      />
      显示折叠按钮
      <Switch
        checked={header}
        onChange={(e) => setHeader(e)}
        style={{
          margin: 8,
        }}
      />
      显示顶栏
      <Switch
        checked={menuHeader}
        onChange={(e) => setMenuHeader(e)}
        style={{
          margin: 8,
        }}
      />
      显示菜单头
      <Switch
        checked={footer}
        onChange={(e) => setFooter(e)}
        style={{
          margin: 8,
        }}
      />
      显示页脚
      <Switch
        checked={right}
        onChange={(e) => setRight(e)}
        style={{
          margin: 8,
        }}
      />
      显示顶栏右侧
      <Switch
        checked={pure}
        onChange={(e) => setPure(e)}
        style={{
          margin: 8,
        }}
      />
      清爽模式
      <br />
      <br />
      <ProLayout
        {...defaultProps}
        style={{
          height: '100vh',
        }}
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
              copyright="2022 蚂蚁金服体验技术部出品"
            />
          ) : null
        }
      >
        <PageContainer content="欢迎使用">Hello World</PageContainer>
      </ProLayout>
    </>
  );
};
