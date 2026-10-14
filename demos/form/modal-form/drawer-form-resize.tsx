import { DrawerForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => (
  <div style={{ padding: 24 }}>
    <DrawerForm
      title="调整抽屉宽度"
      trigger={<Button>打开可调整宽度的抽屉</Button>}
      width={360}
      resize={{ minWidth: 280, maxWidth: 720 }}
      onFinish={async () => true}
    >
      <ProFormText name="note" label="备注" placeholder="拖动抽屉左边缘试试" />
    </DrawerForm>
  </div>
);
