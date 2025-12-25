import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic } = StatisticCard;

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
          title="Data Overview"
          extra="Friday, September 28, 2019"
          split={responsive ? 'horizontal' : 'vertical'}
          headerBordered
          variant="outlined"
        >
          <ProCard split="horizontal">
            <ProCard split="horizontal">
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: 'Total Traffic Yesterday',
                    value: 234,
                    description: (
                      <Statistic
                        title="Compared to Monthly Average Traffic"
                        value="8.04%"
                        trend="down"
                      />
                    ),
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Traffic This Month',
                    value: 234,
                    description: (
                      <Statistic
                        title="Month-on-Month"
                        value="8.04%"
                        trend="up"
                      />
                    ),
                  }}
                />
              </ProCard>
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: 'Ongoing Experiments',
                    value: '12/56',
                    suffix: 'items',
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: 'Total Historical Experiments',
                    value: '134',
                    suffix: 'items',
                  }}
                />
              </ProCard>
            </ProCard>
            <StatisticCard
              title="Traffic Trends"
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                  width="100%"
                  alt="Bar Chart"
                />
              }
            />
          </ProCard>
          <StatisticCard
            title="Traffic Usage"
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                alt="Dashboard"
                width="100%"
              />
            }
          />
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
        <h4>ProCard 嵌套布局 Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角额外信息
          </li>
          <li>
            <strong>split</strong>: 分割方式，'horizontal'
            表示水平分割，'vertical' 表示垂直分割
          </li>
          <li>
            <strong>headerBordered</strong>: 是否显示头部边框
          </li>
          <li>
            <strong>variant</strong>: 卡片变体样式，'outlined' 表示带边框
          </li>
        </ul>
        <h4>StatisticCard 嵌套配置：</h4>
        <ul>
          <li>
            <strong>statistic.title</strong>: 统计项标题
          </li>
          <li>
            <strong>statistic.value</strong>: 统计数值
          </li>
          <li>
            <strong>statistic.description</strong>: 统计描述，可以是 Statistic
            组件
          </li>
          <li>
            <strong>statistic.suffix</strong>: 数值后缀
          </li>
          <li>
            <strong>chart</strong>: 图表区域
          </li>
        </ul>
        <h4>嵌套 Statistic 组件：</h4>
        <ul>
          <li>
            <strong>title</strong>: 子统计项标题
          </li>
          <li>
            <strong>value</strong>: 子统计项数值
          </li>
          <li>
            <strong>trend</strong>: 趋势指示，'up' 或 'down'
          </li>
        </ul>
        <h4>响应式布局特点：</h4>
        <ul>
          <li>
            <strong>断点控制</strong>: 当容器宽度小于 596px 时切换分割方式
          </li>
          <li>
            <strong>自适应分割</strong>: 根据屏幕尺寸自动调整分割方向
          </li>
          <li>
            <strong>嵌套支持</strong>: 支持多层嵌套的卡片布局
          </li>
        </ul>
        <h4>布局结构：</h4>
        <ul>
          <li>
            <strong>外层 ProCard</strong>: 整体容器，控制主要分割方向
          </li>
          <li>
            <strong>中层 ProCard</strong>: 中间容器，处理水平分割
          </li>
          <li>
            <strong>内层 ProCard</strong>: 内层容器，处理垂直分割
          </li>
          <li>
            <strong>StatisticCard</strong>: 统计卡片，展示具体数据
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
