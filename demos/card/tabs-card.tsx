import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard
      tabs={{
        type: 'card',
        items: [
          {
            key: 'tab1',
            label: 'Product One',
            children: 'Content One',
          },
          {
            key: 'tab2',
            label: 'Product Two',
            children: 'Content Two',
          },
        ],
      }}
    />
  );
};
