import FieldExample from '../value-types/_FieldExample';

export default () => (
  <FieldExample
    initialValue={'open'}
    valueType={'select'}
    request={async () => [
      { label: '待处理', value: 'open' },
      {
        label: '其他',
        value: 'group',
        optionType: 'optGroup',
        options: [{ label: '暂停', value: 'paused' }],
      },
    ]}
  />
);
