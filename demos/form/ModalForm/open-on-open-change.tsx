import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useState } from 'react';

export default () => {
  const [modalVisit, setModalVisit] = useState(false);
  const [drawerVisit, setDrawerVisit] = useState(false);

  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setModalVisit(true);
          }}
        >
          <PlusOutlined />
          Show Modal
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setDrawerVisit(true);
          }}
        >
          <PlusOutlined />
          Show Drawer
        </Button>
      </Space>
      <ModalForm
        title="Create New Form"
        open={modalVisit}
        onFinish={async () => {
          message.success('Submission successful');
          return true;
        }}
        onOpenChange={setModalVisit}
      >
        <ProForm.Group>
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
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="contract"
            label="Contract Name"
            placeholder="Please enter a name"
          />
          <ProFormDateRangePicker
            name="contractTime"
            label="Contract Effective Time"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: 'Effective after stamping',
              },
            ]}
            width="xs"
            name="useMode"
            label="Contract Agreed Effective Method"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: 'Terminate after performance',
              },
            ]}
            name="unusedMode"
            label="Contract Agreed Invalid Method"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="Main Contract Number" />
        <ProFormText
          name="project"
          disabled
          label="Project Name"
          initialValue="xxxx Project"
        />
        <ProFormText
          width="xs"
          name="mangerName"
          disabled
          label="Business Manager"
          initialValue="Qitu"
        />
      </ModalForm>
      <DrawerForm
        onOpenChange={setDrawerVisit}
        title="Create New Form"
        open={drawerVisit}
        onFinish={async () => {
          message.success('Submission successful');
          return true;
        }}
      >
        <ProForm.Group>
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
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="contract"
            label="Contract Name"
            placeholder="Please enter a name"
          />
          <ProFormDateRangePicker
            name="contractTime"
            label="Contract Effective Time"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: 'chapter',
                label: 'Effective after stamping',
              },
            ]}
            width="xs"
            name="useMode"
            label="Contract Agreed Effective Method"
          />
          <ProFormSelect
            width="xs"
            options={[
              {
                value: 'time',
                label: 'Terminate after performance',
              },
            ]}
            name="unusedMode"
            label="Contract Agreed Invalid Method"
          />
        </ProForm.Group>
        <ProFormText width="sm" name="id" label="Main Contract Number" />
        <ProFormText
          name="project"
          disabled
          label="Project Name"
          initialValue="xxxx Project"
        />
        <ProFormText
          width="xs"
          name="mangerName"
          disabled
          label="Business Manager"
          initialValue="Qitu"
        />
      </DrawerForm>
    </>
  );
};
