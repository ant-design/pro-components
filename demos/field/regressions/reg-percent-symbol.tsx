import FieldExample from '../value-types/_FieldExample';

export default () => (
  <FieldExample
    initialValue={-10}
    valueType={{ type: 'percent', showSymbol: (value: number) => value < 0 }}
  />
);
