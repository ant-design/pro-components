import { PlusOutlined } from '@ant-design/icons';
import {
  DrawerForm,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
} from '@xxlabs/pro-components';
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
        open={modalVisit}
        title="Create New Form"
        onFinish={async () => {
          message.success('Submission successful');
          return true;
        }}
        onOpenChange={setModalVisit}
      >
        <ProForm.Group>
          <ProFormText
            label="Contract Customer Name"
            name="name"
            placeholder="Please enter a name"
            tooltip="Up to 24 characters"
            width="md"
          />

          <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText label="Contract Name" name="contract" placeholder="Please enter a name" width="md" />
          <ProFormDateRangePicker label="Contract Effective Time" name="contractTime" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            label="Contract Agreed Effective Method"
            name="useMode"
            options={[
              {
                value: 'chapter',
                label: 'Effective after stamping',
              },
            ]}
            width="xs"
          />
          <ProFormSelect
            label="Contract Agreed Invalid Method"
            name="unusedMode"
            options={[
              {
                value: 'time',
                label: 'Terminate after performance',
              },
            ]}
            width="xs"
          />
        </ProForm.Group>
        <ProFormText label="Main Contract Number" name="id" width="sm" />
        <ProFormText disabled initialValue="xxxx Project" label="Project Name" name="project" />
        <ProFormText disabled initialValue="Qitu" label="Business Manager" name="mangerName" width="xs" />
      </ModalForm>
      <DrawerForm
        open={drawerVisit}
        title="Create New Form"
        onFinish={async () => {
          message.success('Submission successful');
          return true;
        }}
        onOpenChange={setDrawerVisit}
      >
        <ProForm.Group>
          <ProFormText
            label="Contract Customer Name"
            name="name"
            placeholder="Please enter a name"
            tooltip="Up to 24 characters"
            width="md"
          />

          <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText label="Contract Name" name="contract" placeholder="Please enter a name" width="md" />
          <ProFormDateRangePicker label="Contract Effective Time" name="contractTime" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSelect
            label="Contract Agreed Effective Method"
            name="useMode"
            options={[
              {
                value: 'chapter',
                label: 'Effective after stamping',
              },
            ]}
            width="xs"
          />
          <ProFormSelect
            label="Contract Agreed Invalid Method"
            name="unusedMode"
            options={[
              {
                value: 'time',
                label: 'Terminate after performance',
              },
            ]}
            width="xs"
          />
        </ProForm.Group>
        <ProFormText label="Main Contract Number" name="id" width="sm" />
        <ProFormText disabled initialValue="xxxx Project" label="Project Name" name="project" />
        <ProFormText disabled initialValue="Qitu" label="Business Manager" name="mangerName" width="xs" />
      </DrawerForm>
    </>
  );
};
