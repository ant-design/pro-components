import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

const Demo = () => {
  return (
    <>
      <StatisticCard
        chartPlacement="right"
        statistic={{
          title: 'Frozen Amount',
          value: 112893,
          precision: 2,
          suffix: 'Yuan',
          description: (
            <>
              <Statistic title="Weekly Comparison" value="6.47%" trend="up" />
              <Statistic
                title="Monthly Comparison"
                value="6.47%"
                trend="down"
              />
            </>
          ),
        }}
        style={{ width: 584 }}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/snEBTn9ax/zhexiantuchang.svg"
            alt="Line Chart"
            width="100%"
          />
        }
      />

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>StatisticCard Horizontal Layout Props 说明：</h4>
        <ul>
          <li>
            <strong>chartPlacement</strong>: 图表位置，'right'
            表示图表显示在右侧
          </li>
          <li>
            <strong>statistic</strong>: 统计信息配置对象
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象
          </li>
          <li>
            <strong>chart</strong>: 图表区域
          </li>
        </ul>
        <h4>Statistic 配置：</h4>
        <ul>
          <li>
            <strong>title</strong>: 统计项标题
          </li>
          <li>
            <strong>value</strong>: 统计数值
          </li>
          <li>
            <strong>precision</strong>: 数值精度，控制小数位数
          </li>
          <li>
            <strong>suffix</strong>: 数值后缀，如单位
          </li>
          <li>
            <strong>description</strong>: 统计描述，可以包含多个 Statistic 组件
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
        <h4>ChartPlacement="right" 特点：</h4>
        <ul>
          <li>
            <strong>右侧图表</strong>: 图表显示在右侧，统计信息显示在左侧
          </li>
          <li>
            <strong>强调数据</strong>: 左侧的统计信息更加突出
          </li>
          <li>
            <strong>空间利用</strong>: 充分利用水平空间
          </li>
        </ul>
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>左侧信息</strong>: 主要统计信息和描述信息
          </li>
          <li>
            <strong>右侧图表</strong>: 可视化图表展示
          </li>
          <li>
            <strong>水平布局</strong>: 充分利用水平空间
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据展示</strong>: 展示主要数据指标
          </li>
          <li>
            <strong>趋势分析</strong>: 结合图表展示数据趋势
          </li>
          <li>
            <strong>对比分析</strong>: 展示多个时间段的对比数据
          </li>
          <li>
            <strong>仪表盘</strong>: 构建数据仪表盘
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>信息层次</strong>: 确保主要信息和次要信息的层次清晰
          </li>
          <li>
            <strong>图表选择</strong>: 根据数据类型选择合适的图表
          </li>
          <li>
            <strong>空间平衡</strong>: 合理分配统计信息和图表的空间
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
