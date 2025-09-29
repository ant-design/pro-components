import type { ProFormInstance } from '@xxlabs/pro-components';
import { ModalForm, ProFormText } from '@xxlabs/pro-components';
import { Button, message, Space } from 'antd';
import { useRef, useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const restFormRef = useRef<ProFormInstance>(undefined);
  const formRef = useRef<ProFormInstance>(undefined);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <Space>
      <ModalForm
        formRef={restFormRef}
        open={modalVisible}
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
        title="Create New Form"
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
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('Submission successful');
          return true;
        }}
        onOpenChange={setModalVisible}
      >
        <ProFormText
          label="Contract Customer Name"
          name="name"
          placeholder="Please enter a name"
          tooltip="Up to 24 characters"
          width="md"
        />

        <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
      </ModalForm>
      <ModalForm
        formRef={formRef}
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
        title="Create New Form"
        trigger={<Button type="primary">Reset via custom footer button</Button>}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('Submission successful');
          return true;
        }}
      >
        <ProFormText
          label="Contract Customer Name"
          name="name"
          placeholder="Please enter a name"
          tooltip="Up to 24 characters"
          width="md"
        />

        <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
      </ModalForm>
    </Space>
  );
};
