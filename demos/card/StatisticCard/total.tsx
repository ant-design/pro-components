import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const { Statistic, Divider } = StatisticCard;

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
        <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
          <StatisticCard
            statistic={{
              title: 'Total Traffic (Visits)',
              value: 601986875,
            }}
          />
          <Divider orientation={responsive ? 'horizontal' : 'vertical'} />
          <StatisticCard
            statistic={{
              title: 'Paid Traffic',
              value: 3701928,
              description: <Statistic title="Proportion" value="61.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="Percentage"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: 'Free Traffic',
              value: 1806062,
              description: <Statistic title="Proportion" value="38.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="Percentage"
                width="100%"
              />
            }
            chartPlacement="left"
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
        <h4>StatisticCard ChartPlacement Props 说明：</h4>
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
            <strong>chart</strong>: 图表区域
          </li>
          <li>
            <strong>chartPlacement</strong>: 图表位置，'left' 表示左侧，'right'
            表示右侧
          </li>
        </ul>
        <h4>ChartPlacement 属性说明：</h4>
        <ul>
          <li>
            <strong>left</strong>: 图表显示在左侧，统计信息显示在右侧
          </li>
          <li>
            <strong>right</strong>: 图表显示在右侧，统计信息显示在左侧
          </li>
          <li>
            <strong>默认值</strong>: 不设置时图表默认显示在右侧
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
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>左侧图表</strong>: 图表在左侧，统计信息在右侧，适合强调图表
          </li>
          <li>
            <strong>右侧图表</strong>: 统计信息在左侧，图表在右侧，适合强调数据
          </li>
          <li>
            <strong>响应式</strong>: 在小屏幕上自动调整为垂直布局
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据对比</strong>: 展示不同类别的数据对比
          </li>
          <li>
            <strong>比例展示</strong>: 展示各部分占总体的比例
          </li>
          <li>
            <strong>趋势分析</strong>: 结合图表展示数据趋势
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>图表选择</strong>: 根据数据类型选择合适的图表类型
          </li>
          <li>
            <strong>布局平衡</strong>: 合理分配图表和统计信息的空间
          </li>
          <li>
            <strong>视觉层次</strong>: 通过布局突出重要的信息
          </li>
        </ul>
      </div>
    </>
  );
};
