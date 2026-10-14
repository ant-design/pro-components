import { ProCard } from '@ant-design/pro-components';

const Demo = () => {
  return (
    <>
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
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
