import { ModalForm, ProFormText } from '@xxlabs/pro-components';
import { Button, Space, message } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  return (
    <Space>
      <ModalForm
        submitter={{
          render: (props, defaultDoms) => {
            return [
              ...defaultDoms,
              <Button
                key="ok"
                onClick={() => {
                  props.submit();
                }}
              >
                ok
              </Button>,
            ];
          },
        }}
        title="Create New Form"
        trigger={<Button type="primary">Custom Footer Buttons</Button>}
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
      <ModalForm
        submitter={{
          searchConfig: {
            submitText: 'Confirm',
            resetText: 'Cancel',
          },
        }}
        title="Create New Form"
        trigger={<Button type="primary">Custom Text</Button>}
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
      <ModalForm
        submitter={{
          resetButtonProps: {
            type: 'dashed',
          },
          submitButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        title="Create New Form"
        trigger={<Button type="primary">Hide or Modify Button Style</Button>}
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
      <ModalForm submitter={false} title="Hide Footer" trigger={<Button type="primary">Hide Footer</Button>}>
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
