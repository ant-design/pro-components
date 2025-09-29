import type { ProFormInstance } from '@xxlabs/pro-components';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@xxlabs/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>(undefined);

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formProps={{
          validateMessages: {
            required: 'This field is required',
          },
        }}
        formRef={formRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('Submission successful');
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          stepProps={{
            description: 'All basic information is filled in here',
          }}
          title="Create Experiment"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            label="Experiment Name"
            name="name"
            placeholder="Please enter a name"
            rules={[{ required: true }]}
            tooltip="Up to 24 characters, used as a unique id"
            width="md"
          />
          <ProFormDatePicker label="Date" name="date" />
          <ProFormDateRangePicker label="Time Range" name="dateTime" />
          <ProFormTextArea label="Remarks" name="remark" placeholder="Please enter remarks" width="lg" />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          stepProps={{
            description: 'Fill in the operation parameters here',
          }}
          title="Set Parameters"
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          <ProFormCheckbox.Group
            label="Migration Type"
            name="checkbox"
            options={['Structural Migration', 'Full Migration', 'Incremental Migration', 'Full Verification']}
            width="lg"
          />
          <ProForm.Group>
            <ProFormText label="Business DB Username" name="dbname" />
            <ProFormDatePicker label="Record Retention Time" name="datetime" width="sm" />
            <ProFormCheckbox.Group
              label="Migration Type"
              name="checkbox"
              options={['Complete LOB', 'Do Not Sync LOB', 'Restricted LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          stepProps={{
            description: 'Fill in the release criteria here',
          }}
          title="Publish Experiment"
        >
          <ProFormCheckbox.Group
            label="Deployment Units"
            name="checkbox"
            options={['Deployment Unit 1', 'Deployment Unit 2', 'Deployment Unit 3']}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormSelect
            initialValue="1"
            label="Deployment Group Strategy"
            name="remark"
            options={[
              {
                value: '1',
                label: 'Strategy One',
              },
              { value: '2', label: 'Strategy Two' },
            ]}
            rules={[
              {
                required: true,
              },
            ]}
          />
          <ProFormSelect
            initialValue="2"
            label="Pod Scheduling Strategy"
            name="remark2"
            options={[
              {
                value: '1',
                label: 'Strategy One',
              },
              { value: '2', label: 'Strategy Two' },
            ]}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
