import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <ProForm submitter={false} initialValues={{}}>
    <ProFormSelect
      name="user"
      label="用户"
      showSearch
      debounceTime={300}
      request={async ({ keyWords }) =>
        ['Alice', 'Bob', 'Carol']
          .filter((name) =>
            name.toLowerCase().includes((keyWords ?? '').toLowerCase()),
          )
          .map((name) => ({ label: name, value: name }))
      }
    />
  </ProForm>
);
