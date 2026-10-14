import FieldExample from './_FieldExample';

export default () => (
  <FieldExample
    initialValue={'open'}
    valueType={'radioButton'}
    valueEnum={{ open: '待处理', processing: '进行中', closed: '已完成' }}
  />
);
