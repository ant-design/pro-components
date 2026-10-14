import FieldExample from '../value-types/_FieldExample';

export default () => (
  <FieldExample
    initialValue={[{ value: 'open', label: '待处理' }]}
    valueType={'checkbox'}
    valueEnum={{ open: '待处理', closed: '已完成' }}
  />
);
