import type { ProFormInstance } from '@ant-design/pro-components';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const restFormRef = useRef<ProFormInstance>();
  const formRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div style={{ padding: 24 }}>

    <Space>
      <ModalForm
        title="Create New Form"
        formRef={restFormRef}
        open={modalVisible}
        trigger={
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            Reset via formRef
          </Button>
        }
        onOpenChange={setModalVisible}
        submitter={{
          searchConfig: {
            resetText: 'Reset',
          },
          resetButtonProps: {
            onClick: () => {
              restFormRef.current?.resetFields();
              //   setModalVisible(false);
            },
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('Submission successful');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="Contract Customer Name"
          tooltip="Up to 24 characters"
          placeholder="Please enter a name"
        />

        <ProFormText
          width="md"
          name="company"
          label="Our Company Name"
          placeholder="Please enter a name"
        />
      </ModalForm>
      <ModalForm
        title="Create New Form"
        formRef={formRef}
        trigger={<Button type="primary">Reset via custom footer button</Button>}
        submitter={{
          render: (props, defaultDoms) => {
            return [
              ...defaultDoms,
              <Button
                key="extra-reset"
                onClick={() => {
                  props.reset();
                }}
              >
                Reset
              </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('Submission successful');
          return true;
        }}
      >
        <ProFormText
          width="md"
          name="name"
          label="Contract Customer Name"
          tooltip="Up to 24 characters"
          placeholder="Please enter a name"
        />

        <ProFormText
          width="md"
          name="company"
          label="Our Company Name"
          placeholder="Please enter a name"
        />
      </ModalForm>
    </Space>
  
    </div>
  );
};
