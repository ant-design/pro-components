import FieldExample from '../value-types/_FieldExample';

export default () => (
  <FieldExample
    initialValue={'不可编辑的文本'}
    valueType={'text'}
    fieldProps={{ disabled: true }}
  />
);
