import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@xxlabs/pro-components';
import { Button, message } from 'antd';
import { useState } from 'react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [loading, setLoading] = useState(false);
  return (
    <ProCard>
      <StepsForm
        formProps={{
          validateMessages: {
            required: 'This field is required',
          },
        }}
        submitter={{
          render: ({ form, onSubmit, step, onPre }) => {
            return [
              <Button
                key="rest"
                onClick={() => {
                  form?.resetFields();
                }}
              >
                Reset
              </Button>,
              step > 0 && (
                <Button
                  key="pre"
                  onClick={() => {
                    onPre?.();
                  }}
                >
                  Previous
                </Button>
              ),
              <Button
                key="next"
                loading={loading}
                type="primary"
                onClick={() => {
                  onSubmit?.();
                }}
              >
                Next
              </Button>,
            ];
          },
        }}
        onFinish={async () => {
          setLoading(true);
          await waitTime(1000);
          message.success('Submission successful');
          setLoading(false);
        }}
      >
        <StepsForm.StepForm
          name="base"
          title="Create Experiment"
          onFinish={async () => {
            setLoading(true);
            await waitTime(2000);
            setLoading(false);
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
        <StepsForm.StepForm name="checkbox" title="Set Parameters">
          <ProFormCheckbox.Group
            label="Migration Type"
            name="checkbox"
            options={['Structural Migration', 'Full Migration', 'Incremental Migration', 'Full Verification']}
            width="lg"
          />
          <ProForm.Group>
            <ProFormText label="Business DB Username" name="dbName" />
            <ProFormDatePicker label="Record Retention Time" name="datetime" width="sm" />
          </ProForm.Group>
          <ProFormDependency name={['dbName']}>
            {({ dbName }) => {
              return (
                <ProFormCheckbox.Group
                  label="Migration Type"
                  name="checkbox"
                  options={dbName ? ['Complete LOB', 'Do Not Sync LOB', 'Restricted LOB'] : ['Complete LOB']}
                />
              );
            }}
          </ProFormDependency>
        </StepsForm.StepForm>
        <StepsForm.StepForm name="time" title="Publish Experiment">
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
            width="md"
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
            width="md"
          />
        </StepsForm.StepForm>
      </StepsForm>
    </ProCard>
  );
};
