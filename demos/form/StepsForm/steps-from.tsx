import type { ProFormInstance } from '@ant-design/pro-components';
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
} from '@ant-design/pro-components';
import { message } from 'antd';
import { useRef } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Demo = () => {
  const formRef = useRef<ProFormInstance>(undefined);

  return (
    <ProCard>
      <StepsForm<{
        name: string;
      }>
        formRef={formRef}
        onFinish={async () => {
          await waitTime(1000);
          message.success('Submission successful');
        }}
        formProps={{
          validateMessages: {
            required: 'This field is required',
          },
        }}
      >
        <StepsForm.StepForm<{
          name: string;
        }>
          name="base"
          title="Create Experiment"
          stepProps={{
            description: 'All basic information is filled in here',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            await waitTime(2000);
            return true;
          }}
        >
          <ProFormText
            name="name"
            label="Experiment Name"
            width="md"
            tooltip="Up to 24 characters, used as a unique id"
            placeholder="Please enter a name"
            rules={[{ required: true }]}
          />
          <ProFormDatePicker name="date" label="Date" />
          <ProFormDateRangePicker name="dateTime" label="Time Range" />
          <ProFormTextArea
            name="remark"
            label="Remarks"
            width="lg"
            placeholder="Please enter remarks"
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm<{
          checkbox: string;
        }>
          name="checkbox"
          title="Set Parameters"
          stepProps={{
            description: 'Fill in the operation parameters here',
          }}
          onFinish={async () => {
            console.log(formRef.current?.getFieldsValue());
            return true;
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="Migration Type"
            width="lg"
            options={[
              'Structural Migration',
              'Full Migration',
              'Incremental Migration',
              'Full Verification',
            ]}
          />
          <ProForm.Group>
            <ProFormText name="dbname" label="Business DB Username" />
            <ProFormDatePicker
              name="datetime"
              label="Record Retention Time"
              width="sm"
            />
            <ProFormCheckbox.Group
              name="checkbox"
              label="Migration Type"
              options={['Complete LOB', 'Do Not Sync LOB', 'Restricted LOB']}
            />
          </ProForm.Group>
        </StepsForm.StepForm>
        <StepsForm.StepForm
          name="time"
          title="Publish Experiment"
          stepProps={{
            description: 'Fill in the release criteria here',
          }}
        >
          <ProFormCheckbox.Group
            name="checkbox"
            label="Deployment Units"
            rules={[
              {
                required: true,
              },
            ]}
            options={[
              'Deployment Unit 1',
              'Deployment Unit 2',
              'Deployment Unit 3',
            ]}
          />
          <ProFormSelect
            label="Deployment Group Strategy"
            name="remark"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue="1"
            options={[
              {
                value: '1',
                label: 'Strategy One',
              },
              { value: '2', label: 'Strategy Two' },
            ]}
          />
          <ProFormSelect
            label="Pod Scheduling Strategy"
            name="remark2"
            initialValue="2"
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

export default () => (
  <div style={{ padding: 24 }}>
    <Demo />
  </div>
);
