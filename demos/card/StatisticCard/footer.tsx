import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

const Demo = () => {
  return (
    <>
      <StatisticCard
        title="整体流量评分"
        extra={<EllipsisOutlined />}
        statistic={{
          value: 86.2,
          suffix: '分',
          description: <Statistic title="排名前" value="20%" />,
        }}
        chart={
          <img
            src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
            width="100%"
            alt="进度条"
          />
        }
        footer={
          <>
            <Statistic
              value={15.1}
              title="累计注册数"
              suffix="万"
              layout="horizontal"
            />
            <Statistic
              value={15.1}
              title="本月注册数"
              suffix="万"
              layout="horizontal"
            />
          </>
        }
        style={{ width: 250 }}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>StatisticCard Footer Props 说明：</h4>
        <ul>
          <li>
            <strong>title</strong>: 卡片标题
          </li>
          <li>
            <strong>extra</strong>: 卡片右上角操作区域
          </li>
          <li>
            <strong>statistic</strong>: 主要统计信息配置
          </li>
          <li>
            <strong>chart</strong>: 图表区域
          </li>
          <li>
            <strong>footer</strong>: 底部区域，可以是 React 节点
          </li>
          <li>
            <strong>style</strong>: 卡片样式对象
          </li>
        </ul>
        <h4>Footer 区域特点：</h4>
        <ul>
          <li>
            <strong>额外信息</strong>: 在卡片底部展示额外的统计信息
          </li>
          <li>
            <strong>布局灵活</strong>: 可以包含多个 Statistic 组件
          </li>
          <li>
            <strong>视觉层次</strong>: 与主要统计信息形成层次对比
          </li>
        </ul>
        <h4>Statistic 在 Footer 中的配置：</h4>
        <ul>
          <li>
            <strong>value</strong>: 统计数值
          </li>
          <li>
            <strong>title</strong>: 统计项标题
          </li>
          <li>
            <strong>suffix</strong>: 数值后缀，如单位
          </li>
          <li>
            <strong>layout</strong>: 布局方式，'horizontal' 表示水平布局
          </li>
        </ul>
        <h4>主要统计信息配置：</h4>
        <ul>
          <li>
            <strong>value</strong>: 主要统计数值
          </li>
          <li>
            <strong>suffix</strong>: 数值后缀
          </li>
          <li>
            <strong>description</strong>: 统计描述，可以是 Statistic 组件
          </li>
        </ul>
        <h4>布局效果：</h4>
        <ul>
          <li>
            <strong>主要信息</strong>: 在卡片中央突出显示主要统计信息
          </li>
          <li>
            <strong>图表展示</strong>: 在主要信息下方显示图表
          </li>
          <li>
            <strong>底部信息</strong>: 在卡片底部显示次要统计信息
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>评分展示</strong>: 展示评分和相关的详细数据
          </li>
          <li>
            <strong>数据对比</strong>: 在底部展示对比数据
          </li>
          <li>
            <strong>详细信息</strong>: 在底部展示补充信息
          </li>
          <li>
            <strong>多维度展示</strong>: 展示多个维度的统计数据
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>信息层次</strong>: 确保主要信息和次要信息的层次清晰
          </li>
          <li>
            <strong>数据关联</strong>: footer 中的数据应该与主要信息相关
          </li>
          <li>
            <strong>视觉平衡</strong>: 合理分配各部分的视觉空间
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
