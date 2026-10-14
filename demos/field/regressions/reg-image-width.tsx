import FieldExample from '../value-types/_FieldExample';

const image =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%231677ff"/%3E%3C/svg%3E';

export default () => (
  <FieldExample
    initialValue={image}
    valueType={{ type: 'image', width: 100 }}
  />
);
