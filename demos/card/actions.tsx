import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Space } from 'antd';

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <>
      <Space>
        <ProCard
          title="Actions"
          style={{ maxWidth: 300 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </ProCard>

        <ProCard
          title="Standalone Actions"
          style={{ maxWidth: 300 }}
          variant="outlined"
          actions={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                flex: 1,
                gap: 8,
              }}
            >
              <SettingOutlined key="setting" />
              Settings
            </div>
          }
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </ProCard>

        <ProCard
          variant="outlined"
          title="No Actions"
          style={{ maxWidth: 300 }}
        >
          <div>Card content</div>
          <div>Card content</div>
          <div>Card content</div>
        </ProCard>
      </Space>

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
            <strong>actions</strong>:
            卡片操作区域，可以是数组（多个操作按钮）或单个 React 节点
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，可选值：'outlined' |
            'filled' | 'elevated'
          </li>
          <li>
            <strong>style</strong>: 卡片的样式对象
          </li>
          <li>
            <strong>children</strong>: 卡片内容区域
          </li>
        </ul>
        <h4>Actions 使用说明：</h4>
        <ul>
          <li>
            <strong>数组形式</strong>: 传入 React
            节点数组，每个元素会渲染为一个操作按钮
          </li>
          <li>
            <strong>单个节点</strong>: 传入单个 React
            节点，可以自定义操作区域的布局和样式
          </li>
          <li>
            <strong>不设置</strong>: 如果不设置 actions
            属性，卡片底部不会显示操作区域
          </li>
        </ul>
      </div>
    </>
  
    </div>
  );
};
