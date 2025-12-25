import {
  ProCard,
  ProFormGroup,
  ProFormSwitch,
} from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        title="Default Size"
        variant="outlined"
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

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题，可以是字符串或 React 节点
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，可选值：'outlined' |
            'filled' | 'elevated'
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角操作区域，可以是字符串或 React
            节点
          </li>
          <li>
            <strong>tooltip</strong>: 卡片的提示信息
          </li>
          <li>
            <strong>style</strong>: 卡片的样式对象
          </li>
          <li>
            <strong>boxShadow</strong>: 是否显示阴影效果，布尔值
          </li>
          <li>
            <strong>size</strong>: 卡片尺寸，可选值：'default' | 'small'
          </li>
          <li>
            <strong>children</strong>: 卡片内容区域
          </li>
        </ul>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
