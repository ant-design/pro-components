import type { StatisticProps } from '@ant-design/pro-components';
import { ProCard, StatisticCard } from '@ant-design/pro-components';

const { Statistic } = StatisticCard;

const items = [
  { key: '1', title: 'All', value: 10, total: true },
  { key: '2', status: 'default', title: 'Unpublished', value: 5 },
  { key: '3', status: 'processing', title: 'Publishing', value: 3 },
  { key: '4', status: 'error', title: 'Publishing Error', value: 1 },
  { key: '5', status: 'success', title: 'Published Successfully', value: 1 },
];

export default () => {
  return (
    <div style={{ padding: 24 }}>

    <ProCard
      tabs={{
        onChange: (key) => {
          console.log('key', key);
        },
        items: items.map((item) => {
          return {
            key: item.key,
            style: { width: '100%' },
            label: (
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
                Related display content {item.title}
              </div>
            ),
          };
        }),
      }}
    />
  
    </div>
  );
};
