import {
  GithubFilled,
  InfoCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProLayout } from '@ant-design/pro-components';
import { Segmented, Space, theme } from 'antd';
import { useState } from 'react';
import defaultProps from './_defaultProps';

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
