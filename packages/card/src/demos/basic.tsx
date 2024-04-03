import {
  ProCard,
  ProFormGroup,
  ProFormSwitch,
} from '@ant-design/pro-components';

export default () => {
  return (
    <>
      <ProCard
        title="默认尺寸"
        bordered
        extra={
          <ProFormGroup>
            <ProFormSwitch
              name="Enable"
              noStyle
              checkedChildren={'启用'}
              unCheckedChildren={'禁用'}
            />
          </ProFormGroup>
        }
        tooltip="这是提示"
        style={{ maxWidth: 300 }}
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
      <ProCard
        title="带卡片阴影"
        extra="extra"
        tooltip="这是提示"
        style={{ maxWidth: 300 }}
        boxShadow
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
      <ProCard
        title="小尺寸卡片"
        extra="extra"
        tooltip="这是提示"
        style={{ maxWidth: 300, marginBlockStart: 24 }}
        size="small"
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
    </>
  );
};
