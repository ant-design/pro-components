import { DrawerForm, ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, message } from 'antd';

const wait = (time: number = 300) =>
  new Promise((resolve) => setTimeout(resolve, time));

const Demo = () => {
  return (
    <>
      <ModalForm
        title="Debug: destroyOnHidden + request"
        trigger={<Button type="primary">Open (Debug)</Button>}
        modalProps={{ destroyOnHidden: true }}
        // Simulate async data loading
        request={async () => {
          await wait(3000);
          return { name: 'loaded' } as any;
        }}
        onFinish={async () => {
          message.success('Submission successful');
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="Close quickly while loading to test"
        />
      </ModalForm>
      <div style={{ height: 16 }} />
      <DrawerForm
        title="Debug: destroyOnHidden + request (Drawer)"
        trigger={<Button type="primary">Open Drawer (Debug)</Button>}
        drawerProps={{ destroyOnHidden: true }}
        // Simulate async data loading
        request={async () => {
          await wait(3000);
          return { name: 'loaded' } as any;
        }}
        onFinish={async () => {
          message.success('Submission successful');
          return true;
        }}
      >
        <ProFormText
          name="name"
          label="Name"
          placeholder="Close quickly while loading to test"
        />
      </DrawerForm>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
