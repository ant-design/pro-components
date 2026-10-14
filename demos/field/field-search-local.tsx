import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false}>
    <ProFormSelect
      name="fruit"
      label="本地筛选"
      width="sm"
      showSearch
      fetchDataOnSearch={false}
      request={async () => [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Orange', value: 'orange' },
      ]}
    />
  </ProForm>
);
