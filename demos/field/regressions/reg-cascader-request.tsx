import FieldExample from '../value-types/_FieldExample';

export default () => (
  <FieldExample
    initialValue={['zhejiang', 'hangzhou']}
    valueType={'cascader'}
    request={async () => [
      {
        label: '浙江',
        value: 'zhejiang',
        children: [{ label: '杭州', value: 'hangzhou' }],
      },
    ]}
  />
);
