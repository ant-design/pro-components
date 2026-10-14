import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, message } from 'antd';

export default () => (
  <ModalForm
    title="编辑服务"
    trigger={<Button type="primary">打开弹窗</Button>}
    onFinish={async ({ name }) => {
      message.success(`已保存 ${name}`);
      return true;
    }}
  >
    <ProFormText name="name" label="服务名称" rules={[{ required: true }]} />
  </ModalForm>
);
