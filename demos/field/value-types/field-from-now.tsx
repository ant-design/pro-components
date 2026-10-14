import FieldExample from './_FieldExample';

export default () => (
  <FieldExample initialValue={Date.now() - 3600000} valueType={'fromNow'} />
);
