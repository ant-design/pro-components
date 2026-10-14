import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => (
  <ModalForm
    title="隐藏提交区"
    trigger={<Button type="primary">打开表单</Button>}
    submitter={false}
  >
    <ProFormText
      name="name"
      label="客户名称"
      placeholder="通过右上角关闭弹窗"
    />
  </ModalForm>
);
