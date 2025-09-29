import { ProCard, StatisticCard } from '@xxlabs/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic } = StatisticCard;

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
        <ProCard split={responsive ? 'horizontal' : 'vertical'}>
          <StatisticCard
            chart={
              <img
                alt="Progress Bar"
                src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
                width="100%"
              />
            }
            colSpan={responsive ? 24 : 6}
            footer={
              <>
                <Statistic layout="horizontal" title="Fiscal Year Performance Completion Rate" value="70.98%" />
                <Statistic
                  layout="horizontal"
                  title="Performance Completion Rate Same Period Last Year"
                  value="86.98%"
                />
                <Statistic
                  layout="horizontal"
                  title="Performance Completion Rate Same Period Year Before Last"
                  value="88.98%"
                />
              </>
            }
            statistic={{
              value: 82.6,
              suffix: 'Billion',
              description: <Statistic title="Daily Comparison" trend="up" value="6.47%" />,
            }}
            title="Fiscal Year Performance Target"
          />
          <StatisticCard.Group colSpan={responsive ? 24 : 18} direction={responsive ? 'column' : undefined}>
            <StatisticCard
              chart={
                <img
                  alt="Line Chart"
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  width="100%"
                />
              }
              statistic={{
                title: 'Total Revenue for the Fiscal Year',
                value: 601987768,
                description: <Statistic title="Daily Comparison" trend="up" value="6.15%" />,
              }}
            >
              <Statistic
                description={<Statistic title="Daily Comparison" trend="down" value="6.15%" />}
                layout="vertical"
                title="Total Market Revenue"
                value={1982312}
              />
            </StatisticCard>
            <StatisticCard
              chart={
                <img
                  alt="Line Chart"
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  width="100%"
                />
              }
              statistic={{
                title: 'Daily Ranking',
                value: 6,
                description: <Statistic title="Daily Comparison" trend="down" value="3.85%" />,
              }}
            >
              <Statistic
                description={<Statistic title="Daily Comparison" trend="up" value="6.47%" />}
                layout="vertical"
                title="Revenue in the Last 7 Days"
                value={17458}
              />
            </StatisticCard>
            <StatisticCard
              chart={
                <img
                  alt="Line Chart"
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  width="100%"
                />
              }
              statistic={{
                title: 'Fiscal Year Performance Revenue Ranking',
                value: 2,
                description: <Statistic title="Daily Comparison" trend="up" value="6.47%" />,
              }}
            >
              <Statistic
                description={<Statistic title="Daily Comparison" trend="down" value="6.47%" />}
                layout="vertical"
                title="Monthly Payment Count"
                value={601}
              />
            </StatisticCard>
          </StatisticCard.Group>
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
        <h4>ProCard 复杂布局 Props 说明：</h4>
        <ul>
          <li>
            <strong>split</strong>: 分割方式，根据响应式状态自动调整
          </li>
          <li>
            <strong>children</strong>: StatisticCard 和 StatisticCard.Group 子组件
          </li>
        </ul>
        <h4>StatisticCard 配置：</h4>
        <ul>
          <li>
            <strong>colSpan</strong>: 栅格列数，控制组件在栅格系统中的宽度
          </li>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>statistic</strong>: 主要统计信息配置
          </li>
          <li>
            <strong>chart</strong>: 图表区域
          </li>
          <li>
            <strong>footer</strong>: 底部区域，包含多个 Statistic 组件
          </li>
        </ul>
        <h4>StatisticCard.Group 配置：</h4>
        <ul>
          <li>
            <strong>colSpan</strong>: 栅格列数，控制整个组的宽度
          </li>
          <li>
            <strong>direction</strong>: 排列方向，响应式时自动调整
          </li>
          <li>
            <strong>children</strong>: 多个 StatisticCard 子组件
          </li>
        </ul>
        <h4>嵌套 Statistic 组件：</h4>
        <ul>
          <li>
            <strong>layout</strong>: 布局方式，'vertical' 表示垂直布局，'horizontal' 表示水平布局
          </li>
          <li>
            <strong>title</strong>: 统计项标题
          </li>
          <li>
            <strong>value</strong>: 统计数值
          </li>
          <li>
            <strong>description</strong>: 统计描述，可以是 Statistic 组件
          </li>
        </ul>
        <h4>响应式布局特点：</h4>
        <ul>
          <li>
            <strong>断点控制</strong>: 当容器宽度小于 596px 时切换布局
          </li>
          <li>
            <strong>栅格适配</strong>: colSpan 根据响应式状态自动调整
          </li>
          <li>
            <strong>方向切换</strong>: Group 的 direction 根据响应式状态调整
          </li>
        </ul>
        <h4>栅格系统说明：</h4>
        <ul>
          <li>
            <strong>24 栅格</strong>: 使用 24 栅格系统，colSpan 表示占用的列数
          </li>
          <li>
            <strong>响应式适配</strong>: 小屏幕时 colSpan 自动调整为 24（占满宽度）
          </li>
          <li>
            <strong>比例控制</strong>: 通过 colSpan 控制各部分的宽度比例
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据仪表盘</strong>: 构建复杂的数据仪表盘
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
            <strong>栅格规划</strong>: 合理规划 colSpan 值，确保布局平衡
          </li>
          <li>
            <strong>响应式设计</strong>: 确保在不同屏幕尺寸下都有良好的显示效果
          </li>
          <li>
            <strong>信息层次</strong>: 通过布局突出重要的信息
          </li>
        </ul>
      </div>
    </>
  );
};
