import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { Button, Space, Steps } from 'antd';
import { useState } from 'react';

const Demo = () => {
  const [current, setCurrent] = useState(0);
  const [responsive, setResponsive] = useState(false);
  return (
    <>
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard
          split={responsive ? 'horizontal' : 'vertical'}
          variant="outlined"
          style={{ height: 320 }}
        >
          <ProCard colSpan={responsive ? 24 : 6}>
            <Steps
              direction={responsive ? 'horizontal' : 'vertical'}
              size="small"
              current={current}
              style={{ height: '100%' }}
              items={[
                { title: 'Fill in Basic Information' },
                { title: 'Configure Template' },
                { title: 'Configure Access' },
                { title: 'Configure Deployment and Scheduling' },
                { title: 'Preview' },
              ]}
            />
          </ProCard>
          <ProCard title="Traffic Usage" colSpan={responsive ? 24 : 18}>
            <Space>
              <Button
                key="primary"
                type="primary"
                onClick={() => setCurrent(current + 1)}
                disabled={current === 5}
              >
                Next
              </Button>
              <Button
                key="pre"
                onClick={() => setCurrent(current - 1)}
                disabled={current === 0}
              >
                Previous
              </Button>
            </Space>
          </ProCard>
        </ProCard>
      </RcResizeObserver>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard 与 Steps 集成 Props 说明：</h4>
        <ul>
          <li>
            <strong>split</strong>: 分割方式，根据响应式状态自动调整
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，'outlined' 表示带边框
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象，设置固定高度
          </li>
          <li>
            <strong>colSpan</strong>: 栅格列数，响应式时自动调整
          </li>
        </ul>
        <h4>Steps 组件配置：</h4>
        <ul>
          <li>
            <strong>direction</strong>: 步骤条方向，响应式时自动调整
          </li>
          <li>
            <strong>size</strong>: 步骤条尺寸，'small' 表示小尺寸
          </li>
          <li>
            <strong>current</strong>: 当前步骤索引
          </li>
          <li>
            <strong>items</strong>: 步骤项配置数组
          </li>
          <li>
            <strong>style</strong>: 步骤条样式，设置高度为 100%
          </li>
        </ul>
        <h4>Button 组件配置：</h4>
        <ul>
          <li>
            <strong>type</strong>: 按钮类型，'primary' 表示主要按钮
          </li>
          <li>
            <strong>onClick</strong>: 点击事件处理函数
          </li>
          <li>
            <strong>disabled</strong>: 是否禁用按钮
          </li>
        </ul>
        <h4>响应式布局特点：</h4>
        <ul>
          <li>
            <strong>断点控制</strong>: 当容器宽度小于 596px 时切换布局
          </li>
          <li>
            <strong>分割方式</strong>: 大屏幕使用垂直分割，小屏幕使用水平分割
          </li>
          <li>
            <strong>步骤方向</strong>: 大屏幕使用垂直步骤，小屏幕使用水平步骤
          </li>
          <li>
            <strong>栅格适配</strong>: colSpan 根据响应式状态自动调整
          </li>
        </ul>
        <h4>状态管理：</h4>
        <ul>
          <li>
            <strong>current</strong>: 使用 useState 管理当前步骤状态
          </li>
          <li>
            <strong>responsive</strong>: 使用 useState 管理响应式状态
          </li>
          <li>
            <strong>步骤控制</strong>: 通过按钮控制步骤的前进和后退
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>向导页面</strong>: 构建多步骤的向导页面
          </li>
          <li>
            <strong>配置页面</strong>: 分步骤配置复杂功能
          </li>
          <li>
            <strong>表单流程</strong>: 多步骤表单填写流程
          </li>
          <li>
            <strong>设置页面</strong>: 分步骤设置系统参数
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>步骤清晰</strong>: 确保每个步骤的标题清晰易懂
          </li>
          <li>
            <strong>状态同步</strong>: 确保 Steps 和按钮状态同步
          </li>
          <li>
            <strong>响应式设计</strong>: 确保在不同屏幕尺寸下都有良好的体验
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
