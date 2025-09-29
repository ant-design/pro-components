import { ProCard } from '@xxlabs/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

export default () => {
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
          headerBordered
          extra="September 28, 2019"
          split={responsive ? 'horizontal' : 'vertical'}
          title="Left and Right Columns with Title"
          variant="outlined"
        >
          <ProCard colSpan="50%" title="Left Details">
            <div style={{ height: 360 }}>Left Content</div>
          </ProCard>
          <ProCard title="Traffic Usage">
            <div style={{ height: 360 }}>Right Content</div>
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
        <h4>ProCard 响应式分割布局 Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角额外内容
          </li>
          <li>
            <strong>split</strong>: 分割方式，根据响应式状态动态调整
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，'outlined' 表示带边框
          </li>
          <li>
            <strong>headerBordered</strong>: 是否显示头部边框
          </li>
        </ul>
        <h4>子卡片配置：</h4>
        <ul>
          <li>
            <strong>title</strong>: 子卡片标题
          </li>
          <li>
            <strong>colSpan</strong>: 列跨度，'50%' 表示占 50% 宽度
          </li>
          <li>
            <strong>children</strong>: 卡片内容
          </li>
        </ul>
        <h4>响应式分割特点：</h4>
        <ul>
          <li>
            <strong>大屏幕</strong>: 使用 'vertical' 分割，左右布局
          </li>
          <li>
            <strong>小屏幕</strong>: 使用 'horizontal' 分割，上下布局
          </li>
          <li>
            <strong>断点控制</strong>: 当容器宽度小于 596px 时切换布局
          </li>
        </ul>
        <h4>ColSpan 配置：</h4>
        <ul>
          <li>
            <strong>百分比</strong>: '50%' 表示占容器宽度的 50%
          </li>
          <li>
            <strong>自动宽度</strong>: 不设置 colSpan 时自动填充剩余空间
          </li>
          <li>
            <strong>响应式适配</strong>: 在不同分割方式下自动调整
          </li>
        </ul>
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>垂直分割</strong>: 左右两列，左列占 50%，右列自动填充
          </li>
          <li>
            <strong>水平分割</strong>: 上下两行，每行占满宽度
          </li>
          <li>
            <strong>固定高度</strong>: 内容区域设置固定高度 360px
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>详情页面</strong>: 左侧详情，右侧操作或统计
          </li>
          <li>
            <strong>对比展示</strong>: 左右对比不同数据或内容
          </li>
          <li>
            <strong>表单布局</strong>: 左侧表单，右侧预览
          </li>
          <li>
            <strong>监控面板</strong>: 左右分屏显示不同监控数据
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>内容平衡</strong>: 确保左右内容的重要性和长度相对平衡
          </li>
          <li>
            <strong>响应式测试</strong>: 在不同屏幕尺寸下测试布局效果
          </li>
          <li>
            <strong>高度一致</strong>: 设置一致的高度确保视觉统一
          </li>
        </ul>
      </div>
    </>
  );
};
