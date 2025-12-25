import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <ProCard
        title="Title"
        extra="extra"
        tooltip="This is a tooltip"
        style={{ maxWidth: 300 }}
        variant="outlined"
      >
        Content
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
            <strong>variant</strong>: 卡片变体样式，'outlined'
            表示带边框的卡片样式
          </li>
          <li>
            <strong>children</strong>: 卡片内容区域
          </li>
        </ul>
        <h4>Variant 说明：</h4>
        <ul>
          <li>
            <strong>outlined</strong>: 带边框的卡片样式，适合需要明确边界的场景
          </li>
          <li>
            <strong>filled</strong>: 填充式卡片样式，背景色填充
          </li>
          <li>
            <strong>elevated</strong>: 提升式卡片样式，带有阴影效果
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
