import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

const Demo = () => {
  return (
    <>
      <StatisticCard
        chartPlacement="left"
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
        style={{ maxWidth: 584 }}
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
        <h4>StatisticCard Horizontal Left Layout Props 说明：</h4>
        <ul>
          <li>
            <strong>chartPlacement</strong>: 图表位置，'left' 表示图表显示在左侧
          </li>
          <li>
            <strong>statistic</strong>: 统计信息配置对象
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象，使用 maxWidth 控制最大宽度
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
        <h4>ChartPlacement="left" 特点：</h4>
        <ul>
          <li>
            <strong>左侧图表</strong>: 图表显示在左侧，统计信息显示在右侧
          </li>
          <li>
            <strong>强调图表</strong>: 左侧的图表更加突出
          </li>
          <li>
            <strong>视觉引导</strong>: 从左到右的阅读习惯
          </li>
        </ul>
        <h4>样式配置：</h4>
        <ul>
          <li>
            <strong>maxWidth</strong>: 设置最大宽度，避免在大屏幕上过宽
          </li>
          <li>
            <strong>响应式</strong>: 在小屏幕上会自动调整布局
          </li>
        </ul>
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>左侧图表</strong>: 可视化图表展示
          </li>
          <li>
            <strong>右侧信息</strong>: 主要统计信息和描述信息
          </li>
          <li>
            <strong>水平布局</strong>: 充分利用水平空间
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>图表展示</strong>: 强调图表的重要性
          </li>
          <li>
            <strong>数据可视化</strong>: 突出数据可视化效果
          </li>
          <li>
            <strong>趋势分析</strong>: 结合图表展示数据趋势
          </li>
          <li>
            <strong>仪表盘</strong>: 构建数据仪表盘
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>图表质量</strong>: 确保左侧图表清晰易懂
          </li>
          <li>
            <strong>信息层次</strong>: 右侧信息应该与图表相关
          </li>
          <li>
            <strong>空间平衡</strong>: 合理分配图表和信息的空间
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
