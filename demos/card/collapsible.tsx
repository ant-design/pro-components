import { RightOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 24,
          gap: 12,
        }}
      >
        <ProCard
          title="Collapsible"
          headerBordered
          collapsible
          defaultCollapsed
          onCollapse={(collapse) => console.log(collapse)}
          extra={
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Submit
            </Button>
          }
        >
          Content
        </ProCard>
        <ProCard
          title="Collapsible"
          headerBordered
          collapsible="icon"
          defaultCollapsed
          onCollapse={(collapse) => console.log(collapse)}
          extra={
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Submit
            </Button>
          }
        >
          Content
        </ProCard>
        <ProCard
          title="Collapsible"
          variant="outlined"
          headerBordered
          collapsible
          defaultCollapsed
          onCollapse={(collapse) => console.log(collapse)}
          extra={
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Submit
            </Button>
          }
        >
          Content
        </ProCard>
        <ProCard
          variant="outlined"
          size="small"
          title="Collapsible"
          headerBordered
          collapsible
          defaultCollapsed
          onCollapse={(collapse) => console.log(collapse)}
          extra={
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Submit
            </Button>
          }
        >
          Content
        </ProCard>
        <ProCard
          title="Collapsible - Controlled Custom"
          extra={
            <RightOutlined
              rotate={!collapsed ? 90 : undefined}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            />
          }
          style={{ marginBlockStart: 16 }}
          headerBordered
          collapsed={collapsed}
        >
          Content
        </ProCard>
        <ProCard
          title="Collapsible - Custom Icon"
          collapsibleIconRender={({
            collapsed: buildInCollapsed,
          }: {
            collapsed: boolean;
          }) =>
            buildInCollapsed ? <span>Collapse - </span> : <span>Expand - </span>
          }
          style={{ marginBlockStart: 16 }}
          headerBordered
          collapsible
          defaultCollapsed
        >
          Content
        </ProCard>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard 可折叠功能 Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>headerBordered</strong>: 是否显示头部边框
          </li>
          <li>
            <strong>collapsible</strong>: 是否可折叠，可以是布尔值或 'icon'
          </li>
          <li>
            <strong>defaultCollapsed</strong>: 默认是否折叠
          </li>
          <li>
            <strong>collapsed</strong>: 受控的折叠状态
          </li>
          <li>
            <strong>onCollapse</strong>: 折叠状态变化回调函数
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角额外内容
          </li>
        </ul>
        <h4>Collapsible 配置方式：</h4>
        <ul>
          <li>
            <strong>布尔值</strong>: collapsible={true} 显示默认折叠图标
          </li>
          <li>
            <strong>字符串</strong>: collapsible="icon" 只显示图标
          </li>
          <li>
            <strong>自定义控制</strong>: 使用 collapsed 属性进行受控
          </li>
        </ul>
        <h4>自定义图标配置：</h4>
        <ul>
          <li>
            <strong>collapsibleIconRender</strong>: 自定义折叠图标的渲染函数
          </li>
          <li>
            <strong>参数</strong>: 接收 {'{'} collapsed: boolean {'}'} 对象
          </li>
          <li>
            <strong>返回值</strong>: 返回自定义的 React 节点
          </li>
        </ul>
        <h4>事件处理：</h4>
        <ul>
          <li>
            <strong>onCollapse</strong>: 折叠状态变化时触发
          </li>
          <li>
            <strong>stopPropagation</strong>: 阻止事件冒泡，避免触发折叠
          </li>
          <li>
            <strong>自定义控制</strong>: 通过状态管理控制折叠状态
          </li>
        </ul>
        <h4>样式变体：</h4>
        <ul>
          <li>
            <strong>variant</strong>: 'outlined' 表示带边框样式
          </li>
          <li>
            <strong>size</strong>: 'small' 表示小尺寸
          </li>
          <li>
            <strong>headerBordered</strong>: 显示头部边框
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>信息展示</strong>: 可折叠的信息面板
          </li>
          <li>
            <strong>设置面板</strong>: 可折叠的设置选项
          </li>
          <li>
            <strong>详情展开</strong>: 点击展开查看详细信息
          </li>
          <li>
            <strong>空间节省</strong>: 节省页面空间，按需展开
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>默认状态</strong>: 根据内容重要性设置默认折叠状态
          </li>
          <li>
            <strong>图标设计</strong>: 设计清晰的折叠/展开图标
          </li>
          <li>
            <strong>交互反馈</strong>: 提供明确的交互反馈
          </li>
          <li>
            <strong>状态管理</strong>: 合理管理折叠状态
          </li>
        </ul>
      </div>
    </>
  );
};
