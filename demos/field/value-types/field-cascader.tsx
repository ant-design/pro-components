import FieldExample from './_FieldExample';

export default () => (
  <FieldExample
    initialValue={['zhejiang', 'hangzhou']}
    valueType={'cascader'}
    fieldProps={{
      options: [
        {
          label: '浙江',
          value: 'zhejiang',
          children: [{ label: '杭州', value: 'hangzhou' }],
        },
      ],
    }}
  />
);
