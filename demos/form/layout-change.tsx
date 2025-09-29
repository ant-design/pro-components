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
} from '@xxlabs/pro-components';
import { Button, message, Space } from 'antd';
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

export default () => {
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
          fieldProps={{
            value: type,
            onChange: (e) => setType(e.target.value),
          }}
          options={['LightFilter', 'ProForm', 'ModalForm', 'DrawerForm', 'QueryFilter', 'StepsForm', 'LoginForm']}
          radioType="button"
          style={{
            margin: 16,
          }}
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
                label="Contract Customer Name"
                name="name"
                placeholder="Please enter a name"
                tooltip="Up to 24 characters"
                width="md"
              />
              <ProFormText label="Our Company Name" name="company" placeholder="Please enter a name" width="md" />
            </ProForm.Group>
            <ProForm.Group>
              <ProFormText
                label="Contract Name"
                name={['contract', 'name']}
                placeholder="Please enter a name"
                width="md"
              />
              <ProFormDateRangePicker label="Contract Effective Time" name={['contract', 'createTime']} width="md" />
            </ProForm.Group>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Step Two">
            <ProForm.Group>
              <ProFormSelect
                readonly
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
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Step Three">
            <ProFormText label="Main Contract Number" name="id" width="sm" />
            <ProFormText disabled initialValue="xxxx Project" label="Project Name" name="project" width="md" />
            <ProFormText disabled initialValue="Qitu" label="Business Manager" name="mangerName" width="xs" />
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
          fieldProps={{
            value: type,
            onChange: (e) => setType(e.target.value),
          }}
          options={['LightFilter', 'ProForm', 'ModalForm', 'DrawerForm', 'QueryFilter', 'StepsForm', 'LoginForm']}
          radioType="button"
          style={{
            margin: 16,
          }}
        />
        <FormComponents
          actions={
            <Space>
              Other login methods
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          }
          subTitle="The world's largest code hosting platform"
          title="Github"
        >
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className="prefixIcon" />,
            }}
            name="username"
            placeholder="Username: admin or user"
            rules={[
              {
                required: true,
                message: 'Please enter your username!',
              },
            ]}
          />
          <ProFormText.Password
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            name="password"
            placeholder="Password: ant.design"
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
        fieldProps={{
          value: type,
          onChange: (e) => setType(e.target.value),
        }}
        options={['LightFilter', 'ProForm', 'ModalForm', 'DrawerForm', 'QueryFilter', 'StepsForm', 'LoginForm']}
        radioType="button"
        style={{
          margin: 16,
        }}
      />
      <div
        style={{
          margin: 24,
        }}
      >
        <FormComponents
          initialValues={{
            name: 'Ant Design Co., Ltd.',
            useMode: 'chapter',
          }}
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
            <ProFormText
              label="Contract Name"
              name={['contract', 'name']}
              placeholder="Please enter a name"
              width="md"
            />
            <ProFormDateRangePicker label="Contract Effective Time" name={['contract', 'createTime']} width="md" />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              readonly
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
          <ProFormText disabled initialValue="xxxx Project" label="Project Name" name="project" width="md" />
          <ProFormText disabled initialValue="Qitu" label="Business Manager" name="mangerName" width="xs" />
        </FormComponents>
      </div>
    </>
  );
};
