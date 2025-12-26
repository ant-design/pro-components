import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const imgStyle = {
  display: 'block',
  width: 42,
  height: 42,
};

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
              title: 'Payment Amount',
              value: 2176,
              icon: (
                <img
                  style={imgStyle}
                  src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*dr_0RKvVzVwAAAAAAAAAAABkARQnAQ"
                  alt="icon"
                />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: 'Number of Visitors',
              value: 475,
              icon: (
                <img
                  style={imgStyle}
                  src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*-jVKQJgA1UgAAAAAAAAAAABkARQnAQ"
                  alt="icon"
                />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: 'Number of Successful Orders',
              value: 87,
              icon: (
                <img
                  style={imgStyle}
                  src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*FPlYQoTNlBEAAAAAAAAAAABkARQnAQ"
                  alt="icon"
                />
              ),
            }}
          />
          <StatisticCard
            statistic={{
              title: 'Page Views',
              value: 1754,
              icon: (
                <img
                  style={imgStyle}
                  src="https://gw.alipayobjects.com/mdn/rms_7bc6d8/afts/img/A*pUkAQpefcx8AAAAAAAAAAABkARQnAQ"
                  alt="icon"
                />
              ),
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
        <h4>StatisticCard Icon Props 说明：</h4>
        <ul>
          <li>
            <strong>statistic.icon</strong>: 统计项图标，可以是图片或 React 节点
          </li>
          <li>
            <strong>statistic.title</strong>: 统计项标题
          </li>
          <li>
            <strong>statistic.value</strong>: 统计数值
          </li>
        </ul>
        <h4>StatisticCard.Group Props：</h4>
        <ul>
          <li>
            <strong>direction</strong>: 排列方向，'row' 表示水平排列，'column'
            表示垂直排列
          </li>
          <li>
            <strong>children</strong>: StatisticCard 子组件
          </li>
        </ul>
        <h4>RcResizeObserver Props：</h4>
        <ul>
          <li>
            <strong>onResize</strong>: 容器大小变化时的回调函数
          </li>
          <li>
            <strong>offset</strong>: 包含 width 和 height 的对象
          </li>
        </ul>
        <h4>响应式布局特点：</h4>
        <ul>
          <li>
            <strong>断点控制</strong>: 当容器宽度小于 596px 时切换为垂直布局
          </li>
          <li>
            <strong>自动适配</strong>: 根据屏幕尺寸自动调整布局方向
          </li>
          <li>
            <strong>实时监听</strong>: 使用 ResizeObserver 实时监听容器大小变化
          </li>
        </ul>
        <h4>Icon 使用方式：</h4>
        <ul>
          <li>
            <strong>图片图标</strong>: 使用 img 标签显示图标图片
          </li>
          <li>
            <strong>Ant Design 图标</strong>: 使用 @ant-design/icons
            中的图标组件
          </li>
          <li>
            <strong>自定义图标</strong>: 使用 SVG 或其他自定义图标组件
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据仪表盘</strong>: 展示多个关键指标
          </li>
          <li>
            <strong>移动端适配</strong>: 在小屏幕设备上自动调整布局
          </li>
          <li>
            <strong>图标统计</strong>: 使用图标增强统计信息的可读性
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
