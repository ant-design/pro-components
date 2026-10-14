import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => (
  <ModalForm
    title="按钮样式"
    trigger={<Button type="primary">打开表单</Button>}
    submitter={{ resetButtonProps: { type: 'dashed' } }}
    onFinish={async () => true}
  >
    <ProFormText name="name" label="客户名称" />
  </ModalForm>
);
