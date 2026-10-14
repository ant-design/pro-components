import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button } from 'antd';

export default () => (
  <ModalForm
    title="使用 submitter.reset 重置"
    trigger={<Button type="primary">打开表单</Button>}
    submitter={{
      render: (props, defaultButtons) => [
        ...defaultButtons,
        <Button key="reset" onClick={() => props.reset()}>
          重置字段
        </Button>,
      ],
    }}
    onFinish={async () => true}
  >
    <ProFormText name="name" label="客户名称" initialValue="青禾科技" />
  </ModalForm>
);
