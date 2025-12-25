import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
      <StatisticCard
        title="Market Trend"
        tooltip="Market Description"
        style={{ maxWidth: 480 }}
        extra={<EllipsisOutlined />}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
            alt="Bar Chart"
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
        <h4>StatisticCard Chart Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>tooltip</strong>: 提示信息，鼠标悬停时显示
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角操作区域
          </li>
          <li>
            <strong>chart</strong>: 图表区域，可以是图片或图表组件
          </li>
        </ul>
        <h4>Chart 属性说明：</h4>
        <ul>
          <li>
            <strong>图片图表</strong>: 使用 img 标签显示静态图表
          </li>
          <li>
            <strong>动态图表</strong>: 可以集成 ECharts、AntV 等图表库
          </li>
          <li>
            <strong>响应式</strong>: 图表会自动适配容器宽度
          </li>
        </ul>
        <h4>Img 标签属性：</h4>
        <ul>
          <li>
            <strong>src</strong>: 图片源地址
          </li>
          <li>
            <strong>alt</strong>: 图片替代文本，用于无障碍访问
          </li>
          <li>
            <strong>width</strong>: 图片宽度，'100%' 表示占满容器宽度
          </li>
        </ul>
        <h4>图表类型支持：</h4>
        <ul>
          <li>
            <strong>静态图片</strong>: SVG、PNG、JPG 等格式的图表图片
          </li>
          <li>
            <strong>ECharts</strong>: 可以集成 ECharts 动态图表
          </li>
          <li>
            <strong>AntV</strong>: 可以集成 AntV 图表库
          </li>
          <li>
            <strong>自定义组件</strong>: 可以传入自定义的图表组件
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据可视化</strong>: 展示各类统计图表
          </li>
          <li>
            <strong>趋势分析</strong>: 展示数据趋势和变化
          </li>
          <li>
            <strong>对比分析</strong>: 展示数据对比和分布
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
