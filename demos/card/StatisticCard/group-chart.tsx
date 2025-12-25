import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Divider } = StatisticCard;

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
        <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: 'Frozen Amount',
              value: 20190102,
              precision: 2,
              suffix: 'Yuan',
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                alt="Histogram"
                width="100%"
              />
            }
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: 'Design Resources',
              value: 234,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                alt="Histogram"
                width="100%"
              />
            }
          />
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: 'Information Completeness',
              value: 5,
              suffix: '/ 100',
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/RLeBTRNWv/bianzu%25252043x.png"
                alt="Histogram"
                width="100%"
              />
            }
          />
        </StatisticCard.Group>
      </RcResizeObserver>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>StatisticCard.Group 图表分组 Props 说明：</h4>
        <ul>
          <li>
            <strong>direction</strong>: 排列方向，'row' 表示水平排列，'column'
            表示垂直排列
          </li>
          <li>
            <strong>children</strong>: StatisticCard 和 Divider 子组件
          </li>
        </ul>
        <h4>StatisticCard 配置：</h4>
        <ul>
          <li>
            <strong>statistic.title</strong>: 统计项标题
          </li>
          <li>
            <strong>statistic.value</strong>: 统计数值
          </li>
          <li>
            <strong>statistic.precision</strong>: 数值精度，控制小数位数
          </li>
          <li>
            <strong>statistic.suffix</strong>: 数值后缀，如单位或比例
          </li>
          <li>
            <strong>chart</strong>: 图表区域，每个卡片都可以有自己的图表
          </li>
        </ul>
        <h4>Divider 配置：</h4>
        <ul>
          <li>
            <strong>type</strong>: 分割线类型，根据响应式状态自动调整
          </li>
        </ul>
        <h4>响应式布局特点：</h4>
        <ul>
          <li>
            <strong>断点控制</strong>: 当容器宽度小于 596px 时切换为垂直布局
          </li>
          <li>
            <strong>分割线适配</strong>: 根据布局方向自动调整分割线类型
          </li>
          <li>
            <strong>图表适配</strong>: 图表会根据容器大小自动调整
          </li>
        </ul>
        <h4>图表展示特点：</h4>
        <ul>
          <li>
            <strong>独立图表</strong>: 每个统计卡片都有独立的图表
          </li>
          <li>
            <strong>统一风格</strong>: 所有图表使用相同的样式和尺寸
          </li>
          <li>
            <strong>响应式图表</strong>: 图表会随容器大小自动调整
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>多指标对比</strong>: 展示多个相关指标的对比
          </li>
          <li>
            <strong>数据仪表盘</strong>: 构建数据仪表盘和监控面板
          </li>
          <li>
            <strong>报表展示</strong>: 展示多维度统计报表
          </li>
          <li>
            <strong>分析页面</strong>: 数据分析和可视化页面
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>图表一致性</strong>: 保持所有图表的风格一致
          </li>
          <li>
            <strong>数据关联</strong>: 确保分组中的统计数据有关联性
          </li>
          <li>
            <strong>视觉平衡</strong>: 合理分配各卡片的视觉空间
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
