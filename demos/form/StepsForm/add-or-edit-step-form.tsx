// Mainly handles the scenarios of creating and editing
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import type { Dayjs } from 'dayjs';
import React, { useEffect, useRef } from 'react';

import { FIXED_BASE_DATE } from '../../mockData';

type FormValue = {
  jobInfo: {
    name: string;
    type: number;
  };
  syncTableInfo: {
    timeRange: [Dayjs, Dayjs];
    title: string;
  };
};
const formValue: FormValue = {
  jobInfo: {
    name: 'normal job',
    type: 1,
  },
  syncTableInfo: {
    timeRange: [FIXED_BASE_DATE.subtract(1, 'm'), FIXED_BASE_DATE],
    title: 'example table title',
  },
};
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(formValue);
    }, time);
  });
};
const jobType = [
  {
    value: 1,
    label: 'State-owned enterprise',
  },
  {
    value: 2,
    label: 'Private enterprise',
  },
];
const EditExample = () => {
  const formMapRef = useRef<
    React.MutableRefObject<ProFormInstance<any> | undefined>[]
  >([]);
  useEffect(() => {
    waitTime(1000).then(() => {
      // In the editing scenario, you need to use formMapRef to loop through and set formData
      formMapRef?.current?.forEach((formInstanceRef) => {
        formInstanceRef?.current?.setFieldsValue(formValue);
      });
    });
  }, []);

  return (
    <StepsForm
      formMapRef={formMapRef}
      onFinish={(values) => {
        console.log(values);
        return Promise.resolve(true);
      }}
    >
      <StepsForm.StepForm name="add-or-edit-step-form-step1" title="Job Information">
        <ProFormText label="Name" name={['jobInfo', 'name']} />
        <ProFormSelect
          label="Job Type"
          name={['jobInfo', 'type']}
          options={jobType}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm name="add-or-edit-step-form-step2" title={'Sync Table Information'}>
        <ProFormDateRangePicker
          label="Time Range"
          name={['syncTableInfo', 'timeRange']}
        />
        <ProFormText label="Title" name={['syncTableInfo', 'title']} />
      </StepsForm.StepForm>
    </StepsForm>
  );
};
export default () => (
  <div style={{ padding: 24 }}>
    <EditExample />
  </div>
);
