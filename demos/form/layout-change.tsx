import {
  AlipayCircleOutlined,
  LockOutlined,
  PlusOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  DrawerForm,
  LightFilter,
  LoginForm,
  ModalForm,
  ProForm,
  ProFormDateRangePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  QueryFilter,
  StepsForm,
} from '@ant-design/pro-components';
import { Button, Space, message } from 'antd';
import { useState } from 'react';

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => {
  const Components = {
    ProForm,
    ModalForm,
    DrawerForm,
    QueryFilter,
    LightFilter,
    StepsForm,
    LoginForm,
  };
  const [type, setType] = useState<keyof typeof Components>('ProForm');

  if (type === 'StepsForm') {
    return (
      <>
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          radioType="button"
          fieldProps={{
            value: type,
            onChange: (e) => setType(e.target.value),
          }}
          options={[
            'LightFilter',
            'ProForm',
            'ModalForm',
            'DrawerForm',
            'QueryFilter',
            'StepsForm',
            'LoginForm',
          ]}
        />
        <StepsForm
          onFinish={async (values: any) => {
            await waitTime(2000);
            console.log(values);
            message.success('Submission successful');
          }}
        >
          <StepsForm.StepForm title="Step One">
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
                name={['contract', 'name']}
                width="md"
                label="Contract Name"
                placeholder="Please enter a name"
              />
              <ProFormDateRangePicker
                width="md"
                name={['contract', 'createTime']}
                label="Contract Effective Time"
              />
            </ProForm.Group>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Step Two">
            <ProForm.Group>
              <ProFormSelect
                options={[
                  {
                    value: 'chapter',
                    label: 'Effective after stamping',
                  },
                ]}
                readonly
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
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Step Three">
            <ProFormText width="sm" name="id" label="Main Contract Number" />
            <ProFormText
              name="project"
              width="md"
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
          </StepsForm.StepForm>
        </StepsForm>
      </>
    );
  }

  const FormComponents = Components[type as 'LoginForm'];

  if (type === 'LoginForm') {
    return (
      <>
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          radioType="button"
          fieldProps={{
            value: type,
            onChange: (e) => setType(e.target.value),
          }}
          options={[
            'LightFilter',
            'ProForm',
            'ModalForm',
            'DrawerForm',
            'QueryFilter',
            'StepsForm',
            'LoginForm',
          ]}
        />
        <FormComponents
          title="Github"
          subTitle="The world's largest code hosting platform"
          actions={
            <Space>
              Other login methods
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          }
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'Username: admin or user'}
            rules={[
              {
                required: true,
                message: 'Please enter your username!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
            }}
            placeholder={'Password: ant.design'}
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          />
        </FormComponents>
      </>
    );
  }

  return (
    <>
      <ProFormRadio.Group
        style={{
          margin: 16,
        }}
        radioType="button"
        fieldProps={{
          value: type,
          onChange: (e) => setType(e.target.value),
        }}
        options={[
          'LightFilter',
          'ProForm',
          'ModalForm',
          'DrawerForm',
          'QueryFilter',
          'StepsForm',
          'LoginForm',
        ]}
      />
      <div
        style={{
          margin: 24,
        }}
      >
        <FormComponents
          // @ts-ignore
          labelWidth="auto"
          trigger={
            <Button type="primary">
              <PlusOutlined />
              New Form
            </Button>
          }
          onFinish={async (values: any) => {
            await waitTime(2000);
            console.log(values);
            message.success('Submission successful');
          }}
          initialValues={{
            name: 'Ant Design Co., Ltd.',
            useMode: 'chapter',
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
              name={['contract', 'name']}
              width="md"
              label="Contract Name"
              placeholder="Please enter a name"
            />
            <ProFormDateRangePicker
              width="md"
              name={['contract', 'createTime']}
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
              readonly
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
            width="md"
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
        </FormComponents>
      </div>
    </>
  );
};

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
