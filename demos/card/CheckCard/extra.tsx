import { EllipsisOutlined } from '@ant-design/icons';
import { CheckCard } from '@ant-design/pro-components';
import { Dropdown, message } from 'antd';

export default () => (
    <div style={{ padding: 24 }}>

  <>
    <CheckCard
      avatar="https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg"
      title="示例一"
      description="选择一个由流程编排提供的典型用户案例，可以从中学习到流程编排很多设计理念。"
      extra={
        <Dropdown
          placement="topCenter"
          menu={{
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation(
    </div>
  );
              message.info('menu click');
            },
            items: [
              {
                label: '菜单',
                key: '1',
              },
              {
                label: '列表',
                key: '2',
              },
              {
                label: '表单',
                key: '3',
              },
            ],
          }}
        >
          <EllipsisOutlined
            style={{ fontSize: 22, color: 'rgba(0,0,0,0.5)' }}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
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
      <h4>CheckCard Extra Props 说明：</h4>
      <ul>
        <li>
          <strong>extra</strong>: 卡片右上角操作区域，可以是字符串或 React 节点
        </li>
        <li>
          <strong>title</strong>: 卡片标题
        </li>
        <li>
          <strong>description</strong>: 卡片描述信息
        </li>
        <li>
          <strong>avatar</strong>: 卡片头像
        </li>
      </ul>
      <h4>Extra 使用方式：</h4>
      <ul>
        <li>
          <strong>字符串</strong>: 直接传入字符串，显示简单文本
        </li>
        <li>
          <strong>组件</strong>: 传入 React
          节点，可以包含下拉菜单、按钮等复杂操作
        </li>
      </ul>
      <h4>Dropdown 组件 Props：</h4>
      <ul>
        <li>
          <strong>placement</strong>: 下拉菜单出现位置，如 'topCenter'
        </li>
        <li>
          <strong>menu</strong>: 菜单配置对象
        </li>
        <li>
          <strong>children</strong>: 触发下拉菜单的元素
        </li>
      </ul>
      <h4>Menu 配置：</h4>
      <ul>
        <li>
          <strong>onClick</strong>: 菜单项点击回调，参数包含 domEvent
        </li>
        <li>
          <strong>items</strong>: 菜单项数组，每个项包含 label 和 key
        </li>
        <li>
          <strong>label</strong>: 菜单项显示文本
        </li>
        <li>
          <strong>key</strong>: 菜单项唯一标识
        </li>
      </ul>
      <h4>事件处理：</h4>
      <ul>
        <li>
          <strong>stopPropagation</strong>: 阻止事件冒泡，避免触发卡片的点击事件
        </li>
        <li>
          <strong>domEvent</strong>: 原生 DOM 事件对象，用于阻止默认行为
        </li>
      </ul>
    </div>
  </>
);
