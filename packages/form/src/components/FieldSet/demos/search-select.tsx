import ProForm, { ProFormSelect } from '@ant-design/pro-form';

export default () => {
  return (
    <ProForm.Group>
      <ProFormSelect.SearchSelect
        name="userQuery"
        label="查询选择器 - request"
        fieldProps={{
          labelInValue: true,
          style: {
            minWidth: 140,
          },
        }}
        debounceTime={300}
        request={async ({ keyWords = '' }) => {
          return [
            { label: '全部', value: 'all' },
            { label: '未解决', value: 'open' },
            { label: '未解决(已分配)', value: 'assignees' },
            { label: '已解决', value: 'closed' },
            { label: '解决中', value: 'processing' },
          ].filter(({ value, label }) => {
            return value.includes(keyWords) || label.includes(keyWords);
          });
        }}
      />
      <ProFormSelect.SearchSelect
        name="userQuery2"
        label="查询选择器 - valueEnum"
        fieldProps={{
          style: {
            minWidth: 140,
          },
        }}
        valueEnum={{
          all: { text: '全部', status: 'Default' },
          open: {
            text: '未解决',
            status: 'Error',
          },
          closed: {
            text: '已解决',
            status: 'Success',
          },
          processing: {
            text: '解决中',
            status: 'Processing',
          },
        }}
      />
      <ProFormSelect.SearchSelect
        name="userQuery3"
        label="查询选择器 - options"
        fieldProps={{
          labelInValue: false,
          style: {
            minWidth: 140,
          },
        }}
        options={[
          { label: '全部', value: 'all' },
          { label: '未解决', value: 'open' },
          { label: '已解决', value: 'closed' },
          { label: '解决中', value: 'processing' },
        ]}
      />
    </ProForm.Group>
  );
};
