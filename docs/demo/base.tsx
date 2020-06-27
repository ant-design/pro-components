import React, { useState } from 'react';
import ProLayout, {
  PageContainer,
  SettingDrawer,
  // eslint-disable-next-line import/no-unresolved
} from '@ant-design/pro-layout';
import defaultProps from './defaultProps';

export default () => {
  const [settings, setSetting] = useState({});
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
        }}
        location={{
          pathname: '/welcome',
        }}
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
        onSettingChange={setSetting}
      />
    </div>
  );
};
