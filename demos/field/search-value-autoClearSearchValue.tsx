import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false}>
    <ProFormSelect
      name="tags"
      label="选中后清除搜索词"
      width="sm"
      mode="tags"
      options={[
        { label: 'Alpha', value: 'alpha' },
        { label: 'Beta', value: 'beta' },
      ]}
      fieldProps={{ showSearch: true, autoClearSearchValue: true }}
    />
  </ProForm>
);
