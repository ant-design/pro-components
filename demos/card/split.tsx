import { ProCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
import { useState } from 'react';

const Demo = () => {
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
          title="Complex Split"
          extra="September 28, 2019"
          variant="outlined"
          headerBordered
          split={responsive ? 'horizontal' : 'vertical'}
        >
          <ProCard split="horizontal">
            <ProCard split="horizontal">
              <ProCard split={responsive ? 'horizontal' : 'vertical'}>
                <ProCard title="Yesterday's Total Traffic">123</ProCard>
                <ProCard title="Total Traffic This Month">234</ProCard>
                <ProCard title="Total Traffic This Year">345</ProCard>
              </ProCard>
              <ProCard split="vertical">
                <ProCard title="Ongoing Experiments">12/56</ProCard>
                <ProCard title="Total Historical Experiments">134</ProCard>
              </ProCard>
            </ProCard>
            <ProCard title="Traffic Trends">
              <div>Chart</div>
              <div>Chart</div>
              <div>Chart</div>
              <div>Chart</div>
              <div>Chart</div>
            </ProCard>
          </ProCard>
          <ProCard title="Traffic Usage">Right Side Content</ProCard>
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
        <h4>ProCard 复杂分割布局 Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角额外内容
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，'outlined' 表示带边框
          </li>
          <li>
            <strong>headerBordered</strong>: 是否显示头部边框
          </li>
          <li>
            <strong>split</strong>: 分割方式，根据响应式状态动态调整
          </li>
        </ul>
        <h4>Split 分割方式：</h4>
        <ul>
          <li>
            <strong>horizontal</strong>: 水平分割，子卡片上下排列
          </li>
          <li>
            <strong>vertical</strong>: 垂直分割，子卡片左右排列
          </li>
          <li>
            <strong>响应式切换</strong>: 根据屏幕尺寸自动切换分割方式
          </li>
        </ul>
        <h4>嵌套布局结构：</h4>
        <ul>
          <li>
            <strong>外层卡片</strong>: 主要容器，控制整体分割方向
          </li>
          <li>
            <strong>中层卡片</strong>: 中间容器，处理水平分割
          </li>
          <li>
            <strong>内层卡片</strong>: 内层容器，处理垂直分割
          </li>
          <li>
            <strong>叶子卡片</strong>: 最终的内容卡片
          </li>
        </ul>
        <h4>响应式布局特点：</h4>
        <ul>
          <li>
            <strong>断点控制</strong>: 当容器宽度小于 596px 时切换布局
          </li>
          <li>
            <strong>动态分割</strong>: 根据屏幕尺寸自动调整分割方向
          </li>
          <li>
            <strong>实时监听</strong>: 使用 ResizeObserver 实时监听容器大小变化
          </li>
        </ul>
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>大屏幕</strong>: 使用垂直分割，充分利用水平空间
          </li>
          <li>
            <strong>小屏幕</strong>: 使用水平分割，适合垂直滚动
          </li>
          <li>
            <strong>嵌套结构</strong>: 支持多层嵌套的分割布局
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据仪表盘</strong>: 构建复杂的数据展示界面
          </li>
          <li>
            <strong>报表系统</strong>: 展示多维度统计报表
          </li>
          <li>
            <strong>监控面板</strong>: 构建系统监控面板
          </li>
          <li>
            <strong>分析页面</strong>: 数据分析和可视化页面
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>合理嵌套</strong>: 避免过深的嵌套层级
          </li>
          <li>
            <strong>响应式设计</strong>: 确保在不同屏幕尺寸下都有良好的显示效果
          </li>
          <li>
            <strong>性能优化</strong>: 大量数据时考虑虚拟化或分页
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
