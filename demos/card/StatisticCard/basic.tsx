import { EllipsisOutlined, RightOutlined } from '@ant-design/icons';
import { StatisticCard } from '@xxlabs/pro-components';
import { Space, theme } from 'antd';

const { Statistic } = StatisticCard;

export default () => {
  const { token } = theme.useToken();
  return (
    <>
      <StatisticCard
        chart={
          <>
            <img alt="chart" src="https://gw.alipayobjects.com/zos/alicdn/BA_R9SIAV/charts.svg" width="100%" />
          </>
        }
        extra={<EllipsisOutlined />}
        statistic={{
          value: 1102893,
          prefix: '¥',
          description: (
            <Space>
              <Statistic title="Actual Completion" value="82.3%" />
              <Statistic title="Current Target" value="¥6000" />
            </Space>
          ),
        }}
        style={{ width: 268 }}
        title={
          <Space>
            <span>Department One</span>
            <RightOutlined style={{ color: token.colorTextHeading }} />
          </Space>
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
        <h4>StatisticCard Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题，可以是字符串或 React 节点
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角操作区域，可以是字符串或 React 节点
          </li>
          <li>
            <strong>statistic</strong>: 统计信息配置对象
          </li>
          <li>
            <strong>chart</strong>: 图表区域，可以是图片或图表组件
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象
          </li>
        </ul>
        <h4>Statistic 配置对象属性：</h4>
        <ul>
          <li>
            <strong>value</strong>: 统计数值，可以是数字或字符串
          </li>
          <li>
            <strong>prefix</strong>: 数值前缀，如货币符号 '¥'
          </li>
          <li>
            <strong>suffix</strong>: 数值后缀，如单位 '%'
          </li>
          <li>
            <strong>description</strong>: 统计描述，可以是字符串或 React 节点
          </li>
          <li>
            <strong>precision</strong>: 数值精度，控制小数位数
          </li>
        </ul>
        <h4>Statistic 子组件 Props：</h4>
        <ul>
          <li>
            <strong>title</strong>: 统计项标题
          </li>
          <li>
            <strong>value</strong>: 统计项数值
          </li>
          <li>
            <strong>prefix</strong>: 统计项前缀
          </li>
          <li>
            <strong>suffix</strong>: 统计项后缀
          </li>
        </ul>
        <h4>Chart 区域说明：</h4>
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
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据展示</strong>: 展示关键业务指标和统计数据
          </li>
          <li>
            <strong>仪表盘</strong>: 构建数据仪表盘和监控面板
          </li>
          <li>
            <strong>报表</strong>: 生成各类统计报表
          </li>
        </ul>
      </div>
    </>
  );
};
