import type { ProSettings } from '@ant-design/pro-components';
import { ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { useState } from 'react';

export default () => {
  const [settings, setSettings] = useState<Partial<ProSettings>>({
    layout: 'side',
  });

  return (
    <div id="setting-drawer-demo" style={{ height: 560, overflow: 'auto' }}>
      <ProLayout
        title="动态布局设置"
        route={{ routes: [{ path: '/demo', name: '示例页' }] }}
        location={{ pathname: '/demo' }}
        {...settings}
      >
        <div style={{ minHeight: 320, padding: 24 }}>
          <h2>SettingDrawer</h2>
          <p>从右侧设置抽屉调整布局。</p>
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      </ProLayout>
      <SettingDrawer
        settings={settings}
        onSettingChange={setSettings}
        getContainer={() => document.getElementById('setting-drawer-demo')}
        disableUrlParams
      />
    </div>
  );
};
