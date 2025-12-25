import { UserOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Avatar } from 'antd';

export default () => (
    <div style={{ padding: 24 }}>

  <>
    <CheckCard
      title="示例标题"
      avatar={
        <Avatar
          style={{ backgroundColor: '#7265e6' }}
          icon={<UserOutlined />}
          size="large"
        />
      }
    />

    <div
      style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '6px',
      }}
    >
      <h4>CheckCard Avatar Props 说明：</h4>
      <ul>
        <li>
          <strong>avatar</strong>: 卡片头像，可以是图片 URL 字符串或 React 节点
        </li>
        <li>
          <strong>title</strong>: 卡片标题
        </li>
      </ul>
      <h4>Avatar 组件 Props：</h4>
      <ul>
        <li>
          <strong>style</strong>: 头像样式对象，可以设置背景色等
        </li>
        <li>
          <strong>icon</strong>: 头像图标，可以是 Ant Design 图标组件
        </li>
        <li>
          <strong>size</strong>: 头像尺寸，可选值：'large' | 'default' | 'small'
        </li>
        <li>
          <strong>src</strong>: 头像图片地址（字符串形式）
        </li>
      </ul>
      <h4>Avatar 使用方式：</h4>
      <ul>
        <li>
          <strong>字符串</strong>: 直接传入图片 URL，如
          avatar="https://example.com/image.jpg"
        </li>
        <li>
          <strong>组件</strong>: 传入 Avatar 组件，可以自定义样式和图标
        </li>
        <li>
          <strong>图标</strong>: 使用 Ant Design 图标作为头像内容
        </li>
      </ul>
    </div>
  </>

    </div>
  );
