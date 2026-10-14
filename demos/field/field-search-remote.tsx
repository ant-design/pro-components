import { ProForm, ProFormSelect } from '@ant-design/pro-components';

const options = ['Apple', 'Banana', 'Orange'];
export default () => (
  <ProForm submitter={false}>
    <ProFormSelect
      name="fruit"
      label="按输入词请求"
      width="sm"
      showSearch
      request={async ({ keyWords }) =>
        options
          .filter((label) =>
            label.toLowerCase().includes((keyWords ?? '').toLowerCase()),
          )
          .map((label) => ({ label, value: label.toLowerCase() }))
      }
    />
  </ProForm>
);
