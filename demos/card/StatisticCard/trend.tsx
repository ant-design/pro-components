import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <>
      <StatisticCard style={{ width: 160 }}>
        <Statistic title="Daily Comparison" value="7.60%" trend="up" />
        <Statistic title="Weekly Comparison" value="7.60%" trend="down" />
        <Statistic title="Weekly Comparison" value="0.00%" />
      </StatisticCard>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>StatisticCard Trend Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 统计项标题
          </li>
          <li>
            <strong>value</strong>: 统计数值
          </li>
          <li>
            <strong>trend</strong>: 趋势指示，可选值：'up' | 'down' | undefined
          </li>
        </ul>
        <h4>Trend 属性说明：</h4>
        <ul>
          <li>
            <strong>up</strong>: 上升趋势，显示绿色上升箭头
          </li>
          <li>
            <strong>down</strong>: 下降趋势，显示红色下降箭头
          </li>
          <li>
            <strong>undefined</strong>: 无趋势，不显示箭头
          </li>
        </ul>
        <h4>趋势显示特点：</h4>
        <ul>
          <li>
            <strong>颜色区分</strong>: 上升趋势为绿色，下降趋势为红色
          </li>
          <li>
            <strong>箭头指示</strong>: 使用箭头图标直观显示趋势方向
          </li>
          <li>
            <strong>数值对比</strong>: 结合数值变化展示趋势信息
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据对比</strong>: 展示同比、环比等数据变化趋势
          </li>
          <li>
            <strong>指标监控</strong>: 监控关键业务指标的变化趋势
          </li>
          <li>
            <strong>报表分析</strong>: 在报表中展示数据趋势分析
          </li>
        </ul>
      </div>
    </>
  
    </div>
  );
};
