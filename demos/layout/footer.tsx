import {
  DefaultFooter,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';

export default () => (
  <div style={{ minHeight: 480 }}>
    <ProLayout
      location={{ pathname: '/dashboard' }}
      route={{ routes: [{ path: '/dashboard', name: '工作台' }] }}
      footerRender={() => (
        <DefaultFooter links={[]} copyright="示例系统 © 2026" />
      )}
    >
      <PageContainer title="页脚内容">滚动到页面底部查看页脚。</PageContainer>
    </ProLayout>
  </div>
);
