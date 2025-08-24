import { StatisticCard } from '@ant-design/pro-components';

const { Operation } = StatisticCard;

export default () => {
  return (
    <>
      <StatisticCard.Group>
        <StatisticCard
          statistic={{
            title: 'Service Mesh Count',
            value: 500,
          }}
        />
        <Operation>=</Operation>
        <StatisticCard
          statistic={{
            title: 'Unpublished',
            value: 234,
          }}
        />
        <Operation>+</Operation>
        <StatisticCard
          statistic={{
            title: 'Publishing',
            value: 112,
          }}
        />
        <Operation>+</Operation>
        <StatisticCard
          statistic={{
            title: 'Published',
            value: 255,
          }}
        />
      </StatisticCard.Group>

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>StatisticCard Operation Props 说明：</h4>
        <ul>
          <li>
            <strong>children</strong>: 操作符内容，可以是数学符号如
            '='、'+'、'-'、'×'、'÷' 等
          </li>
        </ul>
        <h4>Operation 组件特点：</h4>
        <ul>
          <li>
            <strong>数学公式</strong>: 用于在统计卡片之间显示数学运算符号
          </li>
          <li>
            <strong>公式展示</strong>: 展示数据之间的数学关系
          </li>
          <li>
            <strong>视觉连接</strong>: 通过操作符连接多个统计卡片
          </li>
        </ul>
        <h4>StatisticCard 配置：</h4>
        <ul>
          <li>
            <strong>statistic.title</strong>: 统计项标题
          </li>
          <li>
            <strong>statistic.value</strong>: 统计数值
          </li>
        </ul>
        <h4>公式展示效果：</h4>
        <ul>
          <li>
            <strong>等号</strong>: 表示总数等于各部分之和
          </li>
          <li>
            <strong>加号</strong>: 表示各部分相加
          </li>
          <li>
            <strong>减号</strong>: 表示减法运算
          </li>
          <li>
            <strong>乘除号</strong>: 表示乘除运算
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>数据分解</strong>: 展示总数与各组成部分的关系
          </li>
          <li>
            <strong>公式计算</strong>: 展示数学公式和数据计算过程
          </li>
          <li>
            <strong>数据验证</strong>: 验证数据之间的逻辑关系
          </li>
          <li>
            <strong>教学展示</strong>: 用于数据分析和教学场景
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>公式清晰</strong>: 确保公式逻辑清晰易懂
          </li>
          <li>
            <strong>数据准确</strong>: 确保公式中的数值计算正确
          </li>
          <li>
            <strong>视觉平衡</strong>: 合理分配各部分的视觉权重
          </li>
        </ul>
      </div>
    </>
  );
};
