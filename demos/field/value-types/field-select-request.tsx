import FieldExample from './_FieldExample';

export default () => (
  <FieldExample
    initialValue={'open'}
    valueType={'select'}
    request={async () => [
      { label: '待处理', value: 'open' },
      { label: '已完成', value: 'closed' },
    ]}
  />
);
