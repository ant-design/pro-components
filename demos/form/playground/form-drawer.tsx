import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { Button, message } from 'antd';

export default () => (
  <DrawerForm
    title="编辑服务"
    trigger={<Button type="primary">打开抽屉</Button>}
    onFinish={async ({ name }) => {
      message.success(`已保存 ${name}`);
      return true;
    }}
  >
    <ProFormText name="name" label="服务名称" rules={[{ required: true }]} />
  </DrawerForm>
);
