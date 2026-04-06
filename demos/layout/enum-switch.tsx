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

  const [layout, setLayout] = useState<ProSettings['layout']>('mix');
  const [navTheme, setNavTheme] = useState<ProSettings['navTheme']>('light');
  const [contentWidth, setContentWidth] = useState<'Fluid' | 'Fixed'>('Fluid');
  const [siderMenuType, setSiderMenuType] = useState<'sub' | 'group'>('group');

  const [pathname, setPathname] = useState('/welcome');

  return (
    <div>
      <ProCard style={{ marginBlockEnd: 16 }} variant="outlined">
        <Space orientation="vertical" size={12} style={{ width: '100%' }}>
          <Space>
            <span>layout 导航模式：</span>
            <Segmented
              value={layout}
              onChange={(v) => setLayout(v as any)}
              options={[
                { label: '侧栏 side', value: 'side' },
                { label: '顶部 top', value: 'top' },
                { label: '混合 mix', value: 'mix' },
              ]}
            />
          </Space>
          <Space>
            <span>navTheme 导航主题：</span>
            <Segmented
              value={navTheme}
              onChange={(v) => setNavTheme(v as any)}
              options={[
                { label: '亮色 light', value: 'light' },
                { label: '暗色 realDark', value: 'realDark' },
              ]}
            />
          </Space>
          <Space>
            <span>contentWidth 内容宽度：</span>
            <Segmented
              value={contentWidth}
              onChange={(v) => setContentWidth(v as any)}
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
          navTheme={navTheme}
          contentWidth={contentWidth}
          siderMenuType={siderMenuType}
          fixSiderbar
          location={{ pathname }}
          menu={{ collapsedShowGroupTitle: true }}
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
            <div onClick={() => setPathname(item.path || '/welcome')}>
              {dom}
            </div>
          )}
        >
          <PageContainer>
            <ProCard style={{ minHeight: 300 }}>
              <div>
                当前配置：layout=<b>{layout}</b>、navTheme=<b>{navTheme}</b>、
                contentWidth=<b>{contentWidth}</b>、siderMenuType=
                <b>{siderMenuType}</b>
              </div>
            </ProCard>
          </PageContainer>
        </ProLayout>
      </div>
    </div>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
