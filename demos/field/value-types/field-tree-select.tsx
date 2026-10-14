import FieldExample from './_FieldExample';

export default () => (
  <FieldExample
    initialValue={'frontend'}
    valueType={'treeSelect'}
    fieldProps={{
      options: [
        {
          label: '研发',
          value: 'dev',
          children: [{ label: '前端', value: 'frontend' }],
        },
      ],
    }}
  />
);
