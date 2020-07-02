import React, { useState } from 'react';
import ProLayout, {
  PageContainer,
  SettingDrawer,
  ProSettings,
  // eslint-disable-next-line import/no-unresolved
} from '@ant-design/pro-layout';
import defaultProps from './defaultProps';

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(
    undefined,
  );
  const [pathname, setPathname] = useState('/welcome');
  return (
    <div
      id="test-pro-layout"
      style={{
        transform: 'rotate(0)',
        overflowX: 'hidden',
      }}
    >
      <ProLayout
        {...defaultProps}
        style={{
          height: 800,
          maxHeight: '100vh',
        }}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => 'dom'}
        {...settings}
      >
        <PageContainer content="欢迎使用">
          <div
            style={{
              height: '120vh',
            }}
          >
            Hello World
          </div>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
      />
    </div>
  );
};
