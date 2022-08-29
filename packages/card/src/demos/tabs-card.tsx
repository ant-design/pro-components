import { ProCard } from '@ant-design/pro-components';

export default () => {
  return (
    <ProCard
      tabs={{
        type: 'card',
        items: [
          {
            label: `产品一`,
            key: '1',
            children: `内容一`,
          },
          {
            label: `产品二`,
            key: '2',
            children: `内容二`,
          },
          {
            label: `产品三`,
            key: '3',
            children: `内容三`,
          },
        ],
      }}
    />
  );
};
