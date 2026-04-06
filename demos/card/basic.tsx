import {
  ProCard,
  ProFormGroup,
  ProFormSwitch,
} from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        title="用户认证服务"
        variant="outlined"
        extra={
          <ProFormGroup>
            <ProFormSwitch
              name="Enable"
              noStyle
              checkedChildren={'运行中'}
              unCheckedChildren={'已停止'}
            />
          </ProFormGroup>
        }
        tooltip="管理用户认证与授权的核心服务"
        style={{ maxWidth: 300 }}
      >
        <div>实例数量：3</div>
        <div>CPU 占用：45%</div>
        <div>内存占用：1.2 GB</div>
      </ProCard>
      <ProCard
        title="订单处理中心"
        extra="v2.3.1"
        tooltip="处理全站订单的创建、支付与履约"
        style={{ maxWidth: 300 }}
        boxShadow
      >
        <div>日均订单：52 万</div>
        <div>平均延迟：23ms</div>
        <div>成功率：99.97%</div>
      </ProCard>
      <ProCard
        title="支付网关"
        extra="v1.8.0"
        tooltip="对接第三方支付渠道的统一网关"
        style={{ maxWidth: 300, marginBlockStart: 24 }}
        size="small"
      >
        <div>微信支付：已接入</div>
        <div>支付宝：已接入</div>
        <div>银联：接入中</div>
      </ProCard>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
