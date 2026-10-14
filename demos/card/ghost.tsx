import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <div style={{ background: '#f0f2f5', padding: 24 }}>
      <ProCard ghost gutter={[16, 16]} wrap>
        <ProCard title="服务一" variant="outlined" colSpan={{ xs: 24, sm: 12 }}>
          父级透明，子卡片仍有背景。
        </ProCard>
        <ProCard title="服务二" variant="outlined" colSpan={{ xs: 24, sm: 12 }}>
          灰色页面背景透过父级显示。
        </ProCard>
      </ProCard>
    </div>
  );
};

export default Demo;
