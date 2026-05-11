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
import { Button, Divider, Input, Segmented, Space, theme } from 'antd';
import { useMemo, useState } from 'react';
import type { ProTokenType } from '@ant-design/pro-components';
import defaultProps from './_defaultProps';

/**
 * 与站点文档 Layout「定制 token / Sider」表格对齐的表单默认值
 *（含 `colorText` 等语义处用 antd token 的初始渲染值填入输入框）
 */
function createDocTokenFormState(
  antd: ReturnType<typeof theme.useToken>['token'],
) {
  return {
    bgLayout: `linear-gradient(${antd.colorBgContainer}, ${antd.colorBgLayout} 28%)`,
    colorTextAppListIcon: '#666',
    colorTextAppListIconHover: 'rgba(0, 0, 0, 0.65)',
    colorBgAppListIconHover: 'rgba(0, 0, 0, 0.04)',
    headerColorBgHeader: 'rgba(240, 242, 245, 0.4)',
    headerColorHeaderTitle: antd.colorTextHeading,
    headerHeightLayoutHeader: '56',
    siderColorMenuBackground: '#f7f8fa',
    siderColorBgMenuItemSelected: 'rgba(0, 0, 0, 0.04)',
    siderColorBgCollapsedButton: '#fff',
    siderColorScrollbarThumb: '',
    siderColorScrollbarThumbHover: '',
    siderColorScrollbarTrack: '',
    siderScrollbarTrackThickness: '6',
    siderScrollbarThumbRadius: '3',
    pageColorBgPageContainer: 'transparent',
    pagePaddingBlockPageContainerContent: '24',
    pagePaddingInlinePageContainerContent: '40',
    pageColorBgPageContainerFixed: '#FFF',
  };
}

type DocTokenFormState = ReturnType<typeof createDocTokenFormState>;

function createEmptyDocTokenFormState(): DocTokenFormState {
  return {
    bgLayout: '',
    colorTextAppListIcon: '',
    colorTextAppListIconHover: '',
    colorBgAppListIconHover: '',
    headerColorBgHeader: '',
    headerColorHeaderTitle: '',
    headerHeightLayoutHeader: '',
    siderColorMenuBackground: '',
    siderColorBgMenuItemSelected: '',
    siderColorBgCollapsedButton: '',
    siderColorScrollbarThumb: '',
    siderColorScrollbarThumbHover: '',
    siderColorScrollbarTrack: '',
    siderScrollbarTrackThickness: '',
    siderScrollbarThumbRadius: '',
    pageColorBgPageContainer: '',
    pagePaddingBlockPageContainerContent: '',
    pagePaddingInlinePageContainerContent: '',
    pageColorBgPageContainerFixed: '',
  };
}

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
  /** Apps 列表：`default` 含描述走 DefaultContent；`simple` 无描述走 SimpleContent（与组件内判定一致） */
  const [appListType, setAppListType] = useState<'default' | 'simple'>(
    'default',
  );
  const [fixedHeader, setFixedHeader] = useState(true);

  const [pathname, setPathname] = useState('/welcome');

  const [docTokenForm, setDocTokenForm] = useState<DocTokenFormState>(() =>
    createDocTokenFormState(token),
  );

  const resetDocTokenForm = () => {
    setDocTokenForm(createDocTokenFormState(token));
  };

  const clearDocTokenForm = () => {
    setDocTokenForm(createEmptyDocTokenFormState());
  };

  const appList = useMemo(() => {
    const list = defaultProps.appList ?? [];
    if (appListType === 'simple') {
      return list.map((item) => {
        const { desc: _omitDesc, ...rest } = item;
        return rest;
      });
    }
    return list;
  }, [appListType]);

  const layoutToken = useMemo(() => {
    const h = parseInt(docTokenForm.headerHeightLayoutHeader, 10);
    const padBlock = parseInt(
      docTokenForm.pagePaddingBlockPageContainerContent,
      10,
    );
    const padInline = parseInt(
      docTokenForm.pagePaddingInlinePageContainerContent,
      10,
    );
    const st = parseInt(docTokenForm.siderScrollbarTrackThickness, 10);
    const sr = parseInt(docTokenForm.siderScrollbarThumbRadius, 10);
    return {
      bgLayout: docTokenForm.bgLayout,
      colorTextAppListIcon: docTokenForm.colorTextAppListIcon,
      colorTextAppListIconHover: docTokenForm.colorTextAppListIconHover,
      colorBgAppListIconHover: docTokenForm.colorBgAppListIconHover,
      header: {
        colorBgHeader: docTokenForm.headerColorBgHeader,
        colorHeaderTitle: docTokenForm.headerColorHeaderTitle,
        heightLayoutHeader: Number.isFinite(h) && h > 0 ? h : 56,
      },
      sider: {
        colorMenuBackground: docTokenForm.siderColorMenuBackground,
        colorBgMenuItemSelected: docTokenForm.siderColorBgMenuItemSelected,
        colorBgCollapsedButton: docTokenForm.siderColorBgCollapsedButton,
        ...(docTokenForm.siderColorScrollbarThumb.trim()
          ? {
              colorScrollbarThumb:
                docTokenForm.siderColorScrollbarThumb.trim(),
            }
          : {}),
        ...(docTokenForm.siderColorScrollbarThumbHover.trim()
          ? {
              colorScrollbarThumbHover:
                docTokenForm.siderColorScrollbarThumbHover.trim(),
            }
          : {}),
        ...(docTokenForm.siderColorScrollbarTrack.trim()
          ? {
              colorScrollbarTrack:
                docTokenForm.siderColorScrollbarTrack.trim(),
            }
          : {}),
        ...(Number.isFinite(st) && st > 0
          ? { scrollbarTrackThickness: st }
          : {}),
        ...(Number.isFinite(sr) && sr >= 0
          ? { scrollbarThumbRadius: sr }
          : {}),
      },
      pageContainer: {
        colorBgPageContainer: docTokenForm.pageColorBgPageContainer,
        colorBgPageContainerFixed: docTokenForm.pageColorBgPageContainerFixed,
        paddingBlockPageContainerContent:
          Number.isFinite(padBlock) && padBlock >= 0 ? padBlock : 24,
        paddingInlinePageContainerContent:
          Number.isFinite(padInline) && padInline >= 0 ? padInline : 40,
      },
    };
  }, [docTokenForm]);

  const patchDocToken = <K extends keyof DocTokenFormState>(
    key: K,
    value: DocTokenFormState[K],
  ) => {
    setDocTokenForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      style={{
        overflow: 'auto',
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
      }}
    >
      <ProLayout
        {...defaultProps}
        appList={appList}
        route={routeWithSecondLevelIcons}
        layout={layout}
        splitMenus={layout === 'side' ? splitMenus : false}
        contentWidth={contentWidth}
        siderMenuType={siderMenuType}
        fixedHeader={fixedHeader}
        token={layoutToken as ProTokenType['layout']}
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
        menuHeaderRender={(logo, title, props) =>
          props?.collapsed ? (
            <></>
          ) : (
            <a key="title">
              {logo}
              {title}
            </a>
          )
        }
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
                <span>fixedHeader 固定顶栏：</span>
                <Segmented
                  value={fixedHeader ? 'on' : 'off'}
                  onChange={(v) => setFixedHeader(v === 'on')}
                  options={[
                    { label: '关闭', value: 'off' },
                    { label: '开启', value: 'on' },
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
              <Space>
                <span>appList 类型：</span>
                <Segmented
                  value={appListType}
                  onChange={(v) => setAppListType(v as 'default' | 'simple')}
                  options={[
                    { label: '默认 default（含描述）', value: 'default' },
                    { label: '简洁 simple（无描述）', value: 'simple' },
                  ]}
                />
              </Space>
              <Space wrap>
                <span style={{ fontWeight: 500 }}>定制 token：</span>
                <Button size="small" type="link" onClick={resetDocTokenForm}>
                  重置
                </Button>
                <Button size="small" type="link" danger onClick={clearDocTokenForm}>
                  清除全部
                </Button>
              </Space>
              <Divider plain titlePlacement="start" style={{ margin: '4px 0' }}>
                Layout · 整体与跨站点应用（appList）
              </Divider>
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>bgLayout</span>
                  <Input
                    size="small"
                    value={docTokenForm.bgLayout}
                    onChange={(e) => patchDocToken('bgLayout', e.target.value)}
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    colorTextAppListIcon
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.colorTextAppListIcon}
                    onChange={(e) =>
                      patchDocToken('colorTextAppListIcon', e.target.value)
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    colorTextAppListIconHover
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.colorTextAppListIconHover}
                    onChange={(e) =>
                      patchDocToken('colorTextAppListIconHover', e.target.value)
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    colorBgAppListIconHover
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.colorBgAppListIconHover}
                    onChange={(e) =>
                      patchDocToken('colorBgAppListIconHover', e.target.value)
                    }
                  />
                </Space>
              </Space>
              <Divider plain titlePlacement="start" style={{ margin: '12px 0 4px' }}>
                Header · 顶栏
              </Divider>
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    header.colorBgHeader
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.headerColorBgHeader}
                    onChange={(e) =>
                      patchDocToken('headerColorBgHeader', e.target.value)
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    header.colorHeaderTitle
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.headerColorHeaderTitle}
                    onChange={(e) =>
                      patchDocToken('headerColorHeaderTitle', e.target.value)
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    header.heightLayoutHeader
                  </span>
                  <Input
                    size="small"
                    style={{ width: 120 }}
                    value={docTokenForm.headerHeightLayoutHeader}
                    onChange={(e) =>
                      patchDocToken('headerHeightLayoutHeader', e.target.value)
                    }
                  />
                </Space>
              </Space>
              <Divider plain titlePlacement="start" style={{ margin: '12px 0 4px' }}>
                Sider · 侧栏菜单与滚动条
              </Divider>
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    sider.colorMenuBackground
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.siderColorMenuBackground}
                    onChange={(e) =>
                      patchDocToken('siderColorMenuBackground', e.target.value)
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    sider.colorBgMenuItemSelected
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.siderColorBgMenuItemSelected}
                    onChange={(e) =>
                      patchDocToken(
                        'siderColorBgMenuItemSelected',
                        e.target.value,
                      )
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    sider.colorBgCollapsedButton
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.siderColorBgCollapsedButton}
                    onChange={(e) =>
                      patchDocToken(
                        'siderColorBgCollapsedButton',
                        e.target.value,
                      )
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    sider.colorScrollbarThumb
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    placeholder="默认 antd colorFillTertiary"
                    value={docTokenForm.siderColorScrollbarThumb}
                    onChange={(e) =>
                      patchDocToken('siderColorScrollbarThumb', e.target.value)
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    sider.colorScrollbarThumbHover
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    placeholder="默认 antd colorFillSecondary"
                    value={docTokenForm.siderColorScrollbarThumbHover}
                    onChange={(e) =>
                      patchDocToken(
                        'siderColorScrollbarThumbHover',
                        e.target.value,
                      )
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    sider.colorScrollbarTrack
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    placeholder="默认 transparent"
                    value={docTokenForm.siderColorScrollbarTrack}
                    onChange={(e) =>
                      patchDocToken(
                        'siderColorScrollbarTrack',
                        e.target.value,
                      )
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    sider.scrollbarTrackThickness（px）
                  </span>
                  <Input
                    size="small"
                    style={{ width: 120 }}
                    placeholder="6"
                    value={docTokenForm.siderScrollbarTrackThickness}
                    onChange={(e) =>
                      patchDocToken(
                        'siderScrollbarTrackThickness',
                        e.target.value,
                      )
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    sider.scrollbarThumbRadius（px）
                  </span>
                  <Input
                    size="small"
                    style={{ width: 120 }}
                    placeholder="3"
                    value={docTokenForm.siderScrollbarThumbRadius}
                    onChange={(e) =>
                      patchDocToken(
                        'siderScrollbarThumbRadius',
                        e.target.value,
                      )
                    }
                  />
                </Space>
              </Space>
              <Divider plain titlePlacement="start" style={{ margin: '12px 0 4px' }}>
                PageContainer · 内容区
              </Divider>
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    pageContainer.colorBgPageContainer
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.pageColorBgPageContainer}
                    onChange={(e) =>
                      patchDocToken('pageColorBgPageContainer', e.target.value)
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    pageContainer.colorBgPageContainerFixed
                  </span>
                  <Input
                    size="small"
                    style={{ maxWidth: 360 }}
                    value={docTokenForm.pageColorBgPageContainerFixed}
                    onChange={(e) =>
                      patchDocToken(
                        'pageColorBgPageContainerFixed',
                        e.target.value,
                      )
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    pageContainer.paddingBlock…
                  </span>
                  <Input
                    size="small"
                    style={{ width: 120 }}
                    value={docTokenForm.pagePaddingBlockPageContainerContent}
                    onChange={(e) =>
                      patchDocToken(
                        'pagePaddingBlockPageContainerContent',
                        e.target.value,
                      )
                    }
                  />
                </Space>
                <Space wrap style={{ width: '100%' }} align="start">
                  <span style={{ width: 200, flexShrink: 0 }}>
                    pageContainer.paddingInline…
                  </span>
                  <Input
                    size="small"
                    style={{ width: 120 }}
                    value={docTokenForm.pagePaddingInlinePageContainerContent}
                    onChange={(e) =>
                      patchDocToken(
                        'pagePaddingInlinePageContainerContent',
                        e.target.value,
                      )
                    }
                  />
                </Space>
              </Space>
            </Space>
          </ProCard>
          <ProCard>
            <div>
              当前配置：layout=<b>{layout}</b>、contentWidth=
              <b>{contentWidth}</b>
              、fixedHeader=<b>{fixedHeader ? 'true' : 'false'}</b>
              、siderMenuType=<b>{siderMenuType}</b>
              、appList=<b>{appListType}</b>
              ；定制 token 见上方输入框（与文档 Layout Token 表一致；侧栏菜单滚动条需
              layout 为 side 且菜单可滚动时可见）。
            </div>
          </ProCard>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default Demo;
