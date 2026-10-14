import FieldExample from '../value-types/_FieldExample';

export default () => (
  <FieldExample
    initialValue={128000}
    valueType={'money'}
    fieldProps={{ customSymbol: '💰' }}
  />
);
