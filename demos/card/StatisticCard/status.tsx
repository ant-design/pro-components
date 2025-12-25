import { StatisticCard } from '@ant-design/pro-components';

const { Divider } = StatisticCard;

const Demo = () => {
  return (
    <>
      <StatisticCard.Group>
        <StatisticCard
          statistic={{
            title: 'All',
            tip: 'Help text',
            value: 10,
          }}
        />
        <Divider />
        <StatisticCard
          statistic={{
            title: 'Unpublished',
            value: 5,
            status: 'default',
          }}
        />
        <StatisticCard
          statistic={{
            title: 'Publishing',
            value: 3,
            status: 'processing',
          }}
        />
        <StatisticCard
          statistic={{
            title: 'Publishing Error',
            value: 2,
            status: 'error',
          }}
        />
        <StatisticCard
          statistic={{
            title: 'Published Successfully',
            value: '-',
            status: 'success',
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
        <h4>StatisticCard Status Props 说明：</h4>
        <ul>
          <li>
            <strong>statistic.title</strong>: 统计项标题
          </li>
          <li>
            <strong>statistic.tip</strong>: 提示信息，鼠标悬停时显示
          </li>
          <li>
            <strong>statistic.value</strong>: 统计数值，可以是数字、字符串或 '-'
          </li>
          <li>
            <strong>statistic.status</strong>: 状态指示，可选值：'default' |
            'processing' | 'error' | 'success'
          </li>
        </ul>
        <h4>Status 状态说明：</h4>
        <ul>
          <li>
            <strong>default</strong>: 默认状态，无特殊颜色标识
          </li>
          <li>
            <strong>processing</strong>: 处理中状态，显示蓝色或橙色
          </li>
          <li>
            <strong>error</strong>: 错误状态，显示红色
          </li>
          <li>
            <strong>success</strong>: 成功状态，显示绿色
          </li>
        </ul>
        <h4>状态显示特点：</h4>
        <ul>
          <li>
            <strong>颜色区分</strong>: 不同状态使用不同的颜色进行区分
          </li>
          <li>
            <strong>视觉反馈</strong>: 通过颜色提供直观的状态反馈
          </li>
          <li>
            <strong>语义化</strong>: 状态值与业务语义相对应
          </li>
        </ul>
        <h4>Divider 组件：</h4>
        <ul>
          <li>
            <strong>默认分割线</strong>: 不设置 type 时使用默认分割线
          </li>
          <li>
            <strong>分隔作用</strong>: 用于分隔不同的统计项
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>状态统计</strong>: 统计不同状态下的数据量
          </li>
          <li>
            <strong>进度监控</strong>: 监控任务或流程的执行状态
          </li>
          <li>
            <strong>错误统计</strong>: 统计错误和成功的数据
          </li>
          <li>
            <strong>状态展示</strong>: 展示系统或业务的状态分布
          </li>
        </ul>
        <h4>最佳实践：</h4>
        <ul>
          <li>
            <strong>状态一致性</strong>: 保持状态值与业务逻辑的一致性
          </li>
          <li>
            <strong>颜色语义</strong>: 使用符合用户认知的颜色语义
          </li>
          <li>
            <strong>数据完整性</strong>: 确保所有状态的数据都有统计
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
