import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from '@rc-component/resize-observer';
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
        <StatisticCard.Group
          title="Core Metrics"
          direction={responsive ? 'column' : 'row'}
        >
          <StatisticCard
            statistic={{
              title: "Today's UV",
              tip: 'Supplier Information',
              value: 79,
              precision: 2,
            }}
          />
          <Divider orientation={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: 'Frozen Amount',
              value: 112893,
              precision: 2,
              suffix: 'Yuan',
            }}
          />
          <Divider orientation={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: 'Information Completeness',
              value: 92,
              suffix: '/ 100',
            }}
          />
          <StatisticCard
            statistic={{
              title: 'Frozen Amount',
              value: 112893,
              precision: 2,
              suffix: 'Yuan',
            }}
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
        <h4>StatisticCard.Group Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 分组标题
          </li>
          <li>
            <strong>direction</strong>: 排列方向，'row' 表示水平排列，'column'
            表示垂直排列
          </li>
          <li>
            <strong>children</strong>: StatisticCard 和 Divider 子组件
          </li>
        </ul>
        <h4>StatisticCard Statistic Props：</h4>
        <ul>
          <li>
            <strong>title</strong>: 统计项标题
          </li>
          <li>
            <strong>tip</strong>: 提示信息，鼠标悬停时显示
          </li>
          <li>
            <strong>value</strong>: 统计数值
          </li>
          <li>
            <strong>precision</strong>: 数值精度，控制小数位数
          </li>
          <li>
            <strong>suffix</strong>: 数值后缀，如单位 'Yuan'
          </li>
        </ul>
        <h4>Divider Props：</h4>
        <ul>
          <li>
            <strong>orientation</strong>: 分割线类型，'horizontal'
            表示水平分割线，'vertical' 表示垂直分割线
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
            <strong>实时监听</strong>: 使用 ResizeObserver 实时监听容器大小变化
          </li>
        </ul>
        <h4>数值格式化：</h4>
        <ul>
          <li>
            <strong>precision</strong>: 控制数值的小数位数，如 precision={2}{' '}
            显示两位小数
          </li>
          <li>
            <strong>suffix</strong>: 添加数值后缀，如单位、百分比等
          </li>
          <li>
            <strong>prefix</strong>: 添加数值前缀，如货币符号等
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>核心指标展示</strong>: 展示多个关键业务指标
          </li>
          <li>
            <strong>数据对比</strong>: 使用分割线分隔不同的统计项
          </li>
          <li>
            <strong>响应式设计</strong>: 在不同屏幕尺寸下保持良好的显示效果
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
