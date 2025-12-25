import { AppstoreOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Tag } from 'antd';

const Demo = () => (
  <>
    <CheckCard
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AppstoreOutlined />
          <span style={{ marginInlineEnd: 8, marginInlineStart: 8 }}>示例</span>
          <Tag color="blue">blue</Tag>
        </div>
      }
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
    />
    <CheckCard
      title="标题内容过长会自动进行省略，标题内容过长会自动进行省略"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念"
    />

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard Title Props 说明：</h4>
      <ul>
        <li>
          <strong>title</strong>: 卡片标题，可以是字符串或 React 节点
        </li>
        <li>
          <strong>description</strong>: 卡片描述信息
        </li>
      </ul>
      <h4>Title 使用方式：</h4>
      <ul>
        <li>
          <strong>字符串</strong>: 直接传入字符串，过长会自动省略
        </li>
        <li>
          <strong>组件</strong>: 传入 React 节点，可以包含图标、标签等复杂内容
        </li>
      </ul>
      <h4>复杂 Title 示例：</h4>
      <ul>
        <li>
          <strong>图标</strong>: 使用 AppstoreOutlined 等 Ant Design 图标
        </li>
        <li>
          <strong>文本</strong>: 使用 span 标签包装文本内容
        </li>
        <li>
          <strong>标签</strong>: 使用 Tag 组件添加状态标识
        </li>
        <li>
          <strong>布局</strong>: 使用 flexbox 布局对齐多个元素
        </li>
      </ul>
      <h4>样式说明：</h4>
      <ul>
        <li>
          <strong>自动省略</strong>: 字符串形式的 title 过长时会自动省略
        </li>
        <li>
          <strong>自定义样式</strong>: 组件形式可以完全控制样式和布局
        </li>
        <li>
          <strong>响应式</strong>: 支持响应式布局，在不同屏幕尺寸下自适应
        </li>
      </ul>
    </div>
  </>
);

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
