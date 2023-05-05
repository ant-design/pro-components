import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard loading style={{ maxWidth: 300 }}>
        内容
      </ProCard>

      <ProCard
        loading
        style={{ maxWidth: 300, marginBlockStart: 16 }}
        layout="center"
      >
        内容
      </ProCard>

      <ProCard
        title="自定义 Loading"
        extra="extra"
        loading={<div>加载中</div>}
        style={{ maxWidth: 300, marginBlockStart: 16 }}
      >
        内容
      </ProCard>
    </>
  );
};
