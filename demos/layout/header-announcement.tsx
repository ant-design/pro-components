import { ProLayout } from '@ant-design/pro-components';
import { Alert } from 'antd';

export default () => (
  <div style={{ minHeight: 540 }}>
    <ProLayout
      title="全局公告"
      route={{ routes: [{ path: '/demo', name: '示例页' }] }}
      location={{ pathname: '/demo' }}
      headerRender={(_, defaultDom) => (
        <>
          <Alert title="系统将于今晚 22:00 进行维护" type="info" banner />
          {defaultDom}
        </>
      )}
    >
      <div style={{ padding: 24 }}>
        <h2>全局公告</h2>
        <p>通过 ProLayout.headerRender 在默认页头上方显示通知。</p>
      </div>
    </ProLayout>
  </div>
);
