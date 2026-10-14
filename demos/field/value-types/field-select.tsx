import FieldExample from './_FieldExample';

export default () => (
  <FieldExample
    initialValue={'open'}
    valueType={'select'}
    valueEnum={{ open: '待处理', closed: '已完成' }}
  />
);
