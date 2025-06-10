import {
  ProCard,
  ProFormGroup,
  ProFormSwitch,
} from '@ant-design/pro-components;

export default () => {
  return (
    <>
      <ProCard
        title="Default Size"
        bordered
        extra={
          <ProFormGroup>
            <ProFormSwitch
              name="Enable"
              noStyle
              checkedChildren={'Enabled'}
              unCheckedChildren={'Disabled'}
            />
          </ProFormGroup>
        }
        tooltip="This is a tooltip"
        style={{ maxWidth: 300 }}
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
      <ProCard
        title="Card with Shadow"
        extra="extra"
        tooltip="This is a tooltip"
        style={{ maxWidth: 300 }}
        boxShadow
      >
        <div>Card content</div>
        <div>Card content</div>
        <div>Card content</div>
      </ProCard>
      <ProCard
        title="Small Size Card"
        extra="extra"
        tooltip="This is a tooltip"
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
