import { ProForm, ProFormSelect } from '@ant-design/pro-components';

export default () => (
  <div>
    <ProForm submitter={false}>
      <ProFormSelect
        name="first"
        label="第一张表单"
        width="sm"
        showSearch
        request={async () => [{ label: '选项一', value: 'first' }]}
      />
    </ProForm>
    <ProForm submitter={false}>
      <ProFormSelect
        name="second"
        label="第二张表单"
        width="sm"
        showSearch
        request={async () => [{ label: '选项二', value: 'second' }]}
      />
    </ProForm>
  </div>
);
