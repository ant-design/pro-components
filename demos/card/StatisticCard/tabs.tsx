import type { StatisticProps } from '@xxlabs/pro-components';
import { ProCard, StatisticCard } from '@xxlabs/pro-components';

const { Statistic } = StatisticCard;

const items = [
  { key: '1', title: '全部', value: 10, total: true },
  { key: '2', status: 'default', title: '未发布', value: 5 },
  { key: '3', status: 'processing', title: '发布中', value: 3 },
  { key: '4', status: 'error', title: '发布异常', value: 1 },
  { key: '5', status: 'success', title: '发布成功', value: 1 },
];

export default () => {
  return (
    <>
      <ProCard
        tabs={{
          onChange: (key) => {
            console.log('key', key);
          },
          items: items.map((item) => ({
            key: item.key,
            label: (
              <Statistic
                layout="vertical"
                status={item.status as StatisticProps['status']}
                style={{
                  width: 120,
                  borderInlineEnd: item.total ? '1px solid #f0f0f0' : undefined,
                }}
                title={item.title}
                value={item.value}
              />
            ),
            children: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  height: 100,
                }}
              >
                关联展示内容 {item.title}
              </div>
            ),
          })),
        }}
      />

      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
        }}
      >
        <h4>ProCard Tabs Props 说明：</h4>
        <ul>
          <li>
            <strong>tabs.onChange</strong>: 标签页切换时的回调函数
          </li>
          <li>
            <strong>tabs.items</strong>: 标签页配置数组
          </li>
        </ul>
        <h4>Tab Item 配置：</h4>
        <ul>
          <li>
            <strong>key</strong>: 标签页的唯一标识
          </li>
          <li>
            <strong>label</strong>: 标签页标题，可以是字符串或 React 节点
          </li>
          <li>
            <strong>children</strong>: 标签页内容
          </li>
        </ul>
        <h4>Statistic 在 Tabs 中的 Props：</h4>
        <ul>
          <li>
            <strong>layout</strong>: 布局方式，'vertical' 表示垂直布局
          </li>
          <li>
            <strong>title</strong>: 统计项标题
          </li>
          <li>
            <strong>value</strong>: 统计数值
          </li>
          <li>
            <strong>status</strong>: 状态指示
          </li>
          <li>
            <strong>style</strong>: 自定义样式
          </li>
        </ul>
        <h4>数据配置说明：</h4>
        <ul>
          <li>
            <strong>total</strong>: 是否为总计项，用于特殊样式处理
          </li>
          <li>
            <strong>status</strong>: 状态值，用于颜色区分
          </li>
          <li>
            <strong>borderInlineEnd</strong>: 右侧边框，用于分隔总计项
          </li>
        </ul>
        <h4>交互特点：</h4>
        <ul>
          <li>
            <strong>标签切换</strong>: 点击标签页可以切换内容
          </li>
          <li>
            <strong>状态反馈</strong>: 通过 onChange 回调获取切换事件
          </li>
          <li>
            <strong>内容展示</strong>: 每个标签页可以展示不同的内容
          </li>
        </ul>
        <h4>使用场景：</h4>
        <ul>
          <li>
            <strong>分类统计</strong>: 按不同分类展示统计数据
          </li>
          <li>
            <strong>状态管理</strong>: 展示不同状态下的数据
          </li>
          <li>
            <strong>内容切换</strong>: 在有限空间内展示多种内容
          </li>
        </ul>
        <h4>样式定制：</h4>
        <ul>
          <li>
            <strong>标签样式</strong>: 通过 Statistic 组件自定义标签样式
          </li>
          <li>
            <strong>内容样式</strong>: 通过 children 自定义内容样式
          </li>
          <li>
            <strong>分隔样式</strong>: 通过 borderInlineEnd 添加分隔线
          </li>
        </ul>
      </div>
    </>
  );
};
