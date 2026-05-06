import {
  AppstoreFilled,
  AuditOutlined,
  BranchesOutlined,
  ContainerFilled,
  FileDoneOutlined,
  GithubFilled,
  HomeFilled,
  InfoCircleFilled,
  OrderedListOutlined,
  ProfileFilled,
  QuestionCircleFilled,
  SafetyCertificateFilled,
  TagsFilled,
  TeamOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Segmented, Space, theme } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';

// enum-switch 专用路由：一级菜单不带 icon，二级菜单带 icon
const routeWithSecondLevelIcons = {
  path: '/',
  routes: [
    {
      path: '/welcome',
      name: '工作台',
      icon: <HomeFilled />,
      component: './Welcome',
    },
    {
      path: '/product',
      name: '商品管理',
      component: './Product',
      routes: [
        {
          path: '/product/list',
          name: '商品列表',
          icon: <UnorderedListOutlined />,
          routes: [
            { path: 'on-sale', name: '在售商品', component: './Welcome' },
            { path: 'draft', name: '草稿箱', component: './Welcome' },
            { path: 'off-shelf', name: '已下架', component: './Welcome' },
          ],
        },
        {
          path: '/product/category',
          name: '商品分类',
          icon: <AppstoreFilled />,
          component: './Welcome',
        },
        {
          path: '/product/brand',
          name: '品牌管理',
          icon: <TagsFilled />,
          component: './Welcome',
        },
        {
          path: '/product/inventory',
          name: '库存管理',
          icon: <ContainerFilled />,
          component: './Welcome',
        },
      ],
    },
    {
      path: '/order',
      name: '订单中心',
      component: './Order',
      routes: [
        {
          path: '/order/sales',
          name: '销售订单',
          icon: <OrderedListOutlined />,
          routes: [
            { path: 'pending', name: '待付款', component: './Welcome' },
            { path: 'paid', name: '已付款', component: './Welcome' },
            { path: 'shipped', name: '已发货', component: './Welcome' },
            { path: 'completed', name: '已完成', component: './Welcome' },
          ],
        },
        {
          path: '/order/refund',
          name: '退款售后',
          icon: <BranchesOutlined />,
          component: './Welcome',
        },
        {
          path: '/order/invoice',
          name: '发票申请',
          icon: <FileDoneOutlined />,
          component: './Welcome',
        },
      ],
    },
    {
      path: '/admin',
      name: '系统管理',
      access: 'canAdmin',
      component: './Admin',
      routes: [
        {
          path: '/admin/users',
          name: '用户管理',
          icon: <TeamOutlined />,
          component: './Welcome',
        },
        {
          path: '/admin/roles',
          name: '角色权限',
          icon: <SafetyCertificateFilled />,
          component: './Welcome',
        },
        {
          path: '/admin/menu',
          name: '菜单管理',
          icon: <ProfileFilled />,
          component: './Welcome',
        },
        {
          path: '/admin/audit-logs',
          name: '操作日志',
          icon: <AuditOutlined />,
          component: './Welcome',
        },
      ],
    },
  ],
};

const Demo = () => {
  const { token } = theme.useToken();

  const [layout, setLayout] = useState<ProSettings['layout']>('side');
  const [splitMenus, setSplitMenus] = useState(false);
  const [contentWidth, setContentWidth] = useState<'Fluid' | 'Fixed'>('Fluid');
  const [siderMenuType, setSiderMenuType] = useState<'sub' | 'group'>('group');

  const [pathname, setPathname] = useState('/welcome');

  return (
    <div
      style={{
        height: 500,
        overflow: 'auto',
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
      }}
    >
      <ProLayout
        {...defaultProps}
        route={routeWithSecondLevelIcons}
        layout={layout}
        splitMenus={layout === 'side' ? splitMenus : false}
        contentWidth={contentWidth}
        siderMenuType={siderMenuType}
        fixSiderbar
        location={{ pathname }}
        avatarProps={{
          src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
          size: 'small',
          title: '书琰',
        }}
        actionsRender={() => [
          <InfoCircleFilled key="info" />,
          <QuestionCircleFilled key="question" />,
          <GithubFilled key="github" />,
        ]}
        menuItemRender={(item, dom) => (
          <div onClick={() => setPathname(item.path || '/welcome')}>{dom}</div>
        )}
      >
        <PageContainer>
          <ProCard style={{ marginBlockEnd: 16 }} variant="outlined">
            <Space orientation="vertical" size={12} style={{ width: '100%' }}>
              <Space>
                <span>layout 导航模式：</span>
                <Segmented
                  value={layout}
                  onChange={(v) => setLayout(v as ProSettings['layout'])}
                  options={[
                    { label: '侧栏 side', value: 'side' },
                    { label: '顶部 top', value: 'top' },
                  ]}
                />
              </Space>
              {layout === 'side' ? (
                <Space>
                  <span>顶栏一级菜单 splitMenus：</span>
                  <Segmented
                    value={splitMenus ? 'on' : 'off'}
                    onChange={(v) => setSplitMenus(v === 'on')}
                    options={[
                      { label: '关闭', value: 'off' },
                      { label: '开启', value: 'on' },
                    ]}
                  />
                </Space>
              ) : null}
              <Space>
                <span>contentWidth 内容宽度：</span>
                <Segmented
                  value={contentWidth}
                  onChange={(v) => setContentWidth(v as 'Fluid' | 'Fixed')}
                  options={[
                    { label: '流式 Fluid', value: 'Fluid' },
                    { label: '定宽 Fixed', value: 'Fixed' },
                  ]}
                />
              </Space>
              <Space>
                <span>siderMenuType 菜单模式：</span>
                <Segmented
                  value={siderMenuType}
                  onChange={(v) => setSiderMenuType(v as any)}
                  options={[
                    { label: '子菜单 sub', value: 'sub' },
                    { label: '分组 group', value: 'group' },
                  ]}
                />
              </Space>
            </Space>
          </ProCard>
          <ProCard style={{ minHeight: 300 }}>
            <div>
              当前配置：layout=<b>{layout}</b>、contentWidth=
              <b>{contentWidth}</b>
              、siderMenuType=<b>{siderMenuType}</b>
            </div>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default Demo;
