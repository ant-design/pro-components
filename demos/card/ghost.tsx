import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <div style={{ background: '#f0f2f5', padding: 24 }}>
      <ProCard title="外层容器" variant="outlined">
        <ProCard ghost gutter={16}>
          <ProCard title="子卡片一" variant="outlined" colSpan={12}>
            <div>幽灵模式的父卡片没有背景、边框和间距</div>
            <div>常用于作为透明布局容器</div>
          </ProCard>
          <ProCard title="子卡片二" variant="outlined" colSpan={12}>
            <div>子卡片保留自己的样式</div>
            <div>父级 ghost 不影响子级外观</div>
          </ProCard>
        </ProCard>
      </ProCard>
    </div>
  );
};

export default Demo;
