import FieldExample from './_FieldExample';

export default () => (
  <FieldExample
    initialValue={['open', 'processing']}
    valueType={'checkbox'}
    valueEnum={{ open: '待处理', processing: '进行中', closed: '已完成' }}
  />
);
