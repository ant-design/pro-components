import type { StatisticProps } from '@ant-design/pro-components';
import { ProCard, StatisticCard } from '@ant-design/pro-components';

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
    <ProCard
      tabs={{
        onChange: (key) => {
          console.log('key', key);
        },
      }}
    >
      {items.map((item) => (
        <ProCard.TabPane
          style={{ width: '100%' }}
          key={item.key}
          tab={
            <Statistic
              layout="vertical"
              title={item.title}
              value={item.value}
              status={item.status as StatisticProps['status']}
              style={{
                width: 120,
                borderInlineEnd: item.total ? '1px solid #f0f0f0' : undefined,
              }}
            />
          }
        >
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
        </ProCard.TabPane>
      ))}
    </ProCard>
  );
};
